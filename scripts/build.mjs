// Builds the site: OCR at the root (as before) and AQA under /aqa/.
// 1. `astro build` of this repo as it stands (OCR data in src/data) -> dist/
// 2. a copy of the repo in .build/aqa with AQA data (boards/aqa/data), the string replacements in
//    boards/aqa/replace.json and the page overrides in boards/aqa/overrides/ -> built, moved under dist/aqa/
//    with its internal links prefixed. Shared pages (tutors, about, legal, forms) come from the OCR build only.
// 3. one sitemap for the whole site.
// Usage: node scripts/build.mjs   (Netlify runs it through `npm run build`)
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DIST = path.join(root, 'dist');
const BUILD = path.join(root, '.build');
const DOMAIN = 'https://www.chemistryaleveltutor.com';
const SHARED = ['404.html', 'tutors', 'about', 'privacy', 'terms', 'thank-you', 'report'];
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]));
const run = (cmd, cwd) => execSync(cmd, { cwd, stdio: 'inherit', env: process.env });

// 1. OCR at the root
fs.rmSync(DIST, { recursive: true, force: true });
run('npx astro build', root);

// 2. AQA
for (const board of ['aqa', 'edexcel']) {
  const B = path.join(root, 'boards', board);
  const work = path.join(BUILD, board);
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(work, { recursive: true });
  for (const f of ['src', 'package.json', 'tsconfig.json']) if (fs.existsSync(path.join(root, f))) fs.cpSync(path.join(root, f), path.join(work, f), { recursive: true });
  fs.symlinkSync(path.join(root, 'node_modules'), path.join(work, 'node_modules'), 'dir');
  fs.mkdirSync(path.join(work, 'public-empty'));
  fs.writeFileSync(path.join(work, 'astro.config.mjs'),
    `import { defineConfig } from 'astro/config';\nexport default defineConfig({ site: '${DOMAIN}', trailingSlash: 'always', publicDir: './public-empty', outDir: './out' });\n`);
  // data
  const data = path.join(work, 'src', 'data');
  for (const f of fs.readdirSync(path.join(B, 'data'))) fs.copyFileSync(path.join(B, 'data', f), path.join(data, f));
  for (const f of ['exams.json', 'boundaries.json']) fs.copyFileSync(path.join(B, f), path.join(data, f));
  const cfg = JSON.parse(fs.readFileSync(path.join(B, 'site.config.json'), 'utf8'));
  fs.writeFileSync(path.join(data, 'site.json'), JSON.stringify(cfg.site, null, 2));
  // string replacements, then whole-file overrides and deletions
  const rep = JSON.parse(fs.readFileSync(path.join(B, 'replace.json'), 'utf8'));
  for (const f of walk(path.join(work, 'src'))) {
    if (f.startsWith(data + path.sep) && !f.includes(`${path.sep}decks${path.sep}`)) continue;
    if (!/\.(astro|ts|js|json|css)$/.test(f)) continue;
    let s = fs.readFileSync(f, 'utf8'), t = s;
    for (const [a, b] of rep.all) t = t.split(a).join(b);
    if (t !== s) fs.writeFileSync(f, t);
  }
  for (const rel of rep.delete || []) fs.rmSync(path.join(work, rel), { recursive: true, force: true });
  const ov = path.join(B, 'overrides');
  if (fs.existsSync(ov)) fs.cpSync(ov, work, { recursive: true });
  run('npx astro build', work);
  // move under /<board>/, prefixing internal links to this board's routes
  const out = path.join(work, 'out');
  const routes = fs.readdirSync(out, { withFileTypes: true }).filter((e) => e.isDirectory() && !SHARED.includes(e.name)).map((e) => e.name);
  const alt = routes.map((r) => r.replace(/[-_]/g, (c) => '\\' + c)).join('|');
  const rx = new RegExp(`(["'\`(=]|${DOMAIN.replace(/[.:/]/g, (c) => '\\' + c)})/(${alt})(?=[/"'?#\`)])`, 'g');
  const home = new RegExp(`(href=["']|${DOMAIN.replace(/[.:/]/g, (c) => '\\' + c)})/(["'])`, 'g');
  let n = 0;
  for (const f of walk(out)) {
    const rel = path.relative(out, f);
    if (SHARED.includes(rel.split(path.sep)[0])) continue;
    const dest = path.join(DIST, board, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    if (/\.(html|js|json|css|xml)$/.test(f)) {
      let s = fs.readFileSync(f, 'utf8').replace(rx, (m, pre, r) => `${pre}/${board}/${r}`);
      // the board's home page: canonical and og:url point at /<board>/
      if (rel === 'index.html') s = s.split(`"${DOMAIN}/"`).join(`"${DOMAIN}/${board}/"`);
      fs.writeFileSync(dest, s);
    } else fs.copyFileSync(f, dest);
    n++;
  }
  console.log(`${board}: ${routes.length} routes, ${n} files under /${board}/`);
}

// 3. one sitemap for the whole site
const pages = walk(DIST).filter((f) => f.endsWith('index.html')).map((f) => '/' + path.relative(DIST, path.dirname(f)).split(path.sep).join('/'))
  .map((u) => (u === '/' ? '/' : u + '/')).filter((u) => !/\/(print|data|thank-you)\//.test(u)).sort();
for (const f of fs.readdirSync(DIST)) if (/^sitemap.*\.xml$/.test(f)) fs.rmSync(path.join(DIST, f));
fs.writeFileSync(path.join(DIST, 'sitemap-0.xml'), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${pages.map((u) => `<url><loc>${DOMAIN}${u}</loc></url>`).join('')}</urlset>`);
fs.writeFileSync(path.join(DIST, 'sitemap-index.xml'), `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${DOMAIN}/sitemap-0.xml</loc></sitemap></sitemapindex>`);
console.log(`sitemap: ${pages.length} pages`);
fs.rmSync(BUILD, { recursive: true, force: true });

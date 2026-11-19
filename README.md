# chemistryaleveltutor.com

**Two boards (19 November 2026):** OCR Chemistry A is the site at the root; AQA Chemistry (7405 / 7404) is the section under `/aqa/`. See "AQA section" below.

Static Astro site for OCR A-level Chemistry A (H432) and AS (H032), deployed on Netlify. Fourth site in the family after mathsaleveltutor.com, alevelpsychologytutor.com and economicsaleveltutor.com; built from the Economics template with the `subject-revision-site` skill on 10 November 2026.

## Run locally
    npm install
    npm run dev        # http://localhost:4321
    npm run build      # node scripts/build.mjs: OCR at the root, AQA under /aqa/, one sitemap; writes dist/
    npm run build:ocr  # the OCR site only (plain astro build)

## Deploy
Push to `main` of the linked GitHub repository; Netlify builds with `npm run build` (Node 22) and publishes `dist/`.
Set `CROPS=off` in Netlify's environment to replace every OCR crop with a link to OCR's site.

## Data
- `scripts/export.py --bank "<Question Bank folder>" --topics topics.json --config site.config.json [--images [--only <bundle>]]`
  reads the OCR Chemistry question bank (`Dropbox\Teaching\Chemistry\OCR\Question Bank`: `data/index.js`, `data/img/*.js`) and writes `src/data/questions.json`, `papers.json`, `topics.json`, `spec.json`, `weighting.json`, and with `--images` the WebP crops under `public/img/<bundle>/`.
  `--only` rewrites the data files with a single paper: always follow it with the full run.
- The Chemistry bank carries `fmt` (question type), `cp` (earlier parts this part needs) and skill codes `M x.y` and `PAG n`. The export turns the level-of-response flag into the format "Level of response", takes MCQ answers from the first cell of the mark scheme ("B 1"), turns `cp` into `contextCrops` (the fold-out above a part), marks practical parts (`features: practical`) and leaves difficulty empty where there is no examiner comment.
- `topics.json` (repo root) maps the 515 learning outcomes to the 40 site topics, grouped by Module. `site.config.json` holds the site line, WhatsApp wording, exam dates, grade boundaries and tutors.

## Pages that differ from the Economics template
- `/mechanisms/` (was diagrams), `/maths-skills/` (was quantitative-skills), `/practicals/` (PAG 1 to 12) and `/data-sheet/` (new).
- `/six-mark-questions/` (was essays): the level of response questions with a timed tool.
- `/mock/` assembles OCR-shaped papers: 15 multiple choice + 85 structured marks (A-level Papers 1 and 2), 70 structured (Paper 3 and AS Paper 2), 20 multiple choice + 50 structured (AS Paper 1). Structured questions are kept whole.
- Question types: Multiple choice, Calculation, Equation writing, Mechanism, Structure / isomer, Level of response, Practical (by feature), Data interpretation, Short answer.
- Grade boundaries are the raw total out of 270 (no weighting); AS out of 140.
- Flashcards are key-term decks (`src/data/decks/*.json`, picked up automatically). Decks with `"checked": false` show a "being checked by our tutor" line.

## Content that needs a tutor's check before launch
- The six key-term decks in `src/data/decks/`.
- The mechanisms checklist, the maths-skills notes, the PAG notes, the Data Sheet page's "learn these" list and the level-of-response summary.
- `src/data/tutors.json` is empty: the tutor page shows a generic version until a tutor (name, title, photo, bio, offers, fee) is added.

## Upkeep
New papers (OCR makes each summer's papers public about a year later): run the bank pipeline, then `export.py --images`, commit `src/data` and `public/img`. Grade boundaries (`src/data/boundaries.json`) in August; exam dates (`src/data/exams.json`) when OCR publishes the final timetable in the autumn.

## AQA section (/aqa/)
- `scripts/build.mjs` builds the OCR site as it stands, then a copy of `src/` with the AQA data (`boards/aqa/data`, `exams.json`, `boundaries.json`, `site.config.json`), the string replacements in `boards/aqa/replace.json` and the whole-file overrides in `boards/aqa/overrides/`, and moves that build under `dist/aqa/` with its internal links prefixed. Tutors, about, legal and form pages come from the OCR build only. The same method as physicsaleveltutor.com (`/eduqas/`).
- To change wording that both boards share, edit the page in `src/`. If the OCR sentence you change is a key in `boards/aqa/replace.json`, update the key too (the build does not warn when a key no longer matches). Pages that exist only for AQA, or differ too much, are in `boards/aqa/overrides/src/`: home page, topic index, question types, required practicals, Data Booklet, maths skills, mechanisms, `lib/groups.ts` and the six key-term decks.
- Data: `python scripts/export_aqa.py --bank "<Dropbox>\Teaching\Chemistry\AQA\Question Bank" --topics boards/aqa/topics.json --config boards/aqa/site.config.json --out boards/aqa/data`, then `python scripts/webp_all.py "<that bank folder>"` for the crops (`public/img/<bundle>/`, bundles named like `JUN24_74051`, so they sit beside the OCR ones).
- 34 topics, one per specification section (3.1.1 to 3.3.16), in six groups (physical, inorganic, organic; year 1 and year 2). 50 papers, 2,306 parts. Question types are the bank's, with "Extended response" shown as "Level of response" and "Equation" as "Equation writing" (`formatMap` in the config). Question numbers keep AQA's form (02.3).
- Browser storage keys are `malt-aqa-…` in the AQA section, so ticks and scores do not mix with the OCR ones.
- Mock shapes: A-level Papers 1 and 2, 105 structured marks; Paper 3, 60 structured + 30 multiple choice; AS papers, 65 structured + 15 multiple choice.
- Board facts used: specification version 1.2 (no content change); June 2027 dates 7405/1 28 May am, 7405/2 10 June am, 7405/3 17 June am, 7404/1 11 May am, 7404/2 18 May am (AQA timetable v1.2); boundaries out of 300 and AS out of 160, 2022 to 2026.
- Needs a tutor's check: the six AQA decks, the required-practical notes, the Data Booklet lists, the mechanisms checklist, the maths-skills notes and the level-of-response summary.

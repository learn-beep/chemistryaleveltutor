# chemistryaleveltutor.com

Static Astro site for OCR A-level Chemistry A (H432) and AS (H032), deployed on Netlify. Fourth site in the family after mathsaleveltutor.com, alevelpsychologytutor.com and economicsaleveltutor.com; built from the Economics template with the `subject-revision-site` skill on 10 November 2026.

## Run locally
    npm install
    npm run dev        # http://localhost:4321
    npm run build      # writes dist/

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

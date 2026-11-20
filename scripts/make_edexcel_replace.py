import json
src=json.load(open('boards/aqa/replace.json'))
A=[list(p) for p in src['all']]
def setto(i,to): A[i][1]=to
def setboth(i,frm,to): A[i]=[frm,to]
setto(11,"Where a part needs a figure, table or structure from earlier in the question, that part folds out above it; the mark scheme and examiner's comment open underneath. Have Edexcel's Data Booklet beside you; the Periodic Table is on the back page of every paper.")
setto(13,"', with the indicative content and the marks for reasoning'")
setto(17,"const papers = [[1, 'Topics 1 to 10: AS and A level'], [2, 'Topics 11 to 19: A level only']];")
setto(18,"specification checklist (9CH0): all ${total} statements, tickable")
setto(19,"All ${total} content statements of the Pearson Edexcel A-level Chemistry specification (9CH0) as a tickable checklist, with the A-level-only topics marked and links")
setto(20,"Every content statement in the Pearson Edexcel Chemistry specification (9CH0, Issue 3), numbered as Edexcel numbers them, with the sixteen core practicals in their places. Tick what you're confident with; ticks are saved in this browser only. Topics 1 to 10 are the whole of the AS (8CH0) and the first year of the A level; Topics 11 to 19 are A level only. Paper 1 covers Topics 1 to 5, 8 and 10 to 15; Paper 2 covers Topics 2, 3, 5 to 7, 9 and 16 to 19; Paper 3 can draw on any topic and on the core practicals.")
setto(22,"Papers 1 and 2 at A level are 90 marks each and Paper 3 is 120 marks. Every paper mixes multiple-choice, short-answer, calculation and extended-writing questions; there is no separate multiple-choice section. Paper 3 can draw on any topic and includes questions on practical methods. Each AS paper is 80 marks.")
setto(23,"Papers 1 and 2 are marked out of 90 and Paper 3 out of 120. Pearson adds the three raw marks, so the overall boundaries are out of 300 (Papers 1 and 2 are 30% of the A level each and Paper 3 is 40%).")
setto(24,'<label>Paper 1 mark (out of 90) <input type="number" min="0" max="90" id="p1"')
setto(25,'<label>Paper 2 mark (out of 90) <input type="number" min="0" max="90" id="p2"')
setto(26,'<label>Paper 3 mark (out of 120) <input type="number" min="0" max="120" id="p3"')
setto(34,"the October 2020 and November 2021 papers are the autumn series Pearson ran instead. The A-level papers start in June 2017 and the AS papers in June 2016.")
setto(36,"{/^(October|November)/.test(paper.series) ? ' · An autumn series, sat in place of the cancelled summer exams' : ''} · Have the <a href=\"/data-sheet/\">Data Booklet</a> beside you")
setto(37,A[37][1].replace("'7405'","'9CH0'"))
setto(38,"The thin blocks are one-mark parts, many of them multiple choice: Edexcel spreads its multiple-choice questions through every paper.")
setto(39,"and which came up in the practical questions of Paper 3; the")
setto(40,"Pearson's examiners' reports sometimes give the mean mark, or the proportion of students who scored the marks, on a question. These are the {hard.length} parts on current content where it was under 35%")
setto(41,"June 2025 is the most recent series Pearson has published. Pearson keeps each summer's papers for teachers only for about a year, so the data here runs to the latest public series. October 2020 and November 2021 were the autumn series sat in place of the cancelled summer exams.")
setto(42,"All the six-mark extended-response questions (the ones marked with an asterisk) set on Edexcel Chemistry since 2016")
setto(43,"{lor.length} six-mark questions marked with an asterisk (*), grouped by topic. Every paper has one.")
setto(44,"indicative content and reasoning marks")
setto(45,"Indicative content</td><td>up to 4</td><td>The mark scheme lists six indicative points. Six points seen earn 4 marks, five or four earn 3, three or two earn 2, and one earns 1.")
setto(46,"Structure and reasoning</td><td>up to 2</td><td>2 for a coherent, logical answer with linked points and reasoning sustained throughout; 1 for a partly structured answer with some links and lines of reasoning; 0 if the points are not linked.")
setto(47,"In general</td><td>6 in all</td><td>The mark schemes say that five or six points would be expected to earn both reasoning marks, and three or four points one of them.")
setto(48,"The two marks are added together. Cover every part of the question, in a logical order, and link each point to the one before it. Summary written by the site from Pearson's mark schemes; being checked by our tutor.")
setboth(49,"Level 1 is 1–2 marks, Level 2 is 3–4, Level 3 is 5–6. Pick the level from the descriptors first, then the mark within it from how clear and well structured your answer is.","Count the indicative points you made: six earn 4 marks, five or four earn 3, three or two earn 2, one earns 1. Then add 2, 1 or 0 for how well the answer is structured and reasoned.")
setto(50,"Build a timed mini-mock from real Edexcel Chemistry past-paper questions in the shape of Paper 1, 2 or 3 (or the AS papers): a multiple-choice drill, whole questions, or a full paper.")
setto(51,"Edexcel has no separate multiple-choice section: the multiple-choice parts sit inside the questions. A-level Papers 1 and 2 are 90 marks in 1 hour 45 minutes; Paper 3 is 120 marks in 2 hours 30 minutes, on any topic and on practical methods. Each AS paper is 80 marks in 1 hour 30 minutes. Questions are kept whole, so every part has the information it needs. Have the Data Booklet beside you.")
setto(52,">Paper 1 (inorganic and physical)</button>")
setto(53,">Paper 2 (organic and physical)</button>")
setto(54,">Paper 3 (general and practical principles)</button>")
setto(55,"const SHAPE = { 'A level': { 'Paper 1': [15, 90, 70], 'Paper 2': [15, 90, 70], 'Paper 3': [0, 120, 75] }, AS: { 'Paper 1': [15, 80, 68], 'Paper 2': [15, 80, 68] } };")
setto(56,"'There is no AS Paper 3; the AS papers are Paper 1 (core inorganic and physical) and Paper 2 (core organic and physical).'")
setto(57,"full: `${st} marks of whole questions, multiple choice included (${sel.level === 'AS' ? '1 hour 30 minutes' : sel.paper === 'Paper 3' ? '2 hours 30 minutes' : '1 hour 45 minutes'}).` };")
setto(58,"else { fill(groups, st).forEach(add); }")
setto(59,"Dropping marks on calculations, mechanisms or the core practicals? Book a trial session with an A-level chemistry tutor.")
setto(61,"and Edexcel's mark schemes want the key phrases")
setto(62,"with an A-level chemistry tutor.")
setto(63,'{"t": "Core practicals 1 to 16", "u": "/core-practicals/", "kind": "Tool"}')
setto(65,"/core-practicals/")
setto(66,"malt-edexcel-")
setto(67,"https://qualifications.pearson.com/en/qualifications/edexcel-a-levels/chemistry-2015.coursematerials.html")
for i in range(68,77):
    A[i][1]=A[i][1].replace('AQA','Edexcel').replace('7405','9CH0').replace('7404','8CH0')
extra=[
 ["const groups = shuffle(groupsOf(pool.filter((q) => q.f !== 'Multiple choice')));","const groups = shuffle(groupsOf(pool));"],
 ["A: mc ? `${mc} multiple-choice questions, marked instantly","A: mc ? `${mc} multiple-choice parts drawn from across the papers, marked instantly"],
 ['>Structured questions, about 40 marks</button>','>Whole questions, about 40 marks</button>'],
 ['B: `Whole structured questions adding up','B: `Whole questions adding up'],
 ['leadLine="Stuck at Level 2 on the six-markers? Message us."','leadLine="Dropping marks on the six-markers? Message us."'],
 ['<th>Level</th><th>Marks</th><th>What it takes</th>','<th>Marks for</th><th>Marks</th><th>How they are given</th>'],
 ['and decide your level.','and work out your mark.'],
 ["<h1>Six-mark level of response questions</h1>","<h1>Six-mark extended-response questions</h1>"],
 ["six-mark level of response question, by topic","six-mark extended-response question, by topic"],
 [".replace('November ', 'Nov ')",".replace('November ', 'Nov ').replace('October ', 'Oct ')"],
 [".replace('November ', 'N')",".replace('November ', 'N')"],
]
extra.append(["const i = lines.findIndex((l) => /\\*/.test(l)); const pick = (i >= 0 ? lines.slice(i, i + 3) : lines.slice(-3)).join(' '); return pick.replace(/^\\d*\\s*\\(?[a-z]?\\)?\\s*(\\([ivx]+\\))?\\*?\\s*/i, '')","const all = lines.join(' ').replace(/\\s(e[erc]*\\s?){4,}.*$/, ''); const m = all.match(/\\b(Explain|Describe|Discuss|Compare|Devise|Deduce|Evaluate|Comment|Give|Justify|Outline|Assess|Suggest|Predict|Identify|Plan|Determine|Analyse)\\b.*/); const pick = m ? m[0] : all.slice(-230); return pick"])
tail=[["Level of response","Extended response"],["level of response","extended response"]]
out=A[:66]+extra+tail+A[66:]
json.dump({'all':out,'delete':['src/pages/practicals','src/data/decks']},open('boards/edexcel/replace.json','w'),indent=1,ensure_ascii=False)
print(len(out), src['delete'])

const fs = require('fs');
const path = require('path');

// Load category 1 from /tmp/quiz_cat1.json
const cat1Questions = JSON.parse(fs.readFileSync('/tmp/quiz_cat1.json', 'utf8'));

// Load categories 2 - 6
const cat2 = require('./cat2_shacl.cjs');
const cat3 = require('./cat3_opa.cjs');
const cat4 = require('./cat4_sdc.cjs');
const cat5 = require('./cat5_ai.cjs');
const cat6 = require('./cat6_repo.cjs');

function createQuestion(id, category, difficulty, question, options, correctIndex, explanation, citation, tags) {
  return {
    id,
    category,
    difficulty,
    question,
    options,
    correctIndex,
    explanation,
    citation,
    tags
  };
}

function processModule(mod) {
  const result = [];
  mod.f.forEach(([id, qText, opts, cIdx, exp, cit, tags]) => {
    result.push(createQuestion(id, mod.cat, 'Foundation', qText, opts, cIdx, exp, cit, tags));
  });
  mod.i.forEach(([id, qText, opts, cIdx, exp, cit, tags]) => {
    result.push(createQuestion(id, mod.cat, 'Intermediate', qText, opts, cIdx, exp, cit, tags));
  });
  mod.a.forEach(([id, qText, opts, cIdx, exp, cit, tags]) => {
    result.push(createQuestion(id, mod.cat, 'Advanced', qText, opts, cIdx, exp, cit, tags));
  });
  return result;
}

const allQuestions = [
  ...cat1Questions,
  ...processModule(cat2),
  ...processModule(cat3),
  ...processModule(cat4),
  ...processModule(cat5),
  ...processModule(cat6)
];

console.log('Total questions assembled:', allQuestions.length);

// Verify counts for each bucket
const categories = [
  'Five Safes & Governance',
  'Semantic Modeling & SHACL',
  'OPA Rego & Enforcement',
  'Quantitative SDC & Airlock',
  'AI & MCP Governance',
  'Repository & Architecture'
];

const difficulties = ['Foundation', 'Intermediate', 'Advanced'];

const table = {};
let allPass = true;

categories.forEach(cat => {
  table[cat] = {};
  difficulties.forEach(diff => {
    const count = allQuestions.filter(q => q.category === cat && q.difficulty === diff).length;
    table[cat][diff] = count;
    if (count !== 15) {
      allPass = false;
    }
  });
});

console.table(table);

if (!allPass) {
  console.error('ERROR: Not all buckets have exactly 15 questions!');
  process.exit(1);
}

console.log('Verification PASSED! All 18 buckets have exactly 15 questions (total 270 questions).');

// Format the TypeScript code
const tsContent = `export interface QuizQuestion {
  id: string;
  category: string;
  difficulty: 'Foundation' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  citation: string;
  tags: string[];
}

export const CURATED_QUIZ_BANK: QuizQuestion[] = ${JSON.stringify(allQuestions, null, 2)};
`;

const targetPath = path.join(__dirname, '../src/data/quizBank.ts');
fs.writeFileSync(targetPath, tsContent, 'utf8');
console.log('Successfully written to', targetPath);

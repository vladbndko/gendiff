import fs from 'fs';
import genDiff from '../src/genDiff';
// import buildDiff from '../src/buildDiff';
// import parse from '../src/parsers';

/* test('Build ast', () => {
  const before = `${__dirname}/fixtures/json/before.json`;
  const after = `${__dirname}/fixtures/json/after.json`;
  const beforeObject = parse(before);
  const afterObject = parse(after);
  const diff = buildDiff(beforeObject, afterObject);
  const result = fs.readFileSync(`${__dirname}/fixtures/diff-ast.json`, 'utf-8');
  expect(JSON.stringify(diff)).toBe(result);
  // buildDiff
}); */

test('GenDiff', () => {
  const before = `${__dirname}/fixtures/json/before.json`;
  const after = `${__dirname}/fixtures/json/after.json`;
  const result = fs.readFileSync(`${__dirname}/fixtures/result-diff.txt`, 'utf-8');
  expect(genDiff(before, after, 'pretty')).toBe(result);
});

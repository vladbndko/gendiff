import fs from 'fs';
import genDiff from '../src/genDiff';

test('GenDiff: json', () => {
  const before = `${__dirname}/fixtures/json/before.json`;
  const after = `${__dirname}/fixtures/json/after.json`;
  const result = fs.readFileSync(`${__dirname}/fixtures/result-diff.txt`, 'utf-8');
  expect(genDiff(before, after, 'pretty')).toBe(result);
});

test('GenDiff: yml', () => {
  const before = `${__dirname}/fixtures/yaml/before.yaml`;
  const after = `${__dirname}/fixtures/yaml/after.yaml`;
  const result = fs.readFileSync(`${__dirname}/fixtures/result-diff.txt`, 'utf-8');
  expect(genDiff(before, after, 'pretty')).toBe(result);
});

test('GenDiff: ini', () => {
  const before = `${__dirname}/fixtures/ini/before.ini`;
  const after = `${__dirname}/fixtures/ini/after.ini`;
  const result = fs.readFileSync(`${__dirname}/fixtures/result-diff.txt`, 'utf-8');
  expect(genDiff(before, after, 'pretty')).toBe(result);
});

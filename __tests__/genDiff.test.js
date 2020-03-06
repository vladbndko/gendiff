import fs from 'fs';
import genDiff from '../src/genDiff';

const pretty = fs.readFileSync(`${__dirname}/fixtures/diff-pretty.txt`, 'utf-8');
const plain = fs.readFileSync(`${__dirname}/fixtures/diff-plain.txt`, 'utf-8');

describe('GenDiff: JSON', () => {
  const before = `${__dirname}/fixtures/json/before.json`;
  const after = `${__dirname}/fixtures/json/after.json`;
  test('Pretty', () => {
    expect(genDiff(before, after)).toBe(pretty);
  });
  test('Plain', () => {
    expect(genDiff(before, after, 'plain')).toBe(plain);
  });
});

describe('GenDiff: YAML', () => {
  const before = `${__dirname}/fixtures/yaml/before.yaml`;
  const after = `${__dirname}/fixtures/yaml/after.yaml`;
  test('Pretty', () => {
    expect(genDiff(before, after)).toBe(pretty);
  });
  test('Plain', () => {
    expect(genDiff(before, after, 'plain')).toBe(plain);
  });
});

describe('GenDiff: INI', () => {
  const before = `${__dirname}/fixtures/ini/before.ini`;
  const after = `${__dirname}/fixtures/ini/after.ini`;
  test('Pretty', () => {
    expect(genDiff(before, after)).toBe(pretty);
  });
  test('Plain', () => {
    expect(genDiff(before, after, 'plain')).toBe(plain);
  });
});

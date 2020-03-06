import fs from 'fs';
import genDiff from '../src/genDiff';

const pretty = fs.readFileSync(`${__dirname}/fixtures/diff-pretty.txt`, 'utf-8');
const plain = fs.readFileSync(`${__dirname}/fixtures/diff-plain.txt`, 'utf-8');
const json = fs.readFileSync(`${__dirname}/fixtures/diff-json.txt`, 'utf-8');

describe('json', () => {
  const before = `${__dirname}/fixtures/json/before.json`;
  const after = `${__dirname}/fixtures/json/after.json`;
  test('Pretty', () => {
    expect(genDiff(before, after)).toBe(pretty);
  });
  test('Plain', () => {
    expect(genDiff(before, after, 'plain')).toBe(plain);
  });
  test('Json', () => {
    expect(genDiff(before, after, 'json')).toBe(json);
  });
});

describe('yaml', () => {
  const before = `${__dirname}/fixtures/yaml/before.yaml`;
  const after = `${__dirname}/fixtures/yaml/after.yaml`;
  test('Pretty', () => {
    expect(genDiff(before, after)).toBe(pretty);
  });
  test('Plain', () => {
    expect(genDiff(before, after, 'plain')).toBe(plain);
  });
  test('Json', () => {
    expect(genDiff(before, after, 'json')).toBe(json);
  });
});

describe('ini', () => {
  const before = `${__dirname}/fixtures/ini/before.ini`;
  const after = `${__dirname}/fixtures/ini/after.ini`;
  test('Pretty', () => {
    expect(genDiff(before, after)).toBe(pretty);
  });
  test('Plain', () => {
    expect(genDiff(before, after, 'plain')).toBe(plain);
  });
  test('Json', () => {
    expect(genDiff(before, after, 'json')).toBe(json);
  });
});

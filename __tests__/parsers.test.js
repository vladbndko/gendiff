import fs from 'fs';
import yaml from 'js-yaml';
import parse from '../src/parsers';

const beforeJson = `${__dirname}/fixtures/before.json`;
const afterJson = `${__dirname}/fixtures/after.json`;
const beforeYml = `${__dirname}/fixtures/before.yml`;
const afterYml = `${__dirname}/fixtures/after.yml`;

test('JSON', () => {
  expect(parse(beforeJson)).toStrictEqual(JSON.parse(fs.readFileSync(beforeJson, 'utf-8')));
  expect(parse(afterJson)).toStrictEqual(JSON.parse(fs.readFileSync(afterJson, 'utf-8')));
});

test('YAML', () => {
  expect(parse(beforeYml)).toStrictEqual(yaml.safeLoad(fs.readFileSync(beforeYml, 'utf-8')));
  expect(parse(afterYml)).toStrictEqual(yaml.safeLoad(fs.readFileSync(afterYml, 'utf-8')));
});

import genDiff from '../src/gendiff';

const diffJson = genDiff(`${__dirname}/fixtures/before.json`, `${__dirname}/fixtures/after.json`);
const diffYml = genDiff(`${__dirname}/fixtures/before.yml`, `${__dirname}/fixtures/after.yml`);
const diffIni = genDiff(`${__dirname}/fixtures/before.ini`, `${__dirname}/fixtures/after.ini`);

const result = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: verbose
}`;

test('genDiff: JSON', () => {
  expect(diffJson).toStrictEqual(result);
});

test('genDiff: YML', () => {
  expect(diffYml).toStrictEqual(result);
});

test('genDiff: INI', () => {
  expect(diffIni).toStrictEqual(result);
});

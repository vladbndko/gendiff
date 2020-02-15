import gendiff from '../src/gendiff';

const diff = gendiff((`${__dirname}/fixtures/before.json`), (`${__dirname}/fixtures/after.json`));
const result = `{\n${diff.join('\n')}\n}`;
console.log(result);

const mustBe = `{
    host: hexlet.io
  - timeout: 50
  + timeout: 20
  - proxy: 123.234.53.22
  - follow: false
  + verbose: verbose
}`;

test('gendiff', () => {
  expect(result).toBe(mustBe);
});

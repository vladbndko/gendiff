import buildDiff from '../src/buildDiff';
import parse from '../src/parsers';

const before = parse(`${__dirname}/fixtures/json/before.json`);
const after = parse(`${__dirname}/fixtures/json/after.json`);
test('AST', () => {
  expect(buildDiff(before, after)).toStrictEqual({ a: 1 });
});

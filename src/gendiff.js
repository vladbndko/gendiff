import _ from 'lodash';
import parse from './parsers';

const genDiff = (firstConfig, secondConfig) => {
  const first = parse(firstConfig);
  const second = parse(secondConfig);
  const unionJson = { ...first, ...second };
  const result = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of Object.entries(unionJson)) {
    if (_.has(first, key) && _.has(second, key)) {
      if (first[key] === second[key]) {
        result.push(`    ${key}: ${value}`);
      } else {
        result.push(`  - ${key}: ${first[key]}`);
        result.push(`  + ${key}: ${value}`);
      }
    } else if (_.has(first, key) && !_.has(second, key)) {
      result.push(`  - ${key}: ${first[key]}`);
    } else {
      result.push(`  + ${key}: ${key}`);
    }
  }
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;

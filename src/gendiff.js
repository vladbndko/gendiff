import parse from './parsers';
import buildDiff from './buildDiff';

const genDiff = (firstConfig, secondConfig) => {
  const beforeObject = parse(firstConfig);
  const afterObject = parse(secondConfig);
  return buildDiff(beforeObject, afterObject);
};

export default genDiff;

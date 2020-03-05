import parse from './parsers';
import buildDiff from './buildDiff';
import render from './render';

const genDiff = (firstConfig, secondConfig, format) => {
  const beforeObject = parse(firstConfig);
  const afterObject = parse(secondConfig);
  const diff = buildDiff(beforeObject, afterObject);
  return render(diff, format);
};

export default genDiff;

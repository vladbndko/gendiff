import parse from './formatters';
import buildDiff from './buildDiff';
import render from './render';

const genDiff = (firstConfig, secondConfig, format = 'pretty') => {
  const beforeObject = parse(firstConfig);
  const afterObject = parse(secondConfig);
  const diff = buildDiff(beforeObject, afterObject);
  return render(diff, format);
};

export default genDiff;

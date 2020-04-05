import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';
import render from './formatters';

const makeDiff = (before, after) => {
  const keys = _.union(_.keys(before), _.keys(after));
  return keys.map((key) => {
    if (_.has(before, key) && !_.has(after, key)) {
      return { key, status: 'deleted', value: before[key] };
    }
    if (!_.has(before, key) && _.has(after, key)) {
      return { key, status: 'added', value: after[key] };
    }
    if (_.has(before, key) && _.has(after, key)
      && _.isObject(before[key]) && _.isObject(after[key])) {
      return { key, status: 'hasChildren', children: makeDiff(before[key], after[key]) };
    }
    if (_.has(after, key) && _.has(before, key) && before[key] !== after[key]) {
      return {
        key, status: 'changed', oldValue: before[key], value: after[key],
      };
    }
    return { key, status: 'unchanged', value: after[key] };
  });
};

const getData = (filePath) => {
  const dataType = path.extname(filePath).replace('.', '');
  const data = fs.readFileSync(filePath, 'utf8');
  return parse(dataType, data);
};

const genDiff = (firstFilePath, secondFilePath, format = 'pretty') => {
  const firstFile = getData(firstFilePath);
  const secondFile = getData(secondFilePath);
  const diff = makeDiff(firstFile, secondFile);
  return render(diff, format);
};

export default genDiff;

import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';
import render from './formatters';

const makeDiff = (obj1, obj2) => {
  const uniqKeys = _.uniq([..._.keys(obj1), ..._.keys(obj2)]);
  const iter = (key) => {
    const node = { key };
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      node.status = 'deleted';
      node.value = obj1[key];
    } else if (!_.has(obj1, key) && _.has(obj2, key)) {
      node.status = 'added';
      node.value = obj2[key];
    } else if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        node.status = 'hasChildren';
        node.children = makeDiff(obj1[key], obj2[key]);
      } else if (obj1[key] !== obj2[key]) {
        node.status = 'changed';
        node.oldValue = obj1[key];
        node.value = obj2[key];
      } else {
        node.status = 'unchanged';
        node.value = obj2[key];
      }
    }
    return node;
  };
  return uniqKeys.map(iter);
};

const getData = (config) => {
  const dataType = path.extname(config).replace('.', '');
  const data = fs.readFileSync(config, 'utf8');
  return parse(dataType, data);
};

const genDiff = (firstConfig, secondConfig, format = 'pretty') => {
  const beforeData = getData(firstConfig);
  const afterData = getData(secondConfig);
  const diff = makeDiff(beforeData, afterData);
  return render(diff, format);
};

export default genDiff;

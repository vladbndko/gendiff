import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parse from './parse';
import render from './formatters';

const makeDiff = (obj1, obj2) => {
  const unionObj = { ...obj1, ...obj2 };
  return Object.keys(unionObj).reduce((acc, key) => {
    const option = {
      key,
      status: 'unchanged',
    };
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      option.beforeValue = obj1[key];
      option.status = 'deleted';
    } else if (!_.has(obj1, key) && _.has(obj2, key)) {
      option.afterValue = obj2[key];
      option.status = 'added';
    } else if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        option.children = makeDiff(obj1[key], obj2[key]);
      } else {
        option.beforeValue = obj1[key];
        option.afterValue = obj2[key];
        if (obj1[key] !== obj2[key]) {
          option.status = 'changed';
        }
      }
    }
    return [...acc, option];
  }, []);
};

const getData = (config) => {
  const dataType = path.extname(config).replace('.', '');
  const data = fs.readFileSync(config, 'utf8');
  return parse(dataType, data);
};

export default (firstConfig, secondConfig, format = 'pretty') => {
  const beforeData = getData(firstConfig);
  const afterData = getData(secondConfig);
  const diff = makeDiff(beforeData, afterData);
  return render(diff, format);
};

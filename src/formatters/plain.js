import _ from 'lodash';
import isNumeric from '../utils';

const renderType = (value) => {
  if (isNumeric(value)) {
    return Number(value);
  }
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, parents = []) => {
  const result = diff.reduce((acc, option) => {
    if (_.has(option, 'children')) {
      return [...acc, plain(option.children, [...parents, option.key])];
    }
    if (option.status === 'unchanged') {
      return acc;
    }
    const afterValue = renderType(option.afterValue);
    const beforeValue = renderType(option.beforeValue);
    const line = {
      head: `Property '${[...parents, option.key].join('.')}' was`,
    };
    if (option.status === 'added') {
      line.tail = `added with value: ${afterValue}`;
    }
    if (option.status === 'deleted') {
      line.tail = 'deleted';
    }
    if (option.status === 'changed') {
      line.tail = `changed from ${beforeValue} to ${afterValue}`;
    }
    return [...acc, `${line.head} ${line.tail}`];
  }, []);
  return _.flattenDeep(result).join('\n');
};

export default plain;

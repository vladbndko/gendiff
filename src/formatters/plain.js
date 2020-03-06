import _ from 'lodash';
import isAllNumbers from '../utilities';

const plain = (diff, parent = []) => {
  const result = diff.reduce((acc, option) => {
    if (_.has(option, 'children')) {
      return [...acc, plain(option.children, [...parent, option.key])];
    }
    if (option.status === 'unchanged') {
      return acc;
    }
    const line = {
      head: `Property '${[...parent, option.key].join('.')}' was`,
    };
    let afterValue = _.isObject(option.afterValue) ? '[complex value]' : option.afterValue;
    let beforeValue = _.isObject(option.beforeValue) ? '[complex value]' : option.beforeValue;
    afterValue = _.isString(option.afterValue) && !isAllNumbers(afterValue) ? `'${afterValue}'` : afterValue;
    beforeValue = _.isString(option.beforeValue) && !isAllNumbers(beforeValue) ? `'${beforeValue}'` : beforeValue;
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

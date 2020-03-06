import _ from 'lodash';

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
    const regNumbers = /^[0-9]*$/;
    afterValue = _.isString(option.afterValue) && !afterValue.match(regNumbers) ? `'${afterValue}'` : afterValue;
    beforeValue = _.isString(option.beforeValue) && !beforeValue.match(regNumbers) ? `'${beforeValue}'` : beforeValue;
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

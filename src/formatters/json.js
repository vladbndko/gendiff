import _ from 'lodash';
import isAllNumbers from '../utilities';

const objItem = (obj) => {
  _.forIn(obj, (value, key) => {
    if (_.isString(value)) {
      if (isAllNumbers(value)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = Number(value);
      }
    }
  });
  return obj;
};

const replaceNumbers = (arr) => arr.map((option) => {
  if (_.has(option, 'children')) {
    const { children, ...rest } = option;
    const newChildren = replaceNumbers(children);
    return { ...rest, children: newChildren };
  }
  let newOption = {};
  Object.entries(option).forEach(([key, value]) => {
    let newValue = _.isObject(value) ? objItem(value) : value;
    if (_.isString(newValue)) {
      if (isAllNumbers(newValue)) {
        newValue = Number(newValue);
      }
    }
    newOption = { ...newOption, [key]: newValue };
  });
  return newOption;
});

export default (diff) => {
  const result = replaceNumbers(diff);
  return JSON.stringify(result, null, 2);
};

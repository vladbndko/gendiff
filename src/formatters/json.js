import _ from 'lodash';
import isAllNumbers from '../utilities';

const iter = (obj) => {
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
  const iterObj = {
    newValue: '',
    newOption: {},
  };
  Object.entries(option).forEach(([key, value]) => {
    iterObj.newValue = _.isObject(value) ? iter(value) : value;
    if (_.isString(iterObj.newValue)) {
      if (isAllNumbers(iterObj.newValue)) {
        iterObj.newValue = Number(iterObj.newValue);
      }
    }
    iterObj.newOption = { ...iterObj.newOption, [key]: iterObj.newValue };
  });
  return iterObj.newOption;
});

export default (diff) => {
  const result = replaceNumbers(diff);
  return JSON.stringify(result, null, 2);
};

import _ from 'lodash';

const iter = (obj) => {
  const newObj = { ...obj };
  _.forIn(obj, (value, key) => {
    if (_.isString(value) && _.clamp(value)) {
      newObj[key] = Number(value);
    }
  });
  return newObj;
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
    if (_.isString(iterObj.newValue) && _.clamp(iterObj.newValue)) {
      iterObj.newValue = Number(iterObj.newValue);
    }
    iterObj.newOption = { ...iterObj.newOption, [key]: iterObj.newValue };
  });
  return iterObj.newOption;
});

export default (diff) => {
  // const result = replaceNumbers(diff);
  return JSON.stringify(diff, null, 2);
};

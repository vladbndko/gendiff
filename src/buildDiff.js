import _ from 'lodash';

const buildAst = (obj1, obj2) => {
  const unionObj = { ...obj1, ...obj2 };
  return Object.keys(unionObj).reduce((acc, key) => {
    const option = {
      key,
      status: 'unchanged',
    };
    if (_.has(obj1, key) && !_.has(obj2, key)) {
      option.afterValue = obj1[key];
      option.status = 'deleted';
    } else if (!_.has(obj1, key) && _.has(obj2, key)) {
      option.beforeValue = obj2[key];
      option.status = 'added';
    } else if (_.has(obj1, key) && _.has(obj2, key)) {
      if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
        option.children = buildAst(obj1[key], obj2[key]);
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

export default buildAst;

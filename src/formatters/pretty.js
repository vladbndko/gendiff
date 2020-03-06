import _ from 'lodash';

const signs = {
  unchanged: ' ',
  added: '+',
  changed: '+',
  deleted: '-',
};

const stringify = (obj, spaceCount) => {
  const result = Object.entries(obj).reduce((acc, [key, value]) => [...acc, `${' '.repeat(spaceCount + 4)}${key}: ${value}`], []);
  return `{\n${result.join('\n')}\n${' '.repeat(spaceCount)}}`;
};

const pretty = (diff, spacesCount = 0) => {
  const result = diff.reduce((acc, option) => {
    const sign = signs[option.status];
    const diffOption = {
      begin: `${' '.repeat(spacesCount + 2)}${sign} ${option.key}`,
      before: '',
    };
    if (_.has(option, 'afterValue') && _.has(option, 'beforeValue')) {
      if (option.beforeValue === option.afterValue) {
        diffOption.value = option.afterValue;
      } else {
        let stringBefore;
        if (_.isObject(option.beforeValue)) {
          stringBefore = stringify(option.beforeValue, spacesCount + 4);
        }
        diffOption.before = `${' '.repeat(spacesCount + 2)}${signs.deleted} ${option.key}: ${stringBefore || option.beforeValue}`;
        diffOption.value = option.afterValue;
      }
    } else if (_.has(option, 'afterValue') && !_.has(option, 'beforeValue')) {
      diffOption.value = option.afterValue;
    } else if (!_.has(option, 'afterValue') && _.has(option, 'beforeValue')) {
      diffOption.value = option.beforeValue;
    } else if (_.has(option, 'children')) {
      diffOption.value = pretty(option.children, spacesCount + 4);
    }
    let stringValue;
    if (_.isObject(diffOption.value)) {
      stringValue = stringify(diffOption.value, spacesCount + 4);
    }
    const newAcc = [...acc, `${diffOption.before}`, `${diffOption.begin}: ${stringValue || diffOption.value}`];
    return newAcc.filter((v) => v);
  }, []);
  return `{\n${result.join('\n')}\n${' '.repeat(spacesCount)}}`;
};

export default pretty;

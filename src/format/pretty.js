import _ from 'lodash';

const signs = {
  unchanged: ' ',
  added: '+',
  changed: '+',
  deleted: '-',
};

const stringify = (obj, spaceCount) => {
  const result = Object.entries(obj).reduce((acc, [key, value]) => [...acc, `${' '.repeat(spaceCount)}${key}: ${value}`], []);
  return `{\n${result.join('\n')}\n${' '.repeat(spaceCount - 4)}}`;
};

const pretty = (diff, spacesCount = 2) => {
  const result = diff.reduce((acc, option) => {
    const offset = signs[option.status];
    const diffOption = {
      begin: `${' '.repeat(spacesCount)}${offset} ${option.key}`,
    };
    if (_.has(option, 'afterValue') && _.has(option, 'beforeValue')) {
      diffOption.value = option.afterValue;
    } else if (_.has(option, 'afterValue') && !_.has(option, 'beforeValue')) {
      diffOption.value = option.afterValue;
    } else if (!_.has(option, 'afterValue') && _.has(option, 'beforeValue')) {
      diffOption.value = option.beforeValue;
    } else if (_.has(option, 'children')) {
      diffOption.value = pretty(option.children, spacesCount + 4);
    }
    let valueStr;
    if (_.isObject(diffOption.value)) {
      valueStr = stringify(diffOption.value, spacesCount * 2);
    }
    return [...acc, `${diffOption.begin}: ${valueStr || diffOption.value}`];
  }, []);
  console.log(`{\n${result.join('\n')}\n}`);
  return `{\n${result.join('\n')}\n${' '.repeat(spacesCount - 2)}}`;
};

export default pretty;

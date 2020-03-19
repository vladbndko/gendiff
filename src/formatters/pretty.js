import _ from 'lodash';

const signs = {
  unchanged: ' ',
  hasChildren: ' ',
  added: '+',
  changed: '-',
  deleted: '-',
};

const stringify = (obj, spaces) => {
  const result = Object.entries(obj).reduce((acc, [key, value]) => [...acc, `${' '.repeat(spaces + 4)}${key}: ${value}`], []);
  return `{\n${result.join('\n')}\n${' '.repeat(spaces)}}`;
};

const pretty = (diff, spaces = 0) => {
  const iter = (node) => {
    const genValue = (value) => (_.isObject(value) ? stringify(value, spaces + 4) : value);
    const genHead = (sign) => `${' '.repeat(spaces + 2)}${signs[sign]} ${node.key}`;
    const nodes = {
      unchanged: () => `${genHead(node.status)}: ${genValue(node.value)}`,
      hasChildren: () => `${genHead(node.status)}: ${pretty(node.children, spaces + 4)}`,
      added: () => `${genHead(node.status)}: ${genValue(node.value)}`,
      changed: () => `${genHead(node.status)}: ${genValue(node.oldValue)}\n${genHead('added')}: ${genValue(node.value)}`,
      deleted: () => `${genHead(node.status)}: ${genValue(node.value)}`,
    };
    return nodes[node.status]();
  };
  const resultArr = diff.map(iter);
  return `{\n${resultArr.join('\n')}\n${' '.repeat(spaces)}}`;
};

export default pretty;

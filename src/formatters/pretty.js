import _ from 'lodash';

const makeIndent = (deep) => ' '.repeat(deep * 4);

const stringify = (value, deep) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.keys(value).map((key) => `${makeIndent(deep + 1)}${key}: ${value[key]}`);
  return `{\n${result}\n${makeIndent(deep)}}`;
};

const nodeTypes = {
  unchanged: (node, deep) => `${makeIndent(deep)}    ${node.key}: ${stringify(node.value, deep + 1)}`,
  hasChildren: (node, deep, f) => `${makeIndent(deep)}    ${node.key}: ${f(node.children, deep + 1)}`,
  added: (node, deep) => `${makeIndent(deep)}  + ${node.key}: ${stringify(node.value, deep + 1)}`,
  changed: (node, deep) => [
    `${makeIndent(deep)}  - ${node.key}: ${stringify(node.oldValue, deep + 1)}`,
    `${makeIndent(deep)}  + ${node.key}: ${stringify(node.value, deep + 1)}`,
  ].join('\n'),
  deleted: (node, deep) => `${makeIndent(deep)}  - ${node.key}: ${stringify(node.value, deep + 1)}`,
};

const pretty = (diff) => {
  const iter = (nodes, deep) => {
    const result = nodes.map((node) => nodeTypes[node.status](node, deep, iter));
    return `{\n${_.flatten(result).join('\n')}\n${makeIndent(deep)}}`;
  };
  return iter(diff, 0);
};

export default pretty;

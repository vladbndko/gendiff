import _ from 'lodash';

const makeIndent = (depth) => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (!_.isObject(value)) {
    return value;
  }
  const result = _.keys(value).map((key) => `${makeIndent(depth + 1)}${key}: ${value[key]}`);
  return `{\n${result}\n${makeIndent(depth)}}`;
};

const nodeTypes = {
  unchanged: (node, depth) => `${makeIndent(depth)}    ${node.key}: ${stringify(node.value, depth + 1)}`,
  hasChildren: (node, depth, f) => `${makeIndent(depth)}    ${node.key}: ${f(node.children, depth + 1)}`,
  added: (node, depth) => `${makeIndent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
  changed: (node, depth) => [
    `${makeIndent(depth)}  - ${node.key}: ${stringify(node.oldValue, depth + 1)}`,
    `${makeIndent(depth)}  + ${node.key}: ${stringify(node.value, depth + 1)}`,
  ].join('\n'),
  deleted: (node, depth) => `${makeIndent(depth)}  - ${node.key}: ${stringify(node.value, depth + 1)}`,
};

const pretty = (diff) => {
  const iter = (nodes, depth) => {
    const result = nodes.map((node) => nodeTypes[node.status](node, depth, iter));
    return `{\n${_.flatten(result).join('\n')}\n${makeIndent(depth)}}`;
  };
  return iter(diff, 0);
};

export default pretty;

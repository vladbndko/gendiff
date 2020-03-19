import _ from 'lodash';

const renderType = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, parents = []) => {
  const iter = (node) => {
    const genHead = (key) => `Property '${[...parents, key].join('.')}'`;
    const nodes = {
      unchanged: () => false,
      hasChildren: () => plain(node.children, [...parents, node.key]),
      added: () => `${genHead(node.key)} was added with value: ${renderType(node.value)}`,
      changed: () => `${genHead(node.key)} was changed from ${renderType(node.oldValue)} to ${renderType(node.value)}`,
      deleted: () => `${genHead(node.key)} was deleted`,
    };
    return nodes[node.status]();
  };
  return _.flattenDeep(diff.map(iter).filter((n) => n)).join('\n');
};

export default plain;

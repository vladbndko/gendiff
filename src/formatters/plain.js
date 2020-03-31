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
    const nodes = {
      unchanged: () => null,
      hasChildren: () => plain(node.children, [...parents, node.key]),
      added: () => `Property '${[...parents, node.key].join('.')}' was added with value: ${renderType(node.value)}`,
      changed: () => `Property '${[...parents, node.key].join('.')}' was changed from ${renderType(node.oldValue)} to ${renderType(node.value)}`,
      deleted: () => `Property '${[...parents, node.key].join('.')}' was deleted`,
    };
    return nodes[node.status]();
  };
  return _.flattenDeep(diff.map(iter).filter((n) => n)).join('\n');
};

export default plain;

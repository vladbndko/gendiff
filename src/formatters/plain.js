import _ from 'lodash';

const stringify = (value) => {
  if (_.isString(value)) {
    return `'${value}'`;
  }
  if (_.isObject(value)) {
    return '[complex value]';
  }
  return value;
};

const nodeTypes = {
  unchanged: () => null,
  hasChildren: (node, parents, f) => f(node.children, [...parents, node.key]),
  added: (node, parents) => `Property '${[...parents, node.key].join('.')}' was added with value: ${stringify(node.value)}`,
  changed: (node, parents) => `Property '${[...parents, node.key].join('.')}' was changed from ${stringify(node.oldValue)} to ${stringify(node.value)}`,
  deleted: (node, parents) => `Property '${[...parents, node.key].join('.')}' was deleted`,
};

const plain = (diff) => {
  const iter = (nodes, parents) => {
    const result = nodes.map((node) => nodeTypes[node.status](node, parents, iter));
    return _.flattenDeep(result.filter((n) => n)).join('\n');
  };
  return iter(diff, []);
};

export default plain;

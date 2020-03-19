export default [
  {
    key: 'common',
    status: 'hasChildren',
    children: [
      {
        key: 'setting1',
        status: 'unchanged',
        value: 'Value 1',
      },
      {
        key: 'setting2',
        status: 'changed',
        oldValue: '200',
        value: {
          new: 'good',
        },
      },
      {
        key: 'setting3',
        status: 'changed',
        oldValue: true,
        value: {
          key: 'value',
        },
      },
      {
        key: 'setting6',
        status: 'hasChildren',
        children: [
          {
            key: 'key',
            status: 'unchanged',
            value: 'value',
          },
          {
            key: 'ops',
            status: 'added',
            value: 'vops',
          },
        ],
      },
      {
        key: 'follow',
        status: 'added',
        value: false,
      },
      {
        key: 'setting4',
        status: 'added',
        value: 'blah blah',
      },
      {
        key: 'setting5',
        status: 'added',
        value: {
          key5: 'value5',
        },
      },
    ],
  },
  {
    key: 'group1',
    status: 'hasChildren',
    children: [
      {
        key: 'baz',
        status: 'changed',
        oldValue: 'bas',
        value: 'bars',
      },
      {
        key: 'foo',
        status: 'unchanged',
        value: 'bar',
      },
      {
        key: 'nest',
        status: 'changed',
        oldValue: {
          key: 'value',
        },
        value: 'str',
      },
    ],
  },
  {
    key: 'group2',
    status: 'deleted',
    value: {
      abc: '12345',
    },
  },
  {
    key: 'group3',
    status: 'added',
    value: {
      fee: '100500',
    },
  },
];

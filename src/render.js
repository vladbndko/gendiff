import pretty from './formatters/pretty';
import json from './formatters/json';
import plain from './formatters/plain';

const render = (diff, format) => {
  const renders = { pretty, json, plain };
  return renders[format](diff);
};

export default render;

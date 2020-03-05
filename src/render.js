import pretty from './format/pretty';
import json from './format/json';
import plain from './format/plain';

const render = (diff, format) => {
  const renders = { pretty, json, plain };
  return renders[format](diff);
};

export default render;

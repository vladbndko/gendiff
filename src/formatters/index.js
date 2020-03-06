import pretty from './pretty';
import json from './json';
import plain from './plain';

export default (diff, format) => {
  const renders = { pretty, json, plain };
  return renders[format](diff);
};

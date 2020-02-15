import path from 'path';
import yaml from 'js-yaml';
import fs from 'fs';

const getExtName = (file) => path.extname(file);

const parse = (file) => {
  const extName = getExtName(file);
  const content = fs.readFileSync(file, 'utf8');
  switch (extName) {
    case '.json':
      return JSON.parse(content);
    case '.yml':
    case '.yaml':
      return yaml.load(content);
    default:
      return content;
  }
};

export default parse;

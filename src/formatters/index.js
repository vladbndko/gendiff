import path from 'path';
import yaml from 'js-yaml';
import ini from 'ini';
import fs from 'fs';

const parse = (file) => {
  const extName = path.extname(file).replace('.', '');
  const content = fs.readFileSync(file, 'utf8');
  const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    ini: ini.parse,
  };
  return parsers[extName](content);
};

export default parse;

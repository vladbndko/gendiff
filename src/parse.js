import yaml from 'js-yaml';
import ini from 'ini';

export default (extension, content) => {
  const parsers = {
    json: JSON.parse,
    yaml: yaml.load,
    ini: ini.parse,
  };
  return parsers[extension](content);
};

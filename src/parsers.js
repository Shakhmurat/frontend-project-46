import yaml from 'js-yaml';

export default (data, format) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  }

  return JSON.parse(data);
};

import yaml from 'js-yaml';

export default (data, format) => {
  if (format === '.yml' || format === '.yaml') {
    return yaml.load(data);
  } else if (format === '.json') {
    return JSON.parse(data);
  }
}
import yaml from 'js-yaml';

export default (data, extension) => {
  switch (extension) {
    case '.yml':
    case '.yaml':
      return yaml.load(data);
    case '.json':
      return JSON.parse(data);
    default:
      throw new Error(`Unknown extension ${extension}`);
  }
};

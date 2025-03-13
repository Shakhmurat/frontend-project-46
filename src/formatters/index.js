import toStylish from './stylish.js';
import toPlain from './plain.js';
import toJSON from './json.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return toPlain(diff);
    case 'stylish':
      return toStylish(diff);
    case 'json':
      return toJSON(diff);
    default:
      throw new Error(`Unknown format name '${formatName}'.`);
  }
};

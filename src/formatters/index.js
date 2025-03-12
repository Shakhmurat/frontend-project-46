import makeStylish from './stylish.js';
import makePlain from './plain.js';

export default (diff, formatName) => {
  switch (formatName) {
    case 'plain':
      return makePlain(diff);
    case 'stylish':
      return makeStylish(diff);
    default:
      throw new Error(`Unknown format name '${formatName}'.`);
  }
};

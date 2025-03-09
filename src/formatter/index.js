import makeStylish from './stylish.js';

export default (diff, format = 'stylish') => {
  switch (format) {
    case 'future case':
      return 'future resul';
    default:
      return makeStylish(diff);
  }
};

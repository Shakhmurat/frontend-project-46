import { isPlainObject } from 'lodash-es';
import {
  added,
  deleted,
  updated,
  unchanged,
  nested,
} from '../types.js';

const normalizeValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }

  if (isPlainObject(value)) {
    return '[complex value]';
  }

  return value;
};

const describeChange = (value, type) => {
  switch (type) {
    case added:
      return `added with value: ${normalizeValue(value)}`;
    case deleted:
      return 'removed';
    case updated: {
      const [oldValue, newValue] = value;
      return `updated. From ${normalizeValue(oldValue)} to ${normalizeValue(newValue)}`;
    }
    default:
      throw new Error(`Unknown type '${type}'.`);
  }
};

export default (diff) => {
  const iter = (node, keyPath = '') => (
    node
      .filter(({ type }) => type !== unchanged)
      .map(({
        key,
        value,
        children,
        type,
      }) => {
        if (type === nested) {
          const currentKeyPath = keyPath ? `${keyPath}.${key}` : key;
          return iter(children, currentKeyPath);
        }

        const fullKeyPath = keyPath ? `'${keyPath}.${key}'` : `'${key}'`;
        return `Property ${fullKeyPath} was ${describeChange(value, type)}\n`;
      })
      .join('')
  );

  return iter(diff).trim();
};

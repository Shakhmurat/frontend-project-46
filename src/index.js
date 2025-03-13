import { readFileSync, writeFileSync } from 'fs';
import { resolve, extname } from 'path';
import {
  union,
  sortBy,
  isPlainObject,
} from 'lodash-es';
import {
  added,
  deleted,
  updated,
  unchanged,
  nested,
} from './types.js';
import parse from './parsers.js';
import formatter from './formatters/index.js';

const getFilePath = (filename) => resolve(process.cwd(), '__fixtures__', filename);
const getFileContent = (filename) => readFileSync(getFilePath(filename), 'utf-8');

const buildNode = (key, value, type) => ({ key, value, type });
const getBuiltNode = (key, data1, data2) => {
  const value1 = data1[key];
  const value2 = data2[key];

  if (!Object.hasOwn(data1, key)) {
    return buildNode(key, value2, added);
  }

  if (!Object.hasOwn(data2, key)) {
    return buildNode(key, value1, deleted);
  }

  if (value1 !== value2) {
    return buildNode(key, [value1, value2], updated);
  }

  return buildNode(key, value1, unchanged);
};

const buildDiff = (data1, data2) => {
  const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));

  return keys.map((key) => {
    if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
      return {
        key,
        children: buildDiff(data1[key], data2[key]),
        type: nested,
      };
    }

    return getBuiltNode(key, data1, data2);
  });
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileContent(filepath1), extname(filepath1));
  const data2 = parse(getFileContent(filepath2), extname(filepath2));
  return formatter(buildDiff(data1, data2), formatName);
};

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

const buildDiff = (data1, data2) => {
  const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));

  return keys.flatMap((key) => {
    if (isPlainObject(data1[key]) && isPlainObject(data2[key])) {
      return {
        key,
        children: buildDiff(data1[key], data2[key]),
        type: nested,
      };
    }

    if (!Object.hasOwn(data1, key)) {
      return { key, value: data2[key], type: added };
    }

    if (!Object.hasOwn(data2, key)) {
      return { key, value: data1[key], type: deleted };
    }

    if (data1[key] !== data2[key]) {
      return [
        {
          key,
          value: [data1[key], data2[key]],
          type: updated,
        },
      ];
    }

    return { key, value: data1[key], type: unchanged };
  });
};

export default (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = parse(getFileContent(filepath1), extname(filepath1));
  const data2 = parse(getFileContent(filepath2), extname(filepath2));
  const diff = buildDiff(data1, data2);
  const result = formatter(diff, formatName);
  writeFileSync(getFilePath('result.txt'), result, 'utf-8');
  return formatter(diff, formatName);
};

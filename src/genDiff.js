import fs from 'fs';
import { resolve, extname } from 'path';
import parse from './parsers.js';
import { union, sortBy } from 'lodash-es'

const getFilePath = (filename) => resolve(process.cwd(), '__fixtures__', filename);
const getFileContent = (filename) => fs.readFileSync(getFilePath(filename), 'utf-8');

export default (filepath1, filepath2) => {
  const data1 = parse(getFileContent(filepath1), extname(filepath1));
  const data2 = parse(getFileContent(filepath2), extname(filepath2));
  const keys = sortBy(union(Object.keys(data1), Object.keys(data2)));
  const result = keys.reduce((acc, key) => {
    if (!Object.hasOwn(data1, key)) {
      acc.push(`+ ${key}: ${data2[key]}`);
    } else if (!Object.hasOwn(data2, key)) {
      acc.push(`- ${key}: ${data1[key]}`);
    } else if (data1[key] !== data2[key]) {
      acc.push(`- ${key}: ${data1[key]}`);
      acc.push(`+ ${key}: ${data2[key]}`);
    } else {
      acc.push(`  ${key}: ${data1[key]}`);
    }

    return acc;
  }, []);

  const diff = result.map((key) => key.padStart(key.length + 2)).join('\n');

  return `{\n${diff}\n}`;
};

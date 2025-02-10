import fs from 'fs';
import path from 'path';

const readFile = (filename) => {
  const filepath = path.resolve(process.cwd(), '__fixtures__', filename);
  const data = fs.readFileSync(filepath, 'utf-8');
  return data;
};

export default (filepath1, filepath2) => {
  const data1 = JSON.parse(readFile(filepath1));
  const data2 = JSON.parse(readFile(filepath2));
  return [data1, data2];
};

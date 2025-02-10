import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, path } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  it('test 1', () => {
    console.log(readFile('file1.json'));
    // expect(actual).toBe(expected);
  });

  it('test 2', () => {
    console.log(genDiff('file1.json', 'file2.json'));
  });
});

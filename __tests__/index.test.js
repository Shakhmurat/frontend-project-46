import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFixtureContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff', () => {
  it('json files without nested keys', () => {
    const actual = genDiff('file1.json', 'file2.json');
    const expected = getFixtureContent('expected.txt');
    expect(actual).toBe(expected);
  });

  it('yaml and json without nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json');
    const expected = getFixtureContent('expected.txt');
    expect(actual).toBe(expected);
  });

  it('yaml files without nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml');
    const expected = getFixtureContent('expected.txt');
    expect(actual).toBe(expected);
  });
});

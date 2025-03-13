import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFixtureContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff when format is stylish', () => {
  const expected = getFixtureContent('expected-stylish.txt');

  it('json files with nested keys', () => {
    const actual = genDiff('file1.json', 'file2.json');
    expect(actual).toBe(expected);
  });

  it('yaml and json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json');
    expect(actual).toBe(expected);
  });

  it('yaml files with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml');
    expect(actual).toBe(expected);
  });
});

describe('genDiff when format is plain', () => {
  const expected = getFixtureContent('expected-plain.txt');

  it('json files with nested keys', () => {
    const actual = genDiff('file1.json', 'file2.json', 'plain');
    expect(actual).toBe(expected);
  });

  it('yaml and json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json', 'plain');
    expect(actual).toBe(expected);
  });

  it('yaml files with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml', 'plain');
    expect(actual).toBe(expected);
  });
});

describe('genDiff when format is json', () => {
  const expected = getFixtureContent('expected-json.txt');

  it('json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml', 'json');
    expect(actual).toBe(expected);
  });

  it('yaml and json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json', 'json');
    expect(actual).toBe(expected);
  });

  it('yaml files with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml', 'json');
    expect(actual).toBe(expected);
  });
});

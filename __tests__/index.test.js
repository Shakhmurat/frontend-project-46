import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const getFixtureContent = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

describe('genDiff when format is stylish', () => {
  it('json files with nested keys', () => {
    const actual = genDiff('file1.json', 'file2.json');
    const expected = getFixtureContent('expected-stylish.txt');
    expect(actual).toBe(expected);
  });

  it('yaml and json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json');
    const expected = getFixtureContent('expected-stylish.txt');
    expect(actual).toBe(expected);
  });

  it('yaml files with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml');
    const expected = getFixtureContent('expected-stylish.txt');
    expect(actual).toBe(expected);
  });
});

describe('genDiff when format is plain', () => {
  it('json files with nested keys', () => {
    const actual = genDiff('file1.json', 'file2.json', 'plain');
    const expected = getFixtureContent('expected-plain.txt');
    expect(actual).toBe(expected);
  });

  it('yaml and json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json', 'plain');
    const expected = getFixtureContent('expected-plain.txt');
    expect(actual).toBe(expected);
  });

  it('yaml files with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml', 'plain');
    const expected = getFixtureContent('expected-plain.txt');
    expect(actual).toBe(expected);
  });
});

describe('genDiff when format is json', () => {
  it('json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml', 'json');
    const expected = getFixtureContent('expected-json.txt');
    expect(actual).toBe(expected);
  });

  it('yaml and json with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.json', 'json');
    const expected = getFixtureContent('expected-json.txt');
    expect(actual).toBe(expected);
  });

  it('yaml files with nested keys', () => {
    const actual = genDiff('file1.yml', 'file2.yaml', 'json');
    const expected = getFixtureContent('expected-json.txt');
    expect(actual).toBe(expected);
  });
});

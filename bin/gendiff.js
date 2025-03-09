#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.0.1')
  .argument('<filepath1>', 'path to first file')
  .argument('<filepath2>', 'path to second file')
  .option('-f, --format [type]', 'output format (default: "stylish")', 'stylish')
  .action((filepath1, filepath2, options) => {
    console.log(genDiff(filepath1, filepath2, options.format));
  });

program.parse();

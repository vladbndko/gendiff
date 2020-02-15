#!/usr/bin/env node
import gendiff from '../gendiff';

const program = require('commander');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const result = gendiff(firstConfig, secondConfig);
    console.log('{');
    console.log(result.join('\n'));
    console.log('}');
  });

program.parse(process.argv);

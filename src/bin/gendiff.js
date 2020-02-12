#!/usr/bin/env node

const program = require('commander');

let firstConfigFile;
let secondConfigFile;

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    firstConfigFile = firstConfig;
    secondConfigFile = secondConfig;
  });

program.parse(process.argv);

console.log(firstConfigFile, secondConfigFile);

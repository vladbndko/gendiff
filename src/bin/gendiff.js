#!/usr/bin/env node

const program = require('commander');
const fs = require('fs');
const _ = require('lodash');

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format')
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const first = JSON.parse(fs.readFileSync(firstConfig, 'utf8'));
    const second = JSON.parse(fs.readFileSync(secondConfig, 'utf8'));
    const unionJson = { ...first, ...second };
    const result = [];
    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(unionJson)) {
      // result.push(`+ ${key}: ${value}`);
      if (_.has(first, key) && _.has(second, key)) {
        if (first[key] === second[key]) {
          result.push(`    ${key}: ${value}`);
        } else {
          result.push(`  - ${key}: ${first[key]}`);
          result.push(`  + ${key}: ${value}`);
        }
      } else if (_.has(first, key) && !_.has(second, key)) {
        result.push(`  - ${key}: ${first[key]}`);
      } else {
        result.push(`  + ${key}: ${key}`);
      }
    }
    console.log('{');
    console.log(result.join('\n'));
    console.log('}');
  });

program.parse(process.argv);

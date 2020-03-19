import fs from 'fs';
import path from 'path';
import genDiff from '..';

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const getFilePaths = (dataTypes) => dataTypes.map((dataType) => [
  getFixturePath(`before.${dataType}`),
  getFixturePath(`after.${dataType}`),
]);

const filePaths = getFilePaths(['json', 'yaml', 'ini']);
const formats = ['pretty', 'plain', 'json'];

const getDiff = (format) => readFile(`diff-${format}.txt`);


test.each(filePaths)(
  'genDiff(%s, %s)',
  (before, after) => {
    formats.forEach((format) => {
      expect(genDiff(before, after, format)).toBe(getDiff(format));
    });
  },
);

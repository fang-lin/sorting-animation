import glob from 'glob';
import * as path from 'path';
const distPath = '../dist';

const list =  glob.sync(`${distPath}/**/*.*`);
const list2 = list.map(file => path.relative(distPath, file));

console.log(list)
console.log(list2)
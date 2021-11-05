const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { stdin: input, stdout: output } = require('process');

const newFilepath = path.join(__dirname, 'text.txt');
const writeToFile = fs.createWriteStream(newFilepath);
const rl = readline.createInterface({ input, output });

console.log('Hi, type or die)!');

rl.on('line', (input) => {
  if(input === 'exit') {
    rl.close();
  }else{
    writeToFile.write(`${input}\n`);
  } 
});

process.on('beforeExit', () => {
  console.log('By! See you soon!');
});

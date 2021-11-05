const fs = require('fs');
const path = require('path');

const stream = new fs.createReadStream(
  path.join(__dirname, 'text.txt'),
  'utf-8'
);

let data = '';

stream.on('data', (partData) => console.log((data += partData).trim()));
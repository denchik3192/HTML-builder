const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const pathToStyles = path.join(__dirname, 'styles');
const pathToDist = path.join(__dirname, 'project-dist');
const pathToBandleFile = path.join(pathToDist, 'bundle.css');

if (pathToBandleFile) {
  fs.writeFile(pathToBandleFile, '', function () {
  });
}

async function checkFiles() {
  try {
    const files = await readdir(pathToStyles, { withFileTypes: true });
    const output = fs.createWriteStream(path.join(pathToDist, 'bundle.css'));
    for (const file of files) {
      let fileExt = path.extname(file.name);
      if (file.isFile() && fileExt === '.css') {
        const stream = new fs.createReadStream(
          path.join(pathToStyles, file.name),
          'utf-8'
        );
        stream.on('data', (partData) => output.write(partData));
        //  console.log((data += partData).trim()));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

checkFiles();

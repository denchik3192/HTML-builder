const fs= require('fs');
const path = require('path');

const pathToFoloderCopy = path.join(__dirname, 'files-copy');
const pathToFoloderFiles = path.join(__dirname, 'files');

fs.mkdir(pathToFoloderCopy, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.readdir(pathToFoloderCopy, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      fs.unlink(path.join(pathToFoloderCopy, file), (err) => {
        if (err) throw err;
      });
    });
  }
});

fs.readdir(pathToFoloderFiles, (err, files) => {
  if (err) console.log(err);
  else {
    files.forEach((file) => {
      fs.copyFile(
        path.join(pathToFoloderFiles, file),
        path.join(pathToFoloderCopy, file), (err) => {
          if (err) throw err;
        }
      );
    });
  }
  console.log('The files have been copied successfully!');
});

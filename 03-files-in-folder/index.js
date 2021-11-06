const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises');

const pathToFoloder = path.join(__dirname, 'secret-folder');

(async () => {
  try {
    const files = await readdir(pathToFoloder, { withFileTypes: true });

    for (const file of files) {
      if (file.isFile()) {
        let fileName = file.name.split('.')[0];
        let fileExt = path.extname(file.name).slice(1);
        let filePath = path.join(pathToFoloder, file.name);
        let kbyte = 1000;

        fs.stat(filePath, function (err, stats) {
          console.log(`${fileName} - ${fileExt} - ${stats.size / kbyte}kb`);
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
})();

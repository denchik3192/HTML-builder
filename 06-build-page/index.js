const fs = require('fs');
const { readdir } = require('fs/promises');
const path = require('path');

const pathToTemplate = path.join(__dirname, 'template.html');
const pathToProjectDist = path.join(__dirname, 'project-dist');
const pathToProjectDistAssets = path.join(pathToProjectDist, 'assets');
const pathToAssets = path.join(__dirname, 'assets');
const pathToStyles = path.join(__dirname, 'styles');
const pathToComponents = path.join(__dirname, 'components');
const pathToDISTHTML = path.join(pathToProjectDist, 'index.html');

fs.mkdir(pathToProjectDist, { recursive: true }, (err) => {
  //make project-dist
  if (err) throw err;
});

fs.readFile(pathToTemplate, 'utf-8', (err, template) => {
  if (err) throw err;
  fs.readdir(pathToComponents, (err, files) => {
    if (err) throw err;

    const fileData = (Idx) => {
      if (Idx >= files.length) return;
      const f = files[Idx];

      fs.readFile(path.join(pathToComponents, f), 'utf-8', (err, file) => {
        if (err) throw err;
        let fileName = f.split('.')[0];
        let braketsTemp = `{{${fileName}}}`;

        template.includes(braketsTemp) 
          ? template = template.replace(new RegExp(`{{${fileName}}}`), `${file}`)
          : template;
        
        fs.writeFile(pathToDISTHTML, template, (err) => {
          fileData(Idx + 1);
          if (err) throw err;
        });
      });
    };
    fileData(0);
  });
});

async function CopyDirectory() {
  try {
    const files = await fs.promises.readdir(pathToAssets, {
      withFileTypes: true,
    });

    fs.mkdir(pathToProjectDistAssets, { recursive: true }, (err) => {
      //make project-dist
      if (err) throw err;
    });

    for (const file of files) {
      if (!file.isFile()) {
        fs.readdir(path.join(pathToAssets, file.name), (err, files) => {
          const folderName = file.name;
          fs.mkdir(
            path.join(pathToProjectDistAssets, folderName),
            { recursive: true },
            (err) => {
              if (err) throw err;
            }
          );

          if (err) console.log(err);
          else {
            files.forEach((file) => {
              fs.copyFile(
                path.join(pathToAssets, path.join(folderName, file)),
                path.join(path.join(pathToProjectDistAssets, folderName), file),
                (err) => {
                  if (err) throw err;
                }
              );
            });
          }
        });
      }
    }
  } catch (err) {
    console.error(err);
  }
}

async function bandleCss() {
  //bandle css styles
  try {
    const files = await readdir(pathToStyles, { withFileTypes: true });
    const output = fs.createWriteStream(
      path.join(pathToProjectDist, 'style.css')
    );
    for (const file of files) {
      let fileExt = path.extname(file.name);
      if (file.isFile() && fileExt === '.css') {
        const stream = new fs.createReadStream(
          path.join(pathToStyles, file.name),
          'utf-8'
        );
        stream.on('data', (partData) => output.write(partData));
      }
    }
  } catch (err) {
    console.error(err);
  }
}

bandleCss();

CopyDirectory();

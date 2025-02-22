import fs from 'fs';

export const walkAllFiles = (path, cb) => {
  const walk = path => {
    const line = fs.readdirSync(path);
    for (let linei = 0; linei < line.length; linei++) {
      const name = line[linei];
      const wholePath = `${path}/${name}`;
      const isDir = fs.statSync(wholePath).isDirectory();

      if (cb(wholePath, name, path, isDir)) continue;

      if (!isDir) continue;

      walk(wholePath);
    }
  };

  walk(path);
};

walkAllFiles('src/front', (filePath, name, path, isDir) => {
  if (name === 'icons') return true;
  if (isDir) return;

  if (!filePath.endsWith('.ts') && !filePath.endsWith('.tsx')) return;
  const content = '' + fs.readFileSync(filePath);
  if (content.match(/^import/)) return;
});

export const replaceFileContent = (path, cb) => fs.writeFileSync(path, cb('' + fs.readFileSync(path)));

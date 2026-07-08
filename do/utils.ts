import fs from 'fs';

export const walkAllFiles = (
  path: string,
  cb: (wholePath: string, name: string, path: string, isDir: boolean) => boolean,
  deep = -1,
) => {
  const walk = (path: string, deep: number) => {
    const line = fs.readdirSync(path);
    for (let linei = 0; linei < line.length; linei++) {
      const name = line[linei];
      const wholePath = `${path}/${name}`;
      const isDir = fs.statSync(wholePath).isDirectory();

      if (cb(wholePath, name, path, isDir)) continue;

      if (!isDir) continue;

      if (deep) walk(wholePath, deep < 0 ? deep : deep - 1);
    }
  };

  walk(path, deep);
};

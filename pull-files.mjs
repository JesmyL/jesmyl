import { exec } from 'child_process';

(async () => {
  const execAsync = stringCommand => {
    return new Promise((res, rej) =>
      exec(stringCommand, error => {
        if (error) rej(error);
        else res();
      }),
    );
  };

  const paths = [
    ['', 'package'],
    ['apps/index', 'schedules'],
    ['', 'bonjour', null],
    ['apps/cm'],
    // ['apps/leader', 'people'],
    // ['apps/leader', 'contexts'],
  ];

  for (const [path, name, ext = 'json'] of paths) {
    const joinPath = listPaths => listPaths.filter(i => i).join('/');

    const nameWithExtOnly = name ? `${name}${ext === null ? '' : `.${ext}`}` : '';
    const serverPath = joinPath([path, nameWithExtOnly || '*.json']);
    const localPath = joinPath([path, '+case', nameWithExtOnly]);

    console.info('TRY LOAD FILE', serverPath, '=>', localPath);

    try {
      await execAsync(`scp -r root@185.244.173.52:/var/www/jesmyl.ru/${serverPath} ./src/back/${localPath}`);

      console.info(`${serverPath} saved!`);
    } catch (error) {
      console.info(`${serverPath} load FAILURE!`);
    }
  }
})();

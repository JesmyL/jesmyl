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
    ['apps/index/schedules'],
    ['apps/index', 'rights'],
    ['apps/index', 'nouns'],
    ['apps/index', 'pronouns'],
    ['apps/cm'],
    ['apps/cm/coms'],
    ['apps/cm/comComments'],
    ['apps/cm/comsInSchEvent'],
    ['apps/cm/comsInSchEventHistory'],
    ['apps/q'],
    ['apps/q/blanks'],
    ['apps/storages/list'],
  ];

  const joinPath = listPaths => listPaths.filter(i => i).join('/');
  const jsonExt = '.json';
  const allJsons = `*${jsonExt}`;

  for (const [path, name, ext = jsonExt] of paths) {
    const nameWithExt = name ? `${name}${ext ?? ''}` : '';
    const serverPath = joinPath([path, nameWithExt || allJsons]);
    const localPath = `./src/back/${joinPath([path, '+case', nameWithExt])}`;

    console.info('TRY LOAD FILE', serverPath, '=>', localPath);

    try {
      await execAsync(`scp -r root@185.244.173.52:/var/www/jesmyl.ru/${serverPath} ${localPath}`);

      console.info(`${serverPath} saved!`);
    } catch (_error) {
      console.info(`${serverPath} load FAILURE!`);
    }
  }

  await execAsync('npm run format-jsons');
})();

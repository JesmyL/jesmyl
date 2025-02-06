import { exec } from 'child_process';
import { build } from 'esbuild';
import file_system from 'fs';

/**
 *
 * @param {{ builtFolder: string; }} front
 * @param {{ targetDir: string; loadToDirFiles: { [serverDir: string]: string[] } }} back
 * @returns
 */
export const deployTheCode = async (front, back) => {
  if (~process.argv.indexOf('--front')) {
    try {
      console.info(`collect known icons`);
      await execAsync('node collect-known-icons.mjs');
      console.info(`collect known icons: finished`);
    } catch (error) {}

    const isIgnoreVersionUpdate = ~process.argv.indexOf('--IVU');

    const files = [`./${front.builtFolder}/*`, ...(isIgnoreVersionUpdate ? [] : ['./src/back/+version.json'])];

    console.info('Files to load: ', files);

    if (~process.argv.indexOf('--IB')) {
      console.info('Sending ignored building');

      await sendFilesOnServer(files, back);

      console.info(`Front files sent without building`);

      return;
    }

    const [num, resetVersion] = await updateVersion(isIgnoreVersionUpdate);

    try {
      console.info(`Build ${num} is running...`);

      await execAsync('npm run build');

      console.info(`...Build ${num} is finished`);
      console.info('Copying files on server');

      await sendFilesOnServer(files, back);

      console.info('Front files sent on server');
    } catch (error) {
      console.error('Build failure');
      resetVersion();
    }
  }

  if (~process.argv.indexOf('--back')) {
    const filePath = 'src/back/back.index';
    console.info('back.index file build is running...');

    await build({
      entryPoints: [`${filePath}.ts`],
      outfile: `${filePath}.js`,
      bundle: true,
      minify: false,
      platform: 'node',
      format: 'cjs',
      keepNames: true,
      minifyWhitespace: true,
      // minifyIdentifiers: true,
      treeShaking: true,

      charset: 'utf8',
      external: ['node-schedule', 'ws', '@prisma/client', '.prisma/client', 'MyLib'],
      // drop: ['console', 'debugger'],
      dropLabels: ['DEV', 'TEST'],
    });

    console.info('...sending back files on server');

    await sendFilesOnServer([`./${filePath}.js`], back);

    if (back.loadToDirFiles != null) {
      const loadToDirFiles = Object.entries(back.loadToDirFiles);

      for (const [targetDir, localFiles] of loadToDirFiles)
        try {
          await sendFilesOnServer(localFiles, { targetDir: `${back.targetDir}/${targetDir}` });
        } catch (e) {
          console.error('XXXXX - load error');
        }
    }

    console.info('Back files sent on server');
  }
};

/**
 *
 * @param {string[]} files
 * @param {{ targetDir: string; }} back
 * @returns
 */
const sendFilesOnServer = (files, back) => {
  console.info('try load files', files);
  return new Promise((res, rej) =>
    exec(`scp -r ${files.join(' ')} root@185.244.173.52:/var/www/${back.targetDir}`, err => {
      if (err) rej(err);
      else res();
    }),
  );
};

const execAsync = stringCommand => {
  return new Promise((res, rej) =>
    exec(stringCommand, error => {
      if (error) rej(error);
      else res();
    }),
  );
};

/**
 *
 * @param {boolean} isIgnoreVersionUpdate
 * @returns
 */
const updateVersion = isIgnoreVersionUpdate => {
  /**
   *
   * @param {string} version
   * @param {() => void} cb
   * @returns
   */
  const setVersion = (version, cb) => file_system.writeFile('src/back/+version.json', version, () => cb?.());

  return new Promise((resolveVersion, rejectVersion) => {
    file_system.readFile('src/back/+version.json', 'utf8', (err, versionStr) => {
      if (err) {
        rejectVersion(err);
        return;
      }

      let { num } = JSON.parse(versionStr);

      if (isIgnoreVersionUpdate) {
        resolveVersion([num, () => {}]);
        return;
      }

      const prevNum = num;
      num++;
      const newNum = JSON.stringify({ num }, null, ' ');

      setVersion(newNum, () =>
        resolveVersion([num, async () => setVersion(JSON.stringify({ num: prevNum }, null, ' '))]),
      );
    });
  });
};

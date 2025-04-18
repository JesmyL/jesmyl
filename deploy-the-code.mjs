import { exec } from 'child_process';
import file_system from 'fs';
import { buildBackIndexFile } from './build-back-index.mjs';

const versionFilePath = 'src/shared/values/+version.json';

/**
 *
 * @param {{ builtFolder: string; }} front
 * @param {{ targetDir: string; loadToDirFiles: { [serverDir: string]: string[] } }} back
 * @returns
 */
export const deployTheCode = async (front, back) => {
  if (~process.argv.indexOf('--front')) {
    const builtFiles = [`./${front.builtFolder}/*`];

    console.info('Files to load: ', builtFiles);

    if (process.argv.includes('--IB')) {
      console.info('Sending ignored building');
      await sendFilesOnServer(builtFiles, back);
      console.info(`Front files sent without building`);

      return;
    }

    const isIgnoreVersionUpdate = process.argv.includes('--IVU');
    const [num, resetVersion] = await updateVersion(isIgnoreVersionUpdate);

    try {
      console.info(`Lint check for v${num} is running...`);
      await execAsync('npm run lint');

      console.info(`Build v${num} is running...`);
      await execAsync('npm run build');

      console.info(`...Build ${num} is finished`);
      console.info('Copying files on server');

      await sendFilesOnServer(builtFiles, back);
      if (!isIgnoreVersionUpdate) await sendFilesOnServer([`./${versionFilePath}`], back);

      console.info('Front files sent on server');
    } catch (error) {
      console.error('Build failure');
      console.error(error);
      resetVersion();
    }
  }

  if (~process.argv.indexOf('--back')) {
    console.info('back.index file build is running...');

    const filePath = await buildBackIndexFile();

    console.info('...sending back files on server');

    await sendFilesOnServer([`./${filePath}.cjs`], back);

    if (back.loadToDirFiles != null) {
      const loadToDirFiles = Object.entries(back.loadToDirFiles);

      for (const [targetDir, localFiles] of loadToDirFiles)
        try {
          await sendFilesOnServer(localFiles, { targetDir: `${back.targetDir}/${targetDir}` });
        } catch (_e) {
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
  const setVersion = (version, cb) => file_system.writeFile(versionFilePath, version, () => cb?.());

  return new Promise((resolveVersion, rejectVersion) => {
    file_system.readFile(versionFilePath, 'utf8', (err, versionStr) => {
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
      const newNum = JSON.stringify({ num }, null, '  ') + '\n';

      setVersion(newNum, () =>
        resolveVersion([num, async () => setVersion(JSON.stringify({ num: prevNum }, null, '  ') + '\n')]),
      );
    });
  });
};

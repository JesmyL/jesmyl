import { exec } from 'child_process';
import file_system from 'fs';
import { hostConfig } from '../freshHostConfig';
import { buildBackIndexFile } from './build-back-index';

const versionFilePath = 'src/shared/values/+version.json';

export const deployTheCode = async (
  front: { builtFolder: string },
  back: { targetDir: string; loadToDirFiles: { [serverDir: string]: string[] } },
) => {
  if (process.argv.includes('-f')) {
    const builtFiles = [`./${front.builtFolder}/*`];

    console.info('Files to load: ', builtFiles);

    if (process.argv.includes('--IB')) {
      console.info('Sending ignored building');
      await sendFilesOnServer(builtFiles, back);
      console.info(`Front files sent without building`);

      return;
    }

    const [num, resetVersion] = await updateVersion(process.argv.includes('--IVU'));

    try {
      console.info(`v${num} ${versionFilePath}`);
      await execAsync('npm run lint');
      await execAsync('npm run test');
      await execAsync('npm run build');

      await sendFilesOnServer(builtFiles, back);
      await sendFilesOnServer([`./${versionFilePath}`], back);

      await execAsync('rm -rf build');
    } catch (error) {
      console.error(error);
      resetVersion();
    }
  }

  if (process.argv.includes('-b')) {
    console.info('back.index file build is running...');

    const filePaths = (await buildBackIndexFile()).map(fileName => `./${fileName}`);

    await sendFilesOnServer(filePaths, back);

    if (back.loadToDirFiles != null) {
      const loadToDirFiles = Object.entries(back.loadToDirFiles);

      for (const [targetDir, localFiles] of loadToDirFiles)
        try {
          await sendFilesOnServer(localFiles, { targetDir: `${back.targetDir}/${targetDir}` });
        } catch (_e) {
          console.error('XXXXX - load error');
        }
    }

    await Promise.all(filePaths.map(filePath => execAsync(`rm ${filePath}`)));
  }
};

const sendFilesOnServer = (files: string[], back: { targetDir: string }) => {
  return execAsync(`scp -r ${files.join(' ')} root@${hostConfig.host}:/var/www/${back.targetDir}`);
};

export const execAsync = (stringCommand: string) => {
  console.info(stringCommand);
  return new Promise((res, rej) =>
    exec(stringCommand, error => {
      if (error) {
        console.error('FAILED', stringCommand);
        rej(error);
      } else {
        console.info('Finished', stringCommand);
        res(0);
      }
    }),
  );
};

const updateVersion = (isIgnoreVersionUpdate: boolean) => {
  const setVersion = (version: string, cb?: () => void) =>
    file_system.writeFile(versionFilePath, version, () => cb?.());

  return new Promise<[number, () => void]>((resolveVersion, rejectVersion) => {
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

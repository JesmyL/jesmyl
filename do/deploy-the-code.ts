import { exec } from 'child_process';
import file_system from 'fs';
import { hostConfig } from '../freshHostConfig';
import { makeGreenLogText, makeRedLogText } from '../src/back/utils.exec';
import { buildBackIndexFile } from './build-back-index';

const versionFilePath = 'src/shared/values/+version.json';

export const deployTheCode = async (
  front: { builtFolder: string },
  back: { targetDir: string; loadToDirFiles: { [serverDir: string]: string[] } },
) => {
  if (process.argv.includes('-f')) {
    if (process.argv.includes('--IB')) {
      console.info('Sending ignored building');
      await deployFrontFiles(front, back);
      console.info(`Front files sent without building`);

      return;
    }

    const [num, resetVersion] = await updateVersion(process.argv.includes('--IVU'));

    try {
      console.info(`v${num} ${versionFilePath}`);
      await execAsync('npm run lint');
      await execAsync('npm run test');
      await execAsync('npm run build');

      await deployFrontFiles(front, back);
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

const getTargetHost = () => `root@${process.env.TARGET_IP || hostConfig.ip}`;

const sendFilesOnServer = (files: string[], back: { targetDir: string }) =>
  execAsync(`scp -r ${files.join(' ')} ${getTargetHost()}:/var/www/${back.targetDir}`);

const deployFrontFiles = async (front: { builtFolder: string }, back: { targetDir: string }) => {
  const builtDir = `./${front.builtFolder}`;
  const entries = file_system.readdirSync(front.builtFolder, { withFileTypes: true });
  const dirs = entries.filter(entry => entry.isDirectory()).map(entry => entry.name);
  const files = entries.filter(entry => entry.isFile()).map(entry => `${builtDir}/${entry.name}`);

  for (const dir of dirs) await swapServerFolder(dir, front, back);

  if (!files.length) return;

  await sendFilesOnServer(files, back);
};

const swapServerFolder = (
  folder: string,
  front: { builtFolder: string },
  back: { targetDir: string },
) => {
  const host = getTargetHost();
  const serverDir = `/var/www/${back.targetDir}`;

  return execAsync(
    `ssh ${host} 'mkdir -p ${serverDir}/${folder}-tmp' && scp -r ./${front.builtFolder}/${folder}/. ${host}:${serverDir}/${folder}-tmp && ssh ${host} 'rm -rf ${serverDir}/${folder} && mv ${serverDir}/${folder}-tmp ${serverDir}/${folder}'`,
  );
};

export const execAsync = (stringCommand: string) => {
  console.info(stringCommand);
  return new Promise((res, rej) =>
    exec(stringCommand, error => {
      if (error) {
        console.error(makeRedLogText('FAILED'), makeRedLogText(stringCommand));
        rej(error);
      } else {
        console.info(makeGreenLogText('Finished'), makeGreenLogText(stringCommand));
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

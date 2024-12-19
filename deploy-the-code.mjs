import { exec } from 'child_process';
import { build } from 'esbuild';
import file_system from 'fs';

export const deployTheCode = async (strFrontBuildFilename, strBackFolder) => {
  if (~process.argv.indexOf('--front')) {
    try {
      console.info(`collect known icons`);
      await execAsync('node collect-known-icons.mjs');
      console.info(`collect known icons: finished`);
    } catch (error) {}

    if (~process.argv.indexOf('--IB')) {
      console.info('Sending ignored building');

      await sendFilesOnServer([`./${strFrontBuildFilename}/*`, './src/back/+version.json'], strBackFolder);

      console.info(`Sent without building`);

      return;
    }

    const [num, resetVersion] = await updateVersion(~process.argv.indexOf('--IVU'));

    try {
      console.info(`Build ${num} is running...`);

      await execAsync('npm run build');

      console.info(`...Build ${num} is finished`);
      console.info('Copying files on server');

      await sendFilesOnServer([`./${strFrontBuildFilename}/*`, './src/back/+version.json'], strBackFolder);
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
      // minifyWhitespace: true,
      // minifyIdentifiers: true,
      treeShaking: true,

      charset: 'utf8',
      external: ['node-schedule', 'ws', '@prisma/client', '.prisma/client', 'MyLib'],
      drop: ['console', 'debugger'],
      dropLabels: ['DEV', 'TEST'],
    });

    console.info('...sending back files on server');

    sendFilesOnServer([`./${filePath}.js`], strBackFolder);
  }
};

const sendFilesOnServer = (arrayOfFiles, strBackFolder) => {
  return new Promise((res, rej) =>
    exec(`scp -r ${arrayOfFiles.join(' ')} root@185.244.173.52:/var/www/${strBackFolder}`, err => {
      if (err) {
        console.error(err);
        rej(err);
      } else {
        console.info('Files loaded on server');
        res();
      }
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

const updateVersion = isIgnoreVersionUpdate => {
  const setVersion = (version, cb) => file_system.writeFile('src/back/+version.json', version, () => cb?.());

  return new Promise((resolveVersion, rejectVersion) => {
    file_system.readFile('src/back/+version.json', 'utf8', (err, versionStr) => {
      if (err) {
        rejectVersion('version not inkremented', err);
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

      setVersion(newNum, resolveVersion([num, async () => setVersion(JSON.stringify({ num: prevNum }, null, ' '))]));
    });
  });
};

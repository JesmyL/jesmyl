import { exec } from 'child_process';
import fs from 'fs';
import { buildBackIndexFile } from './build-back-index.mjs';
import { walkAllFiles } from './utils.mjs';

const errorsToPass = new Set([
  'error: [polling_error] {"code":"ETELEGRAM","message":"ETELEGRAM: 409 Conflict: terminated by other getUpdates request; make sure that only one bot instance is running"}\n',
]);

if (!'is need update files') {
  ['cm', 'index'].forEach(appName => {
    walkAllFiles(`src/back/apps/${appName}/+case`, (filePath, name) => {
      fs.writeFileSync(`src/back/file-stores/apps/${appName}/${name}`, '' + fs.readFileSync(filePath));
    });
  });
}

(async () => {
  await buildBackIndexFile();

  const proc = exec('node ./src/back/back.index.js');

  proc.stdout.on('data', console.info);
  proc.stderr.on('data', error => {
    if (errorsToPass.has(error)) return;
    console.error(error);
  });
})();

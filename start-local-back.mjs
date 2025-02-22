import { exec } from 'child_process';
import { buildBackIndexFile } from './build-back-index.mjs';

const errorsToPass = new Set([
  'error: [polling_error] {"code":"ETELEGRAM","message":"ETELEGRAM: 409 Conflict: terminated by other getUpdates request; make sure that only one bot instance is running"}\n',
]);

(async () => {
  await buildBackIndexFile();

  const proc = exec('node ./src/back/back.index.js');

  proc.stdout.on('data', console.info);
  proc.stderr.on('data', error => {
    if (errorsToPass.has(error)) return;
    console.error(error);
  });
})();

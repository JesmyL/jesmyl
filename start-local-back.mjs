import { exec } from 'child_process';
import fs from 'fs';
import { buildBackIndexFile } from './build-back-index.mjs';
import { walkAllFiles } from './utils.mjs';

const errorsToPass = new Set([
  'error: [polling_error] {"code":"ETELEGRAM","message":"ETELEGRAM: 409 Conflict: terminated by other getUpdates request; make sure that only one bot instance is running"}\n',
]);

if (!'is need update files') {
  ['cm', 'index', 'storages/list'].forEach(appName => {
    const cb = (filePath, name) => {
      if (!name.endsWith('.json')) return;
      fs.writeFileSync(`src/back/file-stores/apps/${appName}/${name}`, '' + fs.readFileSync(filePath));
    };

    walkAllFiles(`src/back/apps/${appName}/+case`, cb);
    walkAllFiles(`src/back/apps/${appName}`, cb);
  });
}

(async () => {
  const path = await buildBackIndexFile();

  const proc = exec(`node ./${path}.cjs`);

  proc.stdout.on('data', console.info);
  proc.stderr.on('data', error => {
    if (errorsToPass.has(error)) return;
    console.error(error);
  });
})();

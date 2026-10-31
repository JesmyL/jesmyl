import { exec } from 'child_process';
import { checkIsEndsWith } from './src/shared/utils/checkIs';
import { buildBackIndexFile } from './do/build-back-index';

const errorsToPass = new Set([
  'error: [polling_error] {"code":"ETELEGRAM","message":"ETELEGRAM: 409 Conflict: terminated by other getUpdates request; make sure that only one bot instance is running"}\n',
]);

(async () => {
  const backIndexFilePath = (await buildBackIndexFile()).find(fileName =>
    checkIsEndsWith(fileName, 'back.index.cjs'),
  );

  if (!backIndexFilePath) throw 'Собранный back.index.cjs не найден';

  const proc = exec(`node ./${backIndexFilePath}`);

  proc.stdout?.on('data', console.info);
  proc.stderr?.on('data', error => {
    if (errorsToPass.has(error)) return;
    console.error(error);
  });
})();

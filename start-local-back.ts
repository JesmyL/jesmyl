import { exec } from 'child_process';
import { buildBackIndexFile } from './do/build-back-index';

const errorsToPass = new Set([
  'error: [polling_error] {"code":"ETELEGRAM","message":"ETELEGRAM: 409 Conflict: terminated by other getUpdates request; make sure that only one bot instance is running"}\n',
]);

// if (!'is need update files') {
//   [
//     'cm',
//     'cm/coms',
//     'cm/comComments',
//     'cm/comsInSchEvent',
//     'cm/comsInSchEventHistory',
//     'index/schedules',
//     'index',
//     'storages/list',
//   ].forEach(appName => {
//     const cb = (filePath, name) => {
//       if (!name.endsWith('.json')) return;
//       fs.writeFileSync(`src/back/file-stores/apps/${appName}/${name}`, '' + fs.readFileSync(filePath));
//     };

//     walkAllFiles(`src/back/apps/${appName}/+case`, cb, 1);
//     walkAllFiles(`src/back/apps/${appName}`, cb, 1);
//   });
// }

(async () => {
  const [backIndexFilePath] = await buildBackIndexFile();

  const proc = exec(`node ./${backIndexFilePath}`);

  proc.stdout?.on('data', console.info);
  proc.stderr?.on('data', error => {
    if (errorsToPass.has(error)) return;
    console.error(error);
  });
})();

import { exec } from 'child_process';
import { lazyEnvJson } from '../../back/envJson';
import { makeElectronDownHostUrl } from './const';

async function runDeploy(): Promise<void> {
  const targetDir = makeElectronDownHostUrl(lazyEnvJson().host);
  const targetRemoteDir = `root@${lazyEnvJson().ip}:/var/www/${targetDir}/` as const;

  const execAsync = (stringCommand: string): Promise<number | string> =>
    new Promise((res, rej) =>
      exec(stringCommand, error => {
        if (error) rej(error);
        else res(0);
      }),
    );

  const buildFolder = './src/electron-app/release-builds';

  console.info('🚀 Начинаем отправку файлов Electron на удаленный сервер...', targetDir);
  try {
    await execAsync(`scp ${buildFolder}/latest*.yml ${buildFolder}/*.exe ${buildFolder}/*.AppImage ${targetRemoteDir}`);
    console.info('✅ Деплой Electron успешно завершен!', targetDir);
  } catch (error) {
    console.error('❌ Ошибка во время деплоя:', error);
    process.exit(1);
  }
}

runDeploy();

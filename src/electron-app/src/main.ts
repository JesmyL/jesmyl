import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import windowStateKeeper from 'electron-window-state';
import { mkdtempSync, rmSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
import hostConfig from '../../../host-config.json';
import { electronAppClientEventKey, electronAppSmokeArg, electronAppWinListHolder } from './const';
import { electronAppName, makeElectronDownHostUrl } from './lib';
import { ElectronAppWindowInvokeProps } from './model';
import { electronAppBasicTsjrpcBase, registerWorkDirFileProtocol } from './tsjrpc/bases/basic.server.base';
import { electronAppPresentationTsjrpcBase } from './tsjrpc/bases/presentation.server.base';
import { electronAppPresentationsTsjrpcBase } from './tsjrpc/bases/presentations.server.base';
import { tsjrpcElectronAppBaseNext } from './tsjrpc/init/tsjrpc.base.electron';
import { verifyDownloadedUpdate } from './update-verification';
import {
  setElectronAppSessionPartition,
  takeElectronAppPartition,
  takeElectronAppWebPreferences,
} from './webPreferences';

const isSmokeRun = process.argv.includes(electronAppSmokeArg);
const isTestMode = process.env.JESMYL_TEST_RUNNER === 'true';
const sessionPartition = takeElectronAppPartition(isTestMode);

setElectronAppSessionPartition(sessionPartition);

/** Единая настройка фида обновлений для обычного запуска и smoke-самопроверки. */
const applyElectronUpdaterConfig = (host: string) => {
  autoUpdater.logger = console;

  if (!app.isPackaged) autoUpdater.forceDevUpdateConfig = true;

  autoUpdater.setFeedURL({ provider: 'generic', url: makeElectronDownHostUrl(host, true) });
  autoUpdater.autoInstallOnAppQuit = false;
};

if (isSmokeRun) {
  const smokeUserDataDir = mkdtempSync(path.join(tmpdir(), 'jesmyl-smoke-'));

  app.setPath('userData', smokeUserDataDir);
  app.setPath('sessionData', smokeUserDataDir);
  app.disableHardwareAcceleration();

  const removeSmokeUserData = () => {
    try {
      rmSync(smokeUserDataDir, { recursive: true, force: true });
    } catch {
      // Временная папка — ОС уберёт её сама.
    }
  };

  let isSmokeSettled = false;

  const settleSmoke = (exitCode: number, message: string) => {
    if (isSmokeSettled) return;

    isSmokeSettled = true;
    removeSmokeUserData();

    if (exitCode === 0) console.info(message);
    else console.error(message);

    app.exit(exitCode);
  };

  process.on('unhandledRejection', reason => {
    settleSmoke(1, `❌ ${electronAppName} smoke: необработанная ошибка — ${String(reason)}`);
  });

  app
    .whenReady()
    .then(() => {
      applyElectronUpdaterConfig(hostConfig.host);

      autoUpdater.on('error', error => {
        settleSmoke(1, `❌ ${electronAppName} smoke: апдейтер не смог запуститься — ${String(error)}`);
      });

      autoUpdater.once('update-available', () => {
        settleSmoke(
          0,
          `✅ ${electronAppName} smoke: приложение готово, проверка обновлений работает (обновление доступно)`,
        );
      });

      autoUpdater.once('update-not-available', () => {
        settleSmoke(0, `✅ ${electronAppName} smoke: приложение готово, проверка обновлений работает (обновлений нет)`);
      });

      autoUpdater.once('update-downloaded', () => {
        settleSmoke(
          0,
          `✅ ${electronAppName} smoke: приложение готово, проверка обновлений работает (обновление скачано)`,
        );
      });

      autoUpdater.checkForUpdatesAndNotify().catch(error => {
        settleSmoke(1, `❌ ${electronAppName} smoke: проверка обновлений не запустилась — ${String(error)}`);
      });
    })
    .catch(error => {
      settleSmoke(1, `❌ ${electronAppName} smoke: ошибка запуска приложения — ${String(error)}`);
    });
} else if (!app.requestSingleInstanceLock() && !isTestMode) {
  app.quit();
} else {
  app.on('second-instance', () => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length > 0) {
      const mainWin = windows[0];
      if (mainWin.isMinimized()) mainWin.restore();
      mainWin.focus();
    }
  });

  const isProd = app.isPackaged || process.env.NODE_ENV === 'production';
  const host = hostConfig.host;
  const url = isProd ? `https://${host}` : 'http://localhost:3627';

  let isUpdateDownloaded = false;
  let isQuittingForUpdate = false;

  app.whenReady().then(async () => {
    registerWorkDirFileProtocol(sessionPartition);

    if (isProd) {
      try {
        autoUpdater.logger = console;

        if (!app.isPackaged) {
          autoUpdater.forceDevUpdateConfig = true;
        }

        autoUpdater.setFeedURL({
          provider: 'generic',
          url: makeElectronDownHostUrl(host, true),
        });

        autoUpdater.autoInstallOnAppQuit = false;
        autoUpdater.on('update-downloaded', event => {
          verifyDownloadedUpdate(event)
            .then(() => {
              isUpdateDownloaded = true;
            })
            .catch(error => {
              console.error(`❌ Обновление v${event.version} отклонено: проверка перед установкой не пройдена.`, error);
            });
        });

        setTimeout(() => {
          autoUpdater.checkForUpdatesAndNotify().catch(() => {});
        }, 4000);
      } catch (e) {
        console.error(`Ошибка автообновления приложения v${app.getVersion()}`, e);
      }
    }

    const isDarwin = process.platform === 'darwin';

    const appQuit = isDarwin ? () => {} : () => app.quit();

    app.on('before-quit', e => {
      if (isUpdateDownloaded && !isQuittingForUpdate) {
        e.preventDefault();
        isQuittingForUpdate = true;
        app.removeAllListeners('window-all-closed');
        autoUpdater.quitAndInstall(false, true);
      }
    });

    app.on('window-all-closed', appQuit);
    app.commandLine.appendSwitch('disable-http2');
    app.commandLine.appendSwitch('disable-http-cache');
    app.commandLine.appendSwitch('disable-background-networking');
    app.commandLine.appendSwitch('disable-background-timer-throttling');

    if (isQuittingForUpdate) return;

    const { height, width, y, x, manage } = windowStateKeeper({
      defaultWidth: 800,
      defaultHeight: 600,
    });

    const win = (electronAppWinListHolder[0] = new BrowserWindow({
      height,
      width,
      x,
      y,
      backgroundColor: '#000000',
      icon: path.join(__dirname, '../assets/img/ico-512x512.png'),
      webPreferences: takeElectronAppWebPreferences(sessionPartition),
    }));

    manage(win);

    win.webContents.on('before-input-event', (event, input) => {
      if (
        input.shift &&
        input.alt &&
        (isDarwin ? input.meta : input.control) &&
        input.type === 'keyDown' &&
        input.key.toLowerCase() === 'i'
      ) {
        if (win.webContents.isDevToolsOpened()) {
          win.webContents.closeDevTools();
        } else {
          win.webContents.openDevTools();
        }
        event.preventDefault();
      }
    });

    ipcMain.removeHandler(electronAppClientEventKey);
    ipcMain.handle(
      electronAppClientEventKey,
      async (_event, { invoke, requestId, toWinNum, winNum }: ElectronAppWindowInvokeProps) => {
        const promiseWith = Promise.withResolvers();

        tsjrpcElectronAppBaseNext({
          invoke,
          requestId,
          tool: { app, win, host: url, toWinNum, winNum },
          sendResponse: event => {
            if (event.errorMessage) promiseWith.reject(event.errorMessage);
            else promiseWith.resolve(event.invokedResult);
          },
        });

        return promiseWith.promise;
      },
    );

    if (!url.startsWith('https')) win.webContents.openDevTools();

    win.webContents.on('did-finish-load', async () => {
      win.webContents.executeJavaScript(
        `localStorage.setItem('atom\\\\index:extVersion', '["${app.getVersion().replace(/^\d+\.\d+\.(\d+)(\d{3})(\d{3})$/, '$1.$2.$3')}"]');`,
      );
    });

    win.setMenu(null);
    await win.loadURL(url, {
      httpReferrer: '',
      userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ${electronAppName}/${app.getVersion()}`,
    });

    win.on('close', () => {
      ipcMain.removeHandler(electronAppClientEventKey);
      appQuit();
    });
  });
}

electronAppBasicTsjrpcBase.$$register();
electronAppPresentationsTsjrpcBase.$$register();
electronAppPresentationTsjrpcBase.$$register();

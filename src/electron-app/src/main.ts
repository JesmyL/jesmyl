import { app, BrowserWindow, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import { TSJRPCInvokeData } from 'tsjrpc';
import hostConfig from '../../../host-config.json';
import { electronAppClientEventKey, electronAppWinHolder } from './const';
import { makeElectronDownHostUrl } from './lib';
import { electronAppBasicTsjrpcBase } from './tsjrpc/bases/basic.server.base';
import { electronAppPresentationTsjrpcBase } from './tsjrpc/bases/presentation.server.base';
import { tsjrpcElectronAppBaseNext } from './tsjrpc/init/tsjrpc.base.electron';
import { electronAppWebPreferences } from './webPreferences';

const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
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

  const host = hostConfig.host;
  const url = app.isPackaged ? `https://${host}` : 'http://localhost:3627';

  let isUpdateDownloaded = false;
  let isQuittingForUpdate = false;

  app.whenReady().then(async () => {
    if (app.isPackaged) {
      try {
        autoUpdater.logger = console;
        autoUpdater.setFeedURL({
          provider: 'generic',
          url: makeElectronDownHostUrl(host, true),
        });

        autoUpdater.autoInstallOnAppQuit = false;
        autoUpdater.on('update-downloaded', () => (isUpdateDownloaded = true));

        setTimeout(() => {
          autoUpdater.checkForUpdatesAndNotify().catch(() => {});
        }, 4000);
      } catch (e) {
        console.error(`Ошибка автообновления приложения v${app.getVersion()}`, e);
      }
    }

    const appQuit = () => {
      if (process.platform !== 'darwin') app.quit();
    };

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

    const win = (electronAppWinHolder.win = new BrowserWindow({
      height: 700,
      width: 800,
      x: 0,
      y: 0,
      icon: path.join(__dirname, '../assets/img/ico-512x512.png'),
      webPreferences: electronAppWebPreferences,
    }));

    ipcMain.removeHandler(electronAppClientEventKey);
    ipcMain.handle(
      electronAppClientEventKey,
      async (_event, { invoke, requestId }: { invoke: TSJRPCInvokeData; requestId: string }) => {
        const promiseWith = Promise.withResolvers();

        tsjrpcElectronAppBaseNext({
          invoke,
          requestId,
          tool: { app, win, host: url },
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
      userAgent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 JESMYL_PRO/${app.getVersion()}`,
    });

    win.on('close', () => {
      ipcMain.removeHandler(electronAppClientEventKey);
      appQuit();
    });
  });
}

electronAppBasicTsjrpcBase.$$register();
electronAppPresentationTsjrpcBase.$$register();

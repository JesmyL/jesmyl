import { app, BrowserWindow, dialog, ipcMain, screen } from 'electron';
import { autoUpdater } from 'electron-updater';
import path from 'path';
import hostConfig from '../../../host-config.json';
import { makeElectronDownHostUrl } from './const';

const host = hostConfig.host;

const url = app.isPackaged ? `https://${host}` : 'http://localhost:3627';

const cookieEventName = 'PRESENTATION_EVENT';
const cookieEventStartSliceLen = 20;

const webPreferences = {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  webSecurity: true,
  allowRunningInsecureContent: false,
  preload: path.join(__dirname, 'preload.cjs'),
  partition: 'persist:jesmyl',
};

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

  let presentationWin: BrowserWindow;

  app.on('before-quit', e => {
    if (isUpdateDownloaded && !isQuittingForUpdate) {
      e.preventDefault();
      isQuittingForUpdate = true;

      app.removeAllListeners('window-all-closed');

      autoUpdater.quitAndInstall(false, true);
    }
  });

  const appQuit = () => {
    if (process.platform !== 'darwin') app.quit();
  };

  app.on('window-all-closed', appQuit);
  app.commandLine.appendSwitch('disable-http2');
  app.commandLine.appendSwitch('disable-http-cache');
  app.commandLine.appendSwitch('disable-background-networking');
  app.commandLine.appendSwitch('disable-background-timer-throttling');

  const win = new BrowserWindow({
    width: 1700,
    height: 800,
    x: 100,
    y: 100,
    icon: path.join(__dirname, '../assets/img/ico-512x512.png'),
    webPreferences,
  });

  if (!url.startsWith('https')) win.webContents.openDevTools();

  win.webContents.on('did-finish-load', async () => {
    win.webContents.executeJavaScript(`
      localStorage.setItem('atom\\\\index:extVersion', '["${app.getVersion()}"]');
    `);
  });

  ipcMain.handle('select-files', async () => {
    const result = await dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections'],
      filters: [
        { name: 'Изображения', extensions: ['jpg', 'png', 'gif'] },
        { name: 'Все файлы', extensions: ['*'] },
      ],
    });

    if (result.canceled) {
      return [];
    } else {
      return result.filePaths;
    }
  });

  const makeCookieEvent = (value: string) => {
    return {
      url,
      name: cookieEventName,
      value: `${`${Date.now()}`.padStart(cookieEventStartSliceLen, '0')}${JSON.stringify(value)}`,
    };
  };

  await win.loadURL(url, {
    httpReferrer: '',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
  });

  win.on('close', () => {
    if (presentationWin && !presentationWin.isDestroyed()) {
      presentationWin.close();
    }

    appQuit();
  });

  win.webContents.session.cookies.set(makeCookieEvent('DESKTOP'));

  win.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' https: http: data: blob: 'unsafe-inline'; " +
            'img-src * data: blob:; ' +
            "script-src 'self' 'unsafe-inline' https: http: blob: data:; " +
            "style-src 'self' 'unsafe-inline' https: http: blob: data:; " +
            'connect-src * data: blob:; ' +
            'media-src * data: blob:; frame-src * data: blob:',
        ],
      },
    });
  });

  async function createSlideshowWindow(display: Electron.Display | undefined) {
    const {
      bounds: { x, y, width, height } = {
        x: 1000,
        y: 200,
        width: 800,
        height: 600,
      },
    } = display ?? {};

    presentationWin = new BrowserWindow({
      x,
      y,
      width,
      height,
      fullscreen: true,
      kiosk: true,
      show: false,
      backgroundColor: '#000000',

      webPreferences,
    });

    presentationWin.setBackgroundColor('#000000');
    await presentationWin.loadURL(`${url}/presentation`);
    presentationWin.show();
  }

  let timeout: NodeJS.Timeout;
  let prevEventName = '';

  win.webContents.session.cookies.addListener('changed', (_event, cookie) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (cookie.name !== cookieEventName) return;
      const eventName = JSON.parse(cookie.value.slice(cookieEventStartSliceLen));
      if (prevEventName === eventName) return;
      prevEventName = eventName;

      try {
        if (eventName === 'CLOSE') presentationWin.minimize();
        if (eventName === 'SHOW') {
          if (presentationWin) presentationWin.maximize();
          else {
            const projector = screen.getAllDisplays().find(d => d.bounds.x !== 0 || d.bounds.y !== 0);

            createSlideshowWindow(projector);
          }
        }

        const interval = setInterval(() => {
          try {
            win.focus();
            win.setAlwaysOnTop(true);
            win.setAlwaysOnTop(false);
          } catch (_e) {
            //
          }
        }, 50);

        setTimeout(() => clearInterval(interval), 2000);
      } catch (_e) {
        //
      }
    }, 100);
  });
});

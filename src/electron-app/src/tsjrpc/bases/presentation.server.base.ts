import { BrowserWindow, Display, screen } from 'electron';
import { electronAppWinListHolder } from '../../const';
import { takeElectronAppWebPreferences } from '../../webPreferences';
import { TsjrpcElectronAppBase } from '../init/tsjrpc.base.electron';
import { electronPresentationTsjrpcAppServerMethods } from '../methods/presentation.server.methods';
import { ElectronPresentationTsjrpcModel } from '../model';

export const electronAppPresentationTsjrpcBase =
  new (class BaseClient extends TsjrpcElectronAppBase<ElectronPresentationTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentation2',
        methods: {
          close: async (_, { win, toWinNum }) => {
            getWin(toWinNum)?.minimize();
            focusWin(win);
          },

          show: async (liveData, { host, win, toWinNum }) => {
            init(win);

            let presentationWin = getWin(toWinNum);

            if (presentationWin && !presentationWin.isDestroyed()) {
              if (presentationWin.isMinimized()) {
                presentationWin.maximize();
              }
            } else {
              const projector = screen.getAllDisplays().find(d => d.bounds.x !== 0 || d.bounds.y !== 0);
              presentationWin = await createSlideshowWindow(projector, host, toWinNum);

              presentationWin.webContents.on('did-finish-load', () => {
                electronPresentationTsjrpcAppServerMethods.liveData(liveData, { toWinNum, winNum: toWinNum });
              });

              presentationWin.on('close', event => {
                if (isPreventClosePresentation) event.preventDefault();
              });
            }

            if (presentationWin) {
              focusWin(presentationWin);
              setTimeout(() => focusWin(win), 150);
            } else focusWin(win);
          },

          liveData: (args, { winNum, toWinNum }) =>
            electronPresentationTsjrpcAppServerMethods.liveData(args, { toWinNum, winNum }),
        },
      });
    }
  })();

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

let isPreventClosePresentation = true;

const getWin = (winNum: number) => electronAppWinListHolder[winNum];

const createSlideshowWindow = async (display: Display | undefined, host: string, winNum: number) => {
  const { bounds: { x, y, width, height } = { x: 1000, y: 200, width: 800, height: 600 } } = display ?? {};

  const presentationWin = (electronAppWinListHolder[winNum] = new BrowserWindow({
    x,
    y,
    width,
    height,
    fullscreen: true,
    kiosk: true,
    show: false,
    backgroundColor: '#000000',
    webPreferences: takeElectronAppWebPreferences(),
  }));

  let timeout: NodeJS.Timeout;

  presentationWin.on('resize', () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (!presentationWin || presentationWin.isDestroyed()) return;
      const [w, h] = presentationWin.getSize();
      electronPresentationTsjrpcAppServerMethods.winResize({ h, w }, { toWinNum: 0, winNum });
    }, 1000);
  });

  presentationWin.setBackgroundColor('#000000');
  await presentationWin.loadURL(`${host}/presentation`);
  presentationWin.show();

  return presentationWin;
};

const focusWin = (win: BrowserWindow) => {
  try {
    win.focus();
    win.setAlwaysOnTop(true);
    win.setAlwaysOnTop(false);
  } catch {
    //
  }
};

let init = (win: BrowserWindow) => {
  init = () => {};

  win.on('close', () => {
    isPreventClosePresentation = false;

    electronAppWinListHolder.forEach(win => {
      if (win && !win.isDestroyed()) win.close();
    });
  });
};

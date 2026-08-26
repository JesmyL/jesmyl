import { BrowserWindow, Display, screen } from 'electron';
import { electronAppWinHolder } from '../../const';
import { electronAppWebPreferences } from '../../webPreferences';
import { ElectronTsjrpcTool, TsjrpcElectronAppBase } from '../init/tsjrpc.base.electron';
import { electronPresentationTsjrpcAppMethods } from '../methods/presentation.server.methods';
import { ElectronPresentationTsjrpcModel } from '../model';

const register = <Props>(mapper: (props: Props, tool: ElectronTsjrpcTool) => void) => {
  return async (props: Props, tool: ElectronTsjrpcTool) => {
    init(tool);
    return mapper(props, tool);
  };
};

export const electronAppPresentationTsjrpcBase =
  new (class BaseClient extends TsjrpcElectronAppBase<ElectronPresentationTsjrpcModel> {
    constructor() {
      super({
        scope: 'Presentation2',
        methods: {
          close: register((_, { win }) => {
            presentationWin?.minimize();
            focusWin(win);
          }),

          show: async (liveData, { host, win }) => {
            if (presentationWin && !presentationWin.isDestroyed()) {
              if (presentationWin.isMinimized()) {
                presentationWin.maximize();
              }
            } else {
              const projector = screen.getAllDisplays().find(d => d.bounds.x !== 0 || d.bounds.y !== 0);
              presentationWin = await createSlideshowWindow(projector, host);

              presentationWin.webContents.on('did-finish-load', () => {
                electronPresentationTsjrpcAppMethods.liveData(liveData);
              });

              presentationWin.on('close', event => {
                if (isPreventClosePresentation) event.preventDefault();
                presentationWin = undefined;
              });
            }

            if (presentationWin) focusWin(presentationWin);
            focusWin(win);
          },

          liveData: data => electronPresentationTsjrpcAppMethods.liveData(data),
        },
      });
    }
  })();

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

let presentationWin: BrowserWindow | undefined;
let isPreventClosePresentation = true;

const createSlideshowWindow = async (display: Display | undefined, host: string) => {
  const { bounds: { x, y, width, height } = { x: 1000, y: 200, width: 800, height: 600 } } = display ?? {};

  electronAppWinHolder.win = presentationWin = new BrowserWindow({
    x,
    y,
    width,
    height,
    fullscreen: true,
    kiosk: true,
    show: false,
    backgroundColor: '#000000',
    webPreferences: {
      ...electronAppWebPreferences,
      partition: 'persist:jesmyl_presentation',
    },
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

let isInited = false;

const init = (tool: ElectronTsjrpcTool) => {
  if (isInited) return;
  isInited = true;
  const { win } = tool;

  win.on('close', () => {
    isPreventClosePresentation = false;
    if (presentationWin && !presentationWin.isDestroyed()) {
      presentationWin.close();
    }
  });
};

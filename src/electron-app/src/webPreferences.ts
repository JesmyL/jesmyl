import path from 'path';

export const takeElectronAppWebPreferences = (partition = 'persist:jesmyl') => ({
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  webSecurity: true,
  allowRunningInsecureContent: false,
  preload: path.join(__dirname, 'preload.cjs'),
  partition,
});

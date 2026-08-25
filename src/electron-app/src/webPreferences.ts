import path from 'path';

export const electronAppWebPreferences = {
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  webSecurity: true,
  allowRunningInsecureContent: false,
  preload: path.join(__dirname, 'preload.cjs'),
  partition: 'persist:jesmyl',
};

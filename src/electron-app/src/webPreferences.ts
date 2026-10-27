import path from 'path';

const defaultPartition = 'persist:jesmyl';

export const takeElectronAppPartition = (isTestMode: boolean) =>
  isTestMode ? 'persist:jesmyl_test' : defaultPartition;

export const takeElectronAppWebPreferences = (partition = defaultPartition) => ({
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  webSecurity: true,
  allowRunningInsecureContent: false,
  preload: path.join(__dirname, 'preload.cjs'),
  partition,
});

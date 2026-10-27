import path from 'path';

const defaultPartition = 'persist:jesmyl';

let sessionPartition = defaultPartition;

export const takeElectronAppSessionPartition = () => sessionPartition;

/** Main process calls it at startup so every window shares the partition the `workdir://` protocol lives in. */
export const setElectronAppSessionPartition = (partition: string) => (sessionPartition = partition);

export const takeElectronAppPartition = (isTestMode: boolean) =>
  isTestMode ? 'persist:jesmyl_test' : defaultPartition;

export const takeElectronAppWebPreferences = (partition: string) => ({
  nodeIntegration: false,
  contextIsolation: true,
  enableRemoteModule: false,
  webSecurity: true,
  allowRunningInsecureContent: false,
  preload: path.join(__dirname, 'preload.cjs'),
  partition,
});

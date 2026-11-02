const https = 'https://';

const electronDownDirVersion: '' | '1' = '';
const electronDownDir = `/down${electronDownDirVersion}`;
export const electronAppName = `JESMYL_PRO${electronDownDirVersion}` as const;

export const makeElectronDownHostUrl = (host: string, isIncludeHttps = false) =>
  `${isIncludeHttps ? https : ''}${host.startsWith(https) ? host.slice(https.length) : host}${electronDownDir}` as const;

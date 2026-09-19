const https = 'https://';

const electronDownDir = '/down';

export const makeElectronDownHostUrl = (host: string, isIncludeHttps = false) =>
  `${isIncludeHttps ? https : ''}${host.startsWith(https) ? host.slice(https.length) : host}${electronDownDir}` as const;

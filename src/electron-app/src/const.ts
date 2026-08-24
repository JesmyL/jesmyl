const https = 'https://';

export const makeElectronDownHostUrl = (host: string, isIncludeHttps = false) =>
  `${isIncludeHttps ? https : ''}${host.startsWith(https) ? host.slice(https.length) : host}/down` as const;

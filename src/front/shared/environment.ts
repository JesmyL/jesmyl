import { hostConfig } from 'shared/api';

type Environment = {
  isTest: boolean;
  sokiLink: string;
  backHttpUrl: string;
  authIDBStoreName: string;
  initialUrl: URL;
  isPresentationMode: boolean;
};

const isTest = import.meta.env.MODE === 'test';
const initialUrl = new URL(location.href);
const localhost = 'localhost';
const isHttps = initialUrl.protocol === 'https:';

const postfix = import.meta.env.VITE_SOKI_POSTFIX;
const devHost = import.meta.env.VITE_DNS || initialUrl.hostname;

const sokiLink = isTest
  ? `${isHttps ? 'wss' : 'ws'}://${devHost}${postfix}`
  : `wss://${hostConfig.host}${postfix}`;

/** Local back dev server port (src/back/startExpressRouting/index.ts); production uses the host. */
const backHttpUrl = isTest ? `${isHttps ? 'https' : 'http'}://${devHost}:4446` : hostConfig.url;

export const environment: Environment = {
  isTest,
  sokiLink,
  backHttpUrl,
  initialUrl,
  isPresentationMode: initialUrl.pathname.startsWith('/presentation'),
  authIDBStoreName:
    isTest || initialUrl.hostname !== localhost
      ? import.meta.env.VITE_AUTH_IDB_STORE_NAME
      : import.meta.env.VITE_AUTH_IDB_STORE_NAME_LOCAL_PROD,
};

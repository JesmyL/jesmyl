import { isHttpsOnLocalhost } from '../../../is.https';

type Environment = {
  isTest: boolean;
  sokiLink: string;
  authIDBStoreName: string;
  initialUrl: URL;
  isPresentationMode: boolean;
};

const isTest = import.meta.env.MODE === 'test';
const initialUrl = new URL(location.href);
const localhost = 'localhost';

const sokiLink = isTest
  ? `ws://${isHttpsOnLocalhost ? localhost : import.meta.env.VITE_DNS}${import.meta.env.VITE_SOKI_POSTFIX}`
  : `wss://${import.meta.env.VITE_DNS}${import.meta.env.VITE_SOKI_POSTFIX}`;

export const environment: Environment = {
  isTest,
  sokiLink,
  initialUrl,
  isPresentationMode: initialUrl.pathname.startsWith('/presentation'),
  authIDBStoreName:
    isTest || initialUrl.hostname !== localhost
      ? import.meta.env.VITE_AUTH_IDB_STORE_NAME
      : import.meta.env.VITE_AUTH_IDB_STORE_NAME_LOCAL_PROD,
};

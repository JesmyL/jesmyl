export type Environment = {
  isTest: boolean;
  sokiLink: string;
  authIDBStoreName: string;
  initialUrl: URL;
};

const isTest = import.meta.env.MODE === 'test';
const initialUrl = new URL(location.href);

export const environment: Environment = {
  isTest,
  sokiLink: import.meta.env.VITE_SOKI_LINK,
  initialUrl,
  authIDBStoreName:
    isTest || initialUrl.hostname !== 'localhost'
      ? import.meta.env.VITE_AUTH_IDB_STORE_NAME
      : import.meta.env.VITE_AUTH_IDB_STORE_NAME_LOCAL_PROD,
};

/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DNS: string;
  readonly VITE_SOKI_POSTFIX: string;
  readonly VITE_AUTH_IDB_STORE_NAME: string;
  readonly VITE_AUTH_IDB_STORE_NAME_LOCAL_PROD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

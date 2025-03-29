/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SOKI_LINK: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

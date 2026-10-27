export type ElectronWorkDirFileKind = 'image' | 'video' | 'audio' | 'pptx';

/** Base64 reads above this size are refused by the main RPC — media streams through the `workdir://` protocol instead. */
export const electronWorkDirFileMaxBytes = 20 * 1024 * 1024;

export type ElectronWorkDirFile = {
  name: string;
  path: string;
  kind: ElectronWorkDirFileKind;
  size: number;
};

export type ElectronWorkDirFolderPack = {
  folders: string[];
  files: ElectronWorkDirFile[];
};

export type ElectronBasicTsjrpcModel = {
  selectFiles: () => string[];
  selectDir: (args: { create?: string }) => string | nil;
  readWorkDir: (args: { dirPath: string }) => ElectronWorkDirFolderPack | nil;
  readWorkDirFileBase64: (args: { filePath: string }) => string | nil;
  /** Custom-protocol URL streamed by the main process — large videos never travel as base64. */
  takeWorkDirFileUrl: (args: { filePath: string }) => string | nil;
  createWorkDirFolder: (args: { dirPath: string; name: string }) => string | nil;
  /** Ensures each named subfolder exists inside a work dir; returns true once all are created. */
  ensureWorkDirFolders: (args: { dirPath: string; names: string[] }) => boolean | nil;
  /** Writes dropped files (pure base64, no data-url prefix) into a work dir; returns the count actually saved. */
  saveWorkDirFiles: (args: { dirPath: string; files: { name: string; base64: string }[] }) => number | nil;
  watchWorkDir: (args: { dirPath: string }) => boolean;
};

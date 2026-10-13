export type ElectronWorkDirFileKind = 'image' | 'video' | 'audio';

/** Files above this size are never loaded as base64 — the main RPC returns nil and the UI shows a name tile instead. */
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
  createWorkDirFolder: (args: { dirPath: string; name: string }) => string | nil;
  /** Ensures each named subfolder exists inside a work dir; returns true once all are created. */
  ensureWorkDirFolders: (args: { dirPath: string; names: string[] }) => boolean | nil;
  /** Writes dropped files (pure base64, no data-url prefix) into a work dir; returns the count actually saved. */
  saveWorkDirFiles: (args: { dirPath: string; files: { name: string; base64: string }[] }) => number | nil;
  watchWorkDir: (args: { dirPath: string }) => boolean;
};

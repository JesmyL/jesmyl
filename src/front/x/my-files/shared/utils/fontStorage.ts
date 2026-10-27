import { electronBasicTsjrpcClient, electronWorkDirTool } from '#basis/tsjrpc.electron/basic';
import { takeBase64FromDataUrl } from '#shared/lib/convertFileToBase64';
import { electronWorkDirAtom } from '#shared/state/electron.atoms';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { takeFileExtension } from 'shared/utils/string.utils';
import { fontWorkDirFolder } from '../const/myFiles';
import { myFilesIDB } from '../state/idb';

/** Browser Cache Storage bucket for uploaded font files — the PWA counterpart of the WorkDir `fonts` folder. */
export const fontFilesCacheName = 'font-files-cache';

const fontCacheUrlPrefix = '/font-cache/';
const takeFontCacheUrl = (fileId: string) => `${fontCacheUrlPrefix}${fileId}`;
const takeFontFileName = (file: File, fileId: string) => `${fileId}.${takeFileExtension(file.name)}`;

const saveCachedFontFile = async (file: File, fileId: string) => {
  const cache = await caches.open(fontFilesCacheName);

  await cache.put(takeFontCacheUrl(fileId), new Response(file));
};

const takeCachedFontFileBuffer = async (fileId: string) => {
  const response = await (await caches.open(fontFilesCacheName)).match(takeFontCacheUrl(fileId));

  return response?.arrayBuffer();
};

/** Copies the font into `<WorkDir>/fonts`; no-op when no WorkDir is selected or the write fails. */
const saveWorkDirFontFile = async (file: File, fileId: string, base64: string) => {
  const workDir = electronWorkDirAtom.get();
  if (!workDir) return;

  // Restarted apps forget allowed roots, so re-watch the persisted root before writing into it.
  await electronBasicTsjrpcClient.watchWorkDir({ dirPath: workDir }, electronWorkDirTool);

  const folderPath = await electronBasicTsjrpcClient.createWorkDirFolder(
    { dirPath: workDir, name: fontWorkDirFolder },
    electronWorkDirTool,
  );
  if (!folderPath) return;

  await electronBasicTsjrpcClient.saveWorkDirFiles(
    {
      dirPath: folderPath,
      files: [{ name: takeFontFileName(file, fileId), base64: takeBase64FromDataUrl(base64) }],
    },
    electronWorkDirTool,
  );
};

const takeWorkDirFontFileBuffer = async (fileName: string) => {
  const workDir = electronWorkDirAtom.get();
  if (!workDir) return null;

  // A restarted app forgets allowed roots, so re-watch the persisted root before reading from it.
  await electronBasicTsjrpcClient.watchWorkDir({ dirPath: workDir }, electronWorkDirTool);

  const base64 = await electronBasicTsjrpcClient.readWorkDirFileBase64(
    { filePath: `${workDir}/${fontWorkDirFolder}/${fileName}` },
    electronWorkDirTool,
  );

  return base64 ? Uint8Array.from(atob(base64), char => char.charCodeAt(0)) : null;
};

/**
 * Copies uploaded font `base64` into the platform store — Electron WorkDir or PWA Cache Storage.
 * The IDB row written by `addFileToMyFiles` stays the fallback whenever that store is unavailable.
 */
export const saveFontFile = async (file: File, fileId: string, base64: string) => {
  try {
    if (isElectronApp) await saveWorkDirFontFile(file, fileId, base64);
    else if (typeof caches !== 'undefined') await saveCachedFontFile(file, fileId);
  } catch {
    // Best-effort copy: the font is already usable from IDB.
  }
};

/** Font bytes from the platform store, falling back to the IDB copy saved before platform persistence existed. */
export const takeFontFileBuffer = async (fileId: string): Promise<BufferSource | nil> => {
  const stored = await myFilesIDB.tb.files.get(fileId);
  if (!stored) return null;

  try {
    const buffer = isElectronApp
      ? await takeWorkDirFontFileBuffer(takeFontFileName(stored.file, fileId))
      : typeof caches === 'undefined'
        ? null
        : await takeCachedFontFileBuffer(fileId);

    if (buffer) return buffer;
  } catch {
    // Fall through to the IDB copy.
  }

  return stored.file.arrayBuffer();
};

import { electronBasicTsjrpcClient } from '#basis/tsjrpc.electron/basic';
import { convertFileToBase64 } from '#shared/lib/convertFileToBase64';
import { ElectronWorkDirFolderPack } from 'shared/api/tsjrpc.electtron/basic';
import { lazyInit } from 'shared/utils/lazyInit';
import { mapObjectEntries, objectKeys } from 'shared/utils/object.utils';

const workDirTool = { toWinNum: -1111, winNum: -1000 };

const mediaMimeByExtensionLazy = lazyInit(() => {
  const mimeByExtension: PRecord<string, string> = {};

  for (const [type, extensions] of Object.entries({
    image: 'jpg=jpeg jpeg png gif webp avif svg=svg+xml bmp',
    video: 'mp4 webm mov=quicktime avi=x-msvideo mkv=x-matroska m4v=x-m4v',
    audio: 'mp3=mpeg wav ogg m4a=mp4 flac aac opus',
  }))
    for (const token of extensions.split(' ')) {
      const [extension, subtype = extension] = token.split('=');
      mimeByExtension[extension] = `${type}/${subtype}`;
    }

  return mimeByExtension;
});

export const takeMediaMimeByFileName = (fileName: string) =>
  mediaMimeByExtensionLazy()[fileName.slice(fileName.lastIndexOf('.') + 1).toLowerCase()] ??
  'application/octet-stream';

export const selectWorkDir = (create?: string) =>
  electronBasicTsjrpcClient.selectDir(create ? { create } : {}, workDirTool);

export const readWorkDir = (dirPath: string): Promise<ElectronWorkDirFolderPack | nil> =>
  electronBasicTsjrpcClient.readWorkDir({ dirPath }, workDirTool);

export const createWorkDirFolder = (dirPath: string, name: string) =>
  electronBasicTsjrpcClient.createWorkDirFolder({ dirPath, name }, workDirTool);

export const ensureWorkDirFolders = (dirPath: string, names: string[]) =>
  electronBasicTsjrpcClient.ensureWorkDirFolders({ dirPath, names }, workDirTool);

export const watchWorkDir = (dirPath: string) => electronBasicTsjrpcClient.watchWorkDir({ dirPath }, workDirTool);

export const saveWorkDirFiles = (dirPath: string, files: { name: string; base64: string }[]) =>
  electronBasicTsjrpcClient.saveWorkDirFiles({ dirPath, files }, workDirTool);

/** Preset folders living at the WorkDir root, keyed by media kind and the `other` fallback. */
export const workDirPresetFolders = { image: 'images', video: 'video', audio: 'audio', other: 'other' } as const;

/** Preset folder at the WorkDir root matching a file's media kind, falling back to `other` for non-media files. */
export const takeWorkDirPresetFolder = (fileName: string) =>
  workDirPresetFolders[
    takeMediaMimeByFileName(fileName).split('/')[0] as keyof typeof workDirPresetFolders
  ] ?? workDirPresetFolders.other;

/** Strips the `data:<mime>;base64,` wrapper, leaving pure base64 with no line breaks. */
const takeBase64FromDataUrl = (dataUrl: string) => dataUrl.slice(dataUrl.indexOf(',') + 1);

/**
 * Saves dropped files, routing each file into its media-kind root preset folder
 * (`other` for non-media files). Returns the single target dirPath when every file routed
 * to the same preset folder, nil when the drop was heterogeneous.
 */
export const saveDroppedWorkDirFiles = async (rootDirPath: string, files: File[]): Promise<string | nil> => {
  const payloadsByDirPath: Record<string, { name: string; base64: string }[]> = {};

  await Promise.all(
    files.map(async file => {
      const dirPath = `${rootDirPath}/${takeWorkDirPresetFolder(file.name)}`;

      (payloadsByDirPath[dirPath] ??= []).push({
        name: file.name,
        base64: takeBase64FromDataUrl(await convertFileToBase64(file)),
      });
    }),
  );

  const dirPaths = objectKeys(payloadsByDirPath);

  await Promise.all(
    mapObjectEntries(payloadsByDirPath, (dirPath, payloads) => saveWorkDirFiles(dirPath, payloads)),
  );

  return dirPaths.length === 1 ? dirPaths[0] : undefined;
};

const maxCachedWorkDirFileDataUrls = 40;
const workDirFileDataUrlCache = new Map<string, string>();

export const takeCachedWorkDirFileDataUrl = (filePath: string) => workDirFileDataUrlCache.get(filePath);

/** Inserts into the cache evicting the oldest entry once the cap is reached (md5-renamed paths make entries stale). */
const cacheWorkDirFileDataUrl = (filePath: string, dataUrl: string) => {
  if (workDirFileDataUrlCache.size >= maxCachedWorkDirFileDataUrls) {
    const oldestKey = workDirFileDataUrlCache.keys().next().value;
    if (oldestKey) workDirFileDataUrlCache.delete(oldestKey);
  }

  workDirFileDataUrlCache.set(filePath, dataUrl);
};

/** Reads a work-dir file once and caches its data-url — the same representation FileReader produces for uploads. */
export const readWorkDirFileDataUrl = async (filePath: string): Promise<string | nil> => {
  const cached = workDirFileDataUrlCache.get(filePath);
  if (cached) return cached;

  const base64 = await electronBasicTsjrpcClient.readWorkDirFileBase64({ filePath }, workDirTool);
  if (!base64) return undefined;

  const dataUrl = `data:${takeMediaMimeByFileName(filePath)};base64,${base64}`;
  cacheWorkDirFileDataUrl(filePath, dataUrl);

  return dataUrl;
};


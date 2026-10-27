import { electronBasicTsjrpcClient, electronWorkDirTool } from '#basis/tsjrpc.electron/basic';
import { convertFileToBase64, takeBase64FromDataUrl } from '#shared/lib/convertFileToBase64';
import { electronWorkDirAtom } from '#shared/state/electron.atoms';
import { ElectronWorkDirFolderPack } from 'shared/api/tsjrpc.electtron/basic';
import { lazyInit } from 'shared/utils/lazyInit';
import { mapObjectEntries, objectKeys } from 'shared/utils/object.utils';
import { takeFileExtension } from 'shared/utils/string.utils';
import { fontWorkDirFolder, myFilesConfig } from 'x/my-files/shared/const/myFiles';
import { MyFileType } from 'x/my-files/shared/model/enums';

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
  mediaMimeByExtensionLazy()[takeFileExtension(fileName)] ?? 'application/octet-stream';

/** Dropped fonts are registered in myFiles (which also stores them in the WorkDir `fonts` folder), not routed as media. */
export const isDroppedFontFile = (file: File) =>
  myFilesConfig[MyFileType.Font].ext.has(takeFileExtension(file.name));

export const selectWorkDir = (create?: string) =>
  electronBasicTsjrpcClient.selectDir(create ? { create } : {}, electronWorkDirTool);

export const readWorkDir = (dirPath: string): Promise<ElectronWorkDirFolderPack | nil> =>
  electronBasicTsjrpcClient.readWorkDir({ dirPath }, electronWorkDirTool);

export const createWorkDirFolder = (dirPath: string, name: string) =>
  electronBasicTsjrpcClient.createWorkDirFolder({ dirPath, name }, electronWorkDirTool);

export const ensureWorkDirFolders = (dirPath: string, names: string[]) =>
  electronBasicTsjrpcClient.ensureWorkDirFolders({ dirPath, names }, electronWorkDirTool);

export const watchWorkDir = (dirPath: string) =>
  electronBasicTsjrpcClient.watchWorkDir({ dirPath }, electronWorkDirTool);

export const saveWorkDirFiles = (dirPath: string, files: { name: string; base64: string }[]) =>
  electronBasicTsjrpcClient.saveWorkDirFiles({ dirPath, files }, electronWorkDirTool);

/** Preset folders living at the WorkDir root, keyed by media kind, the font store and the `other` fallback. */
export const workDirPresetFolders = {
  image: 'images',
  video: 'video',
  audio: 'audio',
  font: fontWorkDirFolder,
  other: 'other',
} as const;

/** Preset folder at the WorkDir root matching a file's media kind, falling back to `other` for non-media files. */
export const takeWorkDirPresetFolder = (fileName: string) =>
  workDirPresetFolders[
    takeMediaMimeByFileName(fileName).split('/')[0] as keyof typeof workDirPresetFolders
  ] ?? workDirPresetFolders.other;

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

/** Custom-protocol URL for a WorkDir file — the main process streams it, so large videos never load as base64. */
export const readWorkDirFileSrc = async (filePath: string): Promise<string | nil> => {
  const url = await electronBasicTsjrpcClient.takeWorkDirFileUrl({ filePath }, electronWorkDirTool);
  if (url) return url;

  // A restarted app forgets allowed roots, so re-watch the persisted root before giving up on the file.
  const workDir = electronWorkDirAtom.get();
  if (!workDir) return null;

  await watchWorkDir(workDir);

  return electronBasicTsjrpcClient.takeWorkDirFileUrl({ filePath }, electronWorkDirTool);
};


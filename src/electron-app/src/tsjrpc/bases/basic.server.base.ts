import { dialog } from 'electron';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { pipeline } from 'stream';
import { lazyInit } from '../../const';
import { TsjrpcElectronAppBase } from '../init/tsjrpc.base.electron';
import { electronWorkDirFileMaxBytes, ElectronBasicTsjrpcModel, ElectronWorkDirFile, ElectronWorkDirFileKind } from '../model';

const workDirNamesFileName = '.names.json';

const mediaKindByExtensionLazy = lazyInit(() => {
  const extensionsByKind: Record<ElectronWorkDirFileKind, string> = {
    image: 'jpg jpeg png gif webp avif svg bmp',
    video: 'mp4 webm mov avi mkv m4v',
    audio: 'mp3 wav ogg m4a flac aac opus',
  };

  return Object.fromEntries(
    Object.entries(extensionsByKind).flatMap(([kind, extensions]) =>
      extensions.split(' ').map(extension => [extension, kind] as const),
    ),
  ) as Partial<Record<string, ElectronWorkDirFileKind>>;
});

export const electronAppBasicTsjrpcBase =
  new (class BaseClient extends TsjrpcElectronAppBase<ElectronBasicTsjrpcModel> {
    constructor() {
      super({
        scope: 'Basic',
        methods: {
          selectFiles: async () => {
            const result = await dialog.showOpenDialog({
              properties: ['openFile', 'multiSelections'],
              filters: [
                { name: 'Изображения', extensions: ['jpg', 'png', 'gif'] },
                { name: 'Все файлы', extensions: ['*'] },
              ],
            });

            return result.canceled ? [] : result.filePaths;
          },

          selectDir: async ({ create }) => {
            const chosenDir = (
              await dialog.showOpenDialog({
                properties: ['openDirectory'],
              })
            ).filePaths[0];

            if (!chosenDir) return;

            const targetDir = create ? path.resolve(chosenDir, create) : chosenDir;
            if (create) fs.mkdirSync(targetDir, { recursive: true });

            allowedWorkDirRoots.add(path.resolve(targetDir));

            return targetDir;
          },

          readWorkDir: async ({ dirPath }) => {
            const resolvedDirPath = parseAllowedWorkDirPath(dirPath);
            if (!resolvedDirPath || !checkIsDirectoryPath(resolvedDirPath)) return null;

            const names = readWorkDirNames(resolvedDirPath);
            const folders: string[] = [];
            const files: ElectronWorkDirFile[] = [];

            let entries: fs.Dirent[];

            try {
              entries = fs.readdirSync(resolvedDirPath, { withFileTypes: true });
            } catch (error) {
              console.error('[readWorkDir]', error);
              return null;
            }

            for (const entry of entries) {
              if (entry.name.startsWith('.')) continue;

              if (entry.isDirectory()) {
                folders.push(entry.name);
                continue;
              }

              const kind = takeMediaFileKind(entry.name);
              if (!kind) continue;

              const filePath = path.resolve(resolvedDirPath, entry.name);

              try {
                files.push({
                  name: names[entry.name] ?? entry.name,
                  path: filePath,
                  kind,
                  size: fs.statSync(filePath).size,
                });
              } catch {
                // File vanished between readdir and stat — skip it.
              }
            }

            return { folders, files };
          },

          readWorkDirFileBase64: async ({ filePath }) => {
            const resolvedFilePath = parseAllowedWorkDirPath(filePath);
            if (!resolvedFilePath) return null;

            try {
              if (fs.statSync(resolvedFilePath).size > electronWorkDirFileMaxBytes) return null;
              return fs.readFileSync(resolvedFilePath).toString('base64');
            } catch {
              return null;
            }
          },

          createWorkDirFolder: async ({ dirPath, name }) => {
            const resolvedDirPath = parseAllowedWorkDirPath(dirPath);
            const cleanName = sanitizeWorkDirName(name);
            if (!resolvedDirPath || !cleanName) return null;

            const folderPath = path.resolve(resolvedDirPath, cleanName);
            fs.mkdirSync(folderPath, { recursive: true });
            allowedWorkDirRoots.add(folderPath);

            return folderPath;
          },

          ensureWorkDirFolders: async ({ dirPath, names }) => {
            const resolvedDirPath = parseAllowedWorkDirPath(dirPath);
            if (!resolvedDirPath || !Array.isArray(names)) return null;

            for (const name of names) {
              const cleanName = sanitizeWorkDirName(name);
              if (cleanName) fs.mkdirSync(path.resolve(resolvedDirPath, cleanName), { recursive: true });
            }

            return true;
          },

          saveWorkDirFiles: async ({ dirPath, files }) => {
            const resolvedDirPath = parseAllowedWorkDirPath(dirPath);
            if (!resolvedDirPath || !checkIsDirectoryPath(resolvedDirPath) || !Array.isArray(files)) return null;

            let savedCount = 0;

            for (const { name, base64 } of files) {
              const cleanName = sanitizeWorkDirName(name);
              if (!cleanName) continue;

              try {
                const buffer = Buffer.from(base64, 'base64');
                if (buffer.byteLength > workDirDropFileMaxBytes) throw new Error('File is too large');

                fs.writeFileSync(path.resolve(resolvedDirPath, cleanName), buffer);
                savedCount++;
              } catch (error) {
                console.error('[saveWorkDirFiles]', cleanName, error);
              }
            }

            return savedCount;
          },

          watchWorkDir: async ({ dirPath }) => ensureWorkDirWatcher(dirPath),
        },
      });
    }
  })();

///////////////////////////////////////////////
///////////////////////////////////////////////
///////////////////////////////////////////////

const allowedWorkDirRoots = new Set<string>();
const workDirWatchers = new Map<string, fs.FSWatcher>();
const scheduledMd5Renames = new Map<string, ReturnType<typeof setTimeout>>();
const workDirNamesWriteChains = new Map<string, Promise<unknown>>();
const pathSeparatorsRegExp = /[/\\]+/g;

const maxMd5RenameAttempts = 3;
const md5RenameRetryDelayMs = 300;

/** Dropped files are user-local, so this cap is only a sanity limit against pathological payloads. */
const workDirDropFileMaxBytes = 200 * 1024 * 1024;

/** Resolves a renderer-supplied path and rejects it unless it lives inside a root the user picked or watched. */
const parseAllowedWorkDirPath = (input: string): string | nil => {
  const resolved = path.resolve(input);

  for (const root of allowedWorkDirRoots) {
    if (resolved === root || resolved.startsWith(root + path.sep)) return resolved;
  }

  return null;
};

const delay = (ms: number) => new Promise<void>(resolve => setTimeout(resolve, ms));

const checkIsDirectoryPath = (dirPath: string) => {
  try {
    return fs.statSync(dirPath).isDirectory();
  } catch {
    return false;
  }
};

const takeMediaFileKind = (fileName: string): ElectronWorkDirFileKind | nil =>
  mediaKindByExtensionLazy()[path.extname(fileName).slice(1).toLowerCase()];

const sanitizeWorkDirName = (name: string) => {
  const cleanName = name.replace(pathSeparatorsRegExp, '').trim();
  return !cleanName || cleanName === '.' || cleanName === '..' ? '' : cleanName;
};

const readWorkDirNames = (dirPath: string): Partial<Record<string, string>> => {
  const namesPath = path.resolve(dirPath, workDirNamesFileName);
  if (!fs.existsSync(namesPath)) return {};

  try {
    return JSON.parse(fs.readFileSync(namesPath, 'utf-8')) as Partial<Record<string, string>>;
  } catch (error) {
    console.error('[readWorkDirNames]', error);
    return {};
  }
};

const writeWorkDirNames = (dirPath: string, names: Partial<Record<string, string>>) => {
  try {
    fs.writeFileSync(path.resolve(dirPath, workDirNamesFileName), JSON.stringify(names), 'utf-8');
  } catch (error) {
    console.error('[writeWorkDirNames]', error);
  }
};

/** Serializes per-directory `.names.json` read-modify-write so concurrent renames never lose entries. */
const updateWorkDirNames = (dirPath: string, patch: Partial<Record<string, string>>) => {
  const previous = workDirNamesWriteChains.get(dirPath) ?? Promise.resolve();
  const next = previous.then(() => writeWorkDirNames(dirPath, { ...readWorkDirNames(dirPath), ...patch }));

  workDirNamesWriteChains.set(dirPath, next);

  return next;
};

/** Watches a work dir recursively and md5-renames newly added video/audio files once they settle. */
const ensureWorkDirWatcher = (dirPath: string): boolean => {
  const resolvedDirPath = path.resolve(dirPath);
  if (!checkIsDirectoryPath(resolvedDirPath)) return false;

  allowedWorkDirRoots.add(resolvedDirPath);
  if (workDirWatchers.has(resolvedDirPath)) return true;

  let watcher: fs.FSWatcher;

  try {
    watcher = fs.watch(resolvedDirPath, { recursive: true }, (_event, fileName) => {
      if (!fileName) return;

      const kind = takeMediaFileKind(fileName);
      if (kind !== 'video' && kind !== 'audio') return;

      const filePath = path.resolve(resolvedDirPath, fileName);

      clearTimeout(scheduledMd5Renames.get(filePath));
      scheduledMd5Renames.set(
        filePath,
        setTimeout(() => {
          scheduledMd5Renames.delete(filePath);
          void renameMediaFileToMd5(filePath);
        }, 400),
      );
    });
  } catch (error) {
    console.error('[ensureWorkDirWatcher]', error);
    return false;
  }

  workDirWatchers.set(resolvedDirPath, watcher);
  return true;
};

const takeFileMd5 = (filePath: string) =>
  new Promise<string>((resolve, reject) => {
    const hash = crypto.createHash('md5');
    pipeline(fs.createReadStream(filePath), hash, error => (error ? reject(error) : resolve(hash.digest('hex'))));
  });

/** Renames a settled media file to `<md5>.<ext>` and records its pre-rename display name in `.names.json`. */
const renameMediaFileToMd5 = async (filePath: string, attempt = 0) => {
  if (!fs.existsSync(filePath)) return;

  const dirPath = path.dirname(filePath);
  const originalName = path.basename(filePath);

  try {
    if (attempt === 0) {
      const sizeBefore = fs.statSync(filePath).size;
      await delay(md5RenameRetryDelayMs);
      if (fs.statSync(filePath).size !== sizeBefore) throw new Error('File is still being written');
    }

    const ext = path.extname(originalName).slice(1);
    const md5Name = `${await takeFileMd5(filePath)}.${ext}`;

    if (md5Name === originalName) return;

    const targetPath = path.resolve(dirPath, md5Name);

    // Same content already stored under its md5 name — drop the freshly copied duplicate instead of cluttering the dir.
    if (fs.existsSync(targetPath)) {
      fs.unlinkSync(filePath);
      return;
    }

    fs.renameSync(filePath, targetPath);
    await updateWorkDirNames(dirPath, { [md5Name]: originalName });
  } catch (error) {
    if (attempt + 1 < maxMd5RenameAttempts) {
      await delay(md5RenameRetryDelayMs);
      await renameMediaFileToMd5(filePath, attempt + 1);
      return;
    }

    console.error('[renameMediaFileToMd5]', error);
  }
};

import { app } from 'electron';
import fs from 'fs';
import path from 'path';
import { PultFrontFile } from '../../../shared/api/tsjrpc.electtron/remote-broadcast';

const remoteFrontDirName = 'remote-front';
const activeDirName = 'active';
const stagingDirName = 'staging';
const previousDirName = 'previous';
const cacheVersionFileName = 'cache-version.json';
const maxPultFrontTotalBytes = 50 * 1024 * 1024;

const takeRemoteFrontRoot = () => path.join(app.getPath('userData'), remoteFrontDirName);
const takeActiveFrontDir = () => path.join(takeRemoteFrontRoot(), activeDirName);
const takeStagingFrontDir = () => path.join(takeRemoteFrontRoot(), stagingDirName);
const takePreviousFrontDir = () => path.join(takeRemoteFrontRoot(), previousDirName);
const takeFiniteNumber = (value: unknown): number | nil =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

let isCacheStateRecovered = false;
const recoverCrashedCacheState = () => {
  if (isCacheStateRecovered) return;
  const activeDir = takeActiveFrontDir();
  const previousDir = takePreviousFrontDir();
  if (!fs.existsSync(activeDir) && fs.existsSync(previousDir)) fs.renameSync(previousDir, activeDir);
  isCacheStateRecovered = true;
};

export const takeCachedFrontRoot = () => {
  recoverCrashedCacheState();
  return takeActiveFrontDir();
};

export const takeCachedFrontVersion = (): number => {
  try {
    const parsed: unknown = JSON.parse(
      fs.readFileSync(path.join(takeCachedFrontRoot(), cacheVersionFileName), 'utf-8'),
    );

    return takeFiniteNumber((parsed as { version?: unknown }).version) ?? 0;
  } catch {
    return 0;
  }
};

const swapStagingToActive = () => {
  const activeDir = takeActiveFrontDir();
  const stagingDir = takeStagingFrontDir();
  const previousDir = takePreviousFrontDir();

  fs.rmSync(previousDir, { recursive: true, force: true });
  if (fs.existsSync(activeDir)) fs.renameSync(activeDir, previousDir);

  try {
    fs.renameSync(stagingDir, activeDir);
  } catch (error) {
    if (!fs.existsSync(activeDir) && fs.existsSync(previousDir)) fs.renameSync(previousDir, activeDir);

    throw error;
  }

  fs.rmSync(previousDir, { recursive: true, force: true });
};

let syncedHandler: ((version: number) => void) | nil = null;

export const setPultFrontCacheSynced = (handler: (version: number) => void) => {
  syncedHandler = handler;
};

// Фронт пульта никогда не зашивается в приложение и не имеет зашитого фолбэка — при каждом старте приложения фронт сайта в electron-окне читает свежие файлы пульта из своего SW-кэша и передаёт их сюда, прямых скачиваний с сайта нет.
export const receivePultFrontFiles = ({ version, files }: { version: number; files: PultFrontFile[] }) => {
  if (!app.isPackaged || process.env.JESMYL_REMOTE_FRONT_BUILD) return;
  if (takeFiniteNumber(version) == null || !Array.isArray(files) || files.length === 0) return;
  if (version <= takeCachedFrontVersion()) return;

  try {
    const stagingDir = takeStagingFrontDir();

    fs.rmSync(stagingDir, { recursive: true, force: true });
    fs.mkdirSync(stagingDir, { recursive: true });

    let totalBytes = 0;

    for (const file of files) {
      if (typeof file.path !== 'string' || !file.path.startsWith('/'))
        throw `Недопустимый путь в манифесте пульта: ${file.path}`;
      if (typeof file.base64 !== 'string') throw `Недопустимое содержимое файла пульта: ${file.path}`;

      const targetPath = path.resolve(stagingDir, file.path.replace(/^\/+/, ''));

      if (!targetPath.startsWith(stagingDir + path.sep)) throw `Недопустимый путь в манифесте пульта: ${file.path}`;

      totalBytes += Buffer.byteLength(file.base64, 'base64');
      if (totalBytes > maxPultFrontTotalBytes) throw 'Слишком большой фронт пульта: превышен лимит в 50 МБ';

      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.writeFileSync(targetPath, Buffer.from(file.base64, 'base64'));
    }

    fs.writeFileSync(path.join(stagingDir, cacheVersionFileName), JSON.stringify({ version }), 'utf-8');

    swapStagingToActive();
    syncedHandler?.(version);
  } catch (error) {
    console.error('[pultFrontCache]', error);
  }
};

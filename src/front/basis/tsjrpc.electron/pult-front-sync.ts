import { electronRemoteBroadcastTsjrpcClientMethods } from '#basis/tsjrpc.electron/remote-broadcast.cli.methods';
import { takeBase64FromDataUrl } from '#shared/lib/convertFileToBase64';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { PultFrontFile } from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { emptyFunc } from 'shared/utils';

const pultFrontSyncSwWaitMs = 20_000;
const pultFrontSwReloadAtKey = 'pultFrontSwReloadAt';
const pultFrontSwReloadGuardMs = 15_000;

const mainWindowTool = { toWinNum: 0, winNum: 0 };

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parsePultAssetsManifest = (value: unknown): { version: number; files: string[] } | nil => {
  if (!isRecord(value)) return null;

  const version = value.version;
  const files = value.files;

  if (typeof version !== 'number' || !Number.isFinite(version)) return null;
  if (!Array.isArray(files)) return null;

  const filePaths: string[] = [];

  for (const filePath of files) {
    if (typeof filePath !== 'string' || !filePath.startsWith('/')) return null;

    filePaths.push(filePath);
  }

  return { version, files: filePaths };
};

const withTimeout = async <T>(promise: Promise<T>, message: string): Promise<T> => {
  let timeout: ReturnType<typeof setTimeout> | nil = null;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(message), pultFrontSyncSwWaitMs);
  });

  try {
    return await Promise.race([promise, timeoutPromise]);
  } finally {
    if (timeout !== null) clearTimeout(timeout);
  }
};

const waitForWorkerInstalled = (worker: ServiceWorker) =>
  new Promise<void>(resolve => {
    if (worker.state === 'installed') return resolve();

    function onStateChange() {
      if (worker.state !== 'installed') return;

      worker.removeEventListener('error', onError);
      resolve();
    }

    function onError() {
      worker.removeEventListener('statechange', onStateChange);
      resolve();
    }

    worker.addEventListener('statechange', onStateChange);
    worker.addEventListener('error', onError);
  });

const takeStoredReloadAt = () => {
  try {
    const raw = sessionStorage.getItem(pultFrontSwReloadAtKey);
    if (raw == null) return null;

    const reloadAt = Number(raw);
    return Number.isFinite(reloadAt) ? reloadAt : null;
  } catch {
    return null;
  }
};

const storeReloadAt = () => {
  try {
    sessionStorage.setItem(pultFrontSwReloadAtKey, String(Date.now()));
  } catch (error) {
    console.warn('[pultFrontSync]', error);
  }
};

const takeFreshRegistration = async (): Promise<ServiceWorkerRegistration | nil> => {
  const registration = await navigator.serviceWorker.ready;
  await registration.update().catch(emptyFunc);

  const installing = registration.installing;

  if (installing != null) {
    // После деплоя новый воркер ещё ставится — ждём установки, чтобы прочитать свежий прекэш
    await waitForWorkerInstalled(installing);
  }

  const { waiting } = registration;

  if (waiting != null && registration.active !== waiting) {
    // После деплоя страница ещё работает на старом фронте из прекэша — активируем новый SW и перезагружаем окно, чтобы свежий фронт сам передал файлы пульта
    const reloadAt = takeStoredReloadAt();

    if (reloadAt == null || Date.now() - reloadAt >= pultFrontSwReloadGuardMs) {
      const controllerChanged = new Promise<void>(resolve => {
        navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true });
      });

      storeReloadAt();
      waiting.postMessage({ type: 'SKIP_WAITING' });
      await controllerChanged;
      location.reload();

      return null;
    }
  }

  return registration;
};

const takeBlobBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(blob);
    reader.onload = () => resolve(takeBase64FromDataUrl(String(reader.result)));
    reader.onerror = () => reject('Не удалось прочитать файл пульта из SW-кэша');
  });

export const syncPultFrontFiles = async () => {
  if (!isElectronApp) return;

  try {
    const registration = await withTimeout(
      takeFreshRegistration(),
      `Service worker пульта не обновился за ${pultFrontSyncSwWaitMs} мс`,
    );
    if (registration == null) return;

    const manifestResponse = await caches.match('/pult-assets.json', { ignoreSearch: true });
    if (manifestResponse == null) {
      console.warn('[pultFrontSync] pult-assets.json не найден в SW-кэше — сайт ещё без пультового прекэша');
      return;
    }

    const manifest = parsePultAssetsManifest(await manifestResponse.json());
    if (manifest == null) return;

    const files: PultFrontFile[] = [];

    for (const filePath of manifest.files) {
      const response = await caches.match(filePath, { ignoreSearch: true });
      if (response == null) throw `Не найден в SW-кэше файл пульта: ${filePath}`;

      const blob = await response.blob();
      files.push({ path: filePath, base64: await takeBlobBase64(blob) });
    }

    await electronRemoteBroadcastTsjrpcClientMethods
      .sharePultFrontFiles({ version: manifest.version, files }, mainWindowTool)
      .catch(emptyFunc);
  } catch (error) {
    console.error('[pultFrontSync]', error);
  }
};

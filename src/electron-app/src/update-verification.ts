import { spawn, type ChildProcess } from 'child_process';
import crypto from 'crypto';
import { chmodSync, createReadStream, existsSync } from 'fs';
import path from 'path';
import type { UpdateDownloadedEvent } from 'electron-updater';
import { electronAppSmokeArg } from './const';

/** Сколько ждём smoke-запуск скачанного AppImage (включая проверку фида обновлений), прежде чем считать его нерабочим. */
const smokeTimeoutMs = 60_000;

/** Ограничение на захват логов smoke-процесса: нужен лишь хвост для диагностики. */
const smokeLogsMaxLength = 8_000;

/** Считает sha512 файла в base64 — именно в таком виде суммы приходят в latest*.yml. */
const takeFileSha512Base64 = (filePath: string) =>
  new Promise<string>((resolve, reject) => {
    const hash = crypto.createHash('sha512');

    createReadStream(filePath)
      .on('error', reject)
      .on('data', chunk => hash.update(chunk))
      .on('end', () => resolve(hash.digest('base64')));
  });

const takeUrlFileName = (url: string) => {
  try {
    return decodeURIComponent(path.basename(new URL(url, 'file://').pathname));
  } catch {
    return path.basename(url);
  }
};

/** Находит запись updateInfo.files, которая соответствует реально скачанному файлу. */
const takeDownloadedFileInfo = ({ files, downloadedFile }: UpdateDownloadedEvent) => {
  const downloadedFileName = path.basename(downloadedFile);
  const matchedFileInfo = files.find(fileInfo => takeUrlFileName(fileInfo.url) === downloadedFileName);

  if (matchedFileInfo) return matchedFileInfo;
  if (files.length === 1) return files[0];

  throw `Не найдена контрольная сумма скачанного файла "${downloadedFileName}" в updateInfo.files`;
};

/** Сверяет sha512 скачанного установщика с тем, что сервер объявил в updateInfo.files. */
const verifyDownloadedUpdateIntegrity = async (event: UpdateDownloadedEvent) => {
  if (!existsSync(event.downloadedFile)) throw `Скачанный файл обновления не найден: ${event.downloadedFile}`;

  const expectedFileInfo = takeDownloadedFileInfo(event);
  const actualSha512 = await takeFileSha512Base64(event.downloadedFile);

  if (actualSha512 !== expectedFileInfo.sha512)
    throw `Контрольная сумма скачанного обновления не совпала: ожидалось ${expectedFileInfo.sha512}, получено ${actualSha512}`;
};

const killSmokeProcess = (child: ChildProcess) => {
  try {
    if (child.pid) process.kill(-child.pid, 'SIGKILL');
  } catch {
    // Процесс уже завершился сам.
  }
};

/** Запускает скачанный AppImage с `--smoke`: приложение не открывает окна и не трогает данные пользователя. */
const verifyAppImageSmoke = (appImagePath: string) =>
  new Promise<void>((resolve, reject) => {
    chmodSync(appImagePath, 0o755);

    const child = spawn(appImagePath, [electronAppSmokeArg], {
      detached: true,
      stdio: ['ignore', 'pipe', 'pipe'],
    });

    let logs = '';
    let isSettled = false;

    const appendLogs = (chunk: unknown) => {
      if (logs.length < smokeLogsMaxLength) logs += String(chunk);
    };

    const settle = (rejectMessage: string | null) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timeout);
      killSmokeProcess(child);

      if (rejectMessage) reject(rejectMessage);
      else resolve();
    };

    const timeout = setTimeout(
      () => settle(`Smoke-запуск AppImage не уложился в ${smokeTimeoutMs} мс и был остановлен`),
      smokeTimeoutMs,
    );

    child.stdout?.on('data', appendLogs);
    child.stderr?.on('data', appendLogs);

    child.on('error', error => settle(`Не удалось запустить AppImage для smoke-проверки: ${String(error)}`));
    child.on('exit', (code, signal) => {
      if (code === 0) return settle(null);

      const exitReason = signal ? `по сигналу ${signal}` : `с кодом ${code}`;
      settle(`Smoke-запуск AppImage завершился ${exitReason}${logs ? `\n${logs}` : ''}`);
    });
  });

/**
 * Проверяет скачанное обновление до того, как оно будет помечено готовым к установке:
 * sha512 — всегда, на Linux дополнительно реальный smoke-запуск скачанного AppImage.
 */
export const verifyDownloadedUpdate = async (event: UpdateDownloadedEvent) => {
  await verifyDownloadedUpdateIntegrity(event);

  const isAppImage = process.platform === 'linux' && event.downloadedFile.toLowerCase().endsWith('.appimage');

  if (!isAppImage) {
    console.info(`✅ Целостность обновления v${event.version} подтверждена (smoke-запуск не требуется)`);
    return;
  }

  await verifyAppImageSmoke(event.downloadedFile);
  console.info(`✅ Целостность и работоспособность обновления v${event.version} подтверждены`);
};

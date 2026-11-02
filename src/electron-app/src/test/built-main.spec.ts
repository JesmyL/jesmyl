import { expect, test } from '@playwright/test';
import { spawn, type ChildProcess } from 'child_process';
import { existsSync, statSync } from 'fs';
import * as path from 'path';
import { electronAppSmokeArg } from '../const';
import { electronAppName } from '../lib';

/** Маркер успешной smoke-самопроверки из ветки isSmokeRun в src/main.ts. */
const smokeSuccessMarker = `✅ ${electronAppName} smoke: приложение готово`;

/** Любая неудача smoke-самопроверки (включая ошибку electron-updater) печатается с этим маркером и завершает процесс с кодом 1. */
const smokeFailureMarker = `❌ ${electronAppName} smoke`;

/** Сколько ждём самостоятельного выхода собранного приложения. */
const smokeTimeoutMs = 60_000;

/** Ограничение на захват логов smoke-процесса: нужен лишь хвост для диагностики. */
const smokeLogsMaxLength = 8_000;

/** Шум CI-окружения (песочница, GPU, малый /dev/shm) не относится к самой сборке. */
const noiseArgs = ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];

const updaterErrorRegExp = /electron-updater[^\n]*error|\berror\b[^\n]*electron-updater/i;

const electronAppDir = path.resolve(__dirname, '../..');
const builtMainPath = path.join(electronAppDir, 'dist/main.cjs');
const electronBinary = path.join(electronAppDir, 'node_modules/.bin/electron');

type SmokeResult = {
  exitCode: number | null;
  signal: string | null;
  stdoutLogs: string;
  stderrLogs: string;
};

/** Дописывает очередной чанк вывода, пока не достигнут лимит захвата логов. */
const appendLogs = (logs: string, chunk: unknown) => (logs.length < smokeLogsMaxLength ? logs + String(chunk) : logs);

/** Убивает всю группу процессов smoke-запуска; ESRCH означает, что процесс уже завершился сам. */
const killSmokeProcess = (child: ChildProcess) => {
  try {
    if (child.pid) process.kill(-child.pid, 'SIGKILL');
  } catch {
    // Процесс уже завершился сам.
  }
};

/** Запускает собранный main.cjs с `--smoke` и ждёт, пока приложение завершится само. */
const launchBuiltSmoke = () =>
  new Promise<SmokeResult>((resolve, reject) => {
    const child = spawn(electronBinary, [builtMainPath, electronAppSmokeArg, ...noiseArgs], {
      cwd: electronAppDir,
      detached: true,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        JESMYL_TEST_RUNNER: 'true',
      },
    });

    let stdoutLogs = '';
    let stderrLogs = '';
    let isSettled = false;

    child.stdout?.on('data', chunk => (stdoutLogs = appendLogs(stdoutLogs, chunk)));
    child.stderr?.on('data', chunk => (stderrLogs = appendLogs(stderrLogs, chunk)));

    const rejectOnce = (message: string) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timeoutTimer);
      reject(message);
    };

    const timeoutTimer = setTimeout(() => {
      killSmokeProcess(child);
      rejectOnce(
        `❌ Smoke-запуск не завершился за ${smokeTimeoutMs} мс и был остановлен.\nЛоги:\n${stdoutLogs}${stderrLogs}`,
      );
    }, smokeTimeoutMs);

    child.on('error', error => rejectOnce(`❌ Не удалось запустить ${electronBinary}: ${String(error)}`));
    child.on('close', (exitCode, signal) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timeoutTimer);
      resolve({ exitCode, signal, stdoutLogs, stderrLogs });
    });
  });

test('Собранный dist/main.cjs проходит smoke-самопроверку', async () => {
  test.setTimeout(smokeTimeoutMs + 5_000);

  if (!existsSync(electronBinary)) throw `❌ Нет electron: ${electronBinary}`;

  if (!existsSync(builtMainPath) || statSync(builtMainPath).size === 0)
    throw `❌ Нет собранного артефакта "${builtMainPath}" — сначала выполните "npm run el-compile".`;

  const { exitCode, signal, stdoutLogs, stderrLogs } = await launchBuiltSmoke();
  const combinedLogs = `${stdoutLogs}\n${stderrLogs}`;
  const exitMessage = `Smoke-запуск завершился ${signal ? `по сигналу ${signal}` : `с кодом ${exitCode}`}.\nЛоги:\n${combinedLogs}`;

  expect(exitCode, exitMessage).toBe(0);
  expect(stdoutLogs, exitMessage).toContain(smokeSuccessMarker);
  expect(combinedLogs, exitMessage).not.toMatch(updaterErrorRegExp);
  expect(stderrLogs, exitMessage).not.toContain(smokeFailureMarker);
});

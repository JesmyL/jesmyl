import { expect, test } from '@playwright/test';
import { spawn, type ChildProcess } from 'child_process';
import { existsSync, statSync } from 'fs';
import * as path from 'path';
import { electronAppSmokeArg } from '../const';
import { electronAppName } from '../lib';

const smokeFailureMarker = `❌ ${electronAppName} smoke`;

const smokeTimeoutMs = 60_000;

const smokeLogsMaxLength = 8_000;

const noiseArgs = ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];

const electronAppDir = path.resolve(__dirname, '../..');
const builtMainPath = path.join(electronAppDir, 'dist/main.cjs');
const electronBinary = path.join(electronAppDir, 'node_modules/.bin/electron');

type BrokenStdoutSmokeResult = {
  exitCode: number | null;
  signal: string | null;
  stderrLogs: string;
};

const appendLogs = (logs: string, chunk: unknown) => (logs.length < smokeLogsMaxLength ? logs + String(chunk) : logs);

const killSmokeProcess = (child: ChildProcess) => {
  try {
    if (child.pid) process.kill(-child.pid, 'SIGKILL');
  } catch {
    return;
  }
};

const launchBuiltSmokeWithBrokenStdout = () =>
  new Promise<BrokenStdoutSmokeResult>((resolve, reject) => {
    const child = spawn(electronBinary, [builtMainPath, electronAppSmokeArg, ...noiseArgs], {
      cwd: electronAppDir,
      detached: true,
      env: {
        ...process.env,
        NODE_ENV: 'production',
        JESMYL_TEST_RUNNER: 'true',
      },
    });

    child.stdout?.destroy();

    let stderrLogs = '';
    let isSettled = false;

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
        `❌ Smoke-запуск со сломанным stdout не завершился за ${smokeTimeoutMs} мс и был остановлен.\nЛоги stderr:\n${stderrLogs}`,
      );
    }, smokeTimeoutMs);

    child.on('error', error => rejectOnce(`❌ Не удалось запустить ${electronBinary}: ${String(error)}`));
    child.on('close', (exitCode, signal) => {
      if (isSettled) return;
      isSettled = true;
      clearTimeout(timeoutTimer);
      resolve({ exitCode, signal, stderrLogs });
    });
  });

test('Собранное приложение переживает сломанный stdout (EPIPE) и завершается самопроверкой успешно', async () => {
  test.setTimeout(smokeTimeoutMs + 5_000);

  if (!existsSync(electronBinary)) throw `❌ Нет electron: ${electronBinary}`;

  if (!existsSync(builtMainPath) || statSync(builtMainPath).size === 0)
    throw `❌ Нет собранного артефакта "${builtMainPath}" — сначала выполните "npm run el-compile".`;

  const { exitCode, signal, stderrLogs } = await launchBuiltSmokeWithBrokenStdout();
  const exitMessage = `Smoke-запуск со сломанным stdout завершился ${signal ? `по сигналу ${signal}` : `с кодом ${exitCode}`}.\nЛоги stderr:\n${stderrLogs}`;

  expect(exitCode, exitMessage).toBe(0);
  expect(signal, exitMessage).toBeNull();
  expect(stderrLogs, exitMessage).not.toContain('Uncaught Exception');
  expect(stderrLogs, exitMessage).not.toContain(smokeFailureMarker);
});

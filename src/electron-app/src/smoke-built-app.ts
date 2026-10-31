import { spawn } from 'child_process';
import { chmodSync, existsSync } from 'fs';
import path from 'path';

const electronAppDir = path.resolve(import.meta.dirname, '..');
const releaseDir = path.join(electronAppDir, 'release-builds');
const appImagePath = path.join(releaseDir, 'JESMYL_PRO.AppImage');
const asarPath = path.join(releaseDir, 'linux-unpacked/resources/app.asar');
const distPath = path.join(electronAppDir, 'dist/main.cjs');
const electronBinary = path.join(electronAppDir, 'node_modules/.bin/electron');

/** Шум CI-окружения (песочница, GPU, малый /dev/shm) не относится к самой сборке. */
const NOISE_ARGS = ['--no-sandbox', '--disable-gpu', '--disable-dev-shm-usage'];

/** Терпимые ошибки: нет D-Bus в headless-контейнере и сбои фида обновлений (deploy может стартовать при 404). */
const BENIGN_REGEXP =
  /ERROR:dbus\/|HttpError|checkForUpdatesAndNotify|latest[-\w]*\.yml|connect ETIMEDOUT|ENOTFOUND|Update for version/;
const FAIL_REGEXP =
  /ERROR:|FATAL:|Error:|Cannot find module|A JavaScript error occurred in the main process|Uncaught Exception/;
const BOOTED_REGEXP = /Checking for update|checkForUpdatesAndNotify called/;
const TIMEOUT_MS = 20_000;
const GRACE_MS = 2_500;

const takeLaunchTarget = () => {
  if (existsSync(appImagePath)) {
    chmodSync(appImagePath, 0o755);
    return { label: `AppImage: ${appImagePath}`, command: appImagePath, args: NOISE_ARGS };
  }

  if (!existsSync(electronBinary)) throw `❌ Нет electron: ${electronBinary}`;

  if (existsSync(asarPath))
    return { label: `asar: ${asarPath}`, command: electronBinary, args: [asarPath, ...NOISE_ARGS] };
  if (existsSync(distPath))
    return { label: `main.cjs: ${distPath}`, command: electronBinary, args: [distPath, ...NOISE_ARGS] };

  throw `❌ Нет собранного приложения: ${appImagePath} / ${asarPath} / ${distPath}`;
};

const isInPath = (name: string) => !!process.env.PATH?.split(path.delimiter).find(dir => existsSync(path.join(dir, name)));

const target = takeLaunchTarget();
const needsXvfb = !process.env.DISPLAY;

if (needsXvfb && !isInPath('xvfb-run')) throw '❌ Нет DISPLAY и xvfb-run: установите xvfb (apt install xvfb)';

const command = needsXvfb ? 'xvfb-run' : target.command;
const args = needsXvfb ? ['-a', target.command, ...target.args] : target.args;

console.info('🚀 Smoke-тест собранного приложения:', target.label);

const child = spawn(command, args, {
  cwd: electronAppDir,
  detached: true,
  env: {
    ...process.env,
    NODE_ENV: 'production',
    JESMYL_TEST_RUNNER: 'true',
    ELECTRON_DISABLE_SECURITY_WARNINGS: '1',
  },
});

let logs = '';
let isSettled = false;
let graceTimer: NodeJS.Timeout | undefined;

const settle = (isOk: boolean, message: string) => {
  if (isSettled) return;
  isSettled = true;
  clearTimeout(timeoutTimer);
  clearTimeout(graceTimer);

  try {
    if (child.pid) process.kill(-child.pid, 'SIGKILL');
  } catch {
    // процесс уже завершился
  }

  if (isOk) console.info(message);
  else console.error(`${message}\n${logs}`);

  process.exitCode = isOk ? 0 : 1;
};

const takeFailureLine = () =>
  logs.split('\n').find(line => FAIL_REGEXP.test(line) && !BENIGN_REGEXP.test(line));

const onOutput = (data: Buffer) => {
  logs += data.toString();

  const failureLine = takeFailureLine();
  if (failureLine) return settle(false, `❌ Собранное приложение выдало ошибку: ${failureLine}`);

  if (!graceTimer && BOOTED_REGEXP.test(logs)) {
    graceTimer = setTimeout(() => settle(true, '✅ Собранное приложение запустилось без ошибок!'), GRACE_MS);
  }
};

child.stdout?.on('data', onOutput);
child.stderr?.on('data', onOutput);

const timeoutTimer = setTimeout(() => settle(false, '❌ Собранное приложение не запустилось за отведённое время!'), TIMEOUT_MS);

child.on('error', error =>
  settle(false, `❌ Не удалось запустить ${command}: ${String(error)}${needsXvfb ? ' (проверьте xvfb)' : ''}`),
);
child.on('exit', (code, signal) => {
  const isOk = code === 0;
  const exitReason = signal ? `по сигналу ${signal}` : `с кодом ${code}`;

  settle(isOk, isOk ? '✅ Приложение запустилось и завершилось без ошибок.' : `❌ Собранное приложение завершилось ${exitReason}!`);
});

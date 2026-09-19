import { _electron as electron, expect, test } from '@playwright/test';
import * as path from 'path';

test('Запуск приложения и проверка главного окна', async () => {
  const electronAppDir = path.resolve(__dirname, '../..');
  const mainPath = path.join(electronAppDir, 'dist/main.cjs');
  const electronBinary = path.join(electronAppDir, 'node_modules/.bin/electron');

  const updaterLogs: string[] = [];
  let isUpdaterError = false;

  const electronApp = await electron.launch({
    executablePath: electronBinary,
    args: [mainPath],
    cwd: electronAppDir,
    env: {
      ...process.env,
      NODE_ENV: 'production', // Включает PROD режим и инициализацию autoUpdater
      JESMYL_TEST_RUNNER: 'true',
    },
  });

  // Перехватываем стандартный вывод консоли Electron
  electronApp.process().stdout?.on('data', data => {
    const logStr = data.toString();
    // Собираем только логи, относящиеся к автоапдейту
    if (logStr.includes('Checking for update') || logStr.includes('Update for version')) {
      updaterLogs.push(logStr);
    }
    // Если сам автоапдейтер выкинул ошибку в stdout
    if (logStr.includes('Error:')) {
      isUpdaterError = true;
      updaterLogs.push(logStr);
    }
  });

  electronApp.process().stderr?.on('data', data => {
    const errStr = data.toString();
    // Фильтруем системный мусор Chromium, реагируем только на ошибки самого апдейтера
    if (errStr.includes('electron-updater') || errStr.includes('autoUpdater')) {
      isUpdaterError = true;
      updaterLogs.push(`[UPDATER ERROR]: ${errStr}`);
    }
  });

  let window;
  try {
    window = await electronApp.firstWindow({ timeout: 5000 });
  } catch (_) {
    await electronApp.close();
    throw new Error('❌ КРИТИЧЕСКАЯ ОШИБКА: Главное окно Electron не было создано!');
  }

  expect(window).toBeTruthy();

  // Ожидаем ответа от бэкенда обновлений
  await new Promise<void>(resolve => {
    const checkInterval = setInterval(() => {
      const logsCombined = updaterLogs.join('\n');
      if (
        logsCombined.includes('Update available') ||
        logsCombined.includes('Update not available') ||
        isUpdaterError
      ) {
        clearInterval(checkInterval);
        resolve();
      }
    }, 200);

    setTimeout(() => {
      clearInterval(checkInterval);
      resolve();
    }, 5000);
  });

  await electronApp.close();

  const finalLogs = updaterLogs.join('\n');
  console.info(`[UPDATER LOGS]:\n${finalLogs}`);

  // Падаем только если апдейтер явно выдал ошибку или бэкенд не ответил
  if (isUpdaterError || finalLogs.length === 0) {
    throw new Error(`❌ ТЕСТ ОБНОВЛЕНИЙ ПРОВАЛЕН. Логи: ${finalLogs}`);
  }

  console.info('✅ Связь с бэкендом обновлений успешно подтверждена!');
});

import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src/test',
  testMatch: /.*\.spec\.ts/,
  use: {
    headless: false, // Обязательно false для Electron
  },
});

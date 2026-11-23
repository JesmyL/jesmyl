import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const frontBuildPultPath = fileURLToPath(new URL('../../../build/pult.html', import.meta.url));

if (!fs.existsSync(frontBuildPultPath))
  throw `Pult build not found (Сборка пульта не найдена): ${frontBuildPultPath}\nRun "npm run build" before the Electron build (Выполните "npm run build" перед сборкой Electron).`;

console.log(`Pult build OK (Сборка пульта на месте): ${frontBuildPultPath}`);

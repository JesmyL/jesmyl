import fs from 'fs';
import path from 'path';

const appPackagePath = path.resolve('src/electron-app/package.json');
const appPkg = JSON.parse(fs.readFileSync(appPackagePath, 'utf-8'));

appPkg.version = `0.0.${Math.floor(Date.now() / 60000)}`;
fs.writeFileSync(appPackagePath, JSON.stringify(appPkg, null, 2) + '\n');

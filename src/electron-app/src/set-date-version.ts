import fs from 'fs';
import path from 'path';

const now = new Date();
const yy = String(now.getUTCFullYear()).slice(-2);
const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
const dd = String(now.getUTCDate()).padStart(2, '0');
const HH = String(now.getUTCHours()).padStart(2, '0');
const MM = String(now.getUTCMinutes()).padStart(2, '0');

const dateVersion = `${yy}.${mm}${dd}.${HH}${MM}`;

const appPackagePath = path.resolve('src/electron-app/package.json');
const appPkg = JSON.parse(fs.readFileSync(appPackagePath, 'utf-8'));

appPkg.version = dateVersion;
fs.writeFileSync(appPackagePath, JSON.stringify(appPkg, null, 2) + '\n');

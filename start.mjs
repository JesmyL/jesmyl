import { exec } from 'child_process';
import fs from 'fs';
import { promisify } from 'util';
import { deployPathsDict, projectConfig } from './paths.mjs';

const startProcess = async () => {
  const rootDir = `/var/www/${projectConfig.dns}/`;

  [systemdPath, rootDir].forEach(makeDirExistsChecker(''));
  Object.keys(deployPathsDict).concat(['down']).forEach(makeDirExistsChecker(rootDir));

  await run(`sudo chmod 755 ${rootDir}`, 'root chmod');

  fs.writeFileSync(
    `${systemdPath}/jesmyl_soki.service`,
    `[Unit]
Description=The Soki Service

[Service]
Restart=on-failure
RestartSec=5s
ExecStart=node /var/www/${projectConfig.dns}/back.index.cjs`,
    () => {},
  );

  const scripts = `
    "relog": "fuser -k 443/tcp & fuser -k 80/tcp & node /var/www/${projectConfig.dns}/back.index.cjs",
    "re-start": "fuser -k 443/tcp & fuser -k 80/tcp & systemctl restart jesmyl_soki",
    "re-status": "systemctl status jesmyl_soki",
    "relog-s": "fuser -k 3359/tcp & node /var/www/sub/back.index.cjs",
    "re-start-s": "systemctl restart jsub",
    "re-status-s": "systemctl status jsub",
    "x": "chmod +x /var/www/${projectConfig.dns}/assets/"
`;

  fs.writeFileSync('/package.json', `{"scripts": {${scripts}}}`, () => {});

  fs.writeFileSync(
    `${rootDir}/package.json`,
    `
{
  "dependencies": {
    "jsonwebtoken": "^9.0.2",
    "node-schedule": "^2.1.1",
    "ws": "^8.18.3"
  },
  "scripts": {${scripts}},
  "name": "back",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "keywords": [],
  "author": "",
  "license": "ISC"
}
`,
    () => {},
  );

  console.info(`
    // Натравить айпи на домен и установить сертификаты:
      sudo apt update
      sudo apt install certbot
      sudo certbot certonly --standalone -d ${projectConfig.dns}
    // Выполнить код в условии (!'do it once') в файле start.mjs
  `);

  if (!'do it once') {
    await run(
      `(corntab -l 2>/dev/null; echo '0 3 * * 1 certbot renew --pre-hook "systemctl stop jesmyl_soki" --post-hook "systemctl start jesmyl_soki"')`,
    );
  }
};

///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////
///////////////////////////////////////////

const execPromise = promisify(exec);

const run = async (command, description = command) => {
  console.info(`\x1b[36m[Процесс] ${description}...\x1b[0m`);

  try {
    const { stdout, stderr } = await execPromise(command, { timeout: 300000 });
    if (stdout) console.info(stdout);
    if (stderr && !stderr.includes('WARNING')) console.warn(`\x1b[33m[Предупреждение]: ${stderr}\x1b[0m`);
    console.info(`\x1b[32m[Успешно]: ${description}\x1b[0m\n`);
  } catch (error) {
    console.error(`\x1b[31m[Успешно]: ${description}\x1b[0m\n`);
    console.error(error.message);
    throw error;
  }
};

const systemdPath = '/etc/systemd/system';

const makeDirExistsChecker = rootDir => dir => {
  if (fs.existsSync(`${rootDir}${dir}`)) return;
  const parts = dir.split('/');

  const mk = index => {
    const currentDir = `${rootDir}${parts.slice(0, index).join('/')}`;

    if (!fs.existsSync(currentDir))
      fs.mkdir(currentDir, error => {
        throw error;
      });

    if (index === parts.length) return;

    mk(index + 1);
  };

  mk(1);
};

startProcess();

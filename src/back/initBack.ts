import fs from 'fs';
import { hostConfig } from 'shared/api';
import { Do } from 'shared/enums';
import { wait } from 'shared/utils';
import { checkIsStartsWith } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { deployPathsBasicDict } from '../../paths.basic';
import { hostCwdOptions, systemdPath } from './const';
import { lazyEnvJson } from './envJson';
import { makeCyanLogText, makeGreenLogText, makeYellowLogText, rewriteAndDo, runCommand } from './utils.exec';

export const initBack = async () => {
  const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, hostRootDir } = lazyEnvJson();

  fs.mkdirSync(systemdPath, { recursive: true });
  fs.mkdirSync(hostRootDir, { recursive: true });

  objectKeys({ ...deployPathsBasicDict, down: '' }).forEach(dir => {
    const cleanDir = checkIsStartsWith(dir, '/') ? dir : (`/${dir}` as const);
    fs.mkdirSync(`${hostRootDir}${cleanDir}`, { recursive: true });
  });

  await runCommand(`sudo chmod 755 ${hostRootDir}/`, 'root chmod');

  try {
    await rewriteAndDo(
      `${systemdPath}/jesmyl_soki.service`,
      `
[Unit]
Description=The Soki Service

[Service]
Restart=on-failure
RestartSec=5s
WorkingDirectory=${hostRootDir}
ExecStart=node ${hostRootDir}/back.index.cjs`,
      () => runCommand('sudo systemctl daemon-reload'),
    );
  } catch {
    //
  }

  const scripts = {
    scripts: {
      relog: `fuser -k 443/tcp & fuser -k 80/tcp & node ${hostRootDir}/back.index.cjs`,
      're-start': 'fuser -k 443/tcp & fuser -k 80/tcp & systemctl restart jesmyl_soki',
      're-status': 'systemctl status jesmyl_soki',
      'relog-s': 'fuser -k 3359/tcp & node /var/www/sub/back.index.cjs',
      're-start-s': 'systemctl restart jsub',
      're-status-s': 'systemctl status jsub',
    },
  };

  try {
    await rewriteAndDo('/package.json', JSON.stringify(scripts, null, 2));
  } catch {
    //
  }

  await rewriteAndDo(
    `${hostRootDir}/package.json`,
    JSON.stringify(
      {
        name: 'back',
        version: '1.0.0',
        description: '',
        main: 'index.js',
        keywords: [],
        author: '',
        license: 'ISC',
        ...scripts,
        dependencies: {
          ws: '^8.18.3',
          postgres: '^3.4.9',
          jsonwebtoken: '^9.0.2',
          'node-schedule': '^2.1.1',
          'drizzle-orm': '^0.45.2',
          'drizzle-kit': '^0.31.10',
        },
      },
      null,
      2,
    ),
  );

  if (!Do.It) {
    await runCommand('sudo apt update', '', hostCwdOptions);
    await runCommand('sudo apt install -y docker.io docker-compose-v2', '', hostCwdOptions);
    await runCommand('sudo systemctl enable --now docker', '', hostCwdOptions);
    await runCommand('sudo usermod -aG docker $USER', '', hostCwdOptions);
  }

  if (Do.It) {
    const dockerComposeFileName = `${hostRootDir}/docker-compose.yml`;

    await rewriteAndDo(
      dockerComposeFileName,
      `services:
  postgres:
    image: postgres:15-alpine
    container_name: drizzle-postgres
    restart: always
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    ports:
      - "${DB_PORT}:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
`,
      async () => {
        await runCommand(`sudo docker compose -f ${dockerComposeFileName} down -v`).catch(() => {});
        await runCommand(
          `sudo docker compose -f ${dockerComposeFileName} up -d`,
          'Запуск контейнера PostgreSQL',
          hostCwdOptions,
        );
      },
    );

    console.info(makeCyanLogText('[Процесс] Динамическое ожидание инициализации PostgreSQL базы...'));

    let isDbReady = false;
    let attempts = 0;
    const maxAttempts = 15;

    while (!isDbReady && attempts < maxAttempts) {
      attempts++;
      try {
        await runCommand(
          `sudo docker compose -f ${dockerComposeFileName} exec postgres pg_isready -U postgres`,
          '',
          hostCwdOptions,
        );
        isDbReady = true;
      } catch {
        console.info(
          makeYellowLogText(`[Инфо] База данных создается и настраивается... Попытка ${attempts}/${maxAttempts}`),
        );
        await wait(2000);
      }
    }

    if (!isDbReady) {
      throw new Error(
        'Критическая ошибка: PostgreSQL не успел запуститься. Проверьте логи командой `sudo docker compose logs`',
      );
    }

    console.info(makeGreenLogText('[Успешно] PostgreSQL база готова к работе'));
  }

  console.info(`
    // 1. Натравить айпи на домен и установить сертификаты:
      sudo apt update
      sudo apt install certbot
      sudo certbot certonly --standalone -d ${hostConfig.host}
      (crontab -l 2>/dev/null; echo '0 3 * * 1 certbot renew --pre-hook "systemctl stop jesmyl_soki" --post-hook "systemctl start jesmyl_soki"') | crontab -
  `);
};

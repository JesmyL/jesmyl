import fs from 'fs';
import { hostConfig } from 'shared/api';
import { Do } from 'shared/enums';
import { checkIsStartsWith } from 'shared/utils/checkIs';
import { objectKeys } from 'shared/utils/object.utils';
import { deployPathsBasicDict } from '../../paths.basic';
import { hostCwdOptions, systemdPath } from './const';
import { lazyEnvJson } from './envJson';
import { makeCyanLogText, makeGreenLogText, makeYellowLogText, rewriteAndDo, runCommand } from './utils.exec';

export const initBack = async () => {
  const { DB_USER, DB_NAME, DB_PASSWORD, DB_PORT, hostRootDir, envFilePath } = lazyEnvJson();

  fs.mkdirSync(systemdPath, { recursive: true });
  fs.mkdirSync(hostRootDir, { recursive: true });

  objectKeys({ ...deployPathsBasicDict, down: '' }).forEach(dir => {
    const cleanDir = checkIsStartsWith(dir, '/') ? dir : (`/${dir}` as const);
    fs.mkdirSync(`${hostRootDir}${cleanDir}`, { recursive: true });
  });

  try {
    await runCommand(`sudo chmod 755 ${hostRootDir}/`, 'root chmod');
    await runCommand(`sudo chmod 600 ${envFilePath}`, 'secure env json');
  } catch {
    //
  }

  try {
    await rewriteAndDo(
      '/etc/logrotate.d/rsyslog',
      `/var/log/syslog
/var/log/mail.log
/var/log/kern.log
/var/log/auth.log
/var/log/user.log
/var/log/cron.log
{
  su root syslog
  size 50M
  rotate 2
  missingok
  notifempty
  compress
  delaycompress
  sharedscripts
  postrotate
          /usr/lib/rsyslog/rsyslog-rotate
  endscript
}`,
      async () => {
        await runCommand('sudo logrotate -f /etc/logrotate.d/rsyslog');
        await runCommand('sudo sed -i "s/#SystemMaxUse=/SystemMaxUse=100M/g" /etc/systemd/journald.conf');
        await runCommand('sudo sed -i "s/SystemMaxUse=.*/SystemMaxUse=100M/g" /etc/systemd/journald.conf');
        await runCommand('sudo systemctl restart systemd-journald');
        await runCommand('sudo journalctl --vacuum-size=100M');
      },
    );
  } catch {
    //
  }

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
ExecStart=node ${hostRootDir}/back.index.cjs
StandardOutput=journal
StandardError=journal
LogRateLimitIntervalSec=30s
LogRateLimitBurst=1000`,
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
    await runCommand('sudo apt install -y postgresql postgresql-contrib', '', hostCwdOptions);
    await runCommand('sudo systemctl enable --now postgresql', '', hostCwdOptions);
  }

  if (Do.It) {
    console.info(makeCyanLogText('[Процесс] Проверка и настройка локального PostgreSQL...'));

    try {
      await runCommand(
        `sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD '${DB_PASSWORD}';"`,
        'alter user with password',
      );
      await runCommand(
        `sudo -u postgres psql -lqt | cut -d \\| -f 1 | grep -qw ${DB_NAME} || sudo -u postgres psql -c "CREATE DATABASE ${DB_NAME} OWNER ${DB_USER};"`,
      );

      const pgHbaPath = '/etc/postgresql/*/main/pg_hba.conf';
      await runCommand(`echo "host all all 127.0.0.1/32 md5" | sudo tee -a ${pgHbaPath} > /dev/null`);
      await runCommand(`echo "host all all ::1/128 md5" | sudo tee -a ${pgHbaPath} > /dev/null`);
      await runCommand('sudo systemctl restart postgresql');
    } catch {
      console.error(makeYellowLogText('[Ошибка] Не удалось настроить базу данных и авторизацию'));
    }

    if (DB_PORT !== '5432') {
      try {
        await runCommand(`sudo sed -i "s/#port = 5432/port = ${DB_PORT}/g" /etc/postgresql/*/main/postgresql.conf`);
        await runCommand(`sudo sed -i "s/port = .*/port = ${DB_PORT}/g" /etc/postgresql/*/main/postgresql.conf`);
        await runCommand('sudo systemctl restart postgresql');
      } catch {
        //
      }
    }

    console.info(makeGreenLogText('[Успешно] Локальная база PostgreSQL готова к работе'));
  }

  console.info(`
    // Натравить айпи на домен и установить сертификаты:
      sudo apt update
      sudo apt install certbot
      sudo certbot certonly --standalone -d ${hostConfig.host}
      (crontab -l 2>/dev/null; echo '0 3 * * 1 certbot renew --pre-hook "systemctl stop jesmyl_soki" --post-hook "systemctl start jesmyl_soki"') | crontab -
  `);

  console.info(`# Для создания файла подкачки на 1 ГБ    
sudo fallocate -l 1G /swapfile
sudo chmod 600 /swapfile

sudo mkswap /swapfile
sudo swapon /swapfile

echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab`);
};

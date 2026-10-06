# Ansible для Jesmyl

Плейбук инициализации сервера и деплоя, повторяющий логику `src/back/initBack.ts`.

## Файлы

```
ansible/
├── deploy.yml                    # основной плейбук (init + deploy)
├── inventory.ini                 # хосты и переменные
├── README.md
└── templates/
    ├── env.json.j2               # {{ host_root_dir }}/.env.json
    ├── jesmyl_soki.service.j2    # systemd-юнит
    └── package.json.j2           # package.json бэкенда
```

## Требования

- Управляющая машина: `ansible` (>= 2.14), доступ по SSH к серверу (root или sudo без пароля).
- Коллекций сверх `ansible.builtin` не требуется.
- На управляющей машине до деплоя должны быть собран **frontend** и **бэкенд**:

```bash
npm run build                       # frontend -> ./build/
npx tsx do/build-back-index.ts      # -> src/back/back.index.cjs
```

## Настройка инвентори

Откройте `inventory.ini` и задайте:

- `ansible_host` — IP или DNS сервера;
- `host` — домен (например, `jesmyl.ru`);
- `DB_USER`, `DB_NAME`, `DB_PASSWORD`, `DB_PORT` (по умолчанию `5432`);
- `SECURE_KEY`, `isProd`;
- при необходимости `app_port`.

`host_root_dir` вычисляется автоматически: `/var/www/{{ host }}`.

## Запуск

Полная инициализация сервера (пакеты, PostgreSQL, каталоги, systemd, certbot и т.д.):

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml
```

Только копирование собранных артефактов на сервер:

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml --tags deploy
```

Только этап инициализации (без копирования артефактов):

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml --tags init
```

Проверка без изменений:

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml --check --diff
```

## Что делает плейбук (`init`)

1. `apt update` и установка `postgresql`, `postgresql-contrib`, `certbot`, `nodejs`, `npm`; `systemctl enable --now postgresql`.
2. Создание `{{ host_root_dir }}` и подкаталогов из `paths.basic.ts`; права `755`.
3. Генерация `{{ host_root_dir }}/.env.json` (права `0600`) — **только если файла ещё нет**, секреты не перезаписываются.
4. PostgreSQL: пароль пользователя `postgres`, создание БД при отсутствии, добавление в `pg_hba.conf` строк `host all all 127.0.0.1/32 md5` и `::1/128 md5`, смена порта в `postgresql.conf` (если `DB_PORT != 5432`), перезапуск.
5. Ротация логов: `/etc/logrotate.d/rsyslog` (size 50M, rotate 2, compress), `SystemMaxUse=100M` для journald, перезапуск `systemd-journald` и `journalctl --vacuum-size=100M`.
6. SWAP 2 ГБ в `/swapfile`, если его ещё нет (права 600, `mkswap`, `swapon`, запись в `/etc/fstab`).
7. systemd-юнит `/etc/systemd/system/jesmyl_soki.service` (`MemoryMax=550M`, `MemoryHigh=500M`, `Restart=on-failure`), `daemon-reload`, `enable --now`.
8. `{{ host_root_dir }}/package.json` и `npm i` при отсутствии `node_modules`.
9. `certbot certonly --standalone -d {{ host }}` при отсутствии сертификата и cron-задача еженедельного обновления.

Идемпотентность: повторный запуск не меняет уже настроенное. Ошибки шагов, которые `initBack.ts` проглатывает, помечены `failed_when: false`.

## Что делает плейбук (`deploy`)

- Копирует содержимое локального `build/` в `{{ host_root_dir }}/`.
- Копирует `src/back/back.index.cjs` в `{{ host_root_dir }}/back.index.cjs`.
- Если артефакты локально не собраны — выводит предупреждение и ничего не копирует.

## Замечания

- Сертификат выпускается в режиме `--standalone` (нужен свободный порт 80). Если сервис уже занимает порт, остановите его перед первым выпуском сертификата.
- `app_port` носит справочный характер: initBack жёстко использует порты 80/443/4446 в скриптах `relog`/`re-start`.
- После первого деплоя проверьте сервис: `systemctl status jesmyl_soki` и `journalctl -u jesmyl_soki -n 100`.

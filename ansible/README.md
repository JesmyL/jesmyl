# Ansible: провижининг и деплой jesmyl на произвольный хост

Провижининг и деплой любого хоста **одной командой**, без правки inventory и
`group_vars`. Хост и IP передаются через переменные окружения, а динамический
инвентарь `inventory.py` строит всю модель хоста на лету.
Плейбуки повторяют (идемпотентно) логику `src/back/initBack.ts` и
`do/deploy-the-code.ts`.

```bash
cd ansible
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml --ask-vault-pass
```

## Структура

```
ansible/
├── ansible.cfg                     # inventory=inventory.py, remote_user=root, host_key_checking=False
│                                   #   + ssh_common_args=-o StrictHostKeyChecking=accept-new
├── inventory.py                    # динамический инвентарь (TARGET_HOST/TARGET_IP)
├── group_vars/target/
│   ├── vars.yml                    # несекретные переменные (порты, маппинг секретов)
│   └── vault.yml                   # секреты (ansible-vault, общие для всех хостов)
├── playbooks/
│   ├── all.yml                     # ЕДИНАЯ точка входа: provision + backend + frontend
│   ├── provision.yml               # одноразовый провижининг сервера
│   ├── deploy-backend.yml          # сборка + back.index.cjs и т.д. → сервер
│   └── deploy-frontend.yml         # build/ → /var/www/<host>/build
└── templates/
    ├── jesmyl_soki.service.j2      # systemd-юнит
    ├── env.json.j2                 # {{ app_dir }}/.env.json (chmod 600)
    └── package.json.j2             # {{ app_dir }}/package.json
```

## Как задаётся хост

`inventory.py` (stdlib-only, исполняемый) читает `TARGET_HOST` / `TARGET_IP`
(или флаги `--target-host` / `--target-ip`) и отдаёт один хост в группе `target`:

- `host` — домен (например `we-in.ru`);
- `ip` — IP сервера (имя хоста в инвентаре и `ansible_host`);
- `app_dir` — `/var/www/{{ host }}`.

Из этих значений выводится всё остальное: каталог приложения, `certbot -d`,
`DB_HOST` (по умолчанию = `ip`, см. ниже). Никаких `we-in.ru`/IP в
`playbooks/` и `group_vars/` нет — деплой host-agnostic.

Так как `inventory.py` лежит рядом с `group_vars/`, Ansible сам подхватывает
`group_vars/target/`. Путь `inventory = inventory.py` в `ansible.cfg` считается
относительно самого конфига, поэтому запуск из корня репозитория тоже работает
(достаточно указать `ANSIBLE_CONFIG`):

```bash
cd /home/gfirf/Documents/pro/jesmyl
ANSIBLE_CONFIG=ansible/ansible.cfg \
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 \
  ansible-playbook ansible/playbooks/all.yml --ask-vault-pass
```

Скрипт можно вызвать и вручную (например, для отладки инвентаря); флаги
`--target-host` / `--target-ip` — альтернатива переменным окружения:

```bash
ansible/inventory.py --target-host we-in.ru --target-ip 121.127.37.119
```

## Требования

- `ansible >= 2.14`; коллекция `community.postgresql` (`ansible-galaxy collection install community.postgresql`).
- SSH-доступ root к серверу.
- На сервере предустановлен `node`/`npm` (systemd `ExecStart=node ...`).
- Локально собран frontend перед деплоем: `npm run build`; backend
  `deploy-backend.yml` собирает сам.

## Секреты

`group_vars/target/vault.yml` пока содержит плейсхолдеры `CHANGE_ME`. Плейбуки
падают, если секреты не заданы (fail fast). Создайте зашифрованный файл:

```bash
cd ansible
ansible-vault create group_vars/target/vault.yml
```

Значения ключей (`vault_db_user`, `vault_db_password`, `vault_db_name`,
`vault_db_port`, `vault_secure_key`, `vault_is_prod`) можно взять из
`src/back/.env.server.json`. Секреты **общие для всех хостов**; чтобы сменить их
(в т.ч. при переезде на новый хост) — `ansible-vault edit group_vars/target/vault.yml`.

`DB_HOST` в `.env.json` по умолчанию равен `ip` сервера из инвентаря. Если нужен
другой адрес БД, раскомментируйте `vault_db_host` в `vault.yml`.

## Запуск

Команды выполняются **из каталога `ansible/`**, чтобы подхватились `ansible.cfg`
и `group_vars`:

```bash
cd ansible

# Всё сразу: провижининг + backend + frontend (одной командой)
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml --ask-vault-pass

# только этапы (теги all.yml)
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml --tags backend  --ask-vault-pass
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml --tags frontend   # нужен собранный build/; vault не нужен
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml --skip-tags frontend --ask-vault-pass

# только провижининг (внутренние теги provision.yml: packages, postgres, swap, certs, systemd, deploy)
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/provision.yml --tags postgres --ask-vault-pass

# пропустить выпуск сертификатов
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/all.yml --skip-tags certs --ask-vault-pass
```

Проверка синтаксиса и dry-run (все плейбуки, без подключения к серверу):

```bash
cd ansible
for p in provision deploy-backend deploy-frontend all; do
  TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook --syntax-check playbooks/$p.yml
done
TARGET_HOST=we-in.ru TARGET_IP=121.127.37.119 ansible-playbook playbooks/provision.yml --check --diff --ask-vault-pass
```

Сборка артефактов (если запускаете этапы по отдельности):

```bash
npm run build                    # frontend -> ./build/ (перед --tags frontend)
# backend-артефакты собирает deploy-backend.yml (тег build)
```

## Согласование с host-configs

Для того же хоста в репозитории есть `host-configs/<host>.json` (например
`host-configs/we-in.ru.json` = `{"ip": "..."}`). `freshHostConfig.ts` строит из
него корневой `host-config.json` = `{ip, host}` для локального тулинга. При
добавлении нового хоста заведите `host-configs/<host>.json`, чтобы локальные
`do/*`-скрипты видели тот же таргет, что и Ansible.

## Legacy: старый флоу jesmyl.ru

Старые файлы оставлены нетронутыми и **не используются** новым флоу:

- `deploy.yml` + `inventory.ini` — старый плейбук jesmyl.ru (самодостаточный,
  собственные `vars` в inventory, групповой хост `jesmyl`);
- `README.jesmyl.ru.md` — его описание.

Они запускаются только с явным `-i`:

```bash
ansible-playbook -i ansible/inventory.ini ansible/deploy.yml --tags init
```

`ansible.cfg` по умолчанию указывает на `inventory.py`, поэтому legacy-плейбук
обязательно требует `-i inventory.ini`.

## Замечания

- `drizzle push` запускается с `--force`: без него drizzle-kit ждёт интерактивного
  подтверждения и подвешивает Ansible.
- Первый выпуск сертификата `certbot --standalone` требует свободный порт 80; если
  сервис уже занимает порт, остановите его (`systemctl stop jesmyl_soki`) перед
  провижинингом.
- Провижининг создаёт `.env.json` только при отсутствии (не перезаписывает секреты);
  `deploy-backend.yml` рендерит `.env.json` из vault как источник истины.
- Аналог ручного `do/deploy-the-code.ts`: `all.yml` (или `deploy-backend.yml` /
  `deploy-frontend.yml` по отдельности).

import webpush from 'web-push';

const { publicKey, privateKey } = webpush.generateVAPIDKeys();

console.info(
  [
    'VAPID-ключи для web-push сгенерированы.',
    '',
    'Добавьте их в src/back/.env.json (и в .env.json на сервере):',
    '',
    `  "VAPID_PUBLIC_KEY": "${publicKey}",`,
    `  "VAPID_PRIVATE_KEY": "${privateKey}",`,
    '  "VAPID_SUBJECT": "mailto:jesmyl.space@yandex.ru"',
    '',
    'Публичный ключ отдаётся фронтенду через метод Index.getPushVapidPublicKey.',
    'Приватный ключ не покидает сервер и используется только для отправки уведомлений.',
  ].join('\n'),
);

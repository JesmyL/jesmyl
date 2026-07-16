import fs from 'fs';
import path from 'path';
import { hostConfig } from 'shared/api';
import { iife } from 'shared/utils';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import * as jsonForType from './.env.json';
import { makeCyanLogText, makeGreenLogText, makeRedLogText, makeYellowLogText } from './utils.exec';

export const hostRootDir = iife(() => {
  const dir = [`/var/www/${hostConfig.host}` as const, path.resolve('./src/back'), path.resolve()].find(dir =>
    fs.existsSync(path.resolve(dir, 'root-orientir.js')),
  );

  if (!dir) throw makeRedLogText('Корневая директория не найдена');

  return dir;
});

const cacheDict: Record<
  string,
  typeof jsonForType & {
    envFilePath: string;
    dbUrl: string;
    hostRootDir: string;
  }
> = {};

export const lazyEnvJson = (filePostfix: '' | `.${string}` = '') => {
  if (cacheDict[filePostfix]) return cacheDict[filePostfix];

  const envFilePath = `${hostRootDir}/.env${filePostfix}.json` as const;

  const emptyEnvDict: typeof jsonForType = {
    DB_USER: '',
    DB_PASSWORD: '',
    DB_NAME: '',
    DB_PORT: '',
    DB_HOST: '',
    SECURE_KEY: '',

    isProd: false,
  };

  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, JSON.stringify(emptyEnvDict));

    console.info(
      `${makeCyanLogText('[Конфигурация]', '')} ${makeYellowLogText(`Был успешно инициализирован файл ${envFilePath}`)}`,
    );
  }

  const envJson: typeof jsonForType = JSON.parse(fs.readFileSync(envFilePath, 'utf-8'));
  const emptyFields: string[] = [];
  const invalidValuesSet = new Set<unknown>([null, undefined, '']);

  forEachObjectEntries(emptyEnvDict, key => {
    if (invalidValuesSet.has(envJson[key])) emptyFields.push(key);
  });

  if (emptyFields.length) {
    throw new Error(
      makeRedLogText(
        `Заполните переменные окружения (${emptyFields.join(', ')}) в файле '${envFilePath}' и запустите скрипт заново.`,
      ),
    );
  }

  console.info(makeGreenLogText('[Успешно]: Файл .env.json проверен, все обязательные поля заполнены.\n'));

  const dbUrl =
    `postgres://${envJson.DB_USER}:${envJson.DB_PASSWORD}@${envJson.DB_HOST}:${envJson.DB_PORT}/${envJson.DB_NAME}` as const;

  return (cacheDict[filePostfix] = {
    ...envJson,
    envFilePath,
    dbUrl,
    hostRootDir,
  });
};

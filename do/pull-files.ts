import { exec } from 'child_process';
import fs from 'fs';
import { hostConfig } from '../freshHostConfig';
import { Do } from '../src/shared/enums';
import {
  jsonStringify,
  parsePulledFileDatas,
  pullFilesExpressRoutePath,
  pullFilesExpressSecretQueryName,
  pullPushFileDirNameNet,
} from './push-pull.utils';
import * as secret from './secret.json';

const execAsync = (stringCommand: string) => {
  console.info('RUN', stringCommand);

  return new Promise((res, rej) =>
    exec(stringCommand, error => {
      if (error) rej(error);
      else res(0);
    }),
  );
};

if (!Do.It) {
  /** @deprecated */
  const pull = async () => {
    const paths = [
      //
      ['apps/index', 'rights'],
      ['apps/q'],
      ['apps/q/blanks'],
      ['apps/storages/list'],
    ];

    const joinPath = (listPaths: string[]) => listPaths.filter(i => i).join('/');
    const jsonExt = '.json';

    for (const [path, name, ext = jsonExt] of paths) {
      const nameWithExt = name ? `${name}${ext ?? ''}` : '';
      const serverPath = joinPath([path, nameWithExt || `*${ext}`]);
      const localPath = `./src/back/${joinPath([path, '+case', nameWithExt])}`;

      console.info('TRY LOAD FILE', serverPath, '=>', localPath);

      try {
        await execAsync(`scp -r root@${hostConfig.ip}:/var/www/${hostConfig.host}/${serverPath} ${localPath}`);

        try {
          await execAsync(`npx prettier --write "${localPath}"`);
        } catch {
          //
        }

        console.info(`${serverPath} saved!`);
      } catch (_error) {
        console.info(_error);
        console.info(`${serverPath} load FAILURE!`);
      }
    }
  };

  pull();
}

(async () => {
  const { url } = hostConfig;
  const response = await fetch(
    `${url}${pullFilesExpressRoutePath}?${pullFilesExpressSecretQueryName}=${secret.secret}`,
    {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStringify(pullPushFileDirNameNet),
    },
  );
  const reader = response.body?.getReader();
  const decoder = new TextDecoder('utf-8');

  if (!reader) return;

  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n');

    buffer = lines.pop() || '';

    for (const line of lines) {
      if (!line.trim()) continue;

      try {
        const { strData, meta } = parsePulledFileDatas(line);
        const dir = `src/back/${meta.caseDir}+case/` as const;
        const filePath = `${dir}${meta.file}.json`;

        if (meta.isFirst) {
          console.info('/'.repeat(30));
          console.info('/'.repeat(10), meta.caseDir);
          console.info('/'.repeat(30));
        }

        try {
          fs.writeFileSync(filePath, strData);
        } catch {
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(filePath, strData);
        }

        console.info(`[${meta.count}]: ${meta.name} ${filePath}`);
        if (meta.isLast) await execAsync(`npx prettier --write "${dir}"`);
      } catch (e) {
        console.error('Ошибка парсинга отдельного чанка:', e);
      }
    }
  }
})();

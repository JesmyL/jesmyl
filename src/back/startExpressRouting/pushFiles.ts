import { makeRedLogText } from 'back/utils.exec';
import express from 'express';
import md5 from 'md5';
import {
  objectLength,
  parsePulledFileDatas,
  pullFilesExpressSecretQueryName,
  pushFilesExpressRoutePath,
  wait,
} from 'shared/api/pullFiles.utils';
import { checkIsString } from 'shared/utils/checkIs';
import * as secret from '../../../do/secret.md5.json';
import { pullPushDirFilesDictLazy } from './lib/pull-push.configurer';

export const pushFilesExpressRoute = (app: ReturnType<typeof express>) => {
  const jsonPostfix = '.json';

  app.post(pushFilesExpressRoutePath, express.text({ type: 'text/plain', limit: '50mb' }), async (req, res) => {
    if (
      !checkIsString(req.query[pullFilesExpressSecretQueryName]) ||
      md5(req.query[pullFilesExpressSecretQueryName]) !== secret.md5ecret
    ) {
      res.status(401).send('Secret Error');
      return;
    }

    await wait(10);

    const { meta, strData } = parsePulledFileDatas(`${req.body}`);

    try {
      const pushHolder = pullPushDirFilesDictLazy()[meta.dir]?.[meta.dirDir as never] as unknown as {
        PUSH(data: unknown, fileNameJsonless: string): Promise<void>;
      };

      if (!pushHolder) {
        res.status(404).send(makeRedLogText(`[${meta.count}] Не найдены данные ${meta.name}`));
        return;
      }

      await pushHolder.PUSH(
        JSON.parse(strData),
        meta.file.endsWith(jsonPostfix) ? meta.file.slice(0, -objectLength(jsonPostfix)) : meta.file,
      );

      res.status(200).send(`[${meta.count}] Обработан ${meta.name}`);
    } catch {
      res.status(500).send(`[${meta.count}] ERROR ${meta.name}`);
    }
  });
};

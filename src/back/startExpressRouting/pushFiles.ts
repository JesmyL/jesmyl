import express from 'express';
import md5 from 'md5';
import {
  parsePulledFileDatas,
  pullFilesExpressSecretQueryName,
  pullPushFileDirNameNet,
  pushFilesExpressRoutePath,
  wait,
} from 'shared/api/pullFiles.utils';
import { checkIsString } from 'shared/utils/checkIs';
import * as secret from '../../../do/secret.md5.json';
import { pullPushDirFilesDictLazy } from './lib/pull-push.configurer';

export const pushFilesExpressRoute = (app: ReturnType<typeof express>) => {
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
      if (
        !(meta.dir in pullPushFileDirNameNet) ||
        (!(meta.file in pullPushFileDirNameNet[meta.dir]) && !('.' in pullPushFileDirNameNet[meta.dir]))
      )
        return;

      const box = pullPushDirFilesDictLazy()[meta.dir];
      const pushHolder = (box?.[meta.file as never] ?? box?.['.' as never]) as unknown as {
        push(data: unknown): Promise<void>;
      };

      if (!pushHolder) return;
      await pushHolder?.push(JSON.parse(strData));

      res.status(200).send(`[${meta.count}] Обработан ${meta.name}`);
    } catch {
      res.status(500).send(`[${meta.count}] ERROR ${meta.name}`);
    }
  });
};

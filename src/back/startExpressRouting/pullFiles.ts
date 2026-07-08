import { makeRedLogText } from 'back/utils.exec';
import express from 'express';
import md5 from 'md5';
import {
  pullFilesExpressRoutePath,
  pullFilesExpressSecretQueryName,
  stringifyPulledFileDatasNl,
} from 'shared/api/pullFiles.utils';
import { wait } from 'shared/utils';
import { checkIsString } from 'shared/utils/checkIs';
import { mapObjectEntries, objectEntries } from 'shared/utils/object.utils';
import * as secret from '../../../do/secret.md5.json';
import { pullPushDirFilesDictLazy } from './lib/pull-push.configurer';

export const pullFilesExpressRoute = (app: ReturnType<typeof express>) => {
  app.get(pullFilesExpressRoutePath, async (req, res) => {
    if (
      !checkIsString(req.query[pullFilesExpressSecretQueryName]) ||
      md5(req.query[pullFilesExpressSecretQueryName]) !== secret.md5ecret
    ) {
      res.status(401).send('Secret Error');
      return;
    }

    res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      await Promise.all(
        mapObjectEntries(pullPushDirFilesDictLazy(), async (dir, box) => {
          const vals = objectEntries(box);

          for (const [file, { pull }] of vals) {
            const datas = [(await (pull as any)(file)) || []].flat();
            const len = datas.length;
            let i = 0;

            for (const { data, file, name } of datas) {
              i++;

              const chunk = stringifyPulledFileDatasNl(
                {
                  dir,
                  file,
                  name,
                  isLast: i === len,
                  count: `${i}/${len}`,
                },
                data,
              );

              res.write(chunk);

              await wait(10);
            }
          }
        }),
      );

      res.end();
    } catch (error) {
      console.error(makeRedLogText(`${error}`));
      if (!res.headersSent) res.status(500).send('Error');
    }
  });
};

import { makeRedLogText } from 'back/utils.exec';
import express from 'express';
import md5 from 'md5';
import {
  pullFilesExpressRoutePath,
  pullFilesExpressSecretQueryName,
  pullPushFileDirNameNet,
  stringifyPulledFileDatasNl,
} from 'shared/api/pullFiles.utils';
import { wait } from 'shared/utils';
import { checkIsEndsWith, checkIsString } from 'shared/utils/checkIs';
import { objectEntries } from 'shared/utils/object.utils';
import * as secret from '../../../do/secret.md5.json';
import { pullPushDirFilesDictLazy } from './lib/pull-push.configurer';

export const pullFilesExpressRoute = (app: ReturnType<typeof express>) => {
  app.post(pullFilesExpressRoutePath, async (req, res) => {
    if (
      !checkIsString(req.query[pullFilesExpressSecretQueryName]) ||
      md5(req.query[pullFilesExpressSecretQueryName]) !== secret.md5ecret
    ) {
      res.status(401).send('Secret Error');
      return;
    }

    const dirNameNet = req.body as typeof pullPushFileDirNameNet;

    res.setHeader('Content-Type', 'application/x-ndjson; charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    try {
      const config = pullPushDirFilesDictLazy();

      for (const dirStr in config) {
        if (!(dirStr in dirNameNet)) continue;

        const dir = dirStr as keyof typeof config;
        const vals = objectEntries(config[dir]);

        for (const [fileName, { pull }] of vals) {
          if (!(fileName in dirNameNet[dir])) continue;

          const dirPath = checkIsEndsWith(fileName, '/') ? (`${dir}${fileName}` as const) : dir;

          const datas = [(await (pull as (file: string) => Promise<[]>)(fileName)) || []].flat();
          const len = datas.length;
          let i = 0;

          for (const { data, file, name } of datas) {
            i++;

            const chunk = stringifyPulledFileDatasNl(
              {
                dir,
                dirDir: fileName,
                caseDir: dirPath,
                file,
                name,
                count: `${i}/${len}`,
                isFirst: i === 1,
                isLast: i === len,
              },
              data,
            );

            res.write(chunk);

            await wait(10);
          }
        }
      }

      res.end();
    } catch (error) {
      console.error(makeRedLogText(`${error}`));
      if (!res.headersSent) res.status(500).send('Error');
    }
  });
};

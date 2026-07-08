import { comsDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { makeRedLogText } from 'back/utils.exec';
import express from 'express';
import md5 from 'md5';
import { PgCheckFieldMode } from 'p/d';
import { IExportableCom } from 'shared/api';
import {
  pullFilesExpressRoutePath,
  pullFilesExpressSecretQueryName,
  stringifyPulledFileDatasNl,
} from 'shared/api/pullFiles.utils';
import { wait } from 'shared/utils';
import { checkIsString } from 'shared/utils/checkIs';
import { lazyInit } from 'shared/utils/lazyInit';
import { mapObjectEntries } from 'shared/utils/object.utils';
import * as secret from '../../../do/secret.md5.json';

const dirFilesDictLazy: () => Record<`${string}/`, () => Promise<{ file: string; data: unknown; name: string }[]>> =
  lazyInit(() => {
    const und = undefined;
    const comBlank: { [K in keyof Required<IExportableCom>]: und } = {
      w: und,
      m: und,
      n: und,
      b: und,
      bpm: und,
      d: und,
      s: und,
      nl: und,
      l: und,
      p: und,
      al: und,
      t: und,
      c: und,
      o: und,
      isRemoved: und,
    };

    return {
      'apps/cm/coms/': async () => {
        return (
          await db.select({ com: makePgCheckedSelectExportableComSqlRaw({ m: PgCheckFieldMode.Remove }) }).from(comsDB)
        ).map(({ com }) => ({
          data: { ...comBlank, ...com },
          file: `${com.w}.json`,
          name: com.n,
        }));
      },
    };
  });

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
        mapObjectEntries(dirFilesDictLazy(), async (dir, cb) => {
          const datas = await cb();
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
        }),
      );

      res.end();
    } catch (error) {
      console.error(makeRedLogText(`${error}`));
      if (!res.headersSent) res.status(500).send('Error');
    }
  });
};

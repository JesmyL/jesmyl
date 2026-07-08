import { comsDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { eq } from 'drizzle-orm';
import { PgCheckFieldMode } from 'p/d';
import { CmComWid, IExportableCom } from 'shared/api';
import { mapObjectEntries, PullPushFileDirNameNet } from 'shared/api/pullFiles.utils';
import { lazyInit } from 'shared/utils/lazyInit';

type FileMeta<K extends keyof PullPushFileDirNameNet, File extends keyof PullPushFileDirNameNet[K]> = {
  file: File extends '.' ? string : File;
  data: PullPushFileDirNameNet[K][File];
  name: string;
};

export const pullPushDirFilesDictLazy = lazyInit(
  (): Partial<{
    [K in keyof PullPushFileDirNameNet]: {
      [File in keyof PullPushFileDirNameNet[K]]: {
        pull: (fileName: File) => PromiseOr<File extends '.' ? FileMeta<K, File>[] : FileMeta<K, File>>;
        push: (data: PullPushFileDirNameNet[K][File]) => PromiseOr<unknown>;
      };
    };
  }> => {
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
      'apps/cm/': {
        'comwVisits.json': {
          pull: async file => {
            const data: PRecord<CmComWid, number> = {};

            await Promise.all(
              (await db.select({ v: comsDB.visits, w: comsDB.w }).from(comsDB))
                .sort((a, b) => a.w - b.w)
                .map(({ v, w }) => {
                  if (v) data[w] = v;
                }),
            );

            return { data, file, name: file };
          },
          push: async visits => {
            await Promise.all(
              mapObjectEntries(visits, (comw, visits) => {
                return db
                  .update(comsDB)
                  .set({ visits: visits ?? 0 })
                  .where(eq(comsDB.w, +comw));
              }),
            );
          },
        },
      },

      'apps/cm/coms/': {
        '.': {
          pull: async () =>
            (
              await db
                .select({ com: makePgCheckedSelectExportableComSqlRaw({ m: PgCheckFieldMode.Remove }) })
                .from(comsDB)
            ).map(({ com }) => ({
              data: { ...comBlank, ...com },
              file: `${com.w}.json`,
              name: com.n,
            })),

          push: com => db.insert(comsDB).values(com),
        },
      },
    };
  },
);

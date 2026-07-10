import { comsDB, usersDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { jsonParseSecure } from 'back/json-secure';
import { eq } from 'drizzle-orm';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from 'p/d';
import { CmComWid, IExportableCom } from 'shared/api';
import { mapObjectEntries, PullPushFileDirNameNet } from 'shared/api/pullFiles.utils';
import { lazyInit } from 'shared/utils/lazyInit';

type FileMeta<K extends keyof PullPushFileDirNameNet, File extends keyof PullPushFileDirNameNet[K]> = {
  file: string;
  data: PullPushFileDirNameNet[K][File];
  name: string;
};

export const pullPushDirFilesDictLazy = lazyInit(
  (): {
    [K in keyof PullPushFileDirNameNet]: {
      [File in keyof PullPushFileDirNameNet[K]]: {
        pull: (fileName: File) => PromiseOr<File extends `${string}/` ? FileMeta<K, File>[] : FileMeta<K, File>>;
        push: (data: PullPushFileDirNameNet[K][File]) => PromiseOr<unknown>;
      };
    };
  } => {
    return {
      'apps/cm/': {
        'comwVisits.json': {
          pull: async file => {
            const data: PRecord<CmComWid, number> = {};

            (await db.select({ v: comsDB.visits, w: comsDB.w }).from(comsDB).orderBy(comsDB.w)).map(
              ({ v, w }) => (data[w] = v || 0),
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

        'coms/': {
          pull: async () => {
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

            return (
              await db
                .select({ com: makePgCheckedSelectExportableComSqlRaw({ m: PgCheckFieldMode.Remove }) })
                .from(comsDB)
            ).map(({ com }) => ({
              data: { ...comBlank, ...com },
              file: `${com.w}.json`,
              name: com.n,
            }));
          },

          push: com => db.insert(comsDB).values(com),
        },
      },

      'apps/index/': {
        'users/': {
          pull: async () =>
            (
              await db
                .select({
                  u: makePgCheckedSelectSqlRaw(usersDB, {
                    ls: 'len=0',
                    rules: 'len=0',
                    r: PgCheckFieldMode.RemoveIfNull,
                    m: PgCheckFieldMode.Remove,
                    id: PgCheckFieldMode.Remove,
                  }),
                })
                .from(usersDB)
            ).map(({ u }) => {
              const auth = jsonParseSecure(u.auth);

              return {
                data: u,
                file: `${u.l}.json`,
                name: auth.fio || auth.nick || auth.email || '??',
              };
            }),

          push: async user => {
            await db.insert(usersDB).values({
              ...user,
              ls: user.ls ?? [],
              rules: user.rules ?? {},
            });
          },
        },
      },
    };
  },
);

import { comsDB, userDB, userRoleDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { jsonParseSecure } from 'back/json-secure';
import { eq } from 'drizzle-orm';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from 'p/d';
import { IExportableCom } from 'shared/api';
import { forEachObjectEntries, mapObjectEntries, PullPushFileDirNameNet } from 'shared/api/pullFiles.utils';
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
        pull: (
          fileName: File,
          expectedType: FileMeta<K, File>['data'],
        ) => PromiseOr<File extends `${string}/` ? FileMeta<K, File>[] : FileMeta<K, File>>;
        PUSH: (data: PullPushFileDirNameNet[K][File]) => PromiseOr<unknown>;
      };
    };
  } => {
    return {
      'apps/cm/': {
        'comwVisits.json': {
          pull: async (file, _type) => {
            const data: typeof _type = {};

            (await db.select({ v: comsDB.visits, w: comsDB.w }).from(comsDB).orderBy(comsDB.w)).map(
              ({ v, w }) => (data[w] = v || 0),
            );

            return { data, file, name: file };
          },

          PUSH: visits =>
            Promise.all(
              mapObjectEntries(visits, (comw, visits) =>
                dbUpdate(comsDB, { visits: visits ?? 0 }, eq(comsDB.w, +comw)),
              ),
            ),
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

          PUSH: com => db.insert(comsDB).values(com),
        },
      },

      'apps/index/': {
        'users/': {
          pull: async () =>
            (
              await db
                .select({
                  u: makePgCheckedSelectSqlRaw(userDB, {
                    ls: 'len=0',
                    rights: 'len=0',
                    r: PgCheckFieldMode.RemoveIfNull,
                    m: PgCheckFieldMode.Remove,
                    id: PgCheckFieldMode.Remove,
                  }),
                })
                .from(userDB)
            ).map(({ u }) => {
              const auth = jsonParseSecure(u.auth);

              return {
                data: u,
                file: `${u.l}.json`,
                name: auth.fio || auth.nick || auth.email || '??',
              };
            }),

          PUSH: async user => {
            await db.insert(userDB).values({
              ...user,
              ls: user.ls ?? [],
              rights: user.rights ?? {},
            });
          },
        },
        'userRoles.json': {
          pull: async (file, _type) => {
            const roles: typeof _type = {};

            (
              await db
                .select({
                  r: makePgCheckedSelectSqlRaw(userRoleDB, {
                    id: PgCheckFieldMode.Remove,
                    m: PgCheckFieldMode.Remove,
                    r: 'len=0',
                  }),
                })
                .from(userRoleDB)
            ).forEach(role => (roles[role.r.n] = { r: role.r.r }));

            return {
              data: roles,
              file,
              name: file,
            };
          },

          PUSH: roles => {
            forEachObjectEntries(roles, async (role, rules) => {
              await dbUpdate(userRoleDB, { r: rules?.r ?? null }, eq(userRoleDB.n, role));
            });
          },
        },
      },
    };
  },
);

import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { comDB, scheduleDB, user2ComDB, userDB, userRoleDB } from 'back/drizzle.schema';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { selectUser2Com, upsertUser2ComProps } from 'back/drizzle/ex/user2Com.utils';
import { jsonParseSecure } from 'back/json-secure';
import { eq } from 'drizzle-orm';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from 'p/d';
import { IExportableCom, IScheduleWidget, UserLogin } from 'shared/api';
import {
  forEachObjectEntries,
  mapObjectEntries,
  objectLength,
  PullPushFileDirNameNet,
} from 'shared/api/pullFiles.utils';
import { Bool } from 'shared/enums';
import { lazyInit } from 'shared/utils/lazyInit';

const und = undefined;

type FileMeta<K extends keyof PullPushFileDirNameNet, File extends keyof PullPushFileDirNameNet[K]> = {
  file: PullPushFileDirNameNet[K][File] extends { F: infer FileName extends string } ? FileName : never;
  data: PullPushFileDirNameNet[K][File] extends { T: infer Type } ? Type : never;
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
        PUSH: (data: FileMeta<K, File>['data'], file: `${FileMeta<K, File>['file']}`) => PromiseOr<unknown>;
      };
    };
  } => {
    return {
      'apps/cm/': {
        comwVisits: {
          pull: async (file, _type) => {
            const data: typeof _type = {};

            (await db.select({ v: comDB.visits, w: comDB.w }).from(comDB).orderBy(comDB.w)).map(
              ({ v, w }) => (data[w] = v || 0),
            );

            return { data, file, name: file };
          },

          PUSH: visits =>
            Promise.all(
              mapObjectEntries(visits, (comw, visits) => dbUpdate(comDB, { visits: visits ?? 0 }, eq(comDB.w, +comw))),
            ),
        },

        'coms/': {
          pull: async () => {
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
                .from(comDB)
            ).map(({ com }) => ({
              data: { ...comBlank, ...com },
              file: `${com.w}`,
              name: com.n,
            }));
          },

          PUSH: com => db.insert(comDB).values(com),
        },

        'user2Com/': {
          pull: async (_dir, _type) => {
            const comw_user2ComsDict = {} as Record<UserLogin, typeof _type>;
            const user2Coms = await selectUser2Com({
              c: user2ComDB.comment,
              w: comDB.w,
              f: user2ComDB.isFav,
              l: userDB.l,
            }).orderBy(user2ComDB.userId, comDB.id);

            user2Coms.forEach(({ c, f, w, l }) => {
              if (!w || !l) return;

              const dict = ((comw_user2ComsDict[l] ??= {})[w] ??= {});

              if (c) dict.comm = c;
              if (f) dict.fav = 1;

              if (!objectLength(dict)) delete comw_user2ComsDict[l][w];
            });

            return Promise.all(
              mapObjectEntries(comw_user2ComsDict, async (login, data) => ({
                data,
                file: login,
                name: (await takeUserTiny(login))?.uauth.fio ?? login,
              })),
            );
          },

          PUSH: (u2c, login) => {
            forEachObjectEntries(u2c, async (comwStr, val) => {
              if (!val) return;

              await upsertUser2ComProps(
                login,
                +comwStr,
                {
                  comment: val.comm,
                  isFav: !!val.fav,
                },
                false,
              );
            });
          },
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
                file: u.l,
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
        userRoles: {
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
        'schedules/': {
          pull: async () => {
            const schKeyOrdering: OmitOwn<Required<Record<keyof IScheduleWidget, und>>, 'w' | 'm'> = {
              title: und,
              topic: und,
              dsc: und,
              start: und,
              prevStart: und,
              tgChatReqs: und,
              tgInform: und,
              tgInformTime: und,
              withTech: und,
              ctrl: und,
              days: und,
              games: und,
              lists: und,
              tatts: und,
              types: und,
              isRemoved: und,
            };

            return (
              await db
                .select({
                  s: makePgCheckedSelectSqlRaw(scheduleDB, {
                    prevStart: '=0',
                    withTech: `=${Bool.False}`,
                    isRemoved: `=${Bool.False}`,
                    tgInform: `=${Bool.True}`,
                    games: 'len=0',
                    tgChatReqs: 'len=0',
                  }),
                })
                .from(scheduleDB)
            ).map(({ s: { m, w, id, ...sch } }) => {
              return {
                data: { ...schKeyOrdering, ...sch },
                file: `${w}`,
                name: sch.title,
              };
            });
          },
          PUSH: async (sch, schwStr) => {
            await db.insert(scheduleDB).values({
              ...sch,
              w: +schwStr,
              isRemoved: +!!sch.isRemoved,
              withTech: +!!sch.withTech,
              tgChatReqs: sch.tgChatReqs || '',
            });
          },
        },
      },
    };
  },
);

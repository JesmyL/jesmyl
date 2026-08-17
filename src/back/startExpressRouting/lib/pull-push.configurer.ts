import { takeComwTiny } from 'back/apps/cm/com.tiny';
import {
  catsFileStorage,
  chordPackFileStore,
  eePackFileStore,
  mp3ResourcesFileStorage,
} from 'back/apps/cm/file-stores';
import { nounsFileStorage, pronounsFileStorage } from 'back/apps/index/file-stores';
import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { FileStore } from 'back/complect/FileStore';
import {
  comDB,
  sch2ComDB,
  schComHistoryDB,
  scheduleDB,
  user2ComDB,
  userDB,
  userExtDB,
  userRoleDB,
} from 'back/drizzle.schema';
import { db, dbUpdate, dbUpsert } from 'back/drizzle/drizzle.db';
import { makePgCheckedSelectExportableComSqlRaw } from 'back/drizzle/ex/com.selectors';
import { selectUser2Com, upsertUser2ComProps } from 'back/drizzle/ex/user2Com.utils';
import { jsonParseSecure } from 'back/json-secure';
import { asc, desc, eq } from 'drizzle-orm';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from 'p/d';
import { IExportableCom, IScheduleWidget, ScheduleWidgetWid, UserLogin } from 'shared/api';
import {
  extractNumber,
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

const makeFileStoreConfig =
  <Key extends keyof PullPushFileDirNameNet, File extends keyof PullPushFileDirNameNet[Key]>() =>
  <T extends FileMeta<Key, File>['data']>(fileStore: FileStore<T>) => {
    return {
      pull: async (file: File, _type: T) => {
        return {
          data: fileStore.getValue(),
          file,
          name: file,
        };
      },
      PUSH: (data: T) => fileStore.setValue(data),
    };
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
              mapObjectEntries(visits, (comw, visits) =>
                dbUpdate(comDB, { visits: visits ?? 0 }, eq(comDB.w, extractNumber(comw))),
              ),
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
              am: und,
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
            const resultDict: Record<UserLogin, typeof _type> = {};

            const user2Coms = await selectUser2Com({
              c: user2ComDB.comment,
              w: comDB.w,
              f: user2ComDB.isFav,
              l: userDB.l,
              a: userExtDB.cmCommAlts,
              t: userExtDB.cmComTools,
            }).orderBy(user2ComDB.userId, comDB.id);

            user2Coms.forEach(({ c, f, w, l, a, t }) => {
              if (!w || !l) return;

              const dict = (resultDict[l] ??= {});
              dict.ext ??= {};
              dict.coms ??= {};

              const comDict = (dict.coms[w] ??= {});

              if (c) comDict.comm = c;
              if (f) comDict.fav = 1;

              if (a?.length) dict.ext.commAlts = a;
              if (t?.length) dict.ext.tools = t;

              if (!objectLength(comDict)) delete dict.coms?.[w];
              if (!objectLength(dict.coms)) delete dict.coms;
              if (!objectLength(dict.ext)) delete dict.ext;
            });

            return Promise.all(
              mapObjectEntries(resultDict, async (login, data) => ({
                data,
                file: login,
                name: (await takeUserTiny({ l: login }, false))?.uauth.fio ?? login,
              })),
            );
          },

          PUSH: async (u2c, login) => {
            forEachObjectEntries(u2c.coms, async (comwStr, val) => {
              if (!val) return;

              await upsertUser2ComProps(
                login,
                extractNumber(comwStr),
                {
                  comment: val.comm,
                  isFav: !!val.fav,
                },
                false,
              );
            });

            const dict: Partial<typeof userExtDB.$inferInsert> = {};

            if (u2c.ext?.commAlts) dict.cmCommAlts = u2c.ext.commAlts;
            if (u2c.ext?.tools) dict.cmComTools = u2c.ext.tools;

            if (objectLength(dict)) {
              const user = await takeUserTiny({ l: login });
              await dbUpsert(userExtDB, { ...dict, userId: user.id }, ['userId']);
            }
          },
        },
        'schDayEvComHistory/': {
          pull: async (_, _type) => {
            const dict: Record<ScheduleWidgetWid, { d: typeof _type; n: string }> = {};

            const history = await db
              .select()
              .from(schComHistoryDB)
              .orderBy(
                asc(schComHistoryDB.schId),
                asc(schComHistoryDB.dayi),
                asc(schComHistoryDB.eventMi),
                desc(schComHistoryDB.w),
              );

            for (const { comws, dayi, eventMi, schId, userId, w } of history) {
              const sch = await takeScheduleWidgetTiny({ id: schId }, false);
              if (!sch) continue;
              const schw = sch.w;

              dict[schw] ??= { d: {}, n: sch.title };
              dict[schw].d[dayi] ??= {};
              dict[schw].d[dayi][eventMi] ??= [];

              dict[schw].d[dayi][eventMi].push({ s: comws, u: userId, w });
            }

            return mapObjectEntries(dict, (schw, data) => ({
              data: data.d,
              file: schw,
              name: data.n,
            }));
          },
          PUSH: async (data, schw) => {
            const sch = await takeScheduleWidgetTiny({ w: extractNumber(schw) });

            forEachObjectEntries(data, (dayi, dayHistory) => {
              forEachObjectEntries(dayHistory, (eventMi, items) => {
                items.forEach(async ({ s, u, w }) => {
                  await db.insert(schComHistoryDB).values({
                    dayi: extractNumber(dayi),
                    eventMi: extractNumber(eventMi),
                    schId: sch.id,
                    userId: u,
                    comws: s,
                    w,
                  });
                });
              });
            });
          },
        },

        'sch2Com/': {
          pull: async (_, _type) => {
            const dict: Record<ScheduleWidgetWid, { d: typeof _type; n: string }> = {};

            const list = await db.select().from(sch2ComDB).orderBy(sch2ComDB.schId, asc(sch2ComDB.comId));

            for (const { comId, intp, schId } of list) {
              const sch = await takeScheduleWidgetTiny({ id: schId }, false);
              const com = await takeComwTiny({ id: comId }, false);

              if (!sch || !com) continue;

              dict[sch.w] ??= { d: {}, n: sch.title };
              dict[sch.w].d[com.w] = { intp: intp ?? und };
            }

            return mapObjectEntries(dict, (schw, { d, n }) => ({ data: d, file: schw, name: n }));
          },
          PUSH: async (data, schw) => {
            forEachObjectEntries(data, async (comw, { intp }) => {
              const sch = await takeScheduleWidgetTiny({ w: extractNumber(schw) }, false);
              const com = await takeComwTiny({ w: extractNumber(comw) }, false);
              if (!com || !sch) return;

              await db.insert(sch2ComDB).values({ comId: com.id, schId: sch.id, intp });
            });
          },
        },

        cats: makeFileStoreConfig<'apps/cm/', 'cats'>()(catsFileStorage),
        chordTracks: makeFileStoreConfig<'apps/cm/', 'chordTracks'>()(chordPackFileStore),
        eeStorage: makeFileStoreConfig<'apps/cm/', 'eeStorage'>()(eePackFileStore),
        mp3Rules: makeFileStoreConfig<'apps/cm/', 'mp3Rules'>()(mp3ResourcesFileStorage),
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
              await dbUpsert(userRoleDB, { r: rules?.r ?? null, n: role }, ['n']);
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
              w: extractNumber(schwStr),
              isRemoved: +!!sch.isRemoved,
              withTech: +!!sch.withTech,
              tgChatReqs: sch.tgChatReqs || '',
            });
          },
        },

        nouns: makeFileStoreConfig<'apps/index/', 'nouns'>()(nounsFileStorage),
        pronouns: makeFileStoreConfig<'apps/index/', 'pronouns'>()(pronounsFileStorage),
        constantsConfig: makeFileStoreConfig<'apps/index/', 'constantsConfig'>()(constantsConfigFileStore),
      },
    };
  },
);

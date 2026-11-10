import { exportableCatFromRow } from 'back/apps/cm/cat.db';
import { takeComwTiny } from 'back/apps/cm/com.tiny';
import { makeCmComHttpLinkFromNumLead } from 'back/apps/cm/complect/com-http-links';
import { chordPackFileStore, eePackFileStore, mp3ResourcesFileStorage } from 'back/apps/cm/file-stores';
import { nounsFileStorage, otherFooterIconFileStore, pronounsFileStorage } from 'back/apps/index/file-stores';
import { constantsConfigFileStore } from 'back/apps/index/schedules/file-stores';
import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { mapBlankRow } from 'back/apps/q/db-stores';
import { audioSaveDir } from 'back/audio/audio.const';
import { takeAudioFileDuration, takeAudioFilePath } from 'back/audio/takeAudioFileDuration';
import { FileStore } from 'back/complect/FileStore';
import {
  audioLinkDB,
  catDB,
  comDB,
  questionerBlankDB,
  questionerUserAnswerDB,
  sch2ComDB,
  schComHistoryDB,
  scheduleDB,
  user2ComDB,
  userDB,
  userExtDB,
  userRoleDB,
} from 'back/drizzle.schema';
import { db, dbUpdate, dbUpsert } from 'back/drizzle/drizzle.db';
import {
  exportableComDefaults,
  makePgCheckedSelectExportableComSqlRaw,
  selectPgCheckedExportableCom,
} from 'back/drizzle/ex/com.selectors';
import { selectUser2Com, upsertUser2ComProps } from 'back/drizzle/ex/user2Com.utils';
import { jsonParseSecure } from 'back/json-secure';
import { backLocalePayload, translateBackTexts } from 'back/locales/back';
import { insertDashMessage, sendChangesEmail } from 'back/dash/visits';
import { asc, desc, eq } from 'drizzle-orm';
import path from 'node:path';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from 'p/d';
import { IExportableCom, IScheduleWidget, ScheduleWidgetWid, UserLogin } from 'shared/api';
import {
  extractNumber,
  forEachObjectEntries,
  mapObjectEntries,
  objectEntries,
  objectLength,
  PullPushFileDirNameNet,
} from 'shared/api/pullFiles.utils';
import { Bool } from 'shared/enums';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { DashMessageKind } from 'shared/model/index/visitsDashboard';
import { QuestionerBlankWid } from 'shared/model/q';
import { QuestionerUserAnswer } from 'shared/model/q/answer';
import { emptyFunc } from 'shared/utils';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { parseLegacyICat } from 'shared/utils/cm/cat/parseLegacyICat';
import { downloadFileMd5Rename } from 'shared/utils/downloadFileMd5Rename';
import { lazyInit } from 'shared/utils/lazyInit';
import { escapeHtmlLazy } from 'shared/utils/string.utils';

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
    // Dashboard tables (visits, visitDays, dashErrors, dashReads) are intentionally absent: dashboard telemetry is never pulled or pushed.
    return {
      'apps/cm/': {
        audioLinkMap: {
          pull: async (file, _type) => {
            const rows = await db.select().from(audioLinkDB).orderBy(audioLinkDB.key);
            const data: typeof _type = {};

            for (const { key, ...row } of rows) data[key] = row;

            return { data, file, name: file };
          },

          PUSH: async dict => {
            const rows = mapObjectEntries(dict, (key, row) => ({ key, ...row }));

            if (!rows.length) return;

            for (const row of rows) {
              if (row.duration != null) continue;

              let md5 = row.md5;

              if (!takeAudioFilePath(md5)) {
                try {
                  md5 = path.parse(
                    await downloadFileMd5Rename(audioSaveDir, makeCmComHttpLinkFromNumLead(row.link)),
                  ).name;
                } catch (error) {
                  console.info(`[audioLinkMap] download failed for ${row.key}: ${error}`);
                  continue;
                }
              }

              row.md5 = md5;

              row.duration = await takeAudioFileDuration(md5);
            }

            return dbUpsert(audioLinkDB, rows, ['key']);
          },
        },

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
              c1: und,
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

          /**
           * Push одной композиции: если строки в БД нет — вставляем её целиком;
           * если есть — пишем только реально изменившиеся поля и уведомляем об изменении.
           */
          PUSH: async (com, file) => {
            // Имя файла — это `w` композиции, поэтому вытаскиваем числовой id из имени.
            const comw = extractNumber(file);
            const existing = await selectPgCheckedExportableCom(comw);

            // Композиции ещё нет — вставляем новую строку (или обновляем при гонке по `w`).
            if (!existing) {
              const values = { ...com, w: comw };

              return db.insert(comDB).values(values).onConflictDoUpdate({ target: comDB.w, set: values });
            }

            const now = Date.now();
            const set: Partial<typeof comDB.$inferInsert> = { ...com, w: comw };
            let isComChanged = false;
            let isAmChanged = false;

            // Служебные поля и `w` не обновляем: они не должны попадать в `set` из файла.
            delete set.w;
            delete set.isRemoved;
            delete set.m;
            delete set.amMod;

            // Поля, равные дефолтным, не пишем — иначе можно затереть осмысленные данные пустыми.
            forEachObjectEntries(exportableComDefaults, (key, defaultValue) => {
              if (checkIsEq(set[key], defaultValue)) delete set[key];
            });

            // Сравниваем каждое присланное поле с текущей строкой: `am` — метки аудио, остальное — сама композиция.
            forEachObjectEntries(set, (key, value) => {
              if (checkIsEq(value, existing[key as never])) return;

              if (key === 'am') isAmChanged = true;
              else isComChanged = true;
            });

            // Ничего не поменялось — выходим, не трогая БД и не рассылая уведомления.
            if (!isComChanged && !isAmChanged) return;

            // Обновляем метку изменения композиции и/или метку аудио-меток.
            if (isComChanged) set.m = now;
            if (isAmChanged) set.amMod = now;

            // На реальное изменение композиции готовим HTML-дифф для дашборда и почты.
            if (isComChanged) {
              const escapeHtml = escapeHtmlLazy();
              const wasJson = escapeHtml(JSON.stringify(existing, null, 2));
              const newJson = escapeHtml(
                JSON.stringify(
                  {
                    ...com,
                    w: comw,
                    ...(isComChanged ? { m: now } : {}),
                    ...(isAmChanged ? { amMod: now } : {}),
                  },
                  null,
                  2,
                ),
              );

              // Заголовок храним как самодостаточный locale-payload (ru/ua/kz/en): клиент и письма подставляют язык получателя, а имя песни кладём сырым — экранирует его потребитель.
              const changesTitlePayload = backLocalePayload(langi =>
                translateBackTexts(langi, BackLocaleKey.CmComSystemChange, { n: existing.n ?? com.n }),
              );

              // Первым абзацем идёт payload заголовка (локализуется целиком как отдельный сегмент), дальше — общие для всех языков JSON-блоки was/new.
              const html = `${changesTitlePayload}\n\nwas:\n<pre style="white-space:pre-wrap">${wasJson}</pre>\n\nnew:\n<pre style="white-space:pre-wrap">${newJson}</pre>`;

              // Уведомления отправляем без ожидания, чтобы не задерживать запись в БД.
              insertDashMessage(html, null, DashMessageKind.Changes, null).catch(emptyFunc);
              sendChangesEmail(html, null).catch(emptyFunc);
            }

            // Пишем только изменившиеся поля, не затирая остальные данные строки.
            return db.insert(comDB).values({ ...com, w: comw }).onConflictDoUpdate({ target: comDB.w, set });
          },
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
            }).orderBy(user2ComDB.userId, comDB.w);

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
              mapObjectEntries(resultDict, async (login, data) => {
                const { email, fio, nick } = (await takeUserTiny({ l: login }, false))?.uauth ?? {};

                return {
                  data,
                  file: login,
                  name: fio || nick || email || login || '???',
                };
              }),
            );
          },

          PUSH: async (u2c, login) => {
            const upserts: Promise<unknown>[] = [];

            forEachObjectEntries(u2c.coms, (comwStr, val) => {
              if (!val) return;

              upserts.push(
                upsertUser2ComProps(
                  login,
                  extractNumber(comwStr),
                  {
                    comment: val.comm,
                    isFav: !!val.fav,
                  },
                  false,
                ),
              );
            });

            await Promise.all(upserts);

            const dict: Partial<typeof userExtDB.$inferInsert> = {};

            if (u2c.ext?.commAlts) dict.cmCommAlts = u2c.ext.commAlts;
            if (u2c.ext?.tools) dict.cmComTools = u2c.ext.tools;

            if (objectLength(dict)) {
              const user = await takeUserTiny({ l: login });
              await db
                .insert(userExtDB)
                .values({ ...dict, userId: user.id })
                .onConflictDoUpdate({ target: userExtDB.userId, set: dict });
            }
          },
        },
        'schDayEvComHistory/': {
          pull: async (_, _type) => {
            const dict: Record<ScheduleWidgetWid, { d: typeof _type; n: string }> = {};

            const history = await db
              .select({
                h: schComHistoryDB,
                schw: scheduleDB.w,
                schTitle: scheduleDB.title,
              })
              .from(schComHistoryDB)
              .innerJoin(scheduleDB, eq(schComHistoryDB.schId, scheduleDB.id))
              .orderBy(
                asc(scheduleDB.w),
                asc(schComHistoryDB.dayi),
                asc(schComHistoryDB.eventMi),
                desc(schComHistoryDB.w),
              );

            for (const {
              h: { comws, dayi, eventMi, userId, w },
              schw,
              schTitle,
            } of history) {
              dict[schw] ??= { d: {}, n: schTitle };
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
            const upserts: Promise<unknown>[] = [];

            forEachObjectEntries(data, (dayi, dayHistory) => {
              forEachObjectEntries(dayHistory, (eventMi, items) => {
                for (const { s, u, w } of items)
                  upserts.push(
                    dbUpsert(
                      schComHistoryDB,
                      {
                        dayi: extractNumber(dayi),
                        eventMi: extractNumber(eventMi),
                        schId: sch.id,
                        userId: u,
                        comws: s,
                        w,
                      },
                      ['w'],
                    ),
                  );
              });
            });

            await Promise.all(upserts);
          },
        },

        'sch2Com/': {
          pull: async (_, _type) => {
            const dict: Record<ScheduleWidgetWid, { d: typeof _type; n: string }> = {};

            const list = await db
              .select({
                intp: sch2ComDB.intp,
                comw: comDB.w,
                schw: scheduleDB.w,
                schTitle: scheduleDB.title,
              })
              .from(sch2ComDB)
              .innerJoin(comDB, eq(sch2ComDB.comId, comDB.id))
              .innerJoin(scheduleDB, eq(sch2ComDB.schId, scheduleDB.id))
              .orderBy(sch2ComDB.schId, comDB.w);

            for (const { intp, comw, schw, schTitle } of list) {
              dict[schw] ??= { d: {}, n: schTitle };
              dict[schw].d[comw] = { intp: intp ?? und };
            }

            return mapObjectEntries(dict, (schw, { d, n }) => ({ data: d, file: schw, name: n }));
          },
          PUSH: async (data, schw) => {
            const sch = await takeScheduleWidgetTiny({ w: extractNumber(schw) }, false);
            if (!sch) return;

            for (const [comw, { intp }] of objectEntries(data)) {
              const com = await takeComwTiny({ w: extractNumber(comw) }, false);
              if (!com) continue;

              await dbUpsert(sch2ComDB, { comId: com.id, schId: sch.id, intp }, ['schId', 'comId']);
            }
          },
        },

        'cats/': {
          pull: async () =>
            (await db.select().from(catDB).orderBy(catDB.w)).map(row => {
              const cat = exportableCatFromRow(row);

              return { data: cat, file: `${cat.w}`, name: cat.n };
            }),

          PUSH: data => {
            const cat = parseLegacyICat(data);
            if (!cat) return;
            return dbUpsert(catDB, [cat], ['w']);
          },
        },
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
                    isSilent: `=${Bool.False}`,
                    mutedUntil: PgCheckFieldMode.RemoveIfNull,
                    r: PgCheckFieldMode.RemoveIfNull,
                    m: PgCheckFieldMode.Remove,
                  }),
                })
                .from(userDB)
            ).map(({ u }) => {
              const { email, fio, nick } = jsonParseSecure(u.auth);

              return {
                data: u,
                file: u.l,
                name: fio || nick || email || u.l || '??',
              };
            }),

          PUSH: async ({ id, ...user }) => {
            const values = {
              ...user,
              ls: user.ls ?? [],
              rights: user.rights ?? {},
              mutedUntil: user.mutedUntil ?? null,
              isSilent: user.isSilent ?? Bool.False,
            };

            await db
              .insert(userDB)
              .values({ id, ...values })
              .onConflictDoUpdate({ target: userDB.l, set: values });
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

          PUSH: async roles => {
            await Promise.all(
              mapObjectEntries(roles, (role, rules) =>
                db
                  .insert(userRoleDB)
                  .values({ n: role, r: rules?.r ?? null })
                  .onConflictDoUpdate({ target: userRoleDB.n, set: { r: rules?.r ?? null } }),
              ),
            );
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
              period: und,
              appInform: und,
              withTech: und,
              isPaused: und,
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
                    period: PgCheckFieldMode.RemoveIfNull,
                    withTech: `=${Bool.False}`,
                    isPaused: `=${Bool.False}`,
                    isRemoved: `=${Bool.False}`,
                    appInform: `=${Bool.True}`,
                    games: 'len=0',
                  }),
                })
                .from(scheduleDB)
            ).map(({ s: { m, w, id, period, ...sch } }) => {
              return {
                data: { ...schKeyOrdering, ...sch, ...(period == null ? {} : { period }) },
                file: `${w}`,
                name: sch.title,
              };
            });
          },
          PUSH: async (sch, schwStr) => {
            const values = {
              ...sch,
              w: extractNumber(schwStr),
              period: sch.period ?? null,
              isRemoved: +!!sch.isRemoved,
              withTech: +!!sch.withTech,
              isPaused: +!!sch.isPaused,
              appInform: sch.appInform ?? 1,
            };

            await db.insert(scheduleDB).values(values).onConflictDoUpdate({ target: scheduleDB.w, set: values });
          },
        },

        nouns: makeFileStoreConfig<'apps/index/', 'nouns'>()(nounsFileStorage),
        pronouns: makeFileStoreConfig<'apps/index/', 'pronouns'>()(pronounsFileStorage),
        constantsConfig: makeFileStoreConfig<'apps/index/', 'constantsConfig'>()(constantsConfigFileStore),
        otherFooterIcon: makeFileStoreConfig<'apps/index/', 'otherFooterIcon'>()(otherFooterIconFileStore),
      },

      'apps/q/': {
        'blanks/': {
          pull: async () =>
            (await db.select().from(questionerBlankDB).orderBy(questionerBlankDB.w)).map(row => ({
              data: mapBlankRow(row),
              file: `${row.w}`,
              name: row.title,
            })),

          PUSH: (blank, blankw) =>
            dbUpsert(
              questionerBlankDB,
              {
                w: extractNumber(blankw),
                m: blank.m,
                title: blank.title,
                dsc: blank.dsc,
                anon: blank.anon ?? null,
                tmp: blank.tmp,
                ord: blank.ord,
                team: blank.team,
              },
              ['w'],
            ),
        },

        'answers/': {
          pull: async () => {
            const dict: Record<string, { blankw: QuestionerBlankWid; answers: QuestionerUserAnswer[]; name: string }> =
              {};

            const rows = await db
              .select({ answer: questionerUserAnswerDB, blankTitle: questionerBlankDB.title })
              .from(questionerUserAnswerDB)
              .innerJoin(questionerBlankDB, eq(questionerUserAnswerDB.blankw, questionerBlankDB.w))
              .orderBy(questionerUserAnswerDB.blankw, questionerUserAnswerDB.id);

            for (const { answer, blankTitle } of rows) {
              (dict[answer.blankw] ??= { blankw: answer.blankw, answers: [], name: blankTitle }).answers.push({
                fio: answer.fio ?? undefined,
                a: answer.a,
              });
            }

            return mapObjectEntries(dict, (_, { blankw, answers, name }) => ({
              data: answers,
              file: `${blankw}`,
              name,
            }));
          },

          PUSH: (answers, blankw) => {
            if (!answers.length) return;

            return db.insert(questionerUserAnswerDB).values(
              answers.map(answer => ({
                blankw: extractNumber(blankw),
                fio: answer.fio ?? null,
                a: answer.a,
              })),
            );
          },
        },
      },
    };
  },
);

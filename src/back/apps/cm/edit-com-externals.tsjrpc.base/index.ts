import { backLocaleError, backLocalePayload, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { throwIfNoScheduleComsListRedact } from 'back/apps/index/schedules/schedule-modificators';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { takeUserLangi } from 'back/complect/userLangiFileStore';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { db, dbDelete, dbUpdate } from 'back/drizzle/drizzle.db';
import { schComHistoryDB } from 'back/drizzle/schema/schComHistory';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { and, asc, desc, eq } from 'drizzle-orm';
import {
  CmComInSchDayEvWr,
  CmComWid,
  CmComWidRefGroupDict,
  CmComWidRefGroupId,
  ScheduleComPackHistoryItem,
} from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { checkIsNowInCurrentDay } from 'shared/const/ms';
import { checkIsNil } from 'shared/utils/checkIs';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { objectLength, objectValues } from 'shared/utils/object.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector } from '../client-selectors-by-visit';
import { takeComwTiny } from '../com.tiny';
import { cmComWidRefGroupDictFileStore } from '../file-stores';
import { cmShareServerTsjrpcMethods } from '../tsjrpc.shares';
import { cmEditComExternalsTsjrpcAudioMarks } from './audioMarks';
import { cmEditComExternalsTsjrpcInterpretations } from './interpretations';

export const cmEditComExternalsTsjrpcBaseServer =
  new (class CmEditComExternals extends TsjrpcBaseServer<CmEditComExternalsTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComExt',
        methods: {
          ...cmEditComExternalsTsjrpcInterpretations(),
          ...cmEditComExternalsTsjrpcAudioMarks,

          addComwsInSchEvHistory: async ({ schw, dayi, eventMi, comws }, tool) => {
            const auth = takeLogginedAuthOrThrow(tool.auth);
            const sch = await takeScheduleWidgetTiny({ w: schw });

            await throwIfNoScheduleComsListRedact(sch, auth, dayi, eventMi);

            const prevItem = (
              await db
                .select({ w: schComHistoryDB.w })
                .from(schComHistoryDB)
                .where(
                  and(
                    eq(schComHistoryDB.schId, sch.id),
                    eq(schComHistoryDB.dayi, dayi),
                    eq(schComHistoryDB.eventMi, eventMi),
                  ),
                )
                .limit(1)
            ).at(0);
            const wr = Date.now() as CmComInSchDayEvWr;

            if (prevItem && checkIsNowInCurrentDay(prevItem.w)) {
              await dbUpdate(schComHistoryDB, { comws, w: wr }, eq(schComHistoryDB.w, prevItem.w));
            } else {
              const user = await takeUserTiny({ l: auth.login });
              await db.insert(schComHistoryDB).values({
                dayi,
                eventMi,
                schId: sch.id,
                userId: user.id,
                comws,
                w: wr,
              });
            }

            cmShareServerTsjrpcMethods.freshSchDayEvComws(
              { packs: { dayi, eventMi, schw, comws, fio: takeUserAuthName(auth) || '??', w: wr } },
              null,
            );

            const comTitlesList = await Promise.all(
              comws.map(async comw => {
                const comTiny = await takeComwTiny({ w: comw }, false);

                return comTiny ? `${takeCorrectComNumber(comTiny.i + 1)}. ${comTiny.n}` : null;
              }),
            );
            const scheduleTitle = `"${sch.title ?? '??'}"`;

            return {
              description: backLocalePayload(langi =>
                translateBackTexts(langi, BackLocaleKey.CmSchComsListUpdated, {
                  s: scheduleTitle,
                  l: comTitlesList
                    .map(title => title ?? `<s>${translateBackTexts(langi, BackLocaleKey.CmComUnknown)}</s>`)
                    .join('\n'),
                }),
              ),
            };
          },

          getSchEvHistory: async ({ schw, dayi }, { auth }) => {
            if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'R')) throw '';

            const sch = await takeScheduleWidgetTiny({ w: schw });

            const selPacks = await db
              .select()
              .from(schComHistoryDB)
              .where(and(eq(schComHistoryDB.schId, sch.id), eq(schComHistoryDB.dayi, dayi)))
              .orderBy(desc(schComHistoryDB.w), asc(schComHistoryDB.eventMi));

            const packs: ScheduleComPackHistoryItem[] = [];

            for (const { comws, dayi, eventMi, w, userId } of selPacks) {
              const user = await takeUserTiny({ id: userId }, false);

              packs.push({
                e: eventMi,
                fio:
                  takeUserAuthName(user?.uauth) ||
                  `<${translateBackTexts(takeUserLangi(auth?.login), BackLocaleKey.SchUnknownRole)}>`,
                w,
                s: comws,
                d: dayi,
              });
            }

            return { value: packs };
          },
          getSchEvHistoryStatistic: async ({ schw, dayi }, { auth }) => {
            if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'R')) throw '';

            const comwCount: Record<CmComWid, number> = {};
            let totalCount = 0;

            const sch = await takeScheduleWidgetTiny({ w: schw });
            const selPacks = await db
              .select({ s: schComHistoryDB.comws })
              .from(schComHistoryDB)
              .where(and(eq(schComHistoryDB.schId, sch.id), eq(schComHistoryDB.dayi, dayi)));

            const ret = () => ({ value: { comwCount, totalCount } });
            if (!objectLength(selPacks)) return ret();

            for (const pack of selPacks)
              for (const comw of pack.s) {
                comwCount[comw] ??= 0;
                comwCount[comw]++;
                totalCount++;
              }

            return ret();
          },

          removeSchEvHistoryItem: async ({ schw, dayi, writedAt }) => {
            const sch = await takeScheduleWidgetTiny({ w: schw });
            const whereDelete = and(
              eq(schComHistoryDB.schId, sch.id),
              eq(schComHistoryDB.dayi, dayi),
              eq(schComHistoryDB.w, writedAt),
            );
            if (checkIsNil(whereDelete)) throw backLocaleError(BackLocaleKey.CmOperationFailed);

            const result = (await dbDelete(schComHistoryDB, whereDelete).returning({ w: schComHistoryDB.w })).at(0);

            if (result?.w !== writedAt) throw backLocaleError(BackLocaleKey.CmDeleteFailed);

            return {
              value: result,
              description: backLocaleError(BackLocaleKey.CmSchComsHistoryBatchRemoved, {
                s: `"${sch.title ?? '??'}"`,
              }),
            };
          },

          switchComwRefs: async ({ comw, withComw }) => {
            let description = '';
            let refGroups: CmComWidRefGroupDict | nil;

            const { mod } = cmComWidRefGroupDictFileStore.modifyValueWithAutoSave(async refs => {
              refGroups = refs;
              const comwRefGroup = refs[comw];
              const withComwRefGroup = refs[withComw];

              const comTiny = await takeComwTiny({ w: comw });
              const withComTiny = await takeComwTiny({ w: withComw });
              const allGroups = objectValues(refs);

              if (comwRefGroup != null) {
                if (comwRefGroup !== withComwRefGroup) {
                  if (checkIsNil(comTiny) || checkIsNil(withComTiny)) throw backLocaleError(BackLocaleKey.CmComNotFound);

                  refs[withComw] = comwRefGroup;
                  description = backLocaleError(BackLocaleKey.CmComRefGroupMerged, {
                    a: comTiny.n,
                    b: withComTiny.n,
                  });
                } else {
                  const comJoinGroupMembersCount =
                    comwRefGroup == null
                      ? 0
                      : allGroups.reduce((sum, curr) => sum + (comwRefGroup === +(curr ?? 0) ? 1 : 0), 0);

                  if (comJoinGroupMembersCount === 2) delete refs[comw];
                  delete refs[withComw];

                  description = backLocaleError(BackLocaleKey.CmComRefRemoved, {
                    a: comTiny?.n ?? translateBackTexts(null, BackLocaleKey.CmComUnknown),
                    b: withComTiny?.n ?? translateBackTexts(null, BackLocaleKey.CmComUnknown),
                  });
                }
              } else {
                if (comTiny == null || withComTiny == null) throw backLocaleError(BackLocaleKey.CmComNotFound);

                if (withComwRefGroup != null) refs[comw] = withComwRefGroup;
                else {
                  const reservedGroupsSet = new Set(allGroups);
                  let minGroupId = CmComWidRefGroupId.min;

                  for (;;) if (!reservedGroupsSet.has(++minGroupId)) break;

                  refs[comw] = refs[withComw] = minGroupId;
                }

                description = backLocaleError(BackLocaleKey.CmComRefGroupMerged, {
                  a: comTiny.n,
                  b: withComTiny.n,
                });
              }
            });

            if (refGroups == null) throw backLocaleError(BackLocaleKey.CmOperationFailed);

            cmShareServerTsjrpcMethods.refreshComWidRefDict(
              { refs: refGroups, mod },
              cmShareServerTsjrpcMethodsRefreshComWidRefDictClientSelector,
            );

            return { description };
          },
        },
      });
    }
  })();

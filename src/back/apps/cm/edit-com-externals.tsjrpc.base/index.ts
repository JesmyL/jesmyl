import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { takeUserTiny } from 'back/apps/index/tinies/userTiny';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { db, dbUpdate } from 'back/drizzle/drizzle.db';
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
            if (await throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'U')) throw '';

            const sch = await takeScheduleWidgetTiny({ w: schw });

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
              { packs: { dayi, eventMi, schw, comws, fio: auth.fio ?? '??', w: wr } },
              null,
            );

            const comTitlesList = await Promise.all(
              comws.map(async comw => {
                const comTiny = await takeComwTiny({ w: comw }, false);

                return comTiny ? `${takeCorrectComNumber(comTiny.i + 1)}. ${comTiny.n}` : `<s>Неизвестная песня</s>`;
              }),
            );

            return {
              description: `Обновлён список песен в расписании "${sch.title ?? '??'}":\n\n${comTitlesList.join('\n')}`,
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

              packs.push({ e: eventMi, fio: user?.uauth.fio || '<Неизвестный>', w, s: comws, d: dayi });
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
            const result = (
              await db
                .delete(schComHistoryDB)
                .where(
                  and(
                    eq(schComHistoryDB.schId, sch.id),
                    eq(schComHistoryDB.dayi, dayi),
                    eq(schComHistoryDB.w, writedAt),
                  ),
                )
                .returning({ w: schComHistoryDB.w })
            ).at(0);

            if (result?.w !== writedAt) throw 'Ошибка удаления';

            return {
              value: result,
              description: `Удалена пачка песен из истории события в расписании "${sch.title ?? '??'}"`,
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
                  if (checkIsNil(comTiny) || checkIsNil(withComTiny)) throw 'Песня не найдена';

                  refs[withComw] = comwRefGroup;
                  description += `Песни "${comTiny.n}" и "${withComTiny.n}" объединены в ссылочную группу`;
                } else {
                  const comJoinGroupMembersCount =
                    comwRefGroup == null
                      ? 0
                      : allGroups.reduce((sum, curr) => sum + (comwRefGroup === +(curr ?? 0) ? 1 : 0), 0);

                  if (comJoinGroupMembersCount === 2) delete refs[comw];
                  delete refs[withComw];

                  description += `Удалена ссылка между ${comTiny ? `песней "${comTiny.n}"` : '<s>неизвестной песней</s>'}`;
                  description += ` и ${withComTiny ? `песней "${withComTiny.n}"` : '<s>неизвестной песней</s>'}`;
                }
              } else {
                if (comTiny == null || withComTiny == null) throw 'Песня не найдена';

                if (withComwRefGroup != null) refs[comw] = withComwRefGroup;
                else {
                  const reservedGroupsSet = new Set(allGroups);
                  let minGroupId = CmComWidRefGroupId.min;

                  for (;;) if (!reservedGroupsSet.has(++minGroupId)) break;

                  refs[comw] = refs[withComw] = minGroupId;
                }

                description += `Песни "${comTiny.n}" и "${withComTiny.n}" объединены в ссылочную группу`;
              }
            });

            if (refGroups == null) throw 'Ошибка 318294001';

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

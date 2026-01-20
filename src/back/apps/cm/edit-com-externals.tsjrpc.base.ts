import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComAudioMarkPack, CmComAudioMarkPackTime, CmComWid } from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { itNumSort, SMyLib, smylib } from 'shared/utils';
import { takeCorrectComNumber } from 'shared/utils/cm/com/takeCorrectComNumber';
import { schedulesDirStore } from '../index/schedules/file-stores';
import { makeCmComNumLeadLinkFromHttp } from './complect/com-http-links';
import {
  cmComAudioMarkPacksFileStore,
  comsDirStore,
  eventPackHistoryFileStore,
  eventPacksFileStore,
} from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditComExternalsTsjrpcBaseServer =
  new (class CmEditComExternals extends TsjrpcBaseServer<CmEditComExternalsTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComExternals',
        methods: {
          setInScheduleEvent: async ({ schw, dayi, eventMi, list, fio }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'U')) throw '';

            const packs = eventPacksFileStore.getValueWithAutoSave();
            const history = eventPackHistoryFileStore.getValueWithAutoSave();

            const m = Date.now();
            packs[schw] ??= { pack: {}, m, schw };
            packs[schw].m = m;
            packs[schw].pack[dayi] ??= {};
            packs[schw].pack[dayi][eventMi] = list;

            history[schw] ??= {};
            let dayHistory = history[schw][dayi];
            if (!smylib.isArr(dayHistory)) dayHistory = history[schw][dayi] = [];

            if (dayHistory.length) {
              const today = new Date().setHours(0, 0, 0, 0);
              const prevPachi = dayHistory.findIndex(item => item.e === eventMi && item.w > today);
              if (prevPachi > -1) dayHistory.splice(prevPachi, 1);
            }

            dayHistory.unshift({ s: list, w: m, e: eventMi, fio });

            cmShareServerTsjrpcMethods.refreshScheduleEventComPacks({ packs: [packs[schw]], modifiedAt: m }, null);
            const coms = comsDirStore.getAllItems().filter(com => !com.isRemoved);

            return {
              description:
                `Обновлён список песен в расписании ` +
                `"${schedulesDirStore.getItem(schw)?.title ?? '??'}":\n\n${list
                  .map(comw => {
                    const comi = coms.findIndex(com => com.w === comw);
                    if (comi < 0) return `<s>Нет песни</s>`;
                    return `${takeCorrectComNumber(comi + 1)}. ${coms[comi].n}`;
                  })
                  .join('\n')}`,
            };
          },

          getScheduleEventHistory: async ({ schw, dayi }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'R')) throw '';

            const history = eventPackHistoryFileStore.getValue();

            return { value: history[schw]?.[dayi] ?? [] };
          },
          getScheduleEventHistoryStatistic: async ({ schw, dayi }, { auth }) => {
            if (throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'R')) throw '';

            const comwCount = {} as Record<CmComWid, number>;
            let totalCount = 0;
            const packs = eventPackHistoryFileStore.getValue()[schw]?.[dayi];

            if (packs === undefined) return { value: { comwCount, totalCount } };

            for (const pack of packs)
              for (const comw of pack.s) {
                comwCount[comw] ??= 0;
                comwCount[comw]++;
                totalCount++;
              }

            return { value: { comwCount, totalCount } };
          },

          removeScheduleEventHistoryItem: async ({ schw, dayi, writedAt }) => {
            const history = eventPackHistoryFileStore.getValue();
            const itemi = history[schw]?.[dayi]?.findIndex(item => item.w === writedAt);

            if (itemi == null || itemi < 0) throw new Error('item not found');

            history[schw]?.[dayi]?.splice(itemi, 1);

            return {
              value: history[schw]?.[dayi] ?? [],
              description:
                `Удалена пачка песен из истории события в расписании ` +
                `"${schedulesDirStore.getItem(schw)?.title ?? '??'}"`,
            };
          },

          updateAudioMarks: async ({ cMarks, src }) => {
            const allMarkPacks = cmComAudioMarkPacksFileStore.getValue();
            const numLeadSrc = makeCmComNumLeadLinkFromHttp(src);
            let description: string | null = null;

            if (allMarkPacks[numLeadSrc] == null) {
              description = `Создан новый пак аудио-маркеров для ссылки ${src}`;
              allMarkPacks[numLeadSrc] = { m: Date.now() };
            } else allMarkPacks[numLeadSrc].m = Date.now();

            if (allMarkPacks[numLeadSrc].cMarks == null) {
              const comMarks = (allMarkPacks[numLeadSrc].cMarks ??= {});
              const comNames: string[] = [];

              smylib.keys(cMarks).forEach(comw => {
                comMarks[comw] = { 0: '' };
                if (description) {
                  const com = comsDirStore.getItem(+comw);
                  if (com) comNames.push(com.n);
                }
              });

              if (description) description += `\n\nпесня ${comNames.join(', ')}`;
            }

            const srcPackMarks = allMarkPacks[numLeadSrc].cMarks;

            SMyLib.entries(cMarks).forEach(([comwStr, comMarks]) => {
              if (comMarks == null) return;

              SMyLib.entries(comMarks).forEach(([time, selector]) => {
                srcPackMarks[comwStr] ??= {};

                if (selector == null) {
                  delete srcPackMarks[comwStr][time];
                  return;
                }

                if (+time === 0.11) time = 0;
                if (selector === `+0.11+`) selector = `+0+`;

                const addTime = `+${time}+`;
                time = +(+time).toFixed(2);
                if (time !== 0 && Math.trunc(time) === time) time += 0.11;

                if (selector === addTime || selector === `+${time}+`) {
                  srcPackMarks[comwStr][time] = smylib.convertSecondsInStrTime(+time);
                  return;
                }

                srcPackMarks[comwStr][time] = selector;
              });
            });

            SMyLib.entries(srcPackMarks).forEach(([comwStr, comMarks]) => {
              const sortedMarksPack: CmComAudioMarkPack[CmComWid] = {};

              smylib
                .keys(comMarks)
                .map(Number)
                .sort(itNumSort)
                .forEach((time: CmComAudioMarkPackTime) => {
                  sortedMarksPack[time] = srcPackMarks[comwStr]?.[time];
                });

              srcPackMarks[comwStr] = sortedMarksPack;

              if (smylib.keys(srcPackMarks[comwStr]).length < 2) delete srcPackMarks[comwStr];
            });

            if (!smylib.keys(srcPackMarks).length) delete allMarkPacks[numLeadSrc].cMarks;

            cmComAudioMarkPacksFileStore.saveValue();

            return {
              description,
              value: { cMarks: allMarkPacks[numLeadSrc].cMarks, src },
            };
          },

          changeAudioMarkTime: async ({ newTime, src, time, comw }) => {
            const allMarkPacks = cmComAudioMarkPacksFileStore.getValue();
            const numLeadSrc = makeCmComNumLeadLinkFromHttp(src);

            if (allMarkPacks[numLeadSrc]?.cMarks == null) return { value: null };

            const cMarks = allMarkPacks[numLeadSrc].cMarks;
            cMarks[comw] ??= {};
            const comPack = cMarks[comw];

            if (comPack[newTime] != null) throw 'Такое время уже зарегистрировано';

            comPack[newTime] = comPack[time];
            delete comPack[time];

            allMarkPacks[numLeadSrc].m = Date.now();

            const sortedMarksPack: CmComAudioMarkPack = {};

            smylib
              .keys(comPack)
              .map(Number)
              .sort(itNumSort)
              .forEach((time: CmComAudioMarkPackTime) => {
                sortedMarksPack[comw] ??= {};
                sortedMarksPack[comw][time] = comPack[time];
              });

            allMarkPacks[numLeadSrc].cMarks = sortedMarksPack;

            cmComAudioMarkPacksFileStore.saveValue();

            return { value: { cMarks: allMarkPacks[numLeadSrc].cMarks, src }, description: null };
          },
        },
      });
    }
  })();

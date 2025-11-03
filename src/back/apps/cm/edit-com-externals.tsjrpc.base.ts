import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComAudioMarkPack, CmComWid } from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { itNumSort, SMyLib, smylib } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { schedulesFileStore } from '../index/schedules/file-stores';
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
                `"${schedulesFileStore.getValue().find(sch => sch.w === schw)?.title ?? '??'}":\n\n${list
                  .map(comw => {
                    const comi = coms.findIndex(com => com.w === comw);
                    if (comi < 0) return `<s>Нет песни</s>`;
                    return `${CmComUtils.takeCorrectComNumber(comi + 1)}. ${coms[comi].n}`;
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
                `"${schedulesFileStore.getValue().find(sch => sch.w === schw)?.title ?? '??'}"`,
            };
          },

          updateAudioMarks: async ({ marks, src }) => {
            const allMarkPacks = cmComAudioMarkPacksFileStore.getValue();
            const numLeadSrc = makeCmComNumLeadLinkFromHttp(src);
            let description: string | null = null;

            if (allMarkPacks[numLeadSrc] == null) {
              description = `Создан новый пак аудио-маркеров для песни ${src}`;
            }

            allMarkPacks[numLeadSrc] ??= { m: Date.now() };
            allMarkPacks[numLeadSrc].marks ??= { '0': '' };
            allMarkPacks[numLeadSrc].m = Date.now();

            const srcPackMarks = allMarkPacks[numLeadSrc].marks;

            SMyLib.entries(marks).forEach(([time, selector]) => {
              const addTime = `+${time}+`;
              time = +(+time).toFixed(3);

              if (selector == null) {
                delete srcPackMarks[time];
                return;
              }

              if (selector === addTime || selector === `+${time}+`) {
                srcPackMarks[time] = smylib.convertSecondsInStrTime(+time);
                return;
              }

              srcPackMarks[time] = selector;
            });

            if (smylib.keys(srcPackMarks).length) {
              const sortedMarksPack: CmComAudioMarkPack = {};

              smylib
                .keys(srcPackMarks)
                .map(Number)
                .sort(itNumSort)
                .forEach(time => (sortedMarksPack[time] = srcPackMarks[time]));

              allMarkPacks[numLeadSrc].marks = sortedMarksPack;
            } else delete allMarkPacks[numLeadSrc].marks;

            cmComAudioMarkPacksFileStore.saveValue();

            return {
              description,
              value: { marks: allMarkPacks[numLeadSrc].marks, src },
            };
          },

          changeAudioMarkTime: async ({ newTime, src, time }) => {
            const allMarkPacks = cmComAudioMarkPacksFileStore.getValue();
            const numLeadSrc = makeCmComNumLeadLinkFromHttp(src);

            if (allMarkPacks[numLeadSrc]?.marks == null) return { value: null };

            const marks = allMarkPacks[numLeadSrc].marks;
            if (marks[newTime] !== undefined) throw 'Такое время уже зарегистрировано';

            marks[newTime] = marks[time];
            delete marks[time];

            allMarkPacks[numLeadSrc].m = Date.now();

            const sortedMarksPack: CmComAudioMarkPack = {};

            smylib
              .keys(marks)
              .map(Number)
              .sort(itNumSort)
              .forEach(time => (sortedMarksPack[time] = marks[time]));

            allMarkPacks[numLeadSrc].marks = sortedMarksPack;

            cmComAudioMarkPacksFileStore.saveValue();

            return { value: { marks: allMarkPacks[numLeadSrc].marks, src }, description: null };
          },
        },
      });
    }
  })();

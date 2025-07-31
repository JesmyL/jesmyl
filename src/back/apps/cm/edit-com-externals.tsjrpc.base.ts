import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { CmComWid } from 'shared/api';
import { CmEditComExternalsTsjrpcModel } from 'shared/api/tsjrpc/cm/edit-com-externals.tsjrpc.model';
import { smylib } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { schedulesFileStore } from '../index/schedules/file-stores';
import { comsFileStore, eventPackHistoryFileStore, eventPacksFileStore } from './file-stores';
import { cmShareServerTsjrpcMethods } from './tsjrpc.shares';

export const cmEditComExternalsTsjrpcBaseServer =
  new (class CmEditComExternals extends TsjrpcBaseServer<CmEditComExternalsTsjrpcModel> {
    constructor() {
      super({
        scope: 'CmEditComExternals',
        defaultBeforeEachTool: { minLevel: 50 },
        methods: {
          setInScheduleEvent: async ({ schw, dayi, eventMi, list, fio }) => {
            const packs = eventPacksFileStore.getValueWithAutoSave();
            const history = eventPackHistoryFileStore.getValueWithAutoSave();

            const m = Date.now() + Math.random();
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

            cmShareServerTsjrpcMethods.refreshScheduleEventComPacks({ packs: [packs[schw]], modifiedAt: m });
          },

          getScheduleEventHistory: async ({ schw, dayi }) => {
            const history = eventPackHistoryFileStore.getValue();

            return history[schw]?.[dayi] ?? [];
          },
          getScheduleEventHistoryStatistic: async ({ schw, dayi }) => {
            const comwCount = {} as Record<CmComWid, number>;
            let totalCount = 0;
            const packs = eventPackHistoryFileStore.getValue()[schw]?.[dayi];

            if (packs === undefined) return { comwCount, totalCount };

            for (const pack of packs)
              for (const comw of pack.s) {
                comwCount[comw] ??= 0;
                comwCount[comw]++;
                totalCount++;
              }

            return { comwCount, totalCount };
          },

          removeScheduleEventHistoryItem: async ({ schw, dayi, writedAt }) => {
            const history = eventPackHistoryFileStore.getValue();
            const itemi = history[schw]?.[dayi]?.findIndex(item => item.w === writedAt);

            if (itemi == null || itemi < 0) throw new Error('item not found');

            history[schw]?.[dayi]?.splice(itemi, 1);

            return history[schw]?.[dayi] ?? [];
          },
        },

        onEachFeedback: {
          setInScheduleEvent: ({ schw, list }) =>
            `Обновлён список песен в расписании ` +
            `"${schedulesFileStore.getValue().find(sch => sch.w === schw)?.title ?? '??'}":\n\n${list
              .map(comw => {
                const coms = comsFileStore.getValue().filter(com => !com.isRemoved);
                const comi = coms.findIndex(com => com.w === comw);
                if (comi < 0) return `<s>Нет песни</s>`;
                return `${CmComUtils.takeCorrectComNumber(comi + 1)}. ${coms[comi].n}`;
              })
              .join('\n')}`,

          removeScheduleEventHistoryItem: ({ schw }) =>
            `Удалена пачка песен из истории события в расписании ` +
            `"${schedulesFileStore.getValue().find(sch => sch.w === schw)?.title ?? '??'}"`,

          getScheduleEventHistory: null,
          getScheduleEventHistoryStatistic: null,
        },
      });
    }
  })();

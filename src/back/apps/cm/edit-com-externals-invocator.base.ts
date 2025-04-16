import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmEditComExternalsSokiInvocatorModel } from 'shared/api/invocators/cm/edit-com-externals-invocators.model';
import { smylib } from 'shared/utils';
import { CmComUtils } from 'shared/utils/cm/ComUtils';
import { schedulesFileStore } from '../index/schedules/file-stores';
import { comsFileStore, eventPackHistoryFileStore, eventPacksFileStore } from './file-stores';
import { cmShareServerInvocatorMethods } from './invocator.shares';

export const cmEditComExternalsSokiInvocatorBaseServer =
  new (class CmEditComExternals extends SokiInvocatorBaseServer<CmEditComExternalsSokiInvocatorModel> {
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

            cmShareServerInvocatorMethods.refreshScheduleEventComPacks({ packs: [packs[schw]], modifiedAt: m });
          },

          getScheduleEventHistory: async ({ schw, dayi }) => {
            const history = eventPackHistoryFileStore.getValue();

            return history[schw]?.[dayi] ?? [];
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
        },
      });
    }
  })();

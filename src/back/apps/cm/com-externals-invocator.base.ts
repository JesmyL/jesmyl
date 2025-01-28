import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { CmComExternalsSokiInvocatorModel } from 'shared/api/invocators/cm/com-externals-invocators.model';
import { smylib } from 'shared/utils';
import { schedulesFileStore } from '../index/schedules/base-invocators/file-stores';
import { eventPackHistoryFileStore, eventPacksFileStore } from './file-stores';
import { cmServerInvocatorShareMethods } from './invocator.shares';

class CmComExternalsSokiInvocatorBaseServer extends SokiInvocatorBaseServer<CmComExternalsSokiInvocatorModel> {
  constructor() {
    super(
      'CmComExternalsSokiInvocatorBaseServer',
      {
        setInScheduleEvent: () => async (schw, dayi, eventMi, list) => {
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

          dayHistory.unshift({ s: list, w: m, e: eventMi });

          cmServerInvocatorShareMethods.refreshScheduleEventComPacks(null, [packs[schw]], m);
        },

        getScheduleEventHistory: () => async (schw, dayi) => {
          const history = eventPackHistoryFileStore.getValue();

          return history[schw]?.[dayi] ?? [];
        },
      },

      {
        setInScheduleEvent: (_, schw) =>
          `Обновлён список песен в расписании ` +
          `"${schedulesFileStore.getValue().find(sch => sch.w === schw)?.title ?? '??'}"`,

        getScheduleEventHistory: () => ``,
      },
    );
  }
}

export const cmComExternalsSokiInvocatorBaseServer = new CmComExternalsSokiInvocatorBaseServer();

import { SokiInvocatorServer } from 'back/SokiInvocator.server';
import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IndexSchWTranslationLiveDataValue } from 'front/components/index/Index.model';
import { IScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import {
  SchLiveSokiInvocatorModel,
  SchLiveSokiInvocatorSharesModel,
} from 'shared/api/invocators/schedules/live-invocators.model';
import { itNNull, SMyLib } from 'shared/utils';
import { WebSocket } from 'ws';

const theLiveData = {} as PRecord<IScheduleWidgetWid, PRecord<SokiAuthLogin, IndexSchWTranslationLiveDataValue>>;
const liveDataWatchers: PRecord<IScheduleWidgetWid, PRecord<SokiAuthLogin, Set<WebSocket>>> = {};
const streamersWaiters: PRecord<IScheduleWidgetWid, Set<WebSocket>> = {};

const shareLiveData = (schw: IScheduleWidgetWid, streamerLogin: SokiAuthLogin) => {
  const waiters = liveDataWatchers[schw]?.[streamerLogin];
  if (waiters == null) return;
  const data = theLiveData[schw]?.[streamerLogin] ?? null;

  waiters.forEach(client => {
    try {
      schLiveSokiInvocatorSharesServer.updateData({ data }, client);
    } catch (_error) {
      waiters.delete(client);
    }
  });
};

export const schLiveSokiInvocatorServer =
  new (class SchLive extends SokiInvocatorBaseServer<SchLiveSokiInvocatorModel> {
    constructor() {
      super({
        scope: 'SchLive',
        methods: {
          next: async ({ schw, data }, { auth }) => {
            if (auth?.login == null) throw new Error('Не зарегистрирован');

            theLiveData[schw] ??= {};
            theLiveData[schw][auth.login] = data;

            const streamers = SMyLib.entries(theLiveData[schw]).map(([login, data]) => {
              return { fio: data?.fio ?? '*Завершена*', login };
            });

            streamersWaiters[schw]?.forEach(client => {
              schLiveSokiInvocatorSharesServer.streamersList({ streamers } as never, client);
            });
            shareLiveData(schw, auth.login);
          },

          requestStreamers: async ({ schw }, { client }) => {
            const streamers =
              (theLiveData[schw] &&
                SMyLib.entries(theLiveData[schw])
                  .map(([login, data]) => {
                    if (data == null) return null;
                    return { fio: data.fio, login };
                  })
                  .filter(itNNull)) ??
              [];

            if (streamers.length) {
              await schLiveSokiInvocatorSharesServer.streamersList({ streamers } as never, client);
            } else {
              streamersWaiters[schw] ??= new Set();
              streamersWaiters[schw].add(client);
            }
          },

          reset: async ({ schw }, { auth }) => {
            if (auth?.login == null) throw new Error('Не зарегистрирован');

            theLiveData[schw] ??= {};
            delete theLiveData[schw][auth.login];

            const wathers = liveDataWatchers[schw]?.[auth.login];
            if (wathers == null) return;

            wathers.forEach(client => {
              try {
                schLiveSokiInvocatorSharesServer.updateData({ data: null }, client);
              } catch (_error) {
                wathers.delete(client);
              }
            });
          },

          watch: async ({ schw, streamerLogin }, { client }) => {
            liveDataWatchers[schw] ??= {};
            const watchers = (liveDataWatchers[schw][streamerLogin] ??= new Set());
            watchers.add(client);

            shareLiveData(schw, streamerLogin);

            client.on('close', () => watchers.delete(client));
          },

          unwatch: async ({ schw, streamerLogin }, { client }) => {
            liveDataWatchers[schw]?.[streamerLogin]?.delete(client);
          },
        },
      });
    }
  })();

export const schLiveSokiInvocatorSharesServer =
  new (class SchLive extends SokiInvocatorServer<SchLiveSokiInvocatorSharesModel> {
    constructor() {
      super({
        scope: 'SchLive',
        methods: {
          updateData: true,
          streamersList: true,
        },
      });
    }
  })();

import { IndexSchWBroadcastLiveDataValue } from '$index/shared/model/Index.model';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { IScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { SchLiveTsjrpcModel, SchLiveTsjrpcSharesModel } from 'shared/api/tsjrpc/schedules/live.tsjrpc.model';
import { itNNull, SMyLib } from 'shared/utils';
import { WebSocket } from 'ws';

const theLiveData = {} as PRecord<IScheduleWidgetWid, PRecord<SokiAuthLogin, IndexSchWBroadcastLiveDataValue>>;
const liveDataWatchers: PRecord<IScheduleWidgetWid, PRecord<SokiAuthLogin, Set<WebSocket>>> = {};
const streamersWaiters: PRecord<IScheduleWidgetWid, Set<WebSocket>> = {};

const shareLiveData = (schw: IScheduleWidgetWid, streamerLogin: SokiAuthLogin) => {
  const waiters = liveDataWatchers[schw]?.[streamerLogin];
  if (waiters == null) return;
  const data = theLiveData[schw]?.[streamerLogin] ?? null;

  waiters.forEach(client => {
    try {
      schLiveTsjrpcSharesServer.updateData({ data }, client);
    } catch (_error) {
      waiters.delete(client);
    }
  });
};

export const schLiveTsjrpcServer = new (class SchLive extends TsjrpcBaseServer<SchLiveTsjrpcModel> {
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
            schLiveTsjrpcSharesServer.streamersList({ streamers } as never, client);
          });
          shareLiveData(schw, auth.login);
        },

        requestStreamers: async ({ schw }, { client }) => {
          if (client == null) return;

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
            await schLiveTsjrpcSharesServer.streamersList({ streamers } as never, client);
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
              schLiveTsjrpcSharesServer.updateData({ data: null }, client);
            } catch (_error) {
              wathers.delete(client);
            }
          });
        },

        watch: async ({ schw, streamerLogin }, { client }) => {
          if (client == null) return;

          liveDataWatchers[schw] ??= {};
          const watchers = (liveDataWatchers[schw][streamerLogin] ??= new Set());
          watchers.add(client);

          shareLiveData(schw, streamerLogin);

          client.on('close', () => watchers.delete(client));
        },

        unwatch: async ({ schw, streamerLogin }, { client }) => {
          if (client == null) return;
          liveDataWatchers[schw]?.[streamerLogin]?.delete(client);
        },
      },
    });
  }
})();

export const schLiveTsjrpcSharesServer = new (class SchLive extends TsjrpcServerMethods<SchLiveTsjrpcSharesModel> {
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

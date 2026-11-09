import { backLocaleError, backLocalePayload, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { ScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { SchLiveTsjrpcModel, SchLiveTsjrpcSharesModel } from 'shared/api/tsjrpc/schedules/live.tsjrpc.model';
import { IndexSchWBroadcastLiveDataValue } from 'shared/model/index/Index.model';
import { emptyFunc, itNNull } from 'shared/utils';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { WebSocket } from 'ws';
import { insertDashMessage } from 'back/dash/visits';
import { DashMessageKind } from 'shared/model/index/visitsDashboard';
import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';

const theLiveData = {} as PRecord<ScheduleWidgetWid, PRecord<SokiAuthLogin, IndexSchWBroadcastLiveDataValue>>;
const liveDataWatchers: PRecord<ScheduleWidgetWid, PRecord<SokiAuthLogin, Set<WebSocket>>> = {};
const streamersWaiters: PRecord<ScheduleWidgetWid, Set<WebSocket>> = {};

const logStreamStart = async (schw: ScheduleWidgetWid, login: SokiAuthLogin, name: string) => {
  const sch = await takeScheduleWidgetTiny({ w: schw }, false);
  if (sch == null) return;

  await insertDashMessage(
    backLocalePayload(langi => translateBackTexts(langi, BackLocaleKey.SchLiveStreamStarted, { n: name, t: `"${sch.title}"` })),
    null,
    DashMessageKind.Log,
    login,
  );
};

const shareLiveData = (schw: ScheduleWidgetWid, streamerLogin: SokiAuthLogin) => {
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
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);

          if (data != null && theLiveData[schw]?.[auth.login] == null)
            logStreamStart(schw, auth.login, data.fio || auth.login).catch(emptyFunc);

          theLiveData[schw] ??= {};
          theLiveData[schw][auth.login] = data;

          streamersWaiters[schw]?.forEach(client => {
            const langi = sokiServer.takeClientLangi(client);

            const streamers = mapObjectEntries(theLiveData[schw], (login, data) => {
              return { fio: data?.fio ?? translateBackTexts(langi, BackLocaleKey.SchLiveStreamFinished), login };
            });

            schLiveTsjrpcSharesServer.streamersList({ streamers } as never, client);
          });
          shareLiveData(schw, auth.login);
        },

        requestStreamers: async ({ schw }, { client }) => {
          if (client == null) return;

          const streamers =
            (theLiveData[schw] &&
              mapObjectEntries(theLiveData[schw], (login, data) => {
                if (data == null) return null;
                return { fio: data.fio, login };
              }).filter(itNNull)) ??
            [];

          if (streamers.length) {
            await schLiveTsjrpcSharesServer.streamersList({ streamers } as never, client);
          } else {
            const waiters = (streamersWaiters[schw] ??= new Set());

            if (!waiters.has(client)) {
              waiters.add(client);
              client.once('close', () => waiters.delete(client));
            }
          }
        },

        reset: async ({ schw }, { auth }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);

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

          if (!watchers.has(client)) {
            watchers.add(client);
            client.once('close', () => watchers.delete(client));
          }

          shareLiveData(schw, streamerLogin);
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
    });
  }
})();

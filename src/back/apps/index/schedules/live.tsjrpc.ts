import { backLocaleError, backLocalePayload, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { RemotePublishedControl, ScheduleWidgetWid, SokiAuthLogin } from 'shared/api';
import { SchLiveTsjrpcModel, SchLiveTsjrpcSharesModel } from 'shared/api/tsjrpc/schedules/live.tsjrpc.model';
import {
  parseRemoteControlTarget,
  remoteBroadcastPath,
  remoteBroadcastSecretCodeLength,
} from 'shared/const/electron';
import { IndexSchWBroadcastLiveDataValue, RemoteBroadcastOs } from 'shared/model/index/Index.model';
import { emptyFunc, itNNull } from 'shared/utils';
import { mapObjectEntries } from 'shared/utils/object.utils';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { WebSocket } from 'ws';
import { insertDashMessage } from 'back/dash/visits';
import { DashMessageKind } from 'shared/model/index/visitsDashboard';
import { takeScheduleWidgetTiny } from 'back/apps/index/schedules/schedule.tiny';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { takeUserTiny } from '../tinies/userTiny';

const theLiveData = {} as PRecord<ScheduleWidgetWid, PRecord<SokiAuthLogin, IndexSchWBroadcastLiveDataValue>>;
const liveDataWatchers: PRecord<ScheduleWidgetWid, PRecord<SokiAuthLogin, Set<WebSocket>>> = {};
const streamersWaiters: PRecord<ScheduleWidgetWid, Set<WebSocket>> = {};
const noSchwLoggedClients = new WeakSet<WebSocket>();

const remoteControls = {} as PRecord<
  SokiAuthLogin,
  { ip: string; port: number; deviceEmoji: string; agent: string; os: RemoteBroadcastOs; secretCode?: string }
>;
const publishedRemoteControlsWaiters = new Set<WebSocket>();
const remoteControlPublisherByClient = new WeakMap<WebSocket, SokiAuthLogin>();
const remoteControlPublisherByLogin: PRecord<SokiAuthLogin, WebSocket> = {};
const remoteControlCloseGraceMs = 90_000;
const remoteControlsCloseTimers = {} as PRecord<SokiAuthLogin, ReturnType<typeof setTimeout>>;

const clearRemoteControlCloseTimer = (login: SokiAuthLogin) => {
  const timer = remoteControlsCloseTimers[login];
  if (timer == null) return;

  clearTimeout(timer);
  delete remoteControlsCloseTimers[login];
};

const parseRemoteControlAddress = (address: {
  ip?: unknown;
  port?: unknown;
  url?: unknown;
}): { ip: string; port: number } | nil => {
  if (
    typeof address.ip === 'string' &&
    address.ip.length > 0 &&
    address.ip.length <= 100 &&
    typeof address.port === 'number' &&
    Number.isInteger(address.port) &&
    address.port >= 1 &&
    address.port <= 65535
  )
    return { ip: address.ip, port: address.port };

  if (typeof address.url !== 'string') return null;

  try {
    const remote = new URL(address.url).searchParams.get(remoteBroadcastPath);
    return remote == null ? null : parseRemoteControlTarget(remote);
  } catch {
    return null;
  }
};

const parseRemoteControlDeviceEmoji = (value: unknown) => (typeof value === 'string' ? value.slice(0, 8) : '');
const parseRemoteControlAgent = (value: unknown) => (typeof value === 'string' ? value.slice(0, 300) : '');

const parseRemoteControlOs = (value: unknown): RemoteBroadcastOs =>
  value === RemoteBroadcastOs.Win || value === RemoteBroadcastOs.Linux || value === RemoteBroadcastOs.Mac
    ? value
    : RemoteBroadcastOs.Other;

const parseRemoteControlSecretCode = (value: unknown): string | nil =>
  typeof value === 'string' && value.length === remoteBroadcastSecretCodeLength ? value : null;

export const takePublishedRemoteControls = async (): Promise<RemotePublishedControl[]> => {
  const controls = await Promise.all(
    mapObjectEntries(remoteControls, async (login, control) => {
      if (control == null) return null;

      const user = await takeUserTiny({ l: login }, false);

      return {
        fio: takeUserAuthName(user?.uauth) || login,
        ip: control.ip,
        port: control.port,
        ...(control.secretCode == null ? {} : { secretCode: control.secretCode }),
      };
    }),
  );

  return controls.filter(itNNull).sort((a, b) => a.fio.localeCompare(b.fio));
};

const sharePublishedRemoteControls = async () => {
  if (publishedRemoteControlsWaiters.size === 0) return;

  const controls = await takePublishedRemoteControls();

  for (const client of publishedRemoteControlsWaiters) {
    try {
      schLiveTsjrpcSharesServer.publishedRemoteControlsList({ controls }, client);
    } catch (_error) {
      publishedRemoteControlsWaiters.delete(client);
    }
  }
};

const logStreamStart = async (schw: ScheduleWidgetWid | null, login: SokiAuthLogin | null, fio: string) => {
  const sch = schw == null ? null : await takeScheduleWidgetTiny({ w: schw }, false);
  if (schw != null && sch == null) return;

  await insertDashMessage(
    backLocalePayload(langi => {
      const name = fio || login || translateBackTexts(langi, BackLocaleKey.SchLiveAnonymousName);

      return sch == null
        ? translateBackTexts(langi, BackLocaleKey.SchLiveStreamStartedNoSchw, { n: name })
        : translateBackTexts(langi, BackLocaleKey.SchLiveStreamStarted, { n: name, t: `"${sch.title}"` });
    }),
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
        next: async ({ schw, data }, { auth, client }) => {
          if (schw == null || auth?.login == null) {
            if (data != null && client != null && !noSchwLoggedClients.has(client)) {
              noSchwLoggedClients.add(client);
              logStreamStart(null, auth?.login ?? null, data.fio).catch(emptyFunc);
            }

            return;
          }

          if (data != null && theLiveData[schw]?.[auth.login] == null)
            logStreamStart(schw, auth.login, data.fio).catch(emptyFunc);

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

        publishRemoteControl_1: async ({ ip, port, url, deviceEmoji, agent, os, secretCode }, { auth, client }) => {
          const login = takeLogginedAuthOrThrow(auth).login;
          const target = parseRemoteControlAddress({ ip, port, url });

          if (target == null) throw backLocaleError(BackLocaleKey.ServerError);

          const parsedSecretCode = parseRemoteControlSecretCode(secretCode);

          remoteControls[login] = {
            ip: target.ip,
            port: target.port,
            deviceEmoji: parseRemoteControlDeviceEmoji(deviceEmoji),
            agent: parseRemoteControlAgent(agent),
            os: parseRemoteControlOs(os),
            ...(parsedSecretCode == null ? {} : { secretCode: parsedSecretCode }),
          };

          if (client != null) {
            remoteControlPublisherByClient.set(client, login);
            remoteControlPublisherByLogin[login] = client;
          }

          clearRemoteControlCloseTimer(login);

          await sharePublishedRemoteControls();
        },

        unpublishRemoteControl_1: async (_args, { auth, client }) => {
          const login = takeLogginedAuthOrThrow(auth).login;

          if (remoteControls[login] == null) return;

          clearRemoteControlCloseTimer(login);
          delete remoteControls[login];

          if (client != null) {
            remoteControlPublisherByClient.delete(client);
            if (remoteControlPublisherByLogin[login] === client) delete remoteControlPublisherByLogin[login];
          }

          await sharePublishedRemoteControls();
        },

        requestPublishedRemoteControls_1: async (_args, { auth, client }) => {
          if (auth?.login == null) return { value: [] };

          if (client != null && !publishedRemoteControlsWaiters.has(client)) {
            publishedRemoteControlsWaiters.add(client);
            client.once('close', () => publishedRemoteControlsWaiters.delete(client));
          }

          return { value: await takePublishedRemoteControls() };
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

sokiServer.onClientCloseEvent.listen(client => {
  const login = remoteControlPublisherByClient.get(client);
  if (login == null) return;

  remoteControlPublisherByClient.delete(client);

  if (remoteControlPublisherByLogin[login] !== client) return;

  delete remoteControlPublisherByLogin[login];

  if (remoteControls[login] == null) return;

  if (remoteControlsCloseTimers[login] == null)
    remoteControlsCloseTimers[login] = setTimeout(() => {
      delete remoteControlsCloseTimers[login];

      if (remoteControlPublisherByLogin[login] != null) return;

      delete remoteControls[login];
      sharePublishedRemoteControls().catch(emptyFunc);
    }, remoteControlCloseGraceMs);
});

export const schLiveTsjrpcSharesServer = new (class SchLive extends TsjrpcServerMethods<SchLiveTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'SchLive',
    });
  }
})();

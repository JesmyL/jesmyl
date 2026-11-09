import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { makeRegExp } from 'regexpert';
import {
  DeviceId,
  SokiAuthLogin,
  SokiDeviceType,
  SokiVisit,
  TextTransferTsjrpcModel,
  TextTransferTsjrpcSharesModel,
  TextTransferWindow,
} from 'shared/api';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectKeys } from 'shared/utils/object.utils';
import { WebSocket } from 'ws';
import { sokiServer } from 'back/complect/soki/SokiServer';

type TextTransferClient = {
  deviceId: DeviceId;
  emoji: string;
  type: SokiDeviceType;
  browser: string;
  os: string;
  ip: string;
  version: number;
};

type TextTransferRoom = {
  texts: Map<DeviceId, string>;
  clients: Set<WebSocket>;
  devices: Map<WebSocket, TextTransferClient>;
};

const textTransferRooms = new Map<SokiAuthLogin, TextTransferRoom>();

const deviceTypes = lazyInit(() => {
  const types: Record<string, SokiDeviceType> = {
    iphone: SokiDeviceType.iPhone,
    ipad: SokiDeviceType.iPad,
    android: SokiDeviceType.Android,
  };

  return { types, regexp: makeRegExp(`/(${objectKeys(types).join('|')})/i`) };
});

const deviceType = (agent: string) => {
  const { types, regexp } = deviceTypes();
  const token = agent.match(regexp)?.[1].toLowerCase();

  return token == null ? SokiDeviceType.Pc : types[token];
};

const agentDetails = lazyInit(() => {
  const browsers = { Edg: 'Edge', OPR: 'Opera', YaBrowser: 'Yandex', Chrome: 'Chrome', Firefox: 'Firefox', Safari: 'Safari' };
  const oses = { Android: 'Android', iPhone: 'iOS', iPad: 'iPadOS', Windows: 'Windows', Macintosh: 'macOS', Linux: 'Linux' };

  return {
    browsers,
    oses,
    regexp: makeRegExp(`/(${objectKeys(browsers).join('|')})|(${objectKeys(oses).join('|')})/gi`),
  };
});

const takeAgentDetails = (agent: string) => {
  const { browsers, oses, regexp } = agentDetails();
  const found = (agent.match(regexp) ?? []).map(token => token.toLowerCase());
  const pick = (dict: Record<string, string>) => {
    const token = objectKeys(dict).find(key => found.includes(key.toLowerCase()));

    return token == null ? '' : dict[token];
  };

  return { browser: pick(browsers), os: pick(oses) };
};

const takeClient = (visit: SokiVisit, client: WebSocket): TextTransferClient => {
  const { browser, os } = takeAgentDetails(visit.agent);

  return {
    deviceId: visit.deviceId,
    emoji: visit.deviceEmoji,
    type: deviceType(visit.agent),
    browser,
    os,
    ip: sokiServer.takeClientIp(client) ?? '',
    version: visit.version,
  };
};

const takeRoom = (login: SokiAuthLogin) => {
  const room = textTransferRooms.get(login);
  if (room != null) return room;

  const newRoom: TextTransferRoom = { texts: new Map(), clients: new Set(), devices: new Map() };
  textTransferRooms.set(login, newRoom);

  return newRoom;
};

const takeActualDevice = (room: TextTransferRoom, client: WebSocket) => {
  const device = room.devices.get(client);
  if (device == null) return null;

  const visit = sokiServer.takeClientVisit(client);
  if (visit == null || visit.deviceId === device.deviceId) return device;

  const text = room.texts.get(device.deviceId);
  if (text != null) {
    room.texts.delete(device.deviceId);
    room.texts.set(visit.deviceId, text);
  }

  const actualDevice = takeClient(visit, client);
  room.devices.set(client, actualDevice);

  return actualDevice;
};

const takeWindows = (room: TextTransferRoom) => {
  const windows = new Map<DeviceId, TextTransferWindow>();

  room.clients.forEach(client => {
    const device = takeActualDevice(room, client);
    if (device == null || windows.has(device.deviceId)) return;

    windows.set(device.deviceId, {
      deviceId: device.deviceId,
      emoji: device.emoji,
      type: device.type,
      browser: device.browser,
      os: device.os,
      ip: device.ip,
      version: device.version,
      text: room.texts.get(device.deviceId) ?? '',
    });
  });

  return [...windows.values()];
};

const shareCount = (login: SokiAuthLogin) => {
  const room = textTransferRooms.get(login);
  if (room != null) textTransferTsjrpcSharesServer.count({ count: room.clients.size }, room.clients);
};

const shareTexts = (login: SokiAuthLogin) => {
  const room = textTransferRooms.get(login);
  if (room == null) return;

  textTransferTsjrpcSharesServer.texts({ windows: takeWindows(room) }, room.clients);
};

const leaveRoom = (login: SokiAuthLogin, client: WebSocket) => {
  const room = textTransferRooms.get(login);
  if (room == null || !room.clients.delete(client)) return;

  const leavingDevice = takeActualDevice(room, client);
  room.devices.delete(client);

  if (room.clients.size === 0) {
    textTransferRooms.delete(login);
    return;
  }

  if (
    leavingDevice != null &&
    ![...room.clients].some(client => room.devices.get(client)?.deviceId === leavingDevice.deviceId)
  )
    room.texts.delete(leavingDevice.deviceId);

  shareCount(login);
  shareTexts(login);
};

sokiServer.onClientCloseEvent.listen(client => {
  textTransferRooms.forEach((room, login) => {
    if (room.clients.has(client)) leaveRoom(login, client);
  });
});

sokiServer.onClientVisitChangeEvent.listen(client => {
  textTransferRooms.forEach((room, login) => {
    if (room.clients.has(client)) shareTexts(login);
  });
});

sokiServer.onClientAuthChangeEvent.listen(({ client, previousLogin, login }) => {
  if (previousLogin == null || previousLogin === login) return;

  const room = textTransferRooms.get(previousLogin);
  if (room == null || !room.clients.has(client)) return;

  leaveRoom(previousLogin, client);
  textTransferTsjrpcSharesServer.kick(true, client);
});

export const textTransferTsjrpcServer = new (class TextTransfer extends TsjrpcBaseServer<TextTransferTsjrpcModel> {
  constructor() {
    super({
      scope: 'TextTransfer',
      methods: {
        join: async (_, { auth, client }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);
          if (!(client instanceof WebSocket)) throw backLocaleError(BackLocaleKey.ClientNotFound);

          const visit = sokiServer.takeClientVisit(client);
          if (visit == null) throw backLocaleError(BackLocaleKey.ClientNotFound);

          const room = takeRoom(auth.login);
          room.clients.add(client);
          room.devices.set(client, takeClient(visit, client));
          shareCount(auth.login);
          shareTexts(auth.login);

          return { value: { windows: takeWindows(room), count: room.clients.size } };
        },

        leave: async (_, { auth, client }) => {
          if (auth?.login == null || !(client instanceof WebSocket)) return;
          leaveRoom(auth.login, client);
        },

        putText: async ({ text }, { auth, client }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);
          if (!(client instanceof WebSocket)) throw backLocaleError(BackLocaleKey.ClientNotFound);

          const room = textTransferRooms.get(auth.login);
          if (room == null) return;

          const device = takeActualDevice(room, client);
          if (device == null) return;

          room.texts.set(device.deviceId, text);
          shareTexts(auth.login);
        },

        getDevices: async (_, { auth, client }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);
          if (!(client instanceof WebSocket)) throw backLocaleError(BackLocaleKey.ClientNotFound);

          const owner = auth.fio || auth.nick || auth.email || auth.login;
          const room = textTransferRooms.get(auth.login);
          if (room == null) return { value: { owner, devices: [] } };

          const thisDeviceId = sokiServer.takeClientVisit(client)?.deviceId;

          return {
            value: {
              owner,
              devices: [...room.clients].map(roomClient => {
                const visit = sokiServer.takeClientVisit(roomClient);
                const agent = visit?.agent ?? '';
                const { browser, os } = takeAgentDetails(agent);

                return {
                  emoji: visit?.deviceEmoji ?? '',
                  type: deviceType(agent),
                  ip: sokiServer.takeClientIp(roomClient) ?? '',
                  version: visit?.version ?? 0,
                  browser,
                  os,
                  isThisDevice: roomClient === client || (thisDeviceId != null && visit?.deviceId === thisDeviceId),
                };
              }),
            },
          };
        },
      },
    });
  }
})();

export const textTransferTsjrpcSharesServer =
  new (class TextTransfer extends TsjrpcServerMethods<TextTransferTsjrpcSharesModel> {
    constructor() {
      super({
        scope: 'TextTransfer',
      });
    }
  })();

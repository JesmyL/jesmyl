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
  TextTransferFile,
  TextTransferTsjrpcModel,
  TextTransferTsjrpcSharesModel,
  TextTransferWindow,
} from 'shared/api';
import { lazyInit } from 'shared/utils/lazyInit';
import { objectKeys } from 'shared/utils/object.utils';
import { WebSocket } from 'ws';
import { sokiServer } from 'back/complect/soki/SokiServer';
import { constantsConfigFileStore } from './schedules/file-stores';

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
  // По одному последнему файлу на устройство: новый файл заменяет предыдущий.
  files: Map<DeviceId, TextTransferStoredFile>;
  clients: Set<WebSocket>;
  devices: Map<WebSocket, TextTransferClient>;
};

/** Серверное хранение файла: к метаданным добавляются MIME-тип и полный base64, который на клиентов не уходит. */
type TextTransferStoredFile = TextTransferFile & {
  type: string;
  data: string;
};

const textTransferRooms = new Map<SokiAuthLogin, TextTransferRoom>();

/** Размер base64-куска: 256 КБ строки уверенно помещается в ws-сообщение и не упирается в лимиты прокси. */
const textTransferFileChunkSize = 256 * 1024;

/** Длина чистого base64 в байтах: учитываем хвостовые символы выравнивания. */
const takeBase64ByteLength = (base64: string) => {
  const padding = base64.endsWith('==') ? 2 : base64.endsWith('=') ? 1 : 0;

  return Math.floor((base64.length * 3) / 4) - padding;
};

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

  const newRoom: TextTransferRoom = { texts: new Map(), files: new Map(), clients: new Set(), devices: new Map() };
  textTransferRooms.set(login, newRoom);

  return newRoom;
};

const takeActualDevice = (room: TextTransferRoom, client: WebSocket) => {
  const device = room.devices.get(client);
  if (device == null) return null;

  const visit = sokiServer.takeClientVisit(client);
  if (visit == null || visit.deviceId === device.deviceId) return device;

  // При смене deviceId переносим текст и файл на новое устройство, чтобы комната их не потеряла.
  const text = room.texts.get(device.deviceId);
  if (text != null) {
    room.texts.delete(device.deviceId);
    room.texts.set(visit.deviceId, text);
  }

  const file = room.files.get(device.deviceId);
  if (file != null) {
    room.files.delete(device.deviceId);
    room.files.set(visit.deviceId, { ...file, deviceId: visit.deviceId });
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

/** Собирает метаданные (имя и размер) актуального файла с каждого подключённого устройства комнаты. */
const takeFiles = (room: TextTransferRoom) => {
  const files = new Map<DeviceId, TextTransferFile>();

  room.clients.forEach(client => {
    const device = takeActualDevice(room, client);
    if (device == null) return;

    const file = room.files.get(device.deviceId);
    if (file == null) return;

    files.set(device.deviceId, { deviceId: device.deviceId, name: file.name, size: file.size });
  });

  return [...files.values()];
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

/** Рассылает всем клиентам комнаты актуальный набор файлов. */
const shareFiles = (login: SokiAuthLogin) => {
  const room = textTransferRooms.get(login);
  if (room == null) return;

  textTransferTsjrpcSharesServer.files({ files: takeFiles(room) }, room.clients);
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

  // Устройство ушло окончательно — удаляем и его текст, и его файл, затем обновляем остальных.
  if (
    leavingDevice != null &&
    ![...room.clients].some(client => room.devices.get(client)?.deviceId === leavingDevice.deviceId)
  ) {
    room.texts.delete(leavingDevice.deviceId);
    room.files.delete(leavingDevice.deviceId);
  }

  shareCount(login);
  shareTexts(login);
  shareFiles(login);
};

sokiServer.onClientCloseEvent.listen(client => {
  textTransferRooms.forEach((room, login) => {
    if (room.clients.has(client)) leaveRoom(login, client);
  });
});

sokiServer.onClientVisitChangeEvent.listen(client => {
  textTransferRooms.forEach((room, login) => {
    if (room.clients.has(client)) {
      shareTexts(login);
      shareFiles(login);
    }
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
          shareFiles(auth.login);

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

        putFile: async ({ name, type, data }, { auth, client }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);
          if (!(client instanceof WebSocket)) throw backLocaleError(BackLocaleKey.ClientNotFound);

          const room = textTransferRooms.get(auth.login);
          if (room == null) return;

          const device = takeActualDevice(room, client);
          if (device == null) return;

          // Повреждённая base64-строка не должна попасть в комнату: проверяем алфавит и выравнивание на границе.
          if (!makeRegExp('/^[A-Za-z0-9+/]*={0,2}$/').test(data))
            throw backLocaleError(BackLocaleKey.TextTransferFileCorrupted);

          // Лимит хранится в мегабайтах; превышение обрывает запрос до записи в комнату.
          const size = takeBase64ByteLength(data);
          const maxBytes = constantsConfigFileStore.getValue().maxTransferFileSize * 1024 * 1024;
          if (size > maxBytes) throw backLocaleError(BackLocaleKey.TextTransferFileTooLarge);

          room.files.set(device.deviceId, { deviceId: device.deviceId, name, type, data, size });
          shareFiles(auth.login);
        },

        takeFile: async ({ deviceId }, { auth, client }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.NotRegistered);
          if (!(client instanceof WebSocket)) throw backLocaleError(BackLocaleKey.ClientNotFound);

          const room = textTransferRooms.get(auth.login);
          if (room == null) throw backLocaleError(BackLocaleKey.ValueNotFound);

          // Членство в комнате подтверждает только устройство, уже привязанное к этому websocket.
          const device = takeActualDevice(room, client);
          if (device == null) throw backLocaleError(BackLocaleKey.ValueNotFound);

          const file = room.files.get(deviceId);
          if (file == null) throw backLocaleError(BackLocaleKey.ValueNotFound);

          // Режем чистый base64 на куски и шлём их только запросившему клиенту, не всей комнате.
          const count = Math.max(1, Math.ceil(file.data.length / textTransferFileChunkSize));
          for (let index = 0; index < count; index++) {
            const chunk = file.data.slice(index * textTransferFileChunkSize, (index + 1) * textTransferFileChunkSize);
            textTransferTsjrpcSharesServer.fileChunk({ deviceId, name: file.name, chunk, index, count }, client);
          }
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

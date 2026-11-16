import { DeviceId, SokiDeviceType } from 'shared/api/complect/enums';
import { TextTransferFile, TextTransferWindow } from './textTransfer.model';

export type TextTransferTsjrpcModel = {
  join: () => { windows: TextTransferWindow[]; count: number };
  leave: () => void;
  putText: (args: { text: string }) => void;
  // Новый файл устройства: `data` приходит чистым base64 без data-url префикса.
  putFile: (args: { name: string; type: string; data: string }) => void;
  // Запрос скачивания файла устройства: сервер пришлёт данные кусками через share-пуш `fileChunk`.
  takeFile: (args: { deviceId: DeviceId }) => void;
  getDevices: () => {
    owner: string;
    devices: {
      emoji: string;
      type: SokiDeviceType;
      ip: string;
      version: number;
      browser: string;
      os: string;
      isThisDevice: boolean;
    }[];
  };
};

export type TextTransferTsjrpcSharesModel = {
  texts: (args: { windows: TextTransferWindow[] }) => void;
  count: (args: { count: number }) => void;
  // Рассылка метаданных актуальных файлов комнаты: по одному последнему файлу на устройство.
  files: (args: { files: TextTransferFile[] }) => void;
  // Куски base64 запрошенного файла: `index` — номер куска, `count` — общее количество.
  fileChunk: (args: { deviceId: DeviceId; name: string; chunk: string; index: number; count: number }) => void;
  kick: (args: true) => void;
};

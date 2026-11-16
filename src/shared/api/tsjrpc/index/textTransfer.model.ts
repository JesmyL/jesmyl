import { DeviceId, SokiDeviceType } from 'shared/api/complect/enums';

export type TextTransferWindow = {
  deviceId: DeviceId;
  text: string;
  emoji: string;
  type: SokiDeviceType;
  browser: string;
  os: string;
  ip: string;
  version: number;
};

/** Метаданные переданного файла: `deviceId` — отправившее устройство, `size` — размер в байтах; данные остаются на сервере. */
export type TextTransferFile = {
  deviceId: DeviceId;
  name: string;
  size: number;
};

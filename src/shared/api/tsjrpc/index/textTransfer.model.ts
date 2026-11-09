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

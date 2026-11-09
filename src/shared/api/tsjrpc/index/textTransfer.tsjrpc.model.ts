import { SokiDeviceType } from 'shared/api/complect/enums';
import { TextTransferWindow } from './textTransfer.model';

export type TextTransferTsjrpcModel = {
  join: () => { windows: TextTransferWindow[]; count: number };
  leave: () => void;
  putText: (args: { text: string }) => void;
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
  kick: (args: true) => void;
};

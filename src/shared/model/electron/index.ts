import { TSJRPCInvokeData } from 'tsjrpc';

export type ElectronAppWindowInvokeApiBox = {
  invoke: (invoke: TSJRPCInvokeData, requestId: string) => void;
  onServerEvent: (callback: (data: TSJRPCInvokeData) => Promise<unknown>) => () => void;
};

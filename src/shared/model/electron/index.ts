import { TSJRPCInvokeData } from 'tsjrpc';

export type ElectronAppWindowInvokeProps = ElectronAppWindowInvokeTool & {
  invoke: TSJRPCInvokeData;
  requestId: string;
};

export type ElectronAppWindowInvokeTool = {
  winNum: number;
  toWinNum: number;
};

export type ElectronAppWindowInvokeDataWithTool = { invoke: TSJRPCInvokeData; tool: ElectronAppWindowInvokeTool };

export type ElectronAppWindowInvokeApiBox = {
  invoke: (args: ElectronAppWindowInvokeProps) => void;
  onServerEvent: (callback: (data: ElectronAppWindowInvokeDataWithTool) => Promise<unknown>) => () => void;
};

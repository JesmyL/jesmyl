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

/** Target window of the projector screen opened by the Presentation TSJRPC scope. */
export const presentationProjectorTool: ElectronAppWindowInvokeTool = { toWinNum: 1, winNum: 0 };

export type ElectronAppWindowInvokeApiBox = {
  invoke: (args: ElectronAppWindowInvokeProps) => void;
  onServerEvent: (callback: (data: ElectronAppWindowInvokeDataWithTool) => Promise<unknown>) => () => void;
};

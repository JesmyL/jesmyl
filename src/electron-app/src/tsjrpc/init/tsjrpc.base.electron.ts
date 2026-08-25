import { makeTSJRPCBaseMaker } from 'tsjrpc';

export type ElectronTsjrpcTool = { app: Electron.App; win: Electron.BrowserWindow; host: string };

export const { maker: TsjrpcElectronAppBase, next: tsjrpcElectronAppBaseNext } = makeTSJRPCBaseMaker<
  void,
  ElectronTsjrpcTool,
  void
>({
  onErrorMessage: () => {},
  feedbackOnEach: () => {},
  beforeEach: async () => ({ isStopPropagation: false }),
});

import { makeTSJRPCBaseMaker } from 'tsjrpc';
import { ElectronAppWindowInvokeTool } from '../../model';

export type ElectronTsjrpcTool = ElectronAppWindowInvokeTool & {
  app: Electron.App;
  win: Electron.BrowserWindow;
  host: string;
};

export const { maker: TsjrpcElectronAppBase, next: tsjrpcElectronAppBaseNext } = makeTSJRPCBaseMaker<
  void,
  ElectronTsjrpcTool,
  void
>({
  onErrorMessage: () => {},
  feedbackOnEach: () => {},
  beforeEach: async () => ({ isStopPropagation: false }),
});

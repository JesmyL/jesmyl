import { environment } from '#shared/environment';
import { electronAppInterfaceWindowKey } from 'shared/const/electron';
import { ElectronAppWindowInvokeApiBox, ElectronAppWindowInvokeTool } from 'shared/model/electron';
import { checkIsNil } from 'shared/utils/checkIs';
import { makeTSJRPCBaseMaker, makeTSJRPCMethodsMaker } from 'tsjrpc';

export const electronClientApi = window[electronAppInterfaceWindowKey as never] as never as
  | ElectronAppWindowInvokeApiBox
  | nil;

export const ElectronTsjrpcClient = makeTSJRPCMethodsMaker<ElectronAppWindowInvokeTool>({
  isNeedCheckClassName: environment.isTest,
  send: checkIsNil(electronClientApi)
    ? async () => {}
    : async (invoke, { toWinNum, winNum }) =>
        electronClientApi.invoke({ invoke, requestId: `${Date.now()}${Math.random()}`, toWinNum, winNum }),
});

export const { maker: ElectronTsjrpcBaseClient, next: electronTsjrpcBaseClientNext } = makeTSJRPCBaseMaker<
  void,
  ElectronAppWindowInvokeTool,
  void
>({
  onErrorMessage: () => {},
  feedbackOnEach: () => {},
  beforeEach: async () => ({ isStopPropagation: false }),
});

if (electronClientApi) {
  const unsub = electronClientApi.onServerEvent(serverData => {
    const promiseWith = Promise.withResolvers();

    electronTsjrpcBaseClientNext({
      ...serverData,
      requestId: `${Date.now()}${Math.random()}`,
      sendResponse: event => {
        if (event.error) promiseWith.reject(event.error);
        else promiseWith.resolve(event.invokedResult);
      },
    });

    return promiseWith.promise;
  });

  window.addEventListener('beforeunload', unsub);
}

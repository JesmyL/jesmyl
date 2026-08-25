import { environment } from '#shared/environment';
import { electronAppInterfaceWindowKey } from 'shared/const/electron';
import { ElectronAppWindowInvokeApiBox } from 'shared/model/electron';
import { checkIsNil } from 'shared/utils/checkIs';
import { makeTSJRPCBaseMaker, makeTSJRPCMethodsMaker } from 'tsjrpc';

export const electronClientApi = window[electronAppInterfaceWindowKey as never] as never as
  | ElectronAppWindowInvokeApiBox
  | nil;

export const ElectronTsjrpcClient = makeTSJRPCMethodsMaker<void>({
  isNeedCheckClassName: environment.isTest,
  send: checkIsNil(electronClientApi)
    ? async () => {}
    : async invoke => electronClientApi.invoke(invoke, `${Date.now()}${Math.random()}`),
});

export const { maker: ElectronTsjrpcBaseClient, next: electronTsjrpcBaseClientNext } = makeTSJRPCBaseMaker<
  void,
  void,
  void
>({
  onErrorMessage: () => {},
  feedbackOnEach: () => {},
  beforeEach: async () => ({ isStopPropagation: false }),
});

if (electronClientApi) {
  const unsub = electronClientApi.onServerEvent(invoke => {
    const promiseWith = Promise.withResolvers();

    electronTsjrpcBaseClientNext({
      invoke,
      requestId: `${Date.now()}${Math.random()}`,
      sendResponse: event => {
        if (event.errorMessage) promiseWith.reject(event.errorMessage);
        else promiseWith.resolve(event.invokedResult);
      },
      tool: undefined,
    });

    return promiseWith.promise;
  });

  window.addEventListener('beforeunload', unsub);
}

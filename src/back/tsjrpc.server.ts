import { makeTSJRPCMethodsMaker } from 'tsjrpc';
import { SokiServerClientSelector } from './complect/soki/model';
import { sokiServer } from './complect/soki/SokiServer';

export const TsjrpcServerMethods = makeTSJRPCMethodsMaker<SokiServerClientSelector | nil>({
  isNeedCheckClassName: false,
  send: (invoke, clientSelector) => {
    const promiseWith = Promise.withResolvers();
    try {
      sokiServer.send({ invoke, requestId: '' + Date.now() + Math.random() }, clientSelector);
      promiseWith.resolve(undefined);
    } catch (e) {
      promiseWith.reject('' + e);
    }

    return promiseWith.promise;
  },
});

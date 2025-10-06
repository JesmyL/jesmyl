import { makeTSJRPCMethodsMaker } from 'tsjrpc';
import { SokiServerClientSelector } from './complect/soki/model';
import { sokiServer } from './complect/soki/SokiServer';

export const TsjrpcServerMethods = makeTSJRPCMethodsMaker<SokiServerClientSelector | nil>({
  isNeedCheckClassName: false,
  send: (invoke, clientSelector) => {
    const { promise, reject, resolve } = Promise.withResolvers();
    try {
      sokiServer.send({ invoke, requestId: '' + Date.now() + Math.random() }, clientSelector);
      resolve(undefined);
    } catch (e) {
      reject('' + e);
    }

    return promise;
  },
});

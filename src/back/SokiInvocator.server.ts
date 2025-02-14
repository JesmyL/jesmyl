import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { SokiServerClientSelector } from './complect/soki/model';
import { sokiServer } from './complect/soki/SokiServer';

export const SokiInvocatorServer = makeSokiInvocator<'SokiInvocatorServer', SokiServerClientSelector>(
  false,
  'SokiInvocatorServer',
  (invoke, clientSelector) => {
    const { promise, reject, resolve } = Promise.withResolvers();
    try {
      sokiServer.send({ invoke, requestId: '' + Date.now() + Math.random() }, clientSelector);
      resolve(undefined);
    } catch (e) {
      reject('' + e);
    }

    return promise;
  },
);

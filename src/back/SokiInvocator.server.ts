import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { WebSocket } from 'ws';
import sokiServer from './complect/soki/SokiServer';

export const SokiInvocatorServer = makeSokiInvocator<'SokiInvocatorServer', WebSocket | null>(
  'SokiInvocatorServer',
  (invoke, client) => {
    const { promise, reject, resolve } = Promise.withResolvers();
    try {
      sokiServer.send({ appName: 'index', invoke }, client);
      resolve(undefined);
    } catch (e) {
      reject('' + e);
    }

    return promise;
  },
);

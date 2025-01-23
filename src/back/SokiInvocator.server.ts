import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import sokiServer from './complect/soki/SokiServer';
import { SokiServerClientSelector } from './complect/soki/model';

export const SokiInvocatorServer = makeSokiInvocator<'SokiInvocatorServer', SokiServerClientSelector>(
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

import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { soki } from './soki';

export const SokiInvocatorClient = makeSokiInvocator('SokiInvocatorClient', invoke => {
  const { promise, reject, resolve } = Promise.withResolvers();
  soki.send({ invoke }, 'index').on(event => resolve(event.invokedResult), reject);
  return promise;
});

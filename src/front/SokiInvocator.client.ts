import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { soki } from './soki';

export const SokiInvocatorClient = makeSokiInvocator('SokiInvocatorClient', invoke => {
  const { promise, reject, resolve } = Promise.withResolvers();
  soki.send({ invoke, token: localStorage.token }, event => {
    if (event.errorMessage) reject(event.errorMessage);
    else resolve(event.invokedResult);
  });
  return promise;
});

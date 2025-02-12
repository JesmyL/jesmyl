import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { environment } from './environments';
import { soki } from './soki';

export const SokiInvocatorClient = makeSokiInvocator(environment.isTest, 'SokiInvocatorClient', invoke =>
  soki.send({ invoke }),
);

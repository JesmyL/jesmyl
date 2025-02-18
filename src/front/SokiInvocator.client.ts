import { soki } from '#basis/lib/soki';
import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { environment } from './environments';

export const SokiInvocatorClient = makeSokiInvocator(environment.isTest, 'SokiInvocatorClient', invoke =>
  soki.send({ invoke }),
);

import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { soki } from './soki';

export const SokiInvocatorClient = makeSokiInvocator('SokiInvocatorClient', invoke => soki.send({ invoke }));

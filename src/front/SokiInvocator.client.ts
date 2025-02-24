import { InvocatorClientTool } from 'shared/api';
import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';
import { environment } from './environments';
import { soki } from './soki';

export const SokiInvocatorClient = makeSokiInvocator<'SokiInvocatorClient', null | InvocatorClientTool>(
  environment.isTest,
  'SokiInvocatorClient',
  (invoke, tool) => soki.send({ invoke }, tool),
);

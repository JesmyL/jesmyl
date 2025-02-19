import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { environment } from './environments';
import { onSokiClientEventerInvocatorInvoke } from './shared/lib/eventers';

export const SokiInvocatorBaseClient = makeSokiInvocatorBase(
  environment.isTest,
  'SokiInvocatorBaseClient',
  onSokiClientEventerInvocatorInvoke,
);

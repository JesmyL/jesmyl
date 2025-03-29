import { environment } from 'front/environment';
import { onSokiClientEventerInvocatorInvoke } from 'front/eventers';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';

export const SokiInvocatorBaseClient = makeSokiInvocatorBase(
  environment.isTest,
  'SokiInvocatorBaseClient',
  onSokiClientEventerInvocatorInvoke,
);

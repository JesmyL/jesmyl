import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { onSokiClientEventerInvocatorInvoke } from './eventers';

export const SokiInvocatorBaseClient = makeSokiInvocatorBase(
  'SokiInvocatorBaseClient',
  onSokiClientEventerInvocatorInvoke,
);

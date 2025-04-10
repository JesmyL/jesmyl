import { onSokiClientEventerInvocatorInvoke } from 'front/eventers';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { emptyFunc } from 'shared/utils';

export const SokiInvocatorBaseClient = makeSokiInvocatorBase({
  eventerValue: onSokiClientEventerInvocatorInvoke,
  onErrorMessage: emptyFunc,
});

import { environment } from 'front/environment';
import { onSokiClientEventerInvocatorInvoke } from 'front/eventers';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { emptyFunc } from 'shared/utils';

export const SokiInvocatorBaseClient = makeSokiInvocatorBase({
  isNeedCheckClassName: environment.isTest,
  classNamePostfix: 'SokiInvocatorBaseClient',
  eventerValue: onSokiClientEventerInvocatorInvoke,
  onErrorMessage: emptyFunc,
});

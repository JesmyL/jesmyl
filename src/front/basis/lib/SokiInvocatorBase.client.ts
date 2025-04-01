import { environment } from 'front/environment';
import { onSokiClientEventerInvocatorInvoke } from 'front/eventers';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';

export const SokiInvocatorBaseClient = makeSokiInvocatorBase({
  isNeedCheckClassName: environment.isTest,
  classNamePostfix: 'SokiInvocatorBaseClient',
  eventerValue: onSokiClientEventerInvocatorInvoke,
});

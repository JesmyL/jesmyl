import { SokiInvokerTranferDto } from 'shared/api';
import { Eventer } from 'shared/utils';

export const onSokiClientEventerInvocatorInvoke = Eventer.createValue<SokiInvokerTranferDto>();

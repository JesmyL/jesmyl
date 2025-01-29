import { InvocatorClientEvent } from 'shared/api';
import { SokiInvokerTranferDto } from 'shared/api/complect/invocator.master.model';
import { Eventer } from 'shared/utils';

export const onSokiClientEventerInvocatorInvoke =
  Eventer.createValue<SokiInvokerTranferDto<InvocatorClientEvent, void>>();

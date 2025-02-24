import { InvocatorClientEvent, InvocatorClientTool, SokiInvokerTranferDto } from 'shared/api';
import { Eventer } from 'shared/utils';

export const onSokiClientEventerInvocatorInvoke =
  Eventer.createValue<SokiInvokerTranferDto<InvocatorClientEvent, InvocatorClientTool | null>>();

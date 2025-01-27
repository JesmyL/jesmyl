import { SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { InvocatorServerEvent, SokiInvokerTranferDto } from 'shared/api';
import { Eventer } from 'shared/utils';

export const onSokiServerEventerInvocatorInvoke =
  Eventer.createValue<SokiInvokerTranferDto<InvocatorServerEvent, SokiServerInvocatorTool>>();

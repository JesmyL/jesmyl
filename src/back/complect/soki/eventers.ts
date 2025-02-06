import { SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { InvocatorServerEvent } from 'shared/api';
import { SokiInvokerTranferDto } from 'shared/api/complect/invocator.master.model';
import { Eventer } from 'shared/utils';

export const onSokiServerEventerInvocatorInvoke =
  Eventer.createValue<SokiInvokerTranferDto<InvocatorServerEvent, SokiServerInvocatorTool>>();

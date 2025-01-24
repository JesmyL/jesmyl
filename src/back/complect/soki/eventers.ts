import { SokiServerInvocatorTool } from 'back/SokiInvocatorBase.server';
import { SokiInvokerTranferDto } from 'shared/api';
import { Eventer } from 'shared/utils';

export const onSokiServerEventerInvocatorInvoke = Eventer.createValue<SokiInvokerTranferDto<SokiServerInvocatorTool>>();

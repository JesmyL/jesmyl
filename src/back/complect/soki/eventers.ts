import { LocalSokiAuth, SokiInvokerTranferDto } from 'shared/api';
import { Eventer } from 'shared/utils';
import WebSocket from 'ws';

export const onSokiServerEventerInvocatorInvoke =
  Eventer.createValue<SokiInvokerTranferDto<{ client: WebSocket; auth: LocalSokiAuth | und }>>();

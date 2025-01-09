import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<'SokiInvocatorBaseServer', WebSocket, string>(
  'SokiInvocatorBaseServer',
  onSokiServerEventerInvocatorInvoke,
  title => console.log(title),
);

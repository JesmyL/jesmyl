import { LocalSokiAuth } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  'SokiInvocatorBaseServer',
  { client: WebSocket; auth: LocalSokiAuth | und },
  string
>('SokiInvocatorBaseServer', onSokiServerEventerInvocatorInvoke, (title, { tool, method, name }) =>
  console.log(`${tool.auth?.fio}\n${name}.${method}\n${title}`),
);

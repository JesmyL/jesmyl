import { LocalSokiAuth } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';

export type SokiServerInvocatorTool = { client: WebSocket; auth: LocalSokiAuth | und };

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  'SokiInvocatorBaseServer',
  SokiServerInvocatorTool,
  string | ((tool: SokiServerInvocatorTool) => string)
>('SokiInvocatorBaseServer', onSokiServerEventerInvocatorInvoke, (titleScalar, { tool, method, name }) =>
  console.log(`${tool.auth?.fio}\n${name}.${method}\n${smylib.isFunc(titleScalar) ? titleScalar(tool) : titleScalar}`),
);

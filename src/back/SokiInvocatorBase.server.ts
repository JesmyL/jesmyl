import { LocalSokiAuth } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';

type Tool = { client: WebSocket; auth: LocalSokiAuth | und };

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  'SokiInvocatorBaseServer',
  Tool,
  string | ((tool: Tool) => string)
>('SokiInvocatorBaseServer', onSokiServerEventerInvocatorInvoke, (titleScalar, { tool, method, name }) =>
  console.log(`${tool.auth?.fio}\n${name}.${method}\n${smylib.isFunc(titleScalar) ? titleScalar(tool) : titleScalar}`),
);

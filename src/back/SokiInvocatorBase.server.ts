import { InvocatorServerEvent, LocalSokiAuth } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';
import { jesmylChangesBot } from './sides/telegram-bot/jesmylChangesBot';

export type SokiServerInvocatorTool = { client: WebSocket; auth: LocalSokiAuth | und };

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  InvocatorServerEvent,
  'SokiInvocatorBaseServer',
  SokiServerInvocatorTool,
  string | ((tool: SokiServerInvocatorTool) => string)
>('SokiInvocatorBaseServer', onSokiServerEventerInvocatorInvoke, (titleScalar, { tool, method, name }) =>
  jesmylChangesBot.postMessage(
    `${tool.auth?.fio}\n${name}.${method}\n${smylib.isFunc(titleScalar) ? titleScalar(tool) : titleScalar}` +
      `\n\n${JSON.stringify(tool.auth, null, 1)}`,
    { parse_mode: 'HTML' },
  ),
);

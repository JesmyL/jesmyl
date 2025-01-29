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
>('SokiInvocatorBaseServer', onSokiServerEventerInvocatorInvoke, (titleScalar, { tool, method, name }) => {
  if (titleScalar === '') return;

  const title = smylib.isFunc(titleScalar) ? titleScalar(tool) : titleScalar;

  if (title === '') return;

  jesmylChangesBot.postMessage(
    `${tool.auth ? `${tool.auth.fio} ${tool.auth.nick ? `t.me/${tool.auth.nick}` : ''}` : ''}` +
      `\n<code>${name}.${method}</code>\n\n<b>${title}</b>` +
      `\n\n<blockquote expandable>${JSON.stringify(tool.auth, null, 1)}</blockquote>`,
    { parse_mode: 'HTML' },
  );
});

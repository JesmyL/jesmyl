import { InvocatorServerEvent, LocalSokiAuth, SokiVisit } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { emptyFunc, smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';
import { backConfig } from './config/backConfig';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';

export type SokiServerInvocatorTool = { client: WebSocket; auth: LocalSokiAuth | und; visit: SokiVisit | und };

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  InvocatorServerEvent,
  'SokiInvocatorBaseServer',
  SokiServerInvocatorTool,
  string | ((tool: SokiServerInvocatorTool) => string)
>(
  false,
  'SokiInvocatorBaseServer',
  onSokiServerEventerInvocatorInvoke,
  backConfig.isTest
    ? emptyFunc
    : (titleScalar, { tool, method, name }) => {
        if (titleScalar === '') return;

        const title = smylib.isFunc(titleScalar) ? titleScalar(tool) : titleScalar;

        if (title === '') return;
        const text = `<code>${name}.${method}</code>\n\n<b>${title}</b>`;

        jesmylChangesBot.postMessage(
          tool.auth
            ? `${`${tool.auth.fio} ${tool.auth.nick ? `t.me/${tool.auth.nick}` : ''}\n`}` +
                text +
                `\n\n<blockquote expandable>${JSON.stringify(tool.auth, null, 1)}</blockquote>`
            : text,
          { parse_mode: 'HTML' },
        );
      },
);

import { InvocatorServerEvent, LocalSokiAuth, SokiVisit } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';

export type SokiServerInvocatorTool = { client: WebSocket; auth: LocalSokiAuth | und; visit: SokiVisit | und };
export type SokiServerBeforeEachTool = { minVersion?: number; minLevel?: number };

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  InvocatorServerEvent,
  'SokiInvocatorBaseServer',
  SokiServerInvocatorTool,
  string | ((tool: SokiServerInvocatorTool) => string),
  SokiServerBeforeEachTool
>({
  isNeedCheckClassName: false,
  classNamePostfix: 'SokiInvocatorBaseServer',
  eventerValue: onSokiServerEventerInvocatorInvoke,
  feedbackOnEach: (titleScalar, { tool, method, name }) => {
    if (!tool.visit?.version || tool.visit.version < 10000) throw new Error('Нужно обновить приложение');

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
  beforeEach: async ({ method, tool }, beforeTools) => {
    const userVersion = tool.visit?.version ?? 0;

    if (beforeTools === undefined || beforeTools[method] === undefined) {
      return { isStopPropagation: userVersion < minAvailableUserVersion };
    } else {
      if (tool.auth != undefined && tool.auth.level < (beforeTools[method].minLevel ?? 0))
        throw 'Нет прав на это действие';

      return { isStopPropagation: userVersion < (beforeTools[method].minVersion ?? minAvailableUserVersion) };
    }
  },
});

const minAvailableUserVersion = 958;

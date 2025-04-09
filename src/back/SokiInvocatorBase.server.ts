import { InvocatorServerEvent, LocalSokiAuth, SokiVisit } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { emptyFunc, smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';
import { backConfig } from './config/backConfig';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';
import { tglogger } from './sides/telegram-bot/log/log-bot';
import { userAuthStringified, userVisitStringified } from './utils';

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
  onErrorMessage: ({
    errorMessage,
    invokeData: {
      method,
      name,
      tool: { auth, visit },
    },
  }) => {
    tglogger.userErrors(
      `${name}.${method}()\n\n${errorMessage}\n\n${userAuthStringified(auth)}\n\n${userVisitStringified(visit)}`,
    );
  },
  feedbackOnEach: backConfig.isTest
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
  beforeEach: async ({ invoke: { method, tool }, beforeTools, defaultTool }) => {
    const userVersion = tool.visit?.version ?? 0;
    const beforeTool = beforeTools?.[method] ?? defaultTool;

    if (beforeTool === undefined) {
      return { isStopPropagation: userVersion < minAvailableUserVersion };
    } else {
      if (beforeTool.minLevel && (tool.auth == undefined || tool.auth.level < (beforeTool.minLevel ?? 0)))
        throw `Нет прав на это действие`;

      return { isStopPropagation: userVersion < (beforeTool.minVersion ?? minAvailableUserVersion) };
    }
  },
});

const minAvailableUserVersion = 958;

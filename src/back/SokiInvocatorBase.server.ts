import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { makeSokiInvocatorBase } from 'shared/api/complect/SokiInvocatorBase.master';
import { emptyFunc, smylib } from 'shared/utils';
import { WebSocket } from 'ws';
import { onSokiServerEventerInvocatorInvoke } from './complect/soki/eventers';
import { backConfig } from './config/backConfig';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';
import { tglogger } from './sides/telegram-bot/log/log-bot';
import { userAuthStringified, userVisitStringified } from './utils';

export type SokiServerInvocatorTool = { client: WebSocket; auth: LocalSokiAuth | und; visitInfo: SokiVisit | und };
export type SokiServerBeforeEachTool = { minVersion?: number; minLevel?: number };

export const SokiInvocatorBaseServer = makeSokiInvocatorBase<
  SokiServerInvocatorTool,
  string | ((tool: SokiServerInvocatorTool) => string),
  SokiServerBeforeEachTool
>({
  eventerValue: onSokiServerEventerInvocatorInvoke,
  onErrorMessage: ({ errorMessage, invoke: { method, scope }, tool: { auth, visitInfo } }) => {
    tglogger.userErrors(
      `${scope}.${method}()\n\n${errorMessage}\n\n${userAuthStringified(auth)}\n\n${userVisitStringified(visitInfo)}`,
    );
  },
  feedbackOnEach: backConfig.isTest
    ? emptyFunc
    : ({ onEachesRet, invoke: { method, scope }, tool }) => {
        if (onEachesRet === '') return;

        const title = smylib.isFunc(onEachesRet) ? onEachesRet(tool) : onEachesRet;

        if (title === '') return;
        const text = `<code>${scope}.${method}</code>\n\n<b>${title}</b>`;

        jesmylChangesBot.postMessage(
          tool.auth
            ? `${`${tool.auth.fio} ${tool.auth.nick ? `t.me/${tool.auth.nick}` : ''}\n`}` +
                text +
                `\n\n<blockquote expandable>${JSON.stringify(tool.auth, null, 1)}</blockquote>`
            : text,
          { parse_mode: 'HTML' },
        );
      },
  beforeEach: async ({ invoke: { method }, tool, beforeEachTools, defaultBeforeEachTool }) => {
    const userVersion = tool.visitInfo?.version ?? 0;
    const beforeTool = beforeEachTools?.[method] ?? defaultBeforeEachTool;

    if (beforeTool === undefined) {
      return { isStopPropagation: userVersion < minAvailableUserVersion };
    } else {
      if (beforeTool.minLevel && (tool.auth == undefined || tool.auth.level < (beforeTool.minLevel ?? 0)))
        throw `Нет прав на это действие`;

      return { isStopPropagation: userVersion < (beforeTool.minVersion ?? minAvailableUserVersion) };
    }
  },
});

const minAvailableUserVersion = 970;

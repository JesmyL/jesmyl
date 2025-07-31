import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { emptyFunc, smylib } from 'shared/utils';
import { makeTSJRPCBaseMaker } from 'tsjrpc';
import { WebSocket } from 'ws';
import { backConfig } from './config/backConfig';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';
import { tglogger } from './sides/telegram-bot/log/log-bot';
import { userAuthStringified, userVisitStringified } from './utils';

export type ServerTSJRPCTool = { client: WebSocket; auth: LocalSokiAuth | und; visitInfo: SokiVisit | und };
export type ServerTSJRPCBeforeEachTool = { minVersion?: number; minLevel?: number };

export const { maker: TsjrpcBaseServer, next: tsjrpcBaseServerNext } = makeTSJRPCBaseMaker<
  ServerTSJRPCTool,
  string | ((tool: ServerTSJRPCTool) => string),
  ServerTSJRPCBeforeEachTool
>({
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

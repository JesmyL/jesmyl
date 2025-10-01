import { LocalSokiAuth, SokiVisit } from 'shared/api';
import { emptyFunc, smylib } from 'shared/utils';
import { makeTSJRPCBaseMaker } from 'tsjrpc';
import { WebSocket } from 'ws';
import { backConfig } from './config/backConfig';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';
import { tglogger } from './sides/telegram-bot/log/log-bot';
import { userAuthStringified, userVisitStringified } from './utils';

export type ServerTSJRPCTool = {
  client: WebSocket | null;
  auth: LocalSokiAuth | und;
  visitInfo: SokiVisit | und;
};
export type ServerTSJRPCBeforeEachTool = { minVersion?: number };

export const { maker: TsjrpcBaseServer, next: tsjrpcBaseServerNext } = makeTSJRPCBaseMaker<
  { description?: null | string | ((tool: ServerTSJRPCTool) => string) },
  ServerTSJRPCTool,
  ServerTSJRPCBeforeEachTool
>({
  onErrorMessage: backConfig.isTest
    ? emptyFunc
    : ({ errorMessage, invoke: { method, scope }, tool: { auth, visitInfo } }) => {
        tglogger.userErrors(
          `${scope}.${method}()\n\n${errorMessage}\n\n${userAuthStringified(auth)}\n\n${userVisitStringified(visitInfo)}`,
        );
      },
  feedbackOnEach: backConfig.isTest
    ? // ? props => console.info({ ...props, tool: { ...props.tool, client: 'HIDDEN' } })
      emptyFunc
    : props => {
        if (!props.feedback?.description) return;

        const {
          feedback,
          invoke: { method, scope },
          tool,
        } = props;

        const title = smylib.isFunc(feedback.description) ? feedback.description(tool) : feedback.description;
        if (!title) return;

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

    return { isStopPropagation: userVersion < (beforeTool?.minVersion ?? minAvailableUserVersion) };
  },
});

const minAvailableUserVersion = 970;

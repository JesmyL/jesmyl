import { DrizzleQueryError } from 'drizzle-orm';
import { SokiVisit, UserAuth } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { checkIsFunction } from 'shared/utils/checkIs';
import { makeTSJRPCBaseMaker } from 'tsjrpc';
import { WebSocket } from 'ws';
import { backConfig } from './config/backConfig';
import { jesmylChangesBot } from './sides/telegram-bot/control/jesmylChangesBot';
import { tglogger } from './sides/telegram-bot/log/log-bot';
import { postJRPCMessage } from './sides/telegram-bot/postJRPCMessage';
import type { ServerTSJRPCFeedback } from './tsjrpc.model';
import { userAuthStringified, userVisitStringified } from './utils';
import { stringifyDiffValue, makeDiffHtml } from './tsjrpc.diff';

export type ServerTSJRPCTool = {
  client: WebSocket | null;
  auth: UserAuth | und;
  visitInfo: SokiVisit | und;
};
export type ServerTSJRPCBeforeEachTool = { minVersion?: number };

export const { maker: TsjrpcBaseServer, next: tsjrpcBaseServerNext } = makeTSJRPCBaseMaker<
  ServerTSJRPCFeedback,
  ServerTSJRPCTool,
  ServerTSJRPCBeforeEachTool
>({
  onErrorMessage: backConfig.isTest
    ? emptyFunc
    : ({ error, invoke: { method, scope, args }, tool: { auth, visitInfo } }) => {
        let errorMessage = `${error}`;

        if (error instanceof DrizzleQueryError)
          errorMessage = `<b>${error.cause?.message ?? error.stack ?? ''}</b>\n\n${error}`;

        tglogger.userErrors(
          `${scope}.${method}()\n\n${errorMessage}\n\n${userAuthStringified(auth)}\n\n${userVisitStringified(visitInfo)}\n\n\nАргументы:\n${JSON.stringify(args)}`,
        );
      },
  feedbackOnEach: backConfig.isTest
    ? // ? props => console.info({ ...props, tool: { ...props.tool, client: 'HIDDEN' } })
      emptyFunc
    : props => {
        if (!props.feedback?.description) return;

        const {
          feedback,
          invoke: { method, scope, args },
          tool,
        } = props;

        const title = checkIsFunction(feedback.description) ? feedback.description(tool) : feedback.description;
        if (!title) return;

        let text = `<code>${scope}.${method}</code>\n\n<b>${title}</b>`;
        const { was, new: newV } = feedback;
        const wasText = stringifyDiffValue(was);
        const newText = stringifyDiffValue(newV);
        if (wasText !== newText && (wasText || newText)) text += `\n\n${makeDiffHtml(wasText ?? '', newText ?? '')}`;

        postJRPCMessage(
          tool.auth
            ? `${`${tool.auth.fio} ${tool.auth.nick && (!tool.auth.email || !tool.auth.email.startsWith(tool.auth.nick)) ? `https://t.me/${tool.auth.nick}` : ''}\n`}` +
                text +
                `\n\n<blockquote expandable>${JSON.stringify(tool.auth, null, 1)}</blockquote>\n\n\nАргументы:\n${JSON.stringify(args)}`
            : text,
          {
            tgBot: jesmylChangesBot,
            tg: { parse_mode: 'HTML' },
            scope: feedback.logScope,
          },
        );
      },
  beforeEach: async ({ invoke: { method }, tool, beforeEachTools, defaultBeforeEachTool }) => {
    const userVersion = tool.visitInfo?.version ?? 0;
    const beforeTool = beforeEachTools?.[method] ?? defaultBeforeEachTool;

    return { isStopPropagation: userVersion < (beforeTool?.minVersion ?? minAvailableUserVersion) };
  },
});

const minAvailableUserVersion = 970;

import { DrizzleQueryError } from 'drizzle-orm';
import { SokiVisit, UserAuth } from 'shared/api';
import { dashMessageSectionSeparator, DashMessageKind } from 'shared/model/index/visitsDashboard';
import { emptyFunc } from 'shared/utils';
import { checkIsFunction } from 'shared/utils/checkIs';
import { makeTSJRPCBaseMaker } from 'tsjrpc';
import { WebSocket } from 'ws';
import { insertDashMessage, sendChangesEmail } from './dash/visits';
import { checkIsBackLocalePayload } from './locales/back';
import { backConfig } from './config/backConfig';
import { dashKindByScope, PostJRPCMessageScope } from './dash/model';
import type { ServerTSJRPCFeedback } from './tsjrpc.model';
import { dashAuthVisitSuffix } from './utils';
import { stringifyDiffValue } from './tsjrpc.diff';

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
  onErrorMessage: ({ error, invoke: { method, scope, args }, tool: { auth, visitInfo } }) => {
    let errorMessage = `${error}`;

    if (error instanceof DrizzleQueryError)
      errorMessage = `<b>${error.cause?.message ?? error.stack ?? ''}</b>\n\n${error}`;

    insertDashMessage(
      `${scope}.${method}()\n\n${errorMessage}${dashAuthVisitSuffix(auth, visitInfo)}\n\n\nАргументы:\n${JSON.stringify(args)}`,
      visitInfo,
      DashMessageKind.Errors,
      auth?.login,
    ).catch(emptyFunc);
  },
  feedbackOnEach: backConfig.isTest
    ? // ? props => console.info({ ...props, tool: { ...props.tool, client: 'HIDDEN' } })
      emptyFunc
    : async props => {
        if (!props.feedback?.description) return;

        const {
          feedback,
          invoke: { method, scope, args },
          tool,
        } = props;

        const title = await (checkIsFunction(feedback.description) ? feedback.description(tool) : feedback.description);
        if (!title) return;

        // Текст сообщения: вызов метода и заголовок (payload локализуется потребителем, иначе — жирным).
        let text = `<code>${scope}.${method}</code>\n\n${checkIsBackLocalePayload(title) ? title : `<b>${title}</b>`}`;
        const { was, new: newV } = feedback;
        const wasText = stringifyDiffValue(was);
        const newText = stringifyDiffValue(newV);
        // Дифф уходит отдельной структурной секцией `{ was, new }`: текст диффа рисует front, а не бэк.
        if (wasText !== newText && (wasText || newText))
          text += `${dashMessageSectionSeparator}${JSON.stringify({ was: wasText, new: newText })}`;

        const completeMessage = (suffix: string) =>
          tool.auth
            ? `${`${tool.auth.fio} ${tool.auth.nick && (!tool.auth.email || !tool.auth.email.startsWith(tool.auth.nick)) ? `https://t.me/${tool.auth.nick}` : ''}\n`}` +
                text +
                suffix +
                `\n\n<blockquote expandable>${JSON.stringify(tool.auth, null, 1)}</blockquote>\n\n\nАргументы:\n${JSON.stringify(args)}`
            : text + suffix;

        // Формируем запись для дашборда и определяем её вид по scope обратной связи.
        const dashMessage = completeMessage(dashAuthVisitSuffix(tool.auth, tool.visitInfo));
        const kind = dashKindByScope[feedback.logScope ?? PostJRPCMessageScope.Changes];

        // Пишем сообщение в дашборд; для изменений дополнительно рассылаем письмо на языке визита; сообщение tsjrpc уже содержит готовую HTML-разметку.
        insertDashMessage(dashMessage, null, kind, tool.auth?.login).catch(emptyFunc);

        if (kind === DashMessageKind.Changes)
          sendChangesEmail(dashMessage, tool.visitInfo?.langi).catch(emptyFunc);
      },
  beforeEach: async ({ invoke: { method }, tool, beforeEachTools, defaultBeforeEachTool }) => {
    const userVersion = tool.visitInfo?.version ?? 0;
    const beforeTool = beforeEachTools?.[method] ?? defaultBeforeEachTool;

    return { isStopPropagation: userVersion < (beforeTool?.minVersion ?? minAvailableUserVersion) };
  },
});

const minAvailableUserVersion = 970;

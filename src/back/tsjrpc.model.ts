import type { PostJRPCMessageScope } from './sides/telegram-bot/postJRPCMessage';
import type { ServerTSJRPCTool } from './tsjrpc.base.server';

export type TSJRPCFeedbackDiff = { was?: unknown; new?: unknown };
export type TSJRPCFeedbackEntry = TSJRPCFeedbackDiff & { description?: nil | string };

export type ServerTSJRPCFeedback = TSJRPCFeedbackDiff & {
  description?: null | string | ((tool: ServerTSJRPCTool) => string);
  logScope?: PostJRPCMessageScope;
};

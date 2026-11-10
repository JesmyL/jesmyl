import type { PostJRPCMessageScope } from './dash/model';
import type { ServerTSJRPCTool } from './tsjrpc.base.server';

export type TSJRPCFeedbackDiff = { was?: unknown; new?: unknown };
export type TSJRPCFeedbackEntry = TSJRPCFeedbackDiff & { description?: nil | string };

export type ServerTSJRPCFeedback = TSJRPCFeedbackDiff & {
  description?: nil | PromiseOr<string> | ((tool: ServerTSJRPCTool) => PromiseOr<string>);
  logScope?: PostJRPCMessageScope;
};

import { SokiError, SokiVisit } from './soki.model';

export type SokiTsjrpcData = {
  scope: string;
  method: string;
  args: object;
  token?: string | nil;
};

export type TsjrpcBaseEvent = {
  requestId: string;
  invokedResult?: unknown;
  invoke?: SokiTsjrpcData;
  errorMessage?: string | SokiError;
  abort?: string;
};

export type TsjrpcServerEvent = TsjrpcBaseEvent & {
  pong?: 1;
};

export type TsjrpcClientEvent = TsjrpcBaseEvent & {
  token?: string | nil;
  visitInfo?: SokiVisit;
  ping?: 1;
};

export type TsjrpcClientTool = { aborter?: { signal: AbortSignal }; timeout?: number };

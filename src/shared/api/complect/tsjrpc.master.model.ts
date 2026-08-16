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

export type TsjrpcServerEvent = TsjrpcBaseEvent;

export type TsjrpcClientEvent = TsjrpcBaseEvent & {
  token?: string | nil;
  visitInfo?: SokiVisit;
};

export type TsjrpcClientTool = { aborter?: { signal: AbortSignal }; timeout?: number };

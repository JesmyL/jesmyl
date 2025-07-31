import { environment } from 'front/environment';
import { soki } from 'front/soki';
import { TsjrpcClientTool } from 'shared/api';
import { makeTSJRPCMethodsMaker } from 'tsjrpc';

export const TsjrpcClient = makeTSJRPCMethodsMaker<TsjrpcClientTool | nil | void>({
  isNeedCheckClassName: environment.isTest,
  send: (invoke, tool) => soki.send({ invoke }, tool),
});

import { environment } from 'front/environment';
import { soki } from 'front/soki';
import { InvocatorClientTool } from 'shared/api';
import { makeTSJRPCMethodsMaker } from 'tsjrpc';

export const SokiInvocatorClient = makeTSJRPCMethodsMaker<InvocatorClientTool | nil | void>({
  isNeedCheckClassName: environment.isTest,
  send: (invoke, tool) => soki.send({ invoke }, tool),
});

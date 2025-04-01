import { environment } from 'front/environment';
import { soki } from 'front/soki';
import { InvocatorClientTool } from 'shared/api';
import { makeSokiInvocator } from 'shared/api/complect/SokiInvocator.master';

export const SokiInvocatorClient = makeSokiInvocator<'SokiInvocatorClient', InvocatorClientTool | nil | void>({
  isNeedCheckClassName: environment.isTest,
  classNamePostfix: 'SokiInvocatorClient',
  send: (invoke, tool) => soki.send({ invoke }, tool),
});

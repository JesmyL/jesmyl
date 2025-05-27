import { emptyFunc } from 'shared/utils';
import { makeTSJRPCBaseMaker } from 'tsjrpc';

export const { maker: SokiInvocatorBaseClient, next: sokiInvocatorBaseClientNext } = makeTSJRPCBaseMaker({
  onErrorMessage: emptyFunc,
});

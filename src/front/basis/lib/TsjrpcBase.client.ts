import { emptyFunc } from 'shared/utils';
import { makeTSJRPCBaseMaker } from 'tsjrpc';

export const { maker: TsjrpcBaseClient, next: tsjrpcBaseClientNext } = makeTSJRPCBaseMaker<void>({
  onErrorMessage: emptyFunc,
});

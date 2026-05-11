import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { BaseMethodsLike } from 'tsjrpc/types/base.model';

export type ServerTsjrpcSatisfy<Model extends BaseMethodsLike> = Partial<
  ConstructorParameters<typeof TsjrpcBaseServer<Model>>[0]['methods']
>;

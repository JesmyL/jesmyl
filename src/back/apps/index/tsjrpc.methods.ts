import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { IndexTsjrpcSharesModel } from 'shared/api/tsjrpc/index/tsjrpc.methods.model';

export const indexServerTsjrpcShareMethods = new (class Sch extends TsjrpcServerMethods<IndexTsjrpcSharesModel> {
  constructor() {
    super({ scope: 'Index' });
  }
})();

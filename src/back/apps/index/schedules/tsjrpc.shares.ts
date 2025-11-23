import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { SchTsjrpcSharesModel } from 'shared/api/tsjrpc/schedules/tsjrpc.shares.model';

export const schServerTsjrpcShareMethods = new (class Sch extends TsjrpcServerMethods<SchTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'Sch',
    });
  }
})();

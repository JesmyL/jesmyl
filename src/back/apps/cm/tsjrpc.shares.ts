import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { CmShareTsjrpcModel } from 'shared/api/tsjrpc/cm/share.tsjrpc.model';

export const cmShareServerTsjrpcMethods = new (class CmShare extends TsjrpcServerMethods<CmShareTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmShare',
    });
  }
})();

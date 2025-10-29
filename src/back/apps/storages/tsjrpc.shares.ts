import { TsjrpcServerMethods } from 'back/tsjrpc.server';
import { StoragesSharesTsjrpcModel } from 'shared/api/tsjrpc/storages/tsjrpc.shares.model';

export const storagesStoresSharesServerTsjrpcMethods =
  new (class StoragesStoresShares extends TsjrpcServerMethods<StoragesSharesTsjrpcModel> {
    constructor() {
      super({
        scope: 'StoragesStoresShares',
        methods: {
          refreshRacks: true,
        },
      });
    }
  })();

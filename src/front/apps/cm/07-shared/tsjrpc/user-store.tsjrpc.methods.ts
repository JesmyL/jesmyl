import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';

export const cmUserStoreTsjrpcClient = new (class CmUserStore extends TsjrpcClient<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        setAboutComFavorites: true,
      },
    });
  }
})();

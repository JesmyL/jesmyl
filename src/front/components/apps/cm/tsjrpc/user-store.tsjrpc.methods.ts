import { TsjrpcClient } from '#basis/lib/Tsjrpc.client';
import { CmUserStoreTsjrpcModel } from 'shared/api/tsjrpc/cm/user-store.tsjrpc.model';

export const cmUserStoreTsjrpcClient = new (class CmUserStore extends TsjrpcClient<CmUserStoreTsjrpcModel> {
  constructor() {
    super({
      scope: 'CmUserStore',
      methods: {
        setComComment: true,
        setAboutComFavorites: true,
      },
    });
  }
})();

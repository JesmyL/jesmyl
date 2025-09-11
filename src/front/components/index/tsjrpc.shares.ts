import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { IndexTsjrpcSharesModel } from 'shared/api/tsjrpc/index/tsjrpc.methods.model';
import { indexUserAccessRightsAtom } from './atoms';

export const indexTsjrpcBaseClient = new (class Index extends TsjrpcBaseClient<IndexTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'Index',
      methods: {
        refreshAccessRights: ({ rights }) => {
          indexUserAccessRightsAtom.set(rights);
        },
      },
    });
  }
})();

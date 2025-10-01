import { TsjrpcBaseClient } from '#basis/lib/TsjrpcBase.client';
import { MyLib } from '#shared/lib/my-lib';
import { IndexTsjrpcSharesModel } from 'shared/api/tsjrpc/index/tsjrpc.methods.model';
import { indexUserAccessRightsAtom } from './atoms';
import { lastUpdatedIconsMd5HashAtom } from './db/atoms';
import { indexIDB } from './db/index-idb';

export const indexTsjrpcBaseClient = new (class Index extends TsjrpcBaseClient<IndexTsjrpcSharesModel> {
  constructor() {
    super({
      scope: 'Index',
      methods: {
        refreshAccessRights: async ({ rights }) => {
          indexUserAccessRightsAtom.set(rights);
        },
        updateKnownIconPacks: async ({ actualIconPacks, iconsMd5Hash }) => {
          MyLib.entries(actualIconPacks).forEach(([iconName, pack]) => {
            if (pack !== null) indexIDB.tb.iconPacks.put({ key: iconName, pack });
            else indexIDB.tb.iconPacks.delete(iconName);
          });

          lastUpdatedIconsMd5HashAtom.set(iconsMd5Hash);
        },
      },
    });
  }
})();

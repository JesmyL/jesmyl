import { TsjrpcBaseClient } from '#basis/tsjrpc/TsjrpcBase.client';
import { StoragesSharesTsjrpcModel } from 'shared/api/tsjrpc/storages/tsjrpc.shares.model';
import { storagesIDB } from '../state/storagesIDB';

export const storagesStoresSharesTsjrpcBaseClient =
  new (class StoragesStoresSharesShares extends TsjrpcBaseClient<StoragesSharesTsjrpcModel> {
    constructor() {
      super({
        scope: 'StoragesStoresShares',
        methods: {
          refreshRacks: async ({ racks, maxMod }) => {
            storagesIDB.tb.racks.bulkPut(racks);
            storagesIDB.updateLastModifiedAt(maxMod);
          },
        },
      });
    }
  })();

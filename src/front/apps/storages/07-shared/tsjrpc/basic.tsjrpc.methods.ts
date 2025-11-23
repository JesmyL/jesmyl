import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { StoragesTsjrpcModel } from 'shared/api/tsjrpc/storages/tsjrpc.model';
import { storagesIDB } from '../state/storagesIDB';

export const storagesTsjrpcClient = new (class Storages extends TsjrpcClient<StoragesTsjrpcModel> {
  constructor() {
    super({
      scope: 'Storages',
      methods: {
        createRack: {
          onResponse: ({ lastModfiedAt, rack }) => {
            storagesIDB.tb.racks.put(rack);
            storagesIDB.updateLastModifiedAt(lastModfiedAt);
          },
        },
      },
    });
  }
})();

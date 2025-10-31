import { TsjrpcClient } from '#basis/tsjrpc/Tsjrpc.client';
import { StoragesTsjrpcModel } from 'shared/api/tsjrpc/storages/tsjrpc.model';
import { storagesIDB } from '../state/storagesIDB';

export const storagesTsjrpcClient = new (class Storages extends TsjrpcClient<StoragesTsjrpcModel> {
  constructor() {
    super({
      scope: 'Storages',
      methods: {
        requestFreshes: true,
        createRack: ({ lastModfiedAt, rack }) => {
          storagesIDB.tb.racks.put(rack);
          storagesIDB.updateLastModifiedAt(lastModfiedAt);
        },
        createRackCard: true,
        editRackStatusIcon: true,
        editRackStatusTitle: true,
        createRackStatus: true,
        toggleRackStatusNexti: true,
        editRackStatusColor: true,
        setRackCardStatus: true,
        editRackCardTitle: true,
        editRackCardNote: true,
        editRackCardMeta: true,
        createColumn: true,
        addRackValue: true,
        toggleListCellValue: true,
        createDatesNestedCell: true,
        editCellValue: true,
        editNestedCellProp: true,
      },
    });
  }
})();

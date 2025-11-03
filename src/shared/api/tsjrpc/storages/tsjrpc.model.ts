import { StoragesRack, StoragesRackCard, StoragesRackCardMi, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesCell, StoragesColumnType, StoragesNestedCellSelectors } from 'shared/model/storages/rack.model';

export type StoragesTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  createRack: (args: { title: string }) => { rack: StoragesRack; lastModfiedAt: number };

  createRackCard: (args: RackSelector) => void;
  addManyCards: (args: RackSelector & { cards: StoragesRackCard[] }) => void;
  addRackValue: (args: RackSelector & { title: string }) => void;
  setRackCardStatus: (args: StoragesTsjrpcRackStatusSelector & StoragesTsjrpcRackCardSelector) => void;
  editRackCardTitle: (args: StoragesTsjrpcRackCardSelector & { title: string }) => void;

  toggleListCellValue: (args: StoragesTsjrpcCellSelector & StoragesNestedCellSelectors & { title: string }) => void;

  editRackCardNote: (args: StoragesTsjrpcRackCardSelector & { note: string }) => void;
  editRackCardMeta: (args: StoragesTsjrpcRackCardSelector & { meta: string }) => void;

  createDatesNestedCell: (args: StoragesTsjrpcCellSelector) => void;

  editNestedCellProp: (
    args: StoragesTsjrpcCellSelector &
      StoragesNestedCellSelectors & { partialProps: object; sortRow?: { prop: string; asc: boolean } },
  ) => void;

  editCellValue: (
    args: StoragesTsjrpcCellSelector & StoragesNestedCellSelectors & { value: StoragesCell<StoragesColumnType>['val'] },
  ) => void;

  createRackStatus: (args: RackSelector & { title: string }) => void;

  createColumn: (
    args: RackSelector & StoragesNestedCellSelectors & { title: string; newColumnType: StoragesColumnType },
  ) => void;

  editRackStatusIcon: (args: StoragesTsjrpcRackStatusSelector & { icon: KnownStameskaIconName }) => void;
  editRackStatusColor: (args: StoragesTsjrpcRackStatusSelector & { color: string }) => void;
  toggleRackStatusNexti: (args: StoragesTsjrpcRackStatusSelector & { nextStatusi: number }) => void;
  editRackStatusTitle: (args: StoragesTsjrpcRackStatusSelector & { title: string }) => void;

  setNumber: (args: StoragesTsjrpcCellSelector & { amount: number }) => void;
  copyRackStatuses: (args: StoragesTsjrpcRackSelector & { fromRackw: StoragesRackWid }) => void;
};

type RackSelector = StoragesTsjrpcRackSelector;

export type StoragesTsjrpcRackSelector = { rackw: StoragesRackWid };
export type StoragesTsjrpcRackCardSelector = StoragesTsjrpcRackSelector & { cardMi: StoragesRackCardMi };
export type StoragesTsjrpcCellSelector = StoragesTsjrpcRackCardSelector & { coli: number };
export type StoragesTsjrpcRackStatusSelector = StoragesTsjrpcRackSelector & { statusi: number };

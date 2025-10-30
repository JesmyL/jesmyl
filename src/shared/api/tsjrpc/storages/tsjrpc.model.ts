import { StoragesRack, StoragesRackCardMi, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesFieldNestedSelectors, StoragesFieldType, StoragesRackField } from 'shared/model/storages/rack.model';

export type StoragesTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  createRack: (args: { title: string }) => { rack: StoragesRack; lastModfiedAt: number };

  createRackCard: (args: RackSelector) => void;
  addRackValue: (args: RackSelector & { title: string }) => void;
  setRackCardStatus: (args: StoragesTsjrpcRackStatusSelector & StoragesTsjrpcRackCardSelector) => void;
  editRackCardTitle: (args: StoragesTsjrpcRackCardSelector & { title: string }) => void;

  toggleRackCardListFieldValue: (
    args: StoragesTsjrpcRackCardFieldSelector & StoragesFieldNestedSelectors & { title: string },
  ) => void;

  editRackCardNote: (args: StoragesTsjrpcRackCardSelector & { note: string }) => void;
  editRackCardMeta: (args: StoragesTsjrpcRackCardSelector & { meta: string }) => void;

  createRackCardDatesFieldDate: (args: StoragesTsjrpcRackCardFieldSelector & { timestamp?: number }) => void;

  editRackCardFieldValue: (
    args: StoragesTsjrpcRackCardFieldSelector &
      StoragesFieldNestedSelectors & { value: StoragesRackField<StoragesFieldType>['val'] },
  ) => void;

  createRackStatus: (args: RackSelector & { title: string }) => void;

  createRackDefinitionField: (
    args: RackSelector & StoragesFieldNestedSelectors & { title: string; newFieldType: StoragesFieldType },
  ) => void;

  editRackStatusIcon: (args: StoragesTsjrpcRackStatusSelector & { icon: KnownStameskaIconName }) => void;
  editRackStatusColor: (args: StoragesTsjrpcRackStatusSelector & { color: string }) => void;
  toggleRackStatusNexti: (args: StoragesTsjrpcRackStatusSelector & { nextStatusi: number }) => void;
  editRackStatusTitle: (args: StoragesTsjrpcRackStatusSelector & { title: string }) => void;
};

type RackSelector = StoragesTsjrpcRackSelector;

export type StoragesTsjrpcRackSelector = { rackw: StoragesRackWid };
export type StoragesTsjrpcRackCardSelector = StoragesTsjrpcRackSelector & { cardMi: StoragesRackCardMi };
export type StoragesTsjrpcRackCardFieldSelector = StoragesTsjrpcRackCardSelector & { fieldi: number };
export type StoragesTsjrpcRackStatusSelector = StoragesTsjrpcRackSelector & { statusi: number };

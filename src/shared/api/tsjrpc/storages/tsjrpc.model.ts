import { StoragesRack, StoragesRackCardMi, StoragesRackWid } from 'shared/model/storages/list.model';
import { StoragesFieldType } from 'shared/model/storages/rack.model';

export type StoragesTsjrpcModel = {
  requestFreshes: (args: { lastModfiedAt: number }) => void;

  createRack: (args: { title: string }) => { rack: StoragesRack; lastModfiedAt: number };

  createRackCard: (args: { rackw: StoragesRackWid }) => void;
  setRackCardStatus: (args: { rackw: StoragesRackWid; cardMi: StoragesRackCardMi; statusi: number }) => void;
  editRackCardTitle: (args: { rackw: StoragesRackWid; cardMi: StoragesRackCardMi; title: string }) => void;
  editRackCardNote: (args: { rackw: StoragesRackWid; cardMi: StoragesRackCardMi; note: string }) => void;
  editRackCardMeta: (args: { rackw: StoragesRackWid; cardMi: StoragesRackCardMi; meta: string }) => void;

  createRackStatus: (args: { rackw: StoragesRackWid; title: string }) => void;
  createRackField: (args: { rackw: StoragesRackWid; title: string; type: StoragesFieldType }) => void;
  editRackStatusIcon: (args: { rackw: StoragesRackWid; statusi: number; icon: KnownStameskaIconName }) => void;
  editRackStatusColor: (args: { rackw: StoragesRackWid; statusi: number; color: string }) => void;
  toggleRackStatusNexti: (args: { rackw: StoragesRackWid; statusi: number; nextStatusi: number }) => void;
  editRackStatusTitle: (args: { rackw: StoragesRackWid; statusi: number; title: string }) => void;
};

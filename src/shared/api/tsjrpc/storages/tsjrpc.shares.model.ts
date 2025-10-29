import { StoragesRack } from 'shared/model/storages/list.model';

export type StoragesSharesTsjrpcModel = {
  refreshRacks: (args: { racks: StoragesRack[]; maxMod: number }) => void;
};

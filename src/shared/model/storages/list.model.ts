import { SokiAuthLogin } from 'shared/api';
import { StoragesCell, StoragesColumnType, StoragesDictItemi, StoragesRackColumn } from './rack.model';

export const enum StoragesRackWid {
  def = 0,
}

export const enum StoragesRackCardMi {
  min = 1,
}

export const enum StoragesRackSummaryMi {
  min = 1,
}

export const enum StoragesRackSummaryType {
  Total = 81,
  ByMonth = 41,
  ByYear = 97,
}

export type StoragesRackStatus = {
  title: string;
  icon?: KnownStameskaIconName;
  next?: number[];
  color?: string;
};

export type StoragesRackCard<DictItem extends string | StoragesDictItemi = StoragesDictItemi> = {
  mi: StoragesRackCardMi;
  status?: number;
  title: string;
  note?: string;
  meta?: string;
  row?: (StoragesCell<StoragesColumnType, DictItem> | nil)[];
};

export enum StoragesRackMemberRole {
  Requester = 0,
  Creator,
  Admin,
}

export type StoragesRackMember = {
  fio: string;
  role: StoragesRackMemberRole;
};

export type StoragesRackStorageSaved = StoragesRackCore & (StoragesRackTrail | StoragesRackChild);

export type StoragesRackChild = {
  parent: StoragesRackWid;
};

export type StoragesRackSummary = {
  mi: StoragesRackSummaryMi;
  title: string;
  formula: string;
  type: StoragesRackSummaryType;
  date: number;
};

export type StoragesRackCore = {
  w: StoragesRackWid;
  icon?: KnownStameskaIconName;
  team: PRecord<SokiAuthLogin, StoragesRackMember>;
  title: string;
  cards: StoragesRackCard[];
  sum?: StoragesRackSummary[];
};

export type StoragesRackTrail = {
  statuses: StoragesRackStatus[];
  cols: StoragesRackColumn<StoragesColumnType>[];
  colsOrd?: number[];
  /** StoragesDicti indexed */
  dicts: [StoragesDict, ...StoragesDict[]];
};

export type StoragesRack = StoragesRackTrail & StoragesRackCore & Partial<StoragesRackChild>;

export type StoragesDict = {
  title: string;
  /** StoragesDictItemi indexed */
  li: [string, ...string[]];
};

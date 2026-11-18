import { UserId } from 'shared/api';
import { StoragesCell, StoragesColumnType, StoragesDictItemi, StoragesRackColumn } from './rack.model';

export const enum StoragesRackWid {
  /** Идентификатор таблицы по умолчанию — используется, когда таблица ещё не выбрана */
  def = 0,
}

export const enum StoragesRackSummaryMi {
  /** Минимальный идентификатор строки итогов таблицы */
  min = 1,
}

export const enum StoragesRackSummaryType {
  /** Общий итог по всем карточкам */
  Total = 81,
  /** Итог с группировкой по месяцам */
  ByMonth = 41,
  /** Итог с группировкой по годам */
  ByYear = 97,
}

export type StoragesRackStatus = {
  title: string;
  icon?: KnownStameskaIconName;
  next?: number[];
  color?: string;
};

export type StoragesRackCard<DictItem extends string | StoragesDictItemi = StoragesDictItemi> = {
  i: number;
  status?: number;
  title: string;
  note?: string;
  meta?: string;
  row?: (StoragesCell<StoragesColumnType, DictItem> | nil)[];
};

export const enum StoragesRackMemberRole {
  /** Пользователь, запросивший доступ к таблице — без прав на редактирование */
  Requester = 0,
  /** Создатель таблицы — полный доступ */
  Creator = 1,
  /** Администратор таблицы — управление содержимым и участниками */
  Admin = 2,
}

export type StoragesRackMember = {
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
  team: PRecord<UserId, StoragesRackMember>;
  title: string;
  cards: StoragesRackCard[];
  sum?: StoragesRackSummary[];
};

export type StoragesRackTrail = {
  statuses: StoragesRackStatus[];
  statusOrd?: number[];
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

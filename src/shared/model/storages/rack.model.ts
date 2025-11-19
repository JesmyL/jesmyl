import { StoragesColumnUiDict, StoragesColumnUiListKey } from './ui.model';

export const enum StoragesColumnType {
  Date = 12,
  Dates = 77,
  List = 62,
  Number = 93,
  String = 30,
  Link = 74,
  Formula = 88,
}

export const enum StoragesNestedCellMi {
  min = 1,
}

export const enum StoragesDicti {
  zIndex = 0,
}

export const enum StoragesDictItemi {
  zIndex = 0,
}

export type StoragesCell<
  Type extends StoragesColumnType,
  DictItem extends string | StoragesDictItemi = StoragesDictItemi,
> = StoragesCellDict<DictItem>[Type];

export type StoragesRackColumn<Type extends StoragesColumnType> = {
  t: Type;
  title: string;
  cols?: StoragesRackColumn<StoragesColumnType>[];
  uil?: StoragesColumnUiListKey[];
  uid?: StoragesColumnUiDict;
} & StoragesColumnCustomProperties<Type>;

export type StoragesNestedCellSelectors = {
  nestedCellMi?: StoragesNestedCellMi;
  nestedColi?: number;
  coli?: number;
};

export type StoragesColumnCustomProperties<Type extends StoragesColumnType> = {
  [StoragesColumnType.Date]: { und?: und };
  [StoragesColumnType.Dates]: { und?: und };
  [StoragesColumnType.Link]: { und?: und };
  [StoragesColumnType.List]: {
    di?: StoragesDicti;
  };
  [StoragesColumnType.String]: {
    di?: StoragesDicti;
  };
  [StoragesColumnType.Formula]: {
    /** formula string */
    val?: string;
    /** toFixed sign */
    fx?: number;
  };

  [StoragesColumnType.Number]: {
    /** metric */
    mt: string;
  };
}[Type];

type StoragesCellDict<DictItem extends string | StoragesDictItemi> = TypeSatisfiesDict<{
  [StoragesColumnType.Date]: {
    t: StoragesColumnType.Date;
    val: number | nil;
  };

  [StoragesColumnType.List]: {
    t: StoragesColumnType.List;
    val: DictItem[];
  };

  [StoragesColumnType.Dates]: {
    t: StoragesColumnType.Dates;
    val: und;
    row: (StoragesNestedCell & { ts?: number })[];
  };

  [StoragesColumnType.Number]: {
    t: StoragesColumnType.Number;
    val: number;
  };

  [StoragesColumnType.String]: {
    t: StoragesColumnType.String;
    val: DictItem;
  };

  [StoragesColumnType.Link]: {
    t: StoragesColumnType.Link;
    val: string;
  };

  [StoragesColumnType.Formula]: {
    t: StoragesColumnType.Formula;
    val: string;
  };
}>;

export type StoragesNestedCell = {
  mi: StoragesNestedCellMi;
  title?: string;
  row: (StoragesCell<StoragesColumnType> | nil)[];
};

type TypeSatisfiesDict<
  T extends {
    [T in StoragesColumnType]: { t: T; val: unknown; row?: StoragesNestedCell[] };
  },
> = T;

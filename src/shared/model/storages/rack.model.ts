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

export type StoragesCell<Type extends StoragesColumnType> = StoragesCellDict[Type];

export type StoragesRackColumn<Type extends StoragesColumnType> = {
  t: Type;
  title: string;
  cols?: StoragesRackColumn<StoragesColumnType>[];
  uil?: StoragesColumnUiListKey[];
  uid?: StoragesColumnUiDict;
} & ColumnCustoms[Type];

export type StoragesNestedCellSelectors = {
  nestedCellMi?: StoragesNestedCellMi;
  nestedColi?: number;
  coli?: number;
};

type ColumnCustoms = {
  [StoragesColumnType.Date]: object;
  [StoragesColumnType.Dates]: object;
  [StoragesColumnType.Link]: object;
  [StoragesColumnType.List]: object;
  [StoragesColumnType.String]: object;
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
};

type StoragesCellDict = TypeSatisfiesDict<{
  [StoragesColumnType.Date]: {
    t: StoragesColumnType.Date;
    val: number | nil;
  };

  [StoragesColumnType.List]: {
    t: StoragesColumnType.List;
    val: string[];
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
    val: string;
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

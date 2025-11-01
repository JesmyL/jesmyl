export const enum StoragesColumnType {
  Date = 12,
  Dates = 77,
  List = 62,
  Number = 93,
}

export const enum StoragesNestedCellMi {
  min = 1,
}

export type StoragesCell<Type extends StoragesColumnType> = StoragesCellDict[Type];

export type StoragesRackColumn = {
  t: StoragesColumnType;
  title: string;
  cols?: StoragesRackColumn[];
};

export type StoragesNestedCellSelectors = {
  nestedCellMi?: StoragesNestedCellMi;
  nestedColi?: number;
  coli?: number;
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

export const enum StoragesFieldType {
  Date = 12,
  Dates = 77,
  List = 62,
  Price = 93,
}

export const enum StoragesDatesFieldNestedDateFieldMi {
  min = 1,
}

export type StoragesRackField<Type extends StoragesFieldType> = StoragesRackCardFieldDict[Type];

export type StoragesRackDefinitionField = {
  t: StoragesFieldType;
  title: string;
  fields?: StoragesRackDefinitionField[];
};

export type StoragesFieldNestedSelectors = {
  nestedFieldMi?: StoragesDatesFieldNestedDateFieldMi;
  nestedFieldi?: number;
  fieldi?: number;
};

type StoragesRackCardFieldDict = TypeSatisfiesDict<{
  [StoragesFieldType.Date]: {
    t: StoragesFieldType.Date;
    val: number | nil;
  };

  [StoragesFieldType.List]: {
    t: StoragesFieldType.List;
    val: string[];
  };

  [StoragesFieldType.Dates]: {
    t: StoragesFieldType.Dates;
    val: (StoragesDatesFieldNestedDateField & { ts: number })[];
  };

  [StoragesFieldType.Price]: {
    t: StoragesFieldType.Price;
    val: {
      /** amount */
      am: string;
    };
  };
}>;

export type StoragesDatesFieldNestedDateField = {
  mi: StoragesDatesFieldNestedDateFieldMi;
  title?: string;
  fields: (StoragesRackField<StoragesFieldType> | nil)[];
};

type TypeSatisfiesDict<T extends { [T in StoragesFieldType]: { t: T; val: unknown } }> = T;

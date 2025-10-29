export const enum StoragesFieldType {
  Date = 12,
  List = 62,
}

export type StoragesRackCardField = StoragesRackCardFieldDict[StoragesFieldType];
export type StoragesRackDefinitionField = {
  t: StoragesFieldType;
  title: string;
};

type StoragesRackCardFieldDict = TypeSatisfiesDict<{
  [StoragesFieldType.Date]: {
    t: StoragesFieldType.Date;
    val: number;
  };

  [StoragesFieldType.List]: {
    t: StoragesFieldType.List;
    val: string[];
  };
}>;

type TypeSatisfiesDict<
  T extends {
    [T in StoragesFieldType]: {
      /** type */
      t: T;
      /** value */
      val: unknown;
    };
  },
> = T;

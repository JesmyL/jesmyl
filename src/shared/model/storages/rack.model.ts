import { StoragesColumnUiDict, StoragesColumnUiListKey } from './ui.model';

export const enum StoragesColumnType {
  /** Одна дата */
  Date = 12,
  /** Набор дат во вложенных ячейках */
  Dates = 77,
  /** Список значений из словаря */
  List = 62,
  /** Число с метрикой */
  Number = 93,
  /** Строковое значение из словаря */
  String = 30,
  /** Произвольный текст */
  Text = 35,
  /** Ссылка, начинающаяся с https:// */
  Link = 74,
  /** Вычисляемое значение по формуле */
  Formula = 88,
}

export const enum StoragesNestedCellMi {
  /** Минимальный идентификатор вложенной ячейки */
  min = 1,
}

export const enum StoragesDicti {
  /** Индекс словаря по умолчанию — первый в списке словарей таблицы */
  zIndex = 0,
}

export const enum StoragesDictItemi {
  /** Индекс элемента словаря по умолчанию — первый в списке */
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
  [StoragesColumnType.Text]: { und?: und };
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
  [StoragesColumnType.Date]: [StoragesColumnType.Date, val?: number | nil];

  [StoragesColumnType.List]: [StoragesColumnType.List, DictItem[]];

  [StoragesColumnType.Dates]: [StoragesColumnType.Dates, { nst: (StoragesNestedCell & { ts?: number })[] }];

  [StoragesColumnType.Number]: [StoragesColumnType.Number, number];

  [StoragesColumnType.String]: [StoragesColumnType.String, DictItem];

  [StoragesColumnType.Link]: [StoragesColumnType.Link, string];

  [StoragesColumnType.Text]: [StoragesColumnType.Text, string];

  [StoragesColumnType.Formula]: [StoragesColumnType.Formula, val?: never];
}>;

export type StoragesNestedCell = {
  mi: StoragesNestedCellMi;
  dsc?: string;
  row: (StoragesCell<StoragesColumnType> | nil)[];
};

type TypeSatisfiesDict<
  T extends {
    [T in StoragesColumnType]: [t: T, val?: unknown];
  },
> = T;

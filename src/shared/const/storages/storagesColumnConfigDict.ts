import { mylib } from '#shared/lib/my-lib';
import { StoragesRack } from 'shared/model/storages/list.model';
import {
  StoragesCell,
  StoragesColumnType,
  StoragesNestedCellMi,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';
import { smylib } from 'shared/utils';
import { makeStoragesDictValue } from 'shared/utils/storages/makeDictValue';

export const storagesCheckStringValueIsLink = (value: unknown): value is string =>
  smylib.isStr(value) && value.trim().startsWith('https://');

const checkDate = (value: unknown) =>
  (smylib.isNum(value) || smylib.isStr(value)) && mapStrOrNumToTimestamp(value) != null
    ? null
    : 'Это не корректная дата';

const mapStrOrNumToTimestamp = (value: string | number) => {
  const ts = new Date(value).getTime() || new Date(+value).getTime();
  if (smylib.isNaN(ts)) return null;

  return Math.trunc(ts / 10000);
};

export const storagesColumnConfigDict: {
  [Type in StoragesColumnType]: {
    icon: KnownStameskaIconName;
    def: () => StoragesCell<Type>;
    typeTitle: string;
    checkType: (value: unknown) => null | string;
    mapStringToCell: (value: string) => StoragesCell<Type, string> | null;
    retCorrectTypeValue: (value: unknown) => StoragesCell<Type, string>;
    makeStringValue: (
      cell: StoragesCell<Type> | nil,
      column: StoragesRackColumn<Type>,
      rack: StoragesRack,
    ) => string | nil;
  };
} = {
  [StoragesColumnType.Date]: {
    icon: 'Calendar01',
    typeTitle: 'Дата',
    def: () => ({
      t: StoragesColumnType.Date,
      val: undefined,
    }),
    checkType: checkDate,
    mapStringToCell: value => {
      if (checkDate(value)) return null;
      const val = mapStrOrNumToTimestamp(value);
      if (val == null) return null;

      return { t: StoragesColumnType.Date, val };
    },
    retCorrectTypeValue: value => ({
      t: StoragesColumnType.Date,
      val: smylib.isNum(value) || smylib.isStr(value) ? +value : undefined,
    }),
    makeStringValue: cell => (cell?.val == null ? null : new Date(cell.val).toLocaleDateString('ru')),
  },
  [StoragesColumnType.Dates]: {
    icon: 'Calendar02',
    typeTitle: 'Даты',
    makeStringValue: cell => {
      if (cell?.row == null) return;
      const firstCell = cell.row.find(cell => cell.ts != null);
      if (firstCell?.ts == null) return;

      return new Date(firstCell.ts * 100000).toLocaleDateString('ru');
    },
    def: () => ({
      t: StoragesColumnType.Dates,
      val: undefined,
      row: [],
    }),
    checkType: checkDate,
    mapStringToCell: value => {
      if (checkDate(value)) return null;
      const ts = mapStrOrNumToTimestamp(value);
      if (ts == null) return null;

      return {
        t: StoragesColumnType.Dates,
        val: undefined,
        row: [{ mi: StoragesNestedCellMi.min, ts, row: [] }],
      };
    },
    retCorrectTypeValue: () => ({ t: StoragesColumnType.Dates, val: undefined, row: [] }),
  },
  [StoragesColumnType.List]: {
    icon: 'Scroll',
    typeTitle: 'Список из словаря',
    makeStringValue: (cell, column, rack) => {
      const valueScalar = cell?.val.find(it => makeStoragesDictValue(it, column, rack));
      if (valueScalar == null || mylib.isStr(valueScalar)) return valueScalar;
      return makeStoragesDictValue(valueScalar, column, rack);
    },
    def: () => ({
      t: StoragesColumnType.List,
      val: [],
    }),
    checkType: value => (smylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => ({ t: StoragesColumnType.List, val: [value] }),
    retCorrectTypeValue: value => ({
      t: StoragesColumnType.List,
      val: smylib.isArr(value) ? (value as string[]) : [],
    }),
  },
  [StoragesColumnType.Number]: {
    icon: 'Absolute',
    typeTitle: 'Цифра',
    makeStringValue: cell => cell && '' + cell.val,
    def: () => ({
      t: StoragesColumnType.Number,
      val: 0,
    }),
    checkType: value => ((smylib.isNum(value) || smylib.isStr(value)) && !smylib.isNaN(+value) ? null : 'Это не число'),
    mapStringToCell: value => {
      if (smylib.isNaN(+value)) return null;

      return { t: StoragesColumnType.Number, val: +value };
    },
    retCorrectTypeValue: value => ({ t: StoragesColumnType.Number, val: smylib.isNum(value) ? value : 0 }),
  },
  [StoragesColumnType.String]: {
    icon: 'BorderFull',
    typeTitle: 'Строка из словаря',
    makeStringValue: (cell, column, rack) => makeStoragesDictValue(cell?.val, column, rack),
    def: () => ({ t: StoragesColumnType.String, val: 0 }),
    checkType: value => (smylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => {
      if (!smylib.isStr(value)) return null;

      return { t: StoragesColumnType.String, val: value };
    },
    retCorrectTypeValue: value => ({ t: StoragesColumnType.String, val: smylib.isStr(value) ? value.trim() : '' }),
  },
  [StoragesColumnType.Link]: {
    icon: 'Link01',
    typeTitle: 'Ссылка',
    makeStringValue: cell => cell?.val,
    def: () => ({
      t: StoragesColumnType.Link,
      val: '',
    }),
    checkType: value => (storagesCheckStringValueIsLink(value) ? null : 'Это не ссылка'),
    mapStringToCell: value => {
      if (!storagesCheckStringValueIsLink(value)) return null;

      return { t: StoragesColumnType.Link, val: value };
    },
    retCorrectTypeValue: value => ({
      t: StoragesColumnType.Link,
      val: storagesCheckStringValueIsLink(value) ? value : '',
    }),
  },
  [StoragesColumnType.Formula]: {
    icon: 'Math',
    typeTitle: 'Формула',
    makeStringValue: cell => cell?.val,
    def: () => ({
      t: StoragesColumnType.Formula,
      val: '',
    }),
    checkType: value => (smylib.isStr(value) ? null : 'Это не формула'),
    mapStringToCell: value => {
      if (!smylib.isStr(value)) return null;

      return { t: StoragesColumnType.Formula, val: value };
    },
    retCorrectTypeValue: value => ({ t: StoragesColumnType.Formula, val: smylib.isStr(value) ? value : '' }),
  },
};

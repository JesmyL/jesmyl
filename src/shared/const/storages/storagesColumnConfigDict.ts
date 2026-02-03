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
    checkIsCellCanBeDelete?: (cell: StoragesCell<Type>) => boolean;
  };
} = {
  [StoragesColumnType.Date]: {
    icon: 'Calendar01',
    typeTitle: 'Дата',
    def: () => [StoragesColumnType.Date],
    checkType: checkDate,
    mapStringToCell: value => {
      if (checkDate(value)) return null;
      const val = mapStrOrNumToTimestamp(value);
      if (val == null) return null;

      return [StoragesColumnType.Date, val];
    },
    retCorrectTypeValue: value =>
      smylib.isNum(value) || smylib.isStr(value) ? [StoragesColumnType.Date, +value] : [StoragesColumnType.Date],
    makeStringValue: cell => (cell?.[1] == null ? null : new Date(cell[1]).toLocaleDateString('ru')),
  },
  [StoragesColumnType.Dates]: {
    icon: 'Calendar02',
    typeTitle: 'Даты',
    makeStringValue: cell => {
      if (cell?.[1].nst == null) return;
      const firstCell = cell[1].nst.find(cell => cell.ts != null);
      if (firstCell?.ts == null) return;

      return new Date(firstCell.ts * 100000).toLocaleDateString('ru');
    },
    def: () => [StoragesColumnType.Dates, { nst: [] }],
    checkType: checkDate,
    mapStringToCell: value => {
      if (checkDate(value)) return null;
      const ts = mapStrOrNumToTimestamp(value);
      if (ts == null) return null;

      return [StoragesColumnType.Dates, { nst: [{ mi: StoragesNestedCellMi.min, ts, row: [] }] }];
    },
    retCorrectTypeValue: () => [StoragesColumnType.Dates, { nst: [] }],
    checkIsCellCanBeDelete: cell => !smylib.keys(cell[1].nst).length,
  },
  [StoragesColumnType.List]: {
    icon: 'Scroll',
    typeTitle: 'Список из словаря',
    makeStringValue: (cell, column, rack) => {
      const valueScalar = cell?.[1].find(it => makeStoragesDictValue(it, column, rack));
      if (valueScalar == null || mylib.isStr(valueScalar)) return valueScalar;
      return makeStoragesDictValue(valueScalar, column, rack);
    },
    def: () => [StoragesColumnType.List, []],
    checkType: value => (smylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => [StoragesColumnType.List, [value]],
    retCorrectTypeValue: value => [StoragesColumnType.List, smylib.isArr(value) ? (value as string[]) : []],
  },
  [StoragesColumnType.Number]: {
    icon: 'Absolute',
    typeTitle: 'Цифра',
    makeStringValue: cell => cell && '' + cell[1],
    def: () => [StoragesColumnType.Number, 0],
    checkType: value => ((smylib.isNum(value) || smylib.isStr(value)) && !smylib.isNaN(+value) ? null : 'Это не число'),
    mapStringToCell: value => {
      if (smylib.isNaN(+value)) return null;

      return [StoragesColumnType.Number, +value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.Number, smylib.isNum(value) ? value : 0],
  },
  [StoragesColumnType.String]: {
    icon: 'BorderFull',
    typeTitle: 'Строка из словаря',
    makeStringValue: (cell, column, rack) => makeStoragesDictValue(cell?.[1], column, rack),
    def: () => [StoragesColumnType.String, 0],
    checkType: value => (smylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => {
      if (!smylib.isStr(value)) return null;

      return [StoragesColumnType.String, value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.String, smylib.isStr(value) ? value.trim() : ''],
  },

  [StoragesColumnType.Link]: {
    icon: 'Link01',
    typeTitle: 'Ссылка',
    makeStringValue: cell => cell?.[1],
    def: () => [StoragesColumnType.Link, ''],
    checkType: value => (storagesCheckStringValueIsLink(value) ? null : 'Это не ссылка'),
    mapStringToCell: value => {
      if (!storagesCheckStringValueIsLink(value)) return null;

      return [StoragesColumnType.Link, value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.Link, storagesCheckStringValueIsLink(value) ? value : ''],
  },

  [StoragesColumnType.Text]: {
    icon: 'Text',
    typeTitle: 'Текст',
    makeStringValue: cell => cell?.[1],
    def: () => [StoragesColumnType.Text, ''],
    checkType: value => (smylib.isStr(value) ? null : 'Это не текст'),
    mapStringToCell: value => {
      if (smylib.isStr(value)) return null;

      return [StoragesColumnType.Text, value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.Text, smylib.isStr(value) ? value : ''],
  },

  [StoragesColumnType.Formula]: {
    icon: 'Math',
    typeTitle: 'Формула',
    makeStringValue: cell => cell?.[1],
    def: () => [StoragesColumnType.Formula],
    checkType: value => (smylib.isStr(value) ? null : 'Это не формула'),
    mapStringToCell: () => [StoragesColumnType.Formula],
    retCorrectTypeValue: () => [StoragesColumnType.Formula],
  },
};

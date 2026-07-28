import { StoragesRack } from 'shared/model/storages/list.model';
import {
  StoragesCell,
  StoragesColumnType,
  StoragesNestedCellMi,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';
import { checkIsArray, checkIsNaN, checkIsNumber, checkIsString } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import { makeStoragesDictValue } from 'shared/utils/storages/makeDictValue';

export const storagesCheckStringValueIsLink = (value: unknown): value is string =>
  checkIsString(value) && value.trim().startsWith('https://');

const checkDate = (value: unknown) =>
  (checkIsNumber(value) || checkIsString(value)) && mapStrOrNumToTimestamp(value) != null
    ? null
    : 'Это не корректная дата';

const mapStrOrNumToTimestamp = (value: string | number) => {
  const ts = new Date(value).getTime() || new Date(+value).getTime();
  if (checkIsNaN(ts)) return null;

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
      checkIsNumber(value) || checkIsString(value) ? [StoragesColumnType.Date, +value] : [StoragesColumnType.Date],
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
    checkIsCellCanBeDelete: cell => !objectLength(cell[1].nst),
  },
  [StoragesColumnType.List]: {
    icon: 'Scroll',
    typeTitle: 'Список из словаря',
    makeStringValue: (cell, column, rack) => {
      const valueScalar = cell?.[1].find(it => makeStoragesDictValue(it, column, rack));
      if (valueScalar == null || checkIsString(valueScalar)) return valueScalar;
      return makeStoragesDictValue(valueScalar, column, rack);
    },
    def: () => [StoragesColumnType.List, []],
    checkType: value => (checkIsString(value) ? null : 'Это не строка'),
    mapStringToCell: value => [StoragesColumnType.List, [value]],
    retCorrectTypeValue: value => [StoragesColumnType.List, checkIsArray(value) ? (value as string[]) : []],
  },
  [StoragesColumnType.Number]: {
    icon: 'Absolute',
    typeTitle: 'Цифра',
    makeStringValue: cell => cell && '' + cell[1],
    def: () => [StoragesColumnType.Number, 0],
    checkType: value => ((checkIsNumber(value) || checkIsString(value)) && !checkIsNaN(+value) ? null : 'Это не число'),
    mapStringToCell: value => {
      if (checkIsNaN(+value)) return null;

      return [StoragesColumnType.Number, +value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.Number, checkIsNumber(value) ? value : 0],
  },
  [StoragesColumnType.String]: {
    icon: 'BorderFull',
    typeTitle: 'Строка из словаря',
    makeStringValue: (cell, column, rack) => makeStoragesDictValue(cell?.[1], column, rack),
    def: () => [StoragesColumnType.String, 0],
    checkType: value => (checkIsString(value) ? null : 'Это не строка'),
    mapStringToCell: value => {
      if (!checkIsString(value)) return null;

      return [StoragesColumnType.String, value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.String, checkIsString(value) ? value.trim() : ''],
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
    checkType: value => (checkIsString(value) ? null : 'Это не текст'),
    mapStringToCell: value => {
      if (checkIsString(value)) return null;

      return [StoragesColumnType.Text, value];
    },
    retCorrectTypeValue: value => [StoragesColumnType.Text, checkIsString(value) ? value : ''],
  },

  [StoragesColumnType.Formula]: {
    icon: 'Math',
    typeTitle: 'Формула',
    makeStringValue: cell => cell?.[1],
    def: () => [StoragesColumnType.Formula],
    checkType: value => (checkIsString(value) ? null : 'Это не формула'),
    mapStringToCell: () => [StoragesColumnType.Formula],
    retCorrectTypeValue: () => [StoragesColumnType.Formula],
  },
};

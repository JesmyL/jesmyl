import { StoragesCell, StoragesColumnType, StoragesNestedCellMi } from 'shared/model/storages/rack.model';
import { smylib } from 'shared/utils';

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
    def: () => StoragesCell<Type>;
    typeTitle: string;
    checkType: (value: unknown) => null | string;
    mapStringToCell: (value: string) => StoragesCell<Type> | null;
    retCorrectTypeValue: (value: unknown) => StoragesCell<Type>['val'];
    makeStringValue: (cell: StoragesCell<Type> | nil) => string | nil;
  };
} = {
  [StoragesColumnType.Date]: {
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
    retCorrectTypeValue: value => (smylib.isNum(value) || smylib.isStr(value) ? +value : undefined),
    makeStringValue: cell => (cell?.val == null ? null : new Date(cell.val).toLocaleDateString('ru')),
  },
  [StoragesColumnType.Dates]: {
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
    retCorrectTypeValue: () => undefined,
  },
  [StoragesColumnType.List]: {
    typeTitle: 'Список',
    makeStringValue: cell => cell?.val.find(it => it),
    def: () => ({
      t: StoragesColumnType.List,
      val: [],
    }),
    checkType: value => (smylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => {
      return { t: StoragesColumnType.List, val: [value] };
    },
    retCorrectTypeValue: value => (smylib.isArr(value) ? (value as string[]) : []),
  },
  [StoragesColumnType.Number]: {
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
    retCorrectTypeValue: value => (smylib.isNum(value) ? value : 0),
  },
  [StoragesColumnType.String]: {
    typeTitle: 'Строка',
    makeStringValue: cell => cell?.val,
    def: () => ({
      t: StoragesColumnType.String,
      val: '',
    }),
    checkType: value => (smylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => {
      if (!smylib.isStr(value)) return null;

      return { t: StoragesColumnType.String, val: value };
    },
    retCorrectTypeValue: value => (smylib.isStr(value) ? value.trim() : ''),
  },
  [StoragesColumnType.Link]: {
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
    retCorrectTypeValue: value => (storagesCheckStringValueIsLink(value) ? value : ''),
  },
};

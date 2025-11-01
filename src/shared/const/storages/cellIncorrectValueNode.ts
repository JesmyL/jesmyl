import { mylib } from '#shared/lib/my-lib';
import { StoragesCell, StoragesColumnType, StoragesNestedCellMi } from 'shared/model/storages/rack.model';

const checkDate = (value: unknown) =>
  (mylib.isNum(value) || mylib.isStr(value)) && mapStrOrNumToTimestamp(value) != null ? null : 'Это не корректная дата';

const mapStrOrNumToTimestamp = (value: string | number) => {
  const ts = new Date(value).getTime() || new Date(+value).getTime();
  if (mylib.isNaN(ts)) return null;

  return Math.trunc(ts / 10000);
};

export const storagesCellIncorrectValueNode: {
  [Type in StoragesColumnType]: {
    checkType: (value: unknown) => null | string;
    mapStringToCell: (value: string) => StoragesCell<Type> | null;
  };
} = {
  [StoragesColumnType.Date]: {
    checkType: checkDate,
    mapStringToCell: value => {
      if (checkDate(value)) return null;
      const val = mapStrOrNumToTimestamp(value);
      if (val == null) return null;

      return { t: StoragesColumnType.Date, val };
    },
  },

  [StoragesColumnType.Dates]: {
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
  },

  [StoragesColumnType.List]: {
    checkType: value => (mylib.isStr(value) ? null : 'Это не строка'),
    mapStringToCell: value => {
      return { t: StoragesColumnType.List, val: [value] };
    },
  },
  [StoragesColumnType.Number]: {
    checkType: value => ((mylib.isNum(value) || mylib.isStr(value)) && !mylib.isNaN(+value) ? null : 'Это не число'),
    mapStringToCell: value => {
      if (mylib.isNaN(+value)) return null;

      return { t: StoragesColumnType.Number, val: +value };
    },
  },
};

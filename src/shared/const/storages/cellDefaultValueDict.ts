import { StoragesCell, StoragesColumnType } from 'shared/model/storages/rack.model';

export const storagesCellDefaultValueDict: {
  [Type in StoragesColumnType]: StoragesCell<Type>;
} = {
  [StoragesColumnType.Date]: {
    t: StoragesColumnType.Date,
    val: undefined,
  },
  [StoragesColumnType.Dates]: {
    t: StoragesColumnType.Dates,
    val: undefined,
    row: [],
  },
  [StoragesColumnType.List]: {
    t: StoragesColumnType.List,
    val: [],
  },
  [StoragesColumnType.Price]: {
    t: StoragesColumnType.Price,
    val: { am: '' },
  },
};

import { StoragesCell, StoragesColumnType } from 'shared/model/storages/rack.model';

export const storagesCellDefaultValueDict: () => {
  [Type in StoragesColumnType]: StoragesCell<Type>;
} = () => ({
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
  [StoragesColumnType.Number]: {
    t: StoragesColumnType.Number,
    val: 0,
  },
  [StoragesColumnType.String]: {
    t: StoragesColumnType.String,
    val: '',
  },
  [StoragesColumnType.Link]: {
    t: StoragesColumnType.Link,
    val: '',
  },
});

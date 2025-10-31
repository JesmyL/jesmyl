import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';
import {
  StoragesCell,
  StoragesColumnType,
  StoragesNestedCellSelectors,
  StoragesRackColumn,
} from 'shared/model/storages/rack.model';

export type StoragesCellComponents = {
  [Type in StoragesColumnType]: (props: StoragesCellTypeProps<Type>) => React.ReactNode;
};

export type StoragesCellTypeProps<Type extends StoragesColumnType> = {
  column: StoragesRackColumn;
  cell: StoragesCell<Type> | nil;
  card: StoragesRackCard;
  rack: StoragesRack;
  coli: number;

  nestedSelectors?: StoragesNestedCellSelectors;
};

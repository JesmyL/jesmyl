import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnType, StoragesNestedCellSelectors, StoragesRackColumn } from 'shared/model/storages/rack.model';

export type StoragesColumnEditComponents = {
  [Type in StoragesColumnType]: (props: StoragesColumnEditTypeProps<Type>) => React.ReactNode;
};

export type StoragesColumnEditTypeProps<Type extends StoragesColumnType> = {
  column: StoragesRackColumn<Type>;
  rack: StoragesRack;
  coli: number;
  nestedSelectors: StoragesNestedCellSelectors | und;
};

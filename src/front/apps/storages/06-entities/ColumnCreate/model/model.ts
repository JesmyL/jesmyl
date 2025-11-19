import { StoragesRack } from 'shared/model/storages/list.model';
import { StoragesColumnCustomProperties, StoragesColumnType } from 'shared/model/storages/rack.model';

export type StoragesColumnCreateComponents = {
  [Type in StoragesColumnType]: (props: StoragesColumnCreateTypeProps<Type>) => React.ReactNode;
};

export type StoragesColumnCreateTypeProps<Type extends StoragesColumnType> = {
  colType: Type;
  rack: StoragesRack;
  colCustomProps: StoragesColumnCustomProperties<Type>;
};

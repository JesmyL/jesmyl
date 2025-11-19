import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { storagesColumnCreateComponents } from '../const/columnComponents';
import { StoragesColumnCreateTypeProps } from '../model/model';

export const TheStoragesColumnCreateColumn = <Type extends StoragesColumnType>(
  props: StoragesColumnCreateTypeProps<Type>,
) => {
  const Component = storagesColumnCreateComponents[props.colType] as (props: StoragesColumnCreateTypeProps<Type>) => '';

  return <Component {...props} />;
};

import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypePrice = (props: StoragesCellTypeProps<StoragesColumnType.Price>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit && !props.cell?.val) return;

  return (
    <>
      <div>{props.column.title}</div>
    </>
  );
};

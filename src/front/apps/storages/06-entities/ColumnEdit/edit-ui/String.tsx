import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeString = (props: StoragesColumnEditTypeProps<StoragesColumnType.String>) => {
  if (props) return;
  return <></>;
};

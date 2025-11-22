import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeDate = (props: StoragesColumnEditTypeProps<StoragesColumnType.Date>) => {
  if (props) return;
  return <></>;
};

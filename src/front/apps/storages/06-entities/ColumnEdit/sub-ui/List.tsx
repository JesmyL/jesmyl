import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeList = (props: StoragesColumnEditTypeProps<StoragesColumnType.List>) => {
  if (props) return;
  return <></>;
};

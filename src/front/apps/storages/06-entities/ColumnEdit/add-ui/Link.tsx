import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeLink = (props: StoragesColumnEditTypeProps<StoragesColumnType.Link>) => {
  if (props) return;
  return <></>;
};

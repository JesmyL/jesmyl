import { StoragesColumnEditTypeProps } from '$storages/shared/model/model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeText = (props: StoragesColumnEditTypeProps<StoragesColumnType.Text>) => {
  if (props) return;
  return <></>;
};

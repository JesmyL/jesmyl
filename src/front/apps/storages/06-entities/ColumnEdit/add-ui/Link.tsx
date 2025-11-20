import { StoragesColumnEditTypeProps } from '$storages/shared/model/model';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

export const StoragesColumnEditOfTypeLink = (props: StoragesColumnEditTypeProps<StoragesColumnType.Link>) => {
  if (props) return;
  return <></>;
};

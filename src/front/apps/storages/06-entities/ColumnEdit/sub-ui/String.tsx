import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnEditTypeProps } from '../model/model';

export const StoragesColumnEditOfTypeString = (props: StoragesColumnEditTypeProps<StoragesColumnType.String>) => {
  if (props) return;
  return <></>;
};

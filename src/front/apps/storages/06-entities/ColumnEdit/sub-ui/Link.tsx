import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnEditTypeProps } from '../model/model';

export const StoragesColumnEditOfTypeLink = (props: StoragesColumnEditTypeProps<StoragesColumnType.Link>) => {
  if (props) return;
  return <></>;
};

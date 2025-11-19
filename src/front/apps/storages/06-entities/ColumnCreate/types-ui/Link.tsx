import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnCreateTypeProps } from '../model/model';

export const StoragesColumnCreateOfTypeLink = (props: StoragesColumnCreateTypeProps<StoragesColumnType.Link>) => {
  if (props) return;
  return <></>;
};

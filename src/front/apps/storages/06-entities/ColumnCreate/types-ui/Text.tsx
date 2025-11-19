import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnCreateTypeProps } from '../model/model';

export const StoragesColumnCreateOfTypeText = (props: StoragesColumnCreateTypeProps<StoragesColumnType.Text>) => {
  if (props) return;
  return <></>;
};

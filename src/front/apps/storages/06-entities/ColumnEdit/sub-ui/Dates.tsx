import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnEditTypeProps } from '../model/model';

export const StoragesColumnEditOfTypeDates = (props: StoragesColumnEditTypeProps<StoragesColumnType.Dates>) => {
  return (
    <div>
      <div className="flex gap-2">{props.column.title}</div>
    </div>
  );
};

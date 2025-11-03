import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnEditTypeProps } from '../model/model';

export const StoragesColumnEditOfTypeDate = (props: StoragesColumnEditTypeProps<StoragesColumnType.Date>) => {
  return (
    <>
      <div>
        <div>{props.column.title}</div>
      </div>
    </>
  );
};

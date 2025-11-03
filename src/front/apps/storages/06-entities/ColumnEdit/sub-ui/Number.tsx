import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesColumnEditTypeProps } from '../model/model';

const metrics = ['₽', '$', '€', '£', 'шт', 'м', 'мин'];

export const StoragesColumnEditOfTypeNumber = (props: StoragesColumnEditTypeProps<StoragesColumnType.Number>) => {
  return (
    <div className="flex gap-3">
      Единица измерения:
      <Dropdown
        id={props.column.mt}
        items={metrics.map(id => ({ id, title: id }))}
        onSelectId={id =>
          storagesTsjrpcClient.editColumnFields({ coli: props.coli, data: { mt: id }, rackw: props.rack.w })
        }
      />
    </div>
  );
};

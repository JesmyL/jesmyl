import { Dropdown } from '#shared/ui/dropdown/Dropdown';
import { StoragesColumnEditTypeProps } from '$storages/shared/model/col-edit';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';

const metrics = ['₽', '$', '€', '£', 'шт', 'м', 'мин'];

export const StoragesNumberColumnMetricSelector = (props: StoragesColumnEditTypeProps<StoragesColumnType.Number>) => {
  return (
    <Dropdown
      id={props.column.mt}
      nullTitle="-"
      hiddenArrow
      items={metrics.map(id => ({ id, title: id }))}
      onSelectId={id =>
        storagesTsjrpcClient.editColumnFields({
          coli: props.coli,
          data: { [StoragesColumnType.Number]: { mt: id } },
          rackw: props.rack.w,
          ...props.nestedSelectors,
        })
      }
    />
  );
};

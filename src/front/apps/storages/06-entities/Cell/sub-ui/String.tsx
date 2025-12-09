import { Autocomplete } from '#shared/components/Autocomplete';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeString = (props: StoragesCellTypeProps<StoragesColumnType.String>) => {
  const isEdit = useStoragesIsEditInnersContext();
  const dict = props.rack.dicts[props.column.di ?? 0];
  const value = props.cell && dict.li[props.cell.val];

  if (!isEdit)
    return (
      !value || (
        <div className="flex gap-2">
          <span>{props.column.title}</span>
          <span className="font-bold">{value}</span>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.columnTitleNode(<> ({props.rack.dicts[props.column.di ?? 0].title})</>)}
        <Autocomplete
          selected={props.cell?.val}
          items={dict.li.map(value => ({ value, title: value }))}
          onNewItem={async value => {
            await storagesTsjrpcClient.editCellValue({
              ...props.nestedSelectors,
              cardi: props.card.i,
              coli: props.coli,
              rackw: props.rack.w,
              value,
            });
          }}
          onSelect={(_index, value) =>
            storagesTsjrpcClient.editCellValue({
              ...props.nestedSelectors,
              cardi: props.card.i,
              coli: props.coli,
              rackw: props.rack.w,
              value,
            })
          }
        />
      </div>
    </>
  );
};

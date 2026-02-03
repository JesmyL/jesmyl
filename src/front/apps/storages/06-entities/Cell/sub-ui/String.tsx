import { Autocomplete } from '#shared/components/Autocomplete';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeString = (props: StoragesCellTypeProps<StoragesColumnType.String>) => {
  const isEdit = useStoragesIsEditInnersContext();
  const dict = props.rack.dicts[props.column.di ?? 0];

  if (!isEdit) {
    const title = props.cell && dict.li[props.cell[1]];

    return (
      !title || (
        <div className="flex gap-2">
          <span>{props.column.title}</span>
          <span className="font-bold">{title}</span>
        </div>
      )
    );
  }

  const onEdit = (value: string) =>
    storagesTsjrpcClient.editCellValue({
      ...props.nestedSelectors,
      cardi: props.card.i,
      coli: props.coli,
      rackw: props.rack.w,
      value,
    });
  const selectedValue = props.cell?.[1];

  return (
    <>
      <div>
        {props.columnTitleNode(<> ({props.rack.dicts[props.column.di ?? 0].title})</>)}
        <Autocomplete
          selected={selectedValue}
          items={dict.li.map(value => ({ value, title: value }))}
          onNewItem={onEdit}
          onSelect={(_index, value) => onEdit(value)}
          onClear={selectedValue ? () => onEdit('') : undefined}
        />
      </div>
    </>
  );
};

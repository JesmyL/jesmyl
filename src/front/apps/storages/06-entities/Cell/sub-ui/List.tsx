import { Autocomplete } from '#shared/components/Autocomplete';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeList = (props: StoragesCellTypeProps<StoragesColumnType.List>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit && !props.cell?.[1].length) return;
  const dict = props.rack.dicts[props.column.di ?? 0];

  return (
    <>
      {props.columnTitleNode(<> ({dict.title})</>)}
      <div className={isEdit ? undefined : 'font-bold'}>
        {isEdit && <LazyIcon icon={props.icon} />}
        <Autocomplete
          isShowSelectedNodeOnly={!isEdit}
          selected={props.cell?.[1]}
          items={dict.li.map(value => ({ value, title: value }))}
          onNewItem={async title => {
            await storagesTsjrpcClient.toggleListCellValue({
              ...props.nestedSelectors,
              cardi: props.card.i,
              coli: props.coli,
              rackw: props.rack.w,
              title,
            });
          }}
          onSelect={(_index, title) =>
            storagesTsjrpcClient.toggleListCellValue({
              ...props.nestedSelectors,
              cardi: props.card.i,
              coli: props.coli,
              rackw: props.rack.w,
              title,
            })
          }
        />
      </div>
    </>
  );
};

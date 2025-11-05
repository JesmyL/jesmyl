import { Autocomplete } from '#shared/components/Autocomplete';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeList = (props: StoragesCellTypeProps<StoragesColumnType.List>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit && !props.cell?.val.length) return;

  return (
    <>
      <div>
        {props.columnTitleNode}
        <div className={isEdit ? undefined : 'font-bold'}>
          <Autocomplete
            isShowSelectedNodeOnly={!isEdit}
            selected={props.cell?.val}
            items={props.rack.values.map(value => ({ id: value, title: value }))}
            onNewItem={async title => {
              await storagesTsjrpcClient.addRackValue({ rackw: props.rack.w, title });
              await storagesTsjrpcClient.toggleListCellValue({
                ...props.nestedSelectors,
                cardMi: props.card.mi,
                coli: props.coli,
                rackw: props.rack.w,
                title,
              });
            }}
            onSelect={({ id }) =>
              storagesTsjrpcClient.toggleListCellValue({
                ...props.nestedSelectors,
                cardMi: props.card.mi,
                coli: props.coli,
                rackw: props.rack.w,
                title: id,
              })
            }
          />
        </div>
      </div>
    </>
  );
};

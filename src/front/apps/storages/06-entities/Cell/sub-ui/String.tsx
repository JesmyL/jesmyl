import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeString = (props: StoragesCellTypeProps<StoragesColumnType.String>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit)
    return (
      !props.cell?.val || (
        <div className='flex gap-2'>
          <span>{props.column.title}</span>
          <span className="font-bold">{props.cell?.val}</span>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.columnTitleNode}
        <InputWithLoadingIcon
          icon={props.icon}
          defaultValue={props.cell?.val}
          strongDefaultValue
          onChanged={value =>
            storagesTsjrpcClient.editCellValue({
              value,
              cardMi: props.card.mi,
              rackw: props.rack.w,
              coli: props.coli,
              ...props.nestedSelectors,
            })
          }
        />
      </div>
    </>
  );
};

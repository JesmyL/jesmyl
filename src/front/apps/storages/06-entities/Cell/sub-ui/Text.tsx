import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeText = (props: StoragesCellTypeProps<StoragesColumnType.Text>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit)
    return (
      !props.cell?.val || (
        <div>
          <span>{props.columnTitleNode()}</span>
          <span className="text-x3 pre-text"> {props.cell.val}</span>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.columnTitleNode()}

        <InputWithLoadingIcon
          icon={props.icon}
          multiline
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

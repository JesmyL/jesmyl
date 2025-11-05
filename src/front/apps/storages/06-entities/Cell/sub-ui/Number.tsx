import { TextInput } from '#shared/ui/TextInput';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeNumber = (props: StoragesCellTypeProps<StoragesColumnType.Number>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit)
    return (
      !props.cell?.val || (
        <div>
          <span>{props.column.title} </span>
          <span className="font-bold"> {props.cell?.val} </span>
          <span> {props.column.mt}</span>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.columnTitleNode}

        <TextInput
          type="number"
          defaultValue={props.cell?.val}
          strongDefaultValue
          onChanged={amount =>
            storagesTsjrpcClient.setNumber({
              amount: Math.abs(+amount),
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

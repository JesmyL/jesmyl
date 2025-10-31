import { TextInput } from '#shared/ui/TextInput';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypePrice = (props: StoragesCellTypeProps<StoragesColumnType.Price>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit)
    return (
      !props.cell?.val.am || (
        <div className="flex gap-2">
          <span>{props.column.title}</span>
          <span className="font-bold">{props.cell?.val.am}</span>
          <span>₽</span>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.column.title}

        <TextInput
          type="number"
          defaultValue={props.cell?.val.am}
          strongDefaultValue
          onChanged={amount =>
            storagesTsjrpcClient.setPrice({
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

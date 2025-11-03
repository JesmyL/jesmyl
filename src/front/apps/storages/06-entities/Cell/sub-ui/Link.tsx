import { TextInput } from '#shared/ui/TextInput';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeLink = (props: StoragesCellTypeProps<StoragesColumnType.Link>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit)
    return (
      !props.cell?.val || (
        <div>
          <span>{props.column.title} </span>
          <a
            href={props.cell.val}
            className="font-bold italic text-x7/80! underline!"
          >
            {` ${props.cell.val} `}
          </a>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.column.title}

        <TextInput
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

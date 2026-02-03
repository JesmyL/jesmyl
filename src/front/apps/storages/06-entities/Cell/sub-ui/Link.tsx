import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeLink = (props: StoragesCellTypeProps<StoragesColumnType.Link>) => {
  const isEdit = useStoragesIsEditInnersContext();
  const value = props.cell?.[1];

  if (!isEdit)
    return (
      !value || (
        <div>
          <span>{props.column.title} </span>
          <a
            href={value}
            className="font-bold italic text-x7/80! underline!"
          >
            {` ${value} `}
          </a>
        </div>
      )
    );

  return (
    <>
      <div>
        {props.columnTitleNode()}

        <InputWithLoadingIcon
          icon={props.icon}
          defaultValue={value}
          strongDefaultValue
          onChanged={value =>
            storagesTsjrpcClient.editCellValue({
              value,
              cardi: props.card.i,
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

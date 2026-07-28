import { DatePicker } from '#shared/components/DatePicker';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { checkIsNaN } from 'shared/utils/checkIs';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeDate = (props: StoragesCellTypeProps<StoragesColumnType.Date>) => {
  const date = new Date(props.cell?.[1] ?? NaN);
  const isEdit = useStoragesIsEditInnersContext();

  if (checkIsNaN(date.getTime())) return;

  return (
    <>
      <div>
        {props.columnTitleNode()}
        {isEdit ? (
          <DatePicker
            initValue={props.cell?.[1]}
            onSelect={async date => {
              storagesTsjrpcClient.editCellValue({
                ...props.nestedSelectors,
                cardi: props.card.i,
                rackw: props.rack.w,
                coli: props.coli,
                value: checkIsNaN(date?.getTime()) ? undefined : date?.getTime(),
              });
            }}
          />
        ) : (
          <div className="flex gap-3">
            <span className="font-bold">{makeDateLabel(date)}</span>
          </div>
        )}
      </div>
    </>
  );
};

import { DatePicker } from '#shared/components/DatePicker';
import { mylib } from '#shared/lib/my-lib';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesColumnType } from 'shared/model/storages/rack.model';
import { StoragesCellTypeProps } from '../model/model';

export const StoragesCellOfTypeDate = (props: StoragesCellTypeProps<StoragesColumnType.Date>) => {
  const date = new Date(props.cell?.val ?? NaN);
  const isEdit = useStoragesIsEditInnersContext();

  if (mylib.isNaN(date.getTime())) return;

  return (
    <>
      <div>
        {props.columnTitleNode()}
        {isEdit ? (
          <DatePicker
            initValue={props.cell?.val}
            onSelect={async date => {
              storagesTsjrpcClient.editCellValue({
                ...props.nestedSelectors,
                cardi: props.card.i,
                rackw: props.rack.w,
                coli: props.coli,
                value: mylib.isNaN(date?.getTime()) ? undefined : date?.getTime(),
              });
            }}
          />
        ) : mylib.isNaN(date.getTime()) ? (
          ''
        ) : (
          <div className="flex gap-3">
            <span className="font-bold">
              {date.toLocaleDateString('ru', { month: 'long', day: 'numeric', year: '2-digit' })}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

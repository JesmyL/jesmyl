import { DatePicker } from '#shared/components/DatePicker';
import { mylib } from '#shared/lib/my-lib';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesFieldType } from 'shared/model/storages/rack.model';
import { StoragesRackCardFieldTypeProps } from '../model/model';

export const StoragesRackCardFieldOfTypeDate = (props: StoragesRackCardFieldTypeProps<StoragesFieldType.Date>) => {
  const date = new Date(props.cardField?.val ?? NaN);
  const isEdit = useStoragesIsEditInnersContext();

  if (mylib.isNaN(date.getTime())) return;

  return (
    <>
      <div>
        <div>{props.rackField.title}</div>
        {isEdit ? (
          <DatePicker
            initValue={props.cardField?.val}
            onSelect={async date => {
              storagesTsjrpcClient.editRackCardFieldValue({
                ...props.nestedSelectors,
                cardMi: props.card.mi,
                rackw: props.rack.w,
                fieldi: props.fieldi,
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

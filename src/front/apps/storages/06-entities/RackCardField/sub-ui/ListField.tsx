import { Autocomplete } from '#shared/components/Autocomplete';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesFieldType } from 'shared/model/storages/rack.model';
import { StoragesRackCardFieldTypeProps } from '../model/model';

export const StoragesRackCardFieldOfTypeList = (props: StoragesRackCardFieldTypeProps<StoragesFieldType.List>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit && !props.cardField?.val.length) return;

  return (
    <>
      <div>
        {props.rackField.title}
        <div className={isEdit ? undefined : 'font-bold'}>
          <Autocomplete
            isShowSelectedNodeOnly={!isEdit}
            selected={props.cardField?.val}
            items={props.rack.values.map(value => ({ id: value, title: value }))}
            onNewItem={async title => {
              await storagesTsjrpcClient.addRackValue({ rackw: props.rack.w, title });
              await storagesTsjrpcClient.toggleRackCardListFieldValue({
                ...props.nestedSelectors,
                cardMi: props.card.mi,
                fieldi: props.fieldi,
                rackw: props.rack.w,
                title,
              });
            }}
            onSelect={({ id }) =>
              storagesTsjrpcClient.toggleRackCardListFieldValue({
                ...props.nestedSelectors,
                cardMi: props.card.mi,
                fieldi: props.fieldi,
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

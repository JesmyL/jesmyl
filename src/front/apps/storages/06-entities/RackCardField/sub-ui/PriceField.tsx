import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { StoragesFieldType } from 'shared/model/storages/rack.model';
import { StoragesRackCardFieldTypeProps } from '../model/model';

export const StoragesRackCardFieldOfTypePrice = (props: StoragesRackCardFieldTypeProps<StoragesFieldType.Price>) => {
  const isEdit = useStoragesIsEditInnersContext();

  if (!isEdit && !props.cardField?.val) return;

  return (
    <>
      <div>{props.rackField.title}</div>
    </>
  );
};

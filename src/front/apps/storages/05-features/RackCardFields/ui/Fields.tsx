import { StoragesRackAddField } from '$storages/entities/RackAddField';
import { TheStoragesRackCardField } from '$storages/entities/RackCardField';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';

type Props = {
  rack: StoragesRack;
  card: StoragesRackCard;
};

const isOpenModalAtom = atom(false);

export const StoragesRackCardFields = ({ rack, card }: Props) => {
  const isEdit = useStoragesIsEditInnersContext();

  return (
    <>
      {rack.fields.map((_, fieldi) => {
        return (
          <TheStoragesRackCardField
            key={fieldi}
            rack={rack}
            card={card}
            fieldi={fieldi}
          />
        );
      })}

      {isEdit && (
        <StoragesRackAddField
          isOpenModalAtom={isOpenModalAtom}
          onAdd={(newFieldType, title) =>
            storagesTsjrpcClient.createRackDefinitionField({ rackw: rack.w, title, newFieldType })
          }
        />
      )}
    </>
  );
};

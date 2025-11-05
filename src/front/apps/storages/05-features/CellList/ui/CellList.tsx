import { StoragesAddColumn } from '$storages/entities/AddColumn';
import { TheStoragesCell } from '$storages/entities/Cell';
import { useStoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { atom } from 'atomaric';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';

type Props = {
  rack: StoragesRack;
  card: StoragesRackCard;
};

const isOpenModalAtom = atom(false);

export const StoragesCellList = ({ rack, card }: Props) => {
  const isEdit = useStoragesIsEditInnersContext();

  return (
    <div
      className="*:my-4"
      storages-cell-list=""
    >
      {(rack.colsOrd ?? rack.cols.map((_, i) => i)).map(coli => {
        return (
          <TheStoragesCell
            key={coli}
            rack={rack}
            card={card}
            coli={coli}
          />
        );
      })}

      {isEdit && (
        <StoragesAddColumn
          isOpenModalAtom={isOpenModalAtom}
          onAdd={(newColumnType, title) => storagesTsjrpcClient.createColumn({ rackw: rack.w, title, newColumnType })}
        />
      )}
    </div>
  );
};

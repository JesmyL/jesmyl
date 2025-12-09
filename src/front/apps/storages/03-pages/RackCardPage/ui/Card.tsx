import { InputWithLoadingIcon } from '#basis/ui/InputWithLoadingIcon';
import { Button } from '#shared/components/ui/button';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesCellList } from '$storages/features/CellList';
import { StoragesRackCardMetaInfoReader } from '$storages/features/RackCardMetaInfoReader';
import { StoragesRackCardSearch } from '$storages/features/RackCardSearch';
import { StoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { StoragesRack, StoragesRackCard, StoragesRackWid } from 'shared/model/storages/list.model';

export const StoragesRackCardPage = ({ cardi, rackw }: { cardi: number; rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);
  const card = rack?.cards[rack.cards.length - 1 - cardi];

  if (rack == null || card == null || card.i !== cardi) return;

  return (
    <Card
      card={card}
      rack={rack}
    />
  );
};

const Card = ({ card, rack }: { rack: StoragesRack; card: StoragesRackCard }) => {
  const [isEdit, setIsEditMode] = useState(!card.title);

  return (
    <PageContainerConfigurer
      className=""
      headTitle={
        <div className="max-w-[calc(100vw-198px)]">
          <span className="ellipsis">{card.title || 'Новая карточка'}</span>
        </div>
      }
      head={
        <div className="flex justify-between gap-3">
          <StoragesRackCardSearch rack={rack} />
          <StoragesRackStatusFace
            rack={rack}
            card={card}
            statusi={card.status}
            customTitile
          />

          <Button
            icon={isEdit ? 'CheckmarkCircle01' : 'Edit02'}
            onClick={() => setIsEditMode(is => !is)}
          />
        </div>
      }
      content={
        <div className="*:my-4 *:block">
          {isEdit ? (
            <>
              <InputWithLoadingIcon
                icon="BorderFull"
                label="Название"
                defaultValue={card.title}
                strongDefaultValue
                onChanged={title => storagesTsjrpcClient.editRackCardTitle({ rackw: rack.w, title, cardi: card.i })}
              />
            </>
          ) : (
            <span className="text-x7">{card.title}</span>
          )}

          {isEdit ? (
            <InputWithLoadingIcon
              icon="TextAlignLeft"
              label="Заметки"
              defaultValue={card.note}
              multiline
              strongDefaultValue
              onChanged={note => storagesTsjrpcClient.editRackCardNote({ rackw: rack.w, note, cardi: card.i })}
            />
          ) : (
            card.note && <div className="bg-x2 p-3 pre-text">{card.note}</div>
          )}

          {isEdit || card.meta ? (
            <StoragesRackCardMetaInfoReader
              card={card}
              rack={rack}
              isEdit={isEdit}
            />
          ) : null}

          <StoragesIsEditInnersContext value={isEdit}>
            <StoragesCellList
              rack={rack}
              card={card}
            />
          </StoragesIsEditInnersContext>
        </div>
      }
    />
  );
};

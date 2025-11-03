import { Button } from '#shared/components/ui/button';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { TextInput } from '#shared/ui/TextInput';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesCellList } from '$storages/features/CellList';
import { StoragesRackCardMetaInfoReader } from '$storages/features/RackCardMetaInfoReader';
import { StoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesIDB } from '$storages/shared/state/storagesIDB';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useLiveQuery } from 'dexie-react-hooks';
import { useState } from 'react';
import { StoragesRack, StoragesRackCard, StoragesRackCardMi, StoragesRackWid } from 'shared/model/storages/list.model';

export const StoragesRackCardPage = ({ cardMi, rackw }: { cardMi: StoragesRackCardMi; rackw: StoragesRackWid }) => {
  const rack = useLiveQuery(() => storagesIDB.tb.racks.get(rackw), [rackw]);
  const card = rack?.cards.find(card => card.mi === cardMi);
  if (rack == null || card == null) return;

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
      headTitle={card.title || 'Новая карточка'}
      head={
        <div className="flex justify-between gap-3">
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
          {isEdit && (
            <>
              <TextInput
                label="Название"
                defaultValue={card.title}
                strongDefaultValue
                onChanged={title => storagesTsjrpcClient.editRackCardTitle({ rackw: rack.w, title, cardMi: card.mi })}
              />
            </>
          )}

          {isEdit ? (
            <TextInput
              label="Заметки"
              defaultValue={card.note}
              multiline
              strongDefaultValue
              onChanged={note => storagesTsjrpcClient.editRackCardNote({ rackw: rack.w, note, cardMi: card.mi })}
            />
          ) : (
            <div className="whitespace-pre-line">{card.note}</div>
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

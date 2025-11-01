import { Button } from '#shared/components/ui/button';
import { ModalBody, ModalHeader } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesCellList } from '$storages/features/CellList';
import { StoragesRackCardMetaInfoReader } from '$storages/features/RackCardMetaInfoReader';
import { StoragesIsEditInnersContext } from '$storages/shared/state/IsEditContext';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { useState } from 'react';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';

export const StoragesRackCardModalInner = ({ card, rack }: { card: StoragesRackCard; rack: StoragesRack }) => {
  const [isEdit, setIsEditMode] = useState(false);

  return (
    <>
      <ModalHeader className="flex justify-between gap-3">
        <StoragesRackStatusFace
          rack={rack}
          card={card}
          statusi={card.status}
          customTitile
        />
        {card.title || 'Новая карточка'}
        <Button
          icon={isEdit ? 'CheckmarkCircle01' : 'Edit02'}
          onClick={() => setIsEditMode(is => !is)}
        />
      </ModalHeader>
      <ModalBody className="*:my-4 *:block">
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
          <pre>{card.note}</pre>
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
      </ModalBody>
    </>
  );
};

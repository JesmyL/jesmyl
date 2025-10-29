import { Button } from '#shared/components/ui/button';
import { Modal, ModalBody, ModalHeader } from '#shared/ui/modal';
import { TextInput } from '#shared/ui/TextInput';
import { StoragesRackStatusFace } from '$storages/entities/RackStatusFace';
import { StoragesRackAddField } from '$storages/features/RackAddField';
import { StoragesRackCardMetaInfoReader } from '$storages/features/RackCardMetaInfoReader';
import {
  StoragesRackCardStatusSelector,
  storagesRackCardStatusSelectorRackEditStatusiAtom,
} from '$storages/features/RackCardStatusSelector';
import { storagesTsjrpcClient } from '$storages/shared/tsjrpc/basic.tsjrpc.methods';
import { StoragesRackStatusEditModalInner } from '$storages/widgets/RackStatusEditModalInner';
import { useState } from 'react';
import { StoragesRack, StoragesRackCard } from 'shared/model/storages/list.model';

export const StoragesRackCardEditModalInner = ({ card, rack }: { card: StoragesRackCard; rack: StoragesRack }) => {
  const [isEdit, setIsEditMode] = useState(false);

  return (
    <>
      <ModalHeader className="flex justify-between">
        <StoragesRackStatusFace
          rackStatus={rack.statuses[card.status ?? 0]}
          customTitile={card.title}
        />
        <Button
          icon={isEdit ? 'CheckmarkCircle01' : 'Edit02'}
          onClick={() => setIsEditMode(is => !is)}
        />
      </ModalHeader>
      <ModalBody className="*:my-4 *:block">
        {isEdit && (
          <>
            <StoragesRackCardStatusSelector
              card={card}
              rack={rack}
            />

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

        <StoragesRackCardMetaInfoReader
          card={card}
          rack={rack}
          isEdit={isEdit}
        />

        {isEdit && <StoragesRackAddField rack={rack} />}
      </ModalBody>

      <Modal openAtom={storagesRackCardStatusSelectorRackEditStatusiAtom}>
        {statusi => (
          <StoragesRackStatusEditModalInner
            rack={rack}
            statusi={statusi}
          />
        )}
      </Modal>
    </>
  );
};

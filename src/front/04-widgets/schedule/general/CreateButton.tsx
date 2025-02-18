import { schGeneralSokiInvocatorClient } from '#basis/lib/invocators/schedules/invocators.methods';
import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import KeyboardInput from 'front/08-shared/ui/keyboard/KeyboardInput';
import SendButton from 'front/08-shared/ui/sends/send-button/SendButton';
import TheIconSendButton from 'front/08-shared/ui/sends/the-icon-send-button/TheIconSendButton';
import IconButton from 'front/08-shared/ui/the-icon/IconButton';
import { useState } from 'react';

export default function ScheduleCreateWidgetButton() {
  const [title, setTitle] = useState('');
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <SendButton
        title="Создать расписание"
        onSend={() => {
          setTitle('');
          setIsOpenModal(true);
        }}
      />

      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <ModalHeader>Новое расписание</ModalHeader>
          <ModalBody>
            <div>Создать расписание с названием</div>
            <div>
              <KeyboardInput
                value={title}
                onChange={setTitle}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className="flex flex-gap">
              <TheIconSendButton
                icon="PlusSign"
                className="color--ok"
                postfix="Создать"
                disabled={!title}
                onSuccess={() => {
                  setTitle('');
                  setIsOpenModal(false);
                }}
                onSend={() => {
                  if (!title) {
                    return;
                  }

                  return schGeneralSokiInvocatorClient.create(null, title);
                }}
              />
              <IconButton
                icon="Cancel01"
                postfix="Отменить"
                className="color--ko"
                onClick={() => {
                  setTitle('');
                  setIsOpenModal(false);
                }}
              />
            </div>
          </ModalFooter>
        </Modal>
      )}
    </>
  );
}

import KeyboardInput from '#shared/ui/keyboard/KeyboardInput';
import SendButton from '#shared/ui/sends/send-button/SendButton';
import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import IconButton from '#shared/ui/the-icon/IconButton';
import Modal from '#widgets/modal/Modal/Modal';
import { ModalBody } from '#widgets/modal/Modal/ModalBody';
import { ModalFooter } from '#widgets/modal/Modal/ModalFooter';
import { ModalHeader } from '#widgets/modal/Modal/ModalHeader';
import { useState } from 'react';
import { schGeneralSokiInvocatorClient } from '../invocators/invocators.methods';

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

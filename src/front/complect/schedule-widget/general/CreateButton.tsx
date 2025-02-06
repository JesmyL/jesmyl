import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalFooter } from 'front/complect/modal/Modal/ModalFooter';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import SendButton from 'front/complect/sends/send-button/SendButton';
import { useState } from 'react';
import { IconCancel01StrokeRounded } from '../../../complect/the-icon/icons/cancel-01';
import { IconPlusSignStrokeRounded } from '../../../complect/the-icon/icons/plus-sign';
import KeyboardInput from '../../keyboard/KeyboardInput';
import IconButton from '../../the-icon/IconButton';
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
              <EvaSendButton
                Icon={IconPlusSignStrokeRounded}
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
                Icon={IconCancel01StrokeRounded}
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

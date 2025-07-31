import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { ModalBody } from '#shared/ui/modal/Modal/ModalBody';
import { ModalFooter } from '#shared/ui/modal/Modal/ModalFooter';
import { ModalHeader } from '#shared/ui/modal/Modal/ModalHeader';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom } from 'atomaric';
import { useState } from 'react';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';

const isModalOpenAtom = atom(false);

export function ScheduleCreateWidgetButton() {
  const [title, setTitle] = useState('');

  return (
    <>
      <SendButton
        title="Создать расписание"
        onSend={() => {
          setTitle('');
          isModalOpenAtom.set(true);
        }}
      />

      <Modal openAtom={isModalOpenAtom}>
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
                isModalOpenAtom.set(false);
              }}
              onSend={() => {
                if (!title) {
                  return;
                }

                return schGeneralTsjrpcClient.create({ title });
              }}
            />
            <TheIconButton
              icon="Cancel01"
              postfix="Отменить"
              className="color--ko"
              onClick={() => {
                setTitle('');
                isModalOpenAtom.set(false);
              }}
            />
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
}

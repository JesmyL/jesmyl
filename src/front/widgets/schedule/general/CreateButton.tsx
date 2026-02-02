import { Modal, ModalBody, ModalFooter, ModalHeader } from '#shared/ui/modal';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TextInput } from '#shared/ui/TextInput';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { Atom, atom } from 'atomaric';
import { useState } from 'react';
import { schGeneralTsjrpcClient } from '../tsjrpc/tsjrpc.methods';

let isModalOpenAtom: Atom<boolean>;

export const ScheduleCreateWidgetButton = () => {
  isModalOpenAtom ??= atom(false);

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
            <TextInput
              value={title}
              onInput={setTitle}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex gap-2">
            <TheIconSendButton
              icon="PlusSign"
              className="text-xOK"
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
              className="text-xKO"
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
};

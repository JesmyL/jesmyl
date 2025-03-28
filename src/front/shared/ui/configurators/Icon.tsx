import { MyLib } from '#shared/lib/my-lib';
import { ReactNode, useState } from 'react';
import { Modal } from '../modal/Modal/Modal';
import { ModalBody } from '../modal/Modal/ModalBody';
import { ModalHeader } from '../modal/Modal/ModalHeader';
import { TheIconSendButton } from '../sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '../the-icon/TheIconButton';
import { theIconKnownPack } from '../the-icon/pack';

export default function IconConfigurator(props: {
  icon: TheIconKnownName;
  header: ReactNode;
  used?: (TheIconKnownName | und)[];
  onSend: (icon: TheIconKnownName) => Promise<unknown>;
}) {
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      <TheIconButton
        icon={props.icon ?? 'HelpSquare'}
        postfix="Изменить иконку"
        onClick={setIsOpenModal}
        className="flex-max margin-gap-v"
      />
      {isOpenModal && (
        <Modal onClose={setIsOpenModal}>
          <ModalHeader>{props.header}</ModalHeader>
          <ModalBody>
            {MyLib.keys(theIconKnownPack).map(icon => {
              return (
                <TheIconSendButton
                  key={icon}
                  icon={icon}
                  className={'padding-big-gap' + (props.used?.includes(icon) ? ' fade-05' : '')}
                  onSuccess={() => setIsOpenModal(false)}
                  onSend={() => props.onSend(icon)}
                />
              );
            })}
          </ModalBody>
        </Modal>
      )}
    </>
  );
}

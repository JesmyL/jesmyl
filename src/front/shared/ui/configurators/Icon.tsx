import { MyLib } from '#shared/lib/my-lib';
import { ReactNode, useState } from 'react';
import { IconButton } from '../icon';
import { theIconKnownPack } from '../icon/pack';
import { Modal, ModalBody, ModalHeader } from '../modal';
import { TheIconSendButton } from '../sendable/TheIconSendButton';

export default function IconConfigurator(props: {
  icon: TheIconKnownName;
  header: ReactNode;
  used?: (TheIconKnownName | und)[];
  onSend: (icon: TheIconKnownName) => Promise<unknown>;
}) {
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      <IconButton
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
                  className={'padding-big-gap' + (false ? ' color--7' : props.used?.includes(icon) ? ' fade-05' : '')}
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

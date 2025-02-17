import TheIconSendButton from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import IconButton from '#shared/ui/the-icon/IconButton';
import { theIconKnownPack } from '#shared/ui/the-icon/pack';
import Modal from '#widgets/modal/Modal/Modal';
import { ModalBody } from '#widgets/modal/Modal/ModalBody';
import { ModalHeader } from '#widgets/modal/Modal/ModalHeader';
import { MyLib } from 'front/utils';
import { ReactNode, useState } from 'react';

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

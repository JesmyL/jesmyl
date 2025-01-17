import Modal from 'front/complect/modal/Modal/Modal';
import { ModalBody } from 'front/complect/modal/Modal/ModalBody';
import { ModalHeader } from 'front/complect/modal/Modal/ModalHeader';
import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { theIconKnownPack } from 'front/complect/the-icon/pack';
import { MyLib } from 'front/utils';
import { ReactNode, useState } from 'react';
import { IconHelpSquareStrokeRounded } from '../../../complect/the-icon/icons/help-square';
import IconButton from '../../the-icon/IconButton';
import { theIconFromPack } from '../../the-icon/TheIcon';

// const icons = evaPackNames.filter(name => name.endsWith('-outline'));

export default function ScheduleWidgetIconChange(props: {
  icon: KnownIconName;
  header: ReactNode;
  used?: (KnownIconName | und)[];
  onSend: (icon: KnownIconName) => Promise<unknown>;
}) {
  const [isOpenModal, setIsOpenModal] = useState<unknown>(false);

  return (
    <>
      <IconButton
        Icon={theIconFromPack(props.icon)?.StrokeRounded ?? IconHelpSquareStrokeRounded}
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
                <EvaSendButton
                  key={icon}
                  Icon={theIconKnownPack[icon].StrokeRounded}
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

import { MyLib } from '#shared/lib/my-lib';
import { atom } from 'atomaric';
import { ReactNode } from 'react';
import { Modal } from '../modal/Modal/Modal';
import { ModalBody } from '../modal/Modal/ModalBody';
import { ModalHeader } from '../modal/Modal/ModalHeader';
import { TheIconSendButton } from '../sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '../the-icon/TheIconButton';
import { theIconKnownPack } from '../the-icon/pack';

const isOpenModalAtom = atom(false);

export default function IconConfigurator(props: {
  icon: TheIconKnownName;
  header: ReactNode;
  used?: (TheIconKnownName | und)[];
  onSend: (icon: TheIconKnownName) => Promise<unknown>;
}) {
  return (
    <>
      <TheIconButton
        icon={props.icon ?? 'HelpSquare'}
        postfix="Изменить иконку"
        onClick={isOpenModalAtom.toggle}
        className="flex-max margin-gap-v"
      />

      <Modal openAtom={isOpenModalAtom}>
        <ModalHeader>{props.header}</ModalHeader>
        <ModalBody>
          {MyLib.keys(theIconKnownPack).map(icon => {
            return (
              <TheIconSendButton
                key={icon}
                icon={icon}
                className={'padding-big-gap' + (props.used?.includes(icon) ? ' fade-05' : '')}
                onSuccess={() => isOpenModalAtom.set(false)}
                onSend={() => props.onSend(icon)}
              />
            );
          })}
        </ModalBody>
      </Modal>
    </>
  );
}

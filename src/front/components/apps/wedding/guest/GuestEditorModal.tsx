import { mylib } from 'front/utils';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  WedGuest,
  WedGuestConversation,
  WedGuestSex,
} from '../../../../../shared/api/complect/apps/wed/complect/model';
import CopyTextButton from '../../../../complect/CopyTextButton';
import Dropdown from '../../../../complect/dropdown/Dropdown';
import Modal from '../../../../complect/modal/Modal/Modal';
import { ModalBody } from '../../../../complect/modal/Modal/ModalBody';
import { ModalFooter } from '../../../../complect/modal/Modal/ModalFooter';
import { ModalHeader } from '../../../../complect/modal/Modal/ModalHeader';
import EvaSendButton from '../../../../complect/sends/eva-send-button/EvaSendButton';
import { IconCheckmarkCircle01StrokeRounded } from '../../../../complect/the-icon/icons/checkmark-circle-01';
import { IconUserRemove02StrokeRounded } from '../../../../complect/the-icon/icons/user-remove-02';
import { WedCleans } from '../Cleans';
import { WedGuestPropositionSentButton } from './complect/SentButton';

const sexItems = [
  {
    id: WedGuestSex.Man,
    title: 'Пол: Мужчина',
  },
  {
    id: WedGuestSex.Woman,
    title: 'Пол: Женщина',
  },
];

const conversationItems = [
  {
    id: WedGuestConversation.Join,
    title: 'Обращение на Вы',
  },
  {
    id: WedGuestConversation.Single,
    title: 'Обращение на Ты',
  },
];

interface Props {
  guest: WedGuest;
  setGuest: (guest: WedGuest) => void;
  setIsOpen: (is: boolean) => void;
}

export const WedGuestEditorModal = ({ guest, setIsOpen, setGuest }: Props) => {
  const params = useParams();
  const weddn = params.weddn;
  const [initGuest, setInitGuest] = useState(guest);

  if (!weddn) return null;

  const propositionMessage = WedCleans.makePropositionMessage(guest, weddn);

  return (
    <Modal onClose={setIsOpen}>
      <ModalHeader>Гость</ModalHeader>
      <ModalBody>
        <label className="margin-big-gap-b flex flex-gap">
          <span className="nowrap">Фамилия:</span>
          <NameInput
            value={guest.ln || ''}
            onChange={event => setGuest({ ...guest, ln: event.currentTarget.value as never })}
          />
        </label>
        <label className="margin-big-gap-b flex flex-gap">
          <span className="nowrap">Имя *:</span>
          <NameInput
            value={guest.fn || ''}
            onChange={event => setGuest({ ...guest, fn: event.currentTarget.value as never })}
          />
        </label>
        <label className="margin-big-gap-b flex flex-gap">
          <span className="nowrap">Супруг(а):</span>
          <NameInput
            value={guest.wn || ''}
            onChange={event => setGuest({ ...guest, wn: event.currentTarget.value as never })}
          />
        </label>
        <Dropdown
          id={guest.s}
          items={sexItems}
          onSelectId={s => setGuest({ ...guest, s })}
        />
        <Dropdown
          id={guest.c}
          items={conversationItems}
          onSelectId={c => setGuest({ ...guest, c })}
        />
        {guest.w == null ? (
          <span className="color--3">Присутствие не подтверждено</span>
        ) : guest.w ? (
          <span className="color--ok">Гость будет присутствовать</span>
        ) : (
          <span className="color--ko">Гость не придёт</span>
        )}
        <p>{guest.t}</p>

        <h3>Пригласительная ссылка</h3>
        <WedGuestPropositionSentButton
          guest={guest}
          onSend={g => {
            setInitGuest({ ...guest, g });
            setGuest({ ...guest, g });
          }}
        />
        <CopyTextButton
          text={propositionMessage}
          description={propositionMessage.slice(0, 70) + '...'}
        />
      </ModalBody>
      <ModalFooter>
        <div className="full-width flex between margin-giant-gap-t">
          <EvaSendButton
            Icon={IconUserRemove02StrokeRounded}
            className="color--ko margin-gap-v"
            confirm={
              <>
                Удалить <span className="color--7">{guest.fn}</span> из списка гостей?
              </>
            }
            postfix="Удалить гостя"
            // onSend={() =>
            //   wedExer.send([
            //     {
            //       action: 'removeGuest',
            //       args: { prev: guest, value: guest.mi, guestName: WedCleans.makeGuestFullName(guest) },
            //     },
            //   ])
            // }
            onSuccess={() => setIsOpen(false)}
          />

          <EvaSendButton
            Icon={IconCheckmarkCircle01StrokeRounded}
            className="color--ok"
            postfix="Отправить"
            disabled={!guest.fn || mylib.isEq(initGuest, guest)}
            // onSend={() =>
            //   wedExer.send([
            //     {
            //       action: 'putGuest',
            //       args: {
            //         prev: initGuest,
            //         value: guest,
            //         guestName: WedCleans.makeGuestFullName(guest),
            //       },
            //     },
            //   ])
            // }
            onSuccess={() => setIsOpen(false)}
          />
        </div>
      </ModalFooter>
    </Modal>
  );
};

const NameInput = styled.input`
  background-color: var(--color--3);
  color: var(--color--2);
  width: 100%;
`;

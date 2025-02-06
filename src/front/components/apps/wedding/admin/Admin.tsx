import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { emptyArray } from 'shared/utils';
import styled from 'styled-components';
import {
  FirstName,
  WedGuest,
  WedGuestConversation,
  WedGuestSex,
  WedGuestWillBe,
} from '../../../../../shared/api/complect/apps/wed/complect/model';
import { useInitSoki } from '../../../../app/useInitSoki';
import CopyTextButton from '../../../../complect/CopyTextButton';
import Dropdown from '../../../../complect/dropdown/Dropdown';
import IconButton from '../../../../complect/the-icon/IconButton';
import { IconDownload04StrokeRounded } from '../../../../complect/the-icon/icons/download-04';
import { IconPlusSignCircleStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign-circle';
import { useAuth } from '../../../index/atoms';
import { WedCleans } from '../Cleans';
import { GuestConversation } from '../guest/complect/GuestConversation';
import { WedGuestEditorModal } from '../guest/GuestEditorModal';
import { WedGuestFace } from '../guest/GuestFace';
import { WedGuestListAdder } from '../guest/GuestListAdder';
import { GuestListExcelZipper } from '../guest/GuestListExcelZipper';

const defGuest: WedGuest = { fn: FirstName.def, c: WedGuestConversation.Single, s: WedGuestSex.Man };

enum Show {
  None,
  Comment,
  Conversation,
  Message,
}

const showItems = [
  {
    id: Show.None,
    title: 'Ничего',
  },
  {
    id: Show.Comment,
    title: 'Комменты',
  },
  {
    id: Show.Conversation,
    title: 'Обращения',
  },
  {
    id: Show.Message,
    title: 'Сообщения',
  },
];

export default function WeddingAdmin() {
  useInitSoki('wed');

  const params = useParams();
  const weddn = params.weddn;
  const [guest, setGuest] = useState(defGuest);
  const [isOpenGuestEditor, setIsOpenGuestEditor] = useState(false);
  const [isOpenGuestListLoader, setIsOpenGuestListLoader] = useState(false);
  const [isOpenGuestListExcelZipper, setIsOpenGuestListExcelZipper] = useState(false);
  const [term, setTerm] = useState('');
  const [showMode, setShowMode] = useState(Show.None);
  const auth = useAuth();

  const guestListAtomValue: WedGuest[] = emptyArray;
  // const guestListAtomValue = useAtomValue(wedMolecule.select(s => s.guests));

  const guests = useMemo(() => {
    return guestListAtomValue
      .sort((a, b) => {
        return (
          (a.wn ? (b.wn ? 0 : 1) : -1) ||
          a.c - b.c ||
          a.s - b.s ||
          ((a.ln || '') > (b.ln || '') ? 1 : (a.ln || '') < (b.ln || '') ? -1 : a.fn > b.fn ? 1 : a.fn < b.fn ? -1 : 0)
        );
      })
      .filter(guest => `${guest.ln || ''} ${guest.fn} ${guest.wn || ''}`.toLowerCase().includes(term));
  }, [guestListAtomValue, term]);

  useEffect(() => {
    if (guest.mi == null) return;

    const editedGuest = guests.find(({ mi }) => mi === guest.mi);

    if (editedGuest == null) {
      setIsOpenGuestEditor(false);
      setGuest(defGuest);
      return;
    }

    setGuest(editedGuest);
  }, [guest.mi, guests]);

  if (!weddn || !auth.level) return null;

  const resolvedGuests: WedGuest[] = [];
  const rejectedGuests: WedGuest[] = [];
  const undefinedGuests: WedGuest[] = [];

  let resolvedPeopleCount = 0;
  let rejectedPeopleCount = 0;
  let undefinedPeopleCount = 0;

  for (const guest of guests) {
    const peopleCount = guest.wn ? 2 : 1;

    if (guest.w === WedGuestWillBe.Yes) {
      resolvedPeopleCount += peopleCount;
      resolvedGuests.push(guest);
    } else if (guest.w === WedGuestWillBe.No) {
      rejectedPeopleCount += peopleCount;
      rejectedGuests.push(guest);
    } else {
      undefinedPeopleCount += peopleCount;
      undefinedGuests.push(guest);
    }
  }

  const makeGuest = (guest: WedGuest) => {
    let node = null;

    switch (showMode) {
      case Show.Comment:
        node = <pre>{guest.t}</pre>;
        break;
      case Show.Message: {
        if (guest.g) break;

        const message = WedCleans.makePropositionMessage(guest, weddn);

        node = (
          <div className="border--7">
            <CopyTextButton
              text={message}
              description={<MessageText>{message}</MessageText>}
            />
          </div>
        );
        break;
      }
      case Show.Conversation:
        node = <GuestConversation guest={guest} />;
        break;
    }

    return (
      <div key={guest.mi}>
        <WedGuestFace
          guest={guest}
          onClick={() => {
            setIsOpenGuestEditor(true);
            setGuest(guest);
          }}
        />
        {node}
      </div>
    );
  };

  return (
    <Content className="over-auto">
      <h1 className="margin-big-gap-l">{weddn}</h1>
      <input
        className="margin-big-gap-h bgcolor--3 color--2"
        placeholder="Поиск"
        value={term}
        onChange={event => setTerm(event.currentTarget.value.toLowerCase())}
      />
      <div className="margin-big-gap-v">
        Показать инфо гостя
        <Dropdown
          id={showMode}
          items={showItems}
          onSelectId={setShowMode}
        />
      </div>
      <h3 className="color--ok">
        Гости, которые будут ({resolvedPeopleCount}чел./{resolvedGuests.length}пригл.)
      </h3>
      {resolvedGuests.map(makeGuest)}
      <h3 className="color--ko">
        Гости, которых не будет ({rejectedPeopleCount}чел./{rejectedGuests.length}пригл.)
      </h3>
      {rejectedGuests.map(makeGuest)}
      <h3 className="color--3">
        Гости, которые не определились ({undefinedPeopleCount}чел./{undefinedGuests.length}пригл.)
      </h3>
      {undefinedGuests.map(makeGuest)}
      <IconButton
        Icon={IconPlusSignCircleStrokeRounded}
        className="margin-big-gap color--3"
        onClick={() => {
          setIsOpenGuestEditor(true);
          setGuest(defGuest);
        }}
        postfix="Новый гость"
      />
      <IconButton
        Icon={IconPlusSignCircleStrokeRounded}
        className="margin-big-gap color--3"
        onClick={() => setIsOpenGuestListLoader(true)}
        postfix="Добавить несколько гостей"
      />
      <IconButton
        Icon={IconDownload04StrokeRounded}
        className="margin-big-gap color--3"
        onClick={() => setIsOpenGuestListExcelZipper(true)}
        postfix="Сформировать Excel список"
      />
      {isOpenGuestListExcelZipper && (
        <GuestListExcelZipper
          guests={guests}
          setIsOpen={setIsOpenGuestListExcelZipper}
        />
      )}
      {isOpenGuestEditor && (
        <WedGuestEditorModal
          guest={guest}
          setGuest={setGuest}
          setIsOpen={setIsOpenGuestEditor}
        />
      )}
      {isOpenGuestListLoader && (
        <WedGuestListAdder
          guests={guests}
          setIsOpen={setIsOpenGuestListLoader}
        />
      )}
    </Content>
  );
}

const Content = styled.div`
  width: 100vw;
  height: 100dvh;
`;

const MessageText = styled.div`
  white-space: pre-line;
`;

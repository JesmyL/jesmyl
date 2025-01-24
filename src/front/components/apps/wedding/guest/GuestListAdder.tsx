import { mylib } from 'front/utils';
import { useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  WedGuest,
  WedGuestConversation,
  WedGuestSex,
} from '../../../../../shared/api/complect/apps/wed/complect/model';
import TheButton from '../../../../complect/Button';
import Dropdown from '../../../../complect/dropdown/Dropdown';
import { FullContent } from '../../../../complect/fullscreen-content/FullContent';
import { useGetExcelValueList } from '../../../../complect/useGetExcelValueList';
import { WedGuestFace } from './GuestFace';

interface Props {
  setIsOpen: (is: boolean) => void;
  guests: WedGuest[];
}

type Item = Record<string, string>;

export const WedGuestListAdder = ({ setIsOpen, guests }: Props) => {
  const [keys, setKeys] = useState<string[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [firstNameColumn, setFirstNameColumn] = useState('');
  const [lastNameColumn, setLastNameColumn] = useState('');
  const [wifeNameColumn, setWifeNameColumn] = useState('');
  const [sexColumn, setSexColumn] = useState('');
  const [conversationColumn, setConversationColumn] = useState('');
  const [isBlockSendButton, setIsBlockSendButton] = useState(false);

  const inputProps = useGetExcelValueList(list => {
    setKeys(mylib.keys(list[0]));
    setItems(list);
  });

  const newGuests = useMemo(() => {
    if (!firstNameColumn || !lastNameColumn || !wifeNameColumn) return null;
    const newGuestList: WedGuest[] = [];

    for (const item of items) {
      const itemFN = item[firstNameColumn];

      if (!itemFN) continue;

      const itemLN = item[lastNameColumn];
      const itemWN = item[wifeNameColumn];

      if (guests.some(guest => guest.fn === itemFN && (guest.ln === itemLN || guest.wn === itemWN))) continue;

      newGuestList.push({
        fn: (itemFN as never) || undefined,
        ln: (itemLN as never) || undefined,
        wn: (itemWN as never) || undefined,
        s: !sexColumn || item[sexColumn] === 'М' ? WedGuestSex.Man : WedGuestSex.Woman,
        c:
          !conversationColumn || item[conversationColumn] === 'ты'
            ? WedGuestConversation.Single
            : WedGuestConversation.Join,
      });
    }

    return newGuestList;
  }, [conversationColumn, firstNameColumn, guests, items, lastNameColumn, sexColumn, wifeNameColumn]);

  const dropItems = keys.map(key => ({ id: key, title: key }));

  return (
    <FullContent onClose={setIsOpen}>
      <FileInput {...inputProps} />
      {!items.length || (
        <>
          <DropSel
            title="Имя"
            dropItems={dropItems}
            items={items}
            column={firstNameColumn}
            setColumn={setFirstNameColumn}
          />
          <DropSel
            title="Фамилия"
            dropItems={dropItems}
            items={items}
            column={lastNameColumn}
            setColumn={setLastNameColumn}
          />
          <DropSel
            title="Супруг(а)"
            dropItems={dropItems}
            items={items}
            column={wifeNameColumn}
            setColumn={setWifeNameColumn}
          />
          <DropSel
            title="Пол"
            dropItems={dropItems}
            items={items}
            column={sexColumn}
            setColumn={setSexColumn}
          />
          <DropSel
            title="Обращение"
            dropItems={dropItems}
            items={items}
            column={conversationColumn}
            setColumn={setConversationColumn}
          />
          {newGuests && (
            <>
              <h2>Новые гости</h2>
              {newGuests.map(guest => {
                return (
                  <WedGuestFace
                    key={`${guest.fn} ${guest.wn} ${guest.ln}`}
                    guest={guest}
                  />
                );
              })}
            </>
          )}
          <TheButton
            disabled={isBlockSendButton || newGuests == null}
            className="margin-big-gap"
            onClick={async () => {
              if (!newGuests) return;
              setIsBlockSendButton(true);

              // try {
              //   await wedExer.send([
              //     {
              //       action: 'concatGuestList',
              //       args: { value: newGuests },
              //     },
              //   ]);

              //   setIsOpen(false);
              // } catch (error) {
              //   setIsBlockSendButton(false);
              // }
            }}
          >
            Отправить список
          </TheButton>
        </>
      )}
    </FullContent>
  );
};

const DropSel = ({
  column,
  title,
  dropItems,
  setColumn,
  items,
}: {
  title: string;
  items: Item[];
  dropItems: { id: string; title: string }[];
  column: string;
  setColumn: (column: string) => void;
}) => {
  const getValues = (col: string) => {
    if (!col) return '';
    const getter = (item: Item) => item[col];
    const vals = Array.from(new Set(items.filter(getter).map(getter)));
    const cuts = vals.slice(0, 3);

    return ` (${cuts.join(', ') + (cuts.length < vals.length ? ', ...' : '')})`;
  };

  return (
    <>
      <h3>
        {title}
        {getValues(column)}:
      </h3>
      <Dropdown
        id={column}
        items={dropItems}
        onSelectId={setColumn}
      />
    </>
  );
};

const FileInput = styled.input``;

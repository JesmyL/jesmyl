import { bibleIDB } from '#basis/lib/idb/bible';
import { addEventListenerPipe, hookEffectPipe } from 'front/08-shared/lib/hookEffectPipe';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { BibleSearchZone } from '../../../../../../07-basis/model/bible';
import { useBibleTranslationSearchResultSelectedSet } from '../hooks/results';
import BibleSearchPanelSearchTextInput from './SearchTextInput';
import { BibleSearchPanelAddressInput } from './address/AddressInput';

interface Props {
  inputRef: React.RefObject<HTMLInputElement>;
  setSearchZone: (zone: BibleSearchZone, inputRef: React.RefObject<HTMLInputElement>) => void;
}

export default function BibleSearchInputPanel({ inputRef, setSearchZone }: Props) {
  const searchZone = bibleIDB.useValue.searchZone();
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();

  useEffect(() => {
    if (inputRef.current === null) return;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(inputRef.current, 'keydown', event => {
          switch (event.code) {
            case 'ArrowLeft':
            case 'ArrowRight':
              event.stopPropagation();
              return;
          }
        }),
      )
      .effect();
  }, [inputRef, setResultSelected]);

  return (
    <div className="flex flex-gap margin-big-gap-t">
      <span className="nowrap">
        {searchZone === 'global' ? 'Поиск в тексте:' : searchZone === 'inner' ? 'Поиск по главе:' : 'Поиск по ссылке:'}
      </span>
      {searchZone === 'address' ? (
        <BibleSearchPanelAddressInput inputRef={inputRef} />
      ) : (
        <BibleSearchPanelSearchTextInput inputRef={inputRef} />
      )}
      <SwitchButton
        className="pointer"
        $active={searchZone === 'global'}
        onClick={() => setSearchZone('global', inputRef)}
      >
        текст
      </SwitchButton>
      <SwitchButton
        className="pointer"
        $active={searchZone === 'inner'}
        onClick={() => setSearchZone('inner', inputRef)}
      >
        глава
      </SwitchButton>
      <SwitchButton
        className="pointer"
        $active={searchZone === 'address'}
        onClick={() => setSearchZone('address', inputRef)}
      >
        ссылка
      </SwitchButton>
    </div>
  );
}

const SwitchButton = styled.div<{ $active: boolean }>`
  ${props =>
    props.$active &&
    css`
      text-decoration: underline;
    `}

  &:hover {
    color: var(--color--7);
  }
`;

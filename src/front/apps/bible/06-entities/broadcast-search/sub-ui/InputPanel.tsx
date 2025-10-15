import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleSearchZone } from '$bible/shared/model/base';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { useBibleBroadcastSearchResultSelectedSet } from '../lib/results';
import { bibleBroadcastSearchZoneAtom } from '../state/atoms';
import { BibleBroadcastSearchPanelAddressInput } from './AddressInput';
import { BibleBroadcastSearchPanelSearchTextInput } from './SearchTextInput';

interface Props {
  inputRef: React.RefObject<HTMLInputElement | null>;
  setSearchZone: (zone: BibleSearchZone, inputRef: React.RefObject<HTMLInputElement | null>) => void;
}

export function BibleBroadcastSearchInputPanel({ inputRef, setSearchZone }: Props) {
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);
  const setResultSelected = useBibleBroadcastSearchResultSelectedSet();

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
    <div className="flex gap-2 mt-5">
      <span className="nowrap">
        {searchZone === 'global' ? 'Поиск в тексте:' : searchZone === 'inner' ? 'Поиск по главе:' : 'Поиск по ссылке:'}
      </span>
      {searchZone === 'address' ? (
        <BibleBroadcastSearchPanelAddressInput inputRef={inputRef} />
      ) : (
        <BibleBroadcastSearchPanelSearchTextInput inputRef={inputRef} />
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

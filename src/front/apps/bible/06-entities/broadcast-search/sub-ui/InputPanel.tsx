import { translateBase } from '#basis/locale';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { BibleSearchZone } from '$bible/shared/model/base';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { bibleBroadcastSearchZoneAtom } from '../state/atoms';
import { BibleBroadcastSearchPanelAddressInput } from './AddressInput';
import { BibleBroadcastSearchPanelSearchTextInput } from './SearchTextInput';

interface Props {
  inputRef: React.RefObject<(HTMLInputElement & HTMLTextAreaElement) | null>;
  setSearchZone: (zone: BibleSearchZone, inputRef: React.RefObject<HTMLInputElement | null>) => void;
}

export function BibleBroadcastSearchInputPanel({ inputRef, setSearchZone }: Props) {
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);

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
  }, [inputRef]);

  return (
    <div className="flex gap-2 w-full">
      <span className="nowrap">
        {searchZone === BibleSearchZone.Global
          ? translateBase(it => it.bible.searchInText)
          : searchZone === BibleSearchZone.Inner
            ? translateBase(it => it.bible.searchInChapter)
            : translateBase(it => it.bible.searchByLink)}
        :
      </span>
      {searchZone === BibleSearchZone.Address ? (
        <BibleBroadcastSearchPanelAddressInput inputRef={inputRef} />
      ) : (
        <BibleBroadcastSearchPanelSearchTextInput inputRef={inputRef} />
      )}
      {(
        [
          [BibleSearchZone.Global, translateBase(it => it.txt), 'F2'],
          [BibleSearchZone.Inner, translateBase(it => it.bible.chapter), 'F3'],
          [BibleSearchZone.Address, translateBase(it => it.link), 'F4'],
        ] as const
      ).map(([zone, title, htmlTitle]) => {
        return (
          <SwitchButton
            key={zone}
            title={htmlTitle}
            className="pointer hover:text-x7"
            $active={searchZone === zone}
            onClick={() => setSearchZone(zone, inputRef)}
          >
            {title}
          </SwitchButton>
        );
      })}
    </div>
  );
}

const SwitchButton = styled.div<{ $active: boolean }>`
  ${props =>
    props.$active &&
    css`
      text-decoration: underline;
    `}
`;

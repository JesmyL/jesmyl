import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import {
  BibleBroadcastSearchPanelSearchTextInput,
  BibleBroadcastSearchResults,
  bibleBroadcastSearchZoneAtom,
  useBibleBroadcastSearchResultSelectedSet,
} from '$bible/entities/broadcast-search';
import { useBibleAddressBooki, useBibleAddressChapteri } from '$bible/shared/hooks';
import { useBibleBookList } from '$bible/shared/hooks/texts';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';

export function BibleReaderSearchPage() {
  const navigate = useNavigate();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);
  const bookTitles = useBibleBookList();
  const [innerZone, setInnerZone] = useState<'book' | 'chapter'>('book');
  const setResultSelected = useBibleBroadcastSearchResultSelectedSet();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setResultSelected(null), []);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle="Поиск"
      content={
        <>
          <div className="full-size">
            <IconCheckbox
              checked={searchZone === 'global'}
              postfix="Глобальный поиск"
              onChange={() => bibleBroadcastSearchZoneAtom.set('global')}
            />
            <IconCheckbox
              checked={searchZone === 'inner' && innerZone === 'book'}
              postfix={
                <>
                  Поиск по книге <i>{bookTitles[currentBooki].full}</i>
                </>
              }
              onChange={() => {
                bibleBroadcastSearchZoneAtom.set('inner');
                setInnerZone('book');
              }}
            />
            <IconCheckbox
              checked={searchZone === 'inner' && innerZone === 'chapter'}
              postfix={
                <>
                  {'Поиск по главе '}
                  <i>
                    {bookTitles[currentBooki].full} {currentChapteri + 1}
                  </i>
                </>
              }
              onChange={() => {
                bibleBroadcastSearchZoneAtom.set('inner');
                setInnerZone('chapter');
              }}
            />
            <BibleBroadcastSearchPanelSearchTextInput inputRef={inputRef} />
            <BibleBroadcastSearchResults
              inputRef={inputRef}
              height="calc(100% - 100px)"
              innerZone={innerZone}
              onClick={() => navigate({ to: '/bible/i' })}
            />
          </div>
        </>
      }
    />
  );
}

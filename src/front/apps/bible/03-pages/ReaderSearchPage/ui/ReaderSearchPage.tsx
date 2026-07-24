import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import {
  BibleBroadcastSearchPanelSearchTextInput,
  BibleBroadcastSearchResults,
  bibleBroadcastSearchResultSelectedAtom,
  bibleBroadcastSearchZoneAtom,
} from '$bible/entities/broadcast-search';
import { takeBibleLangBooks } from '$bible/ext';
import { useBibleAddressBooki, useBibleAddressChapteri } from '$bible/shared/hooks';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';

export function BibleReaderSearchPage() {
  const navigate = useNavigate();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);
  const [innerZone, setInnerZone] = useState<'book' | 'chapter'>('book');
  const langi = useBibleCurrentLangi();

  useEffect(() => bibleBroadcastSearchResultSelectedAtom.set(null), []);

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
                  Поиск по книге <i>{takeBibleLangBooks(langi)[currentBooki].full}</i>
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
                    {takeBibleLangBooks(langi)[currentBooki].full} {currentChapteri + 1}
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

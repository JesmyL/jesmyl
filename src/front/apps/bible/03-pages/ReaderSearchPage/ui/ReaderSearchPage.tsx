import { translateBase } from '#basis/locale';
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
import { BibleSearchInnerZone, BibleSearchZone } from '$bible/shared/model/base';
import { useBibleCurrentLangi } from '$bible/shared/state/atoms';
import { useNavigate } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useRef, useState } from 'react';

export function BibleReaderSearchPage() {
  const navigate = useNavigate();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const searchZone = useAtomValue(bibleBroadcastSearchZoneAtom);
  const [innerZone, setInnerZone] = useState(BibleSearchInnerZone.Book);
  const langi = useBibleCurrentLangi();

  useEffect(() => bibleBroadcastSearchResultSelectedAtom.set(null), []);

  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  return (
    <PageContainerConfigurer
      className=""
      withoutBackButton
      headTitle={translateBase(it => it.search)}
      content={
        <>
          <div className="full-size">
            <IconCheckbox
              checked={searchZone === BibleSearchZone.Global}
              postfix={translateBase(it => it.globSearch)}
              onChange={() => bibleBroadcastSearchZoneAtom.set(BibleSearchZone.Global)}
            />
            <IconCheckbox
              checked={searchZone === BibleSearchZone.Inner && innerZone === BibleSearchInnerZone.Book}
              postfix={
                <span
                  dangerouslySetInnerHTML={{
                    __html: translateBase(it => it.bible.searchByBook, {
                      b: takeBibleLangBooks(langi)[currentBooki].full,
                    }),
                  }}
                />
              }
              onChange={() => {
                bibleBroadcastSearchZoneAtom.set(BibleSearchZone.Inner);
                setInnerZone(BibleSearchInnerZone.Book);
              }}
            />
            <IconCheckbox
              checked={searchZone === BibleSearchZone.Inner && innerZone === BibleSearchInnerZone.Chapter}
              postfix={
                <span
                  dangerouslySetInnerHTML={{
                    __html: translateBase(it => it.bible.searchByChapter, {
                      b: takeBibleLangBooks(langi)[currentBooki].full,
                      c: currentChapteri + 1,
                    }),
                  }}
                />
              }
              onChange={() => {
                bibleBroadcastSearchZoneAtom.set(BibleSearchZone.Inner);
                setInnerZone(BibleSearchInnerZone.Chapter);
              }}
            />
            <BibleBroadcastSearchPanelSearchTextInput inputRef={inputRef} />
            <BibleBroadcastSearchResults
              inputRef={inputRef}
              innerZone={innerZone}
              onClick={() => navigate({ to: '/bible/i' })}
            />
          </div>
        </>
      }
    />
  );
}

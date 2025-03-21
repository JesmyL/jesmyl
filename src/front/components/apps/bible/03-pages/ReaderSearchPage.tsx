import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { IconCheckbox } from '#shared/ui/the-icon/IconCheckbox';
import { bibleIDB } from '$bible/basis/lib/bibleIDB';
import { useBibleAddressBooki } from '$bible/basis/lib/hooks/address/books';
import { useBibleAddressChapteri } from '$bible/basis/lib/hooks/address/chapters';
import { useBibleBookList } from '$bible/basis/lib/hooks/texts';
import { useBibleTranslationSearchResultSelectedSet } from '$bible/translations/search/hooks/results';
import { BibleSearchPanelSearchTextInput } from '$bible/translations/search/input-panel/SearchTextInput';
import { BibleSearchResults } from '$bible/translations/search/Results';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { emptyArray } from 'shared/utils';

export function BibleReaderSearchPage() {
  const navigate = useNavigate();
  const currentBooki = useBibleAddressBooki();
  const currentChapteri = useBibleAddressChapteri();
  const searchZone = bibleIDB.useValue.searchZone();
  const bookTitles = useBibleBookList();
  const [innerZone, setInnerZone] = useState<'book' | 'chapter'>('book');
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setResultSelected(null), emptyArray);

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
              onChange={() => bibleIDB.set.searchZone('global')}
            />
            <IconCheckbox
              checked={searchZone === 'inner' && innerZone === 'book'}
              postfix={
                <>
                  Поиск по книге <i>{bookTitles[currentBooki][0]}</i>
                </>
              }
              onChange={() => {
                bibleIDB.set.searchZone('inner');
                setInnerZone('book');
              }}
            />
            <IconCheckbox
              checked={searchZone === 'inner' && innerZone === 'chapter'}
              postfix={
                <>
                  {'Поиск по главе '}
                  <i>
                    {bookTitles[currentBooki][0]} {currentChapteri + 1}
                  </i>
                </>
              }
              onChange={() => {
                bibleIDB.set.searchZone('inner');
                setInnerZone('chapter');
              }}
            />
            <BibleSearchPanelSearchTextInput inputRef={inputRef} />
            <BibleSearchResults
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

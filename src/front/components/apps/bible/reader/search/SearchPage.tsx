import { useBibleBookList } from '#basis/consts/bibleTitles';
import { IconCheckbox } from '#shared/ui/icon';
import { PageContainer } from '#shared/ui/PageContainer';
import { bibleIDB } from '@bible/shared/lib/bibleIDB';
import { useBibleCurrentBooki } from '@bible/shared/translations/hooks/books';
import { useBibleCurrentChapteri } from '@bible/shared/translations/hooks/chapters';
import { useBibleTranslationSearchResultSelectedSet } from '@bible/shared/translations/hooks/results';
import { BibleSearchResults } from '@bible/shared/translations/ui/Results';
import { BibleSearchPanelSearchTextInput } from '@bible/shared/translations/ui/SearchTextInput';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emptyArray } from 'shared/utils';

export const BibleReaderSearchPage = () => {
  const navigate = useNavigate();
  const currentBooki = useBibleCurrentBooki();
  const currentChapteri = useBibleCurrentChapteri();
  const searchZone = bibleIDB.useValue.searchZone();
  const bookTitles = useBibleBookList();
  const [innerZone, setInnerZone] = useState<'book' | 'chapter'>('book');
  const setResultSelected = useBibleTranslationSearchResultSelectedSet();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => setResultSelected(null), emptyArray);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <PageContainer
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
              onClick={() => navigate('/bible/i')}
            />
          </div>
        </>
      }
    />
  );
};

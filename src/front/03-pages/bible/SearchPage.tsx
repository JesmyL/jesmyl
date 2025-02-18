import { bibleIDB } from '#basis/lib/idb/bible';
import PhaseContainerConfigurer from 'front/08-shared/ui/phase-container/PhaseContainerConfigurer';
import IconCheckbox from 'front/08-shared/ui/the-icon/IconCheckbox';
import { useBibleAddressBooki } from 'front/components/apps/bible/hooks/address/books';
import { useBibleAddressChapteri } from 'front/components/apps/bible/hooks/address/chapters';
import { useBibleBookList } from 'front/components/apps/bible/hooks/texts';
import { useBibleTranslationSearchResultSelectedSet } from 'front/components/apps/bible/translations/search/hooks/results';
import BibleSearchPanelSearchTextInput from 'front/components/apps/bible/translations/search/input-panel/SearchTextInput';
import BibleSearchResults from 'front/components/apps/bible/translations/search/Results';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emptyArray } from 'shared/utils';

export default function BibleReaderSearchPage() {
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
    <PhaseContainerConfigurer
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
}

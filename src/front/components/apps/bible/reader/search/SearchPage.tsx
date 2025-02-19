import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { emptyArray } from 'shared/utils';
import PhaseContainerConfigurer from '../../../../../complect/phase-container/PhaseContainerConfigurer';
import IconCheckbox from '../../../../../complect/the-icon/IconCheckbox';
import { bibleIDB } from '../../_db/bibleIDB';
import { useBibleAddressBooki } from '../../hooks/address/books';
import { useBibleAddressChapteri } from '../../hooks/address/chapters';
import { useBibleBookList } from '../../hooks/texts';
import BibleSearchResults from '../../translations/search/Results';
import { useBibleTranslationSearchResultSelectedSet } from '../../translations/search/hooks/results';
import BibleSearchPanelSearchTextInput from '../../translations/search/input-panel/SearchTextInput';

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

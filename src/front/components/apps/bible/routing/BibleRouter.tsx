import { Route, Routes } from 'react-router-dom';
import { CurrentForceViweAppContext } from '../../+complect/translations/Translation.contexts';
import { BibleReaderCurrentBookPage } from '../reader/book/CurrentBookPage';
import { BibleReaderSearchPage } from '../reader/search/SearchPage';
import { BibleTranslatesContextProvider } from '../translates/TranslatesContext';
import { BibleTranslationControlled } from '../translations/BibleTranslationControlled';
import { BibleFooter } from './BibleFooter';
import { bibleInitialInvokes } from './bible-initial-invokes';

export default function BibleRouter({ mainNode }: { mainNode: React.ReactNode }) {
  return (
    <>
      <Routes>
        <Route
          path="i"
          element={<BibleReaderCurrentBookPage />}
        />
        <Route
          path="search"
          element={<BibleReaderSearchPage />}
        />
        <Route
          path="tran"
          element={
            <BibleTranslatesContextProvider>
              <CurrentForceViweAppContext.Provider value="bible">
                <BibleTranslationControlled
                  head
                  headTitle="Библия"
                />
              </CurrentForceViweAppContext.Provider>
            </BibleTranslatesContextProvider>
          }
        />
        {mainNode}
      </Routes>

      <BibleFooter />
    </>
  );
}

bibleInitialInvokes();

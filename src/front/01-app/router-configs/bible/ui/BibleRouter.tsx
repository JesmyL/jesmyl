import BibleTranslatesContextProvider from '#basis/lib/contexts/bible/TranslatesContext';
import { CurrentForceViweAppContext } from '#basis/lib/contexts/CurrentForceViweAppContext';
import { BibleTranslationPage } from '#pages/bible/BibleTranslationPage';
import BibleReaderCurrentBookPage from '#pages/bible/CurrentBookPage';
import BibleReaderSearchPage from '#pages/bible/SearchPage';
import { bibleInitialInvokes } from '#processes/initial-invokes/bible-initial-invokes';
import { Route, Routes } from 'react-router-dom';
import { BibleFooter } from './BibleFooter';

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
                <BibleTranslationPage
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

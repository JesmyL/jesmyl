import { BibleReaderCurrentBookPage } from '@bible/reader/book/CurrentBookPage';
import { BibleReaderSearchPage } from '@bible/reader/search/SearchPage';
import { BibleTranslatesContextProvider } from '@bible/translates/TranslatesContext';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { CurrentForceViweAppContext } from '../../+complect/translations/Translation.contexts';
import { bibleInitialInvokes } from './bible-initial-invokes';
import { BibleFooter } from './BibleFooter';

const BibleTranslationControlled = React.lazy(() => import('@bible/translations/BibleTranslationControlled'));

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

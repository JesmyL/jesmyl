import { BibleTranslatesContextProvider } from '$bible/translates/TranslatesContext';
import BibleTranslationControlled from '$bible/translations/BibleTranslationControlled';
import { createFileRoute } from '@tanstack/react-router';
import { CurrentForceViweAppContext } from 'front/components/apps/+complect/translations/Translation.contexts';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BibleTranslatesContextProvider>
        <CurrentForceViweAppContext.Provider value="bible">
          <BibleTranslationControlled
            head
            headTitle="Библия"
          />
        </CurrentForceViweAppContext.Provider>
      </BibleTranslatesContextProvider>
    </>
  );
}

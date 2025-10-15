import { CurrentForceViweAppContext } from '#features/translations/Translation.contexts';
import { BibleTranslatesContextProvider } from '$bible/basis/contexts/TranslatesContext';
import BibleTranslationControlled from '$bible/translations/BibleTranslationControlled';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BibleTranslatesContextProvider>
        <CurrentForceViweAppContext value="bible">
          <BibleTranslationControlled
            head
            headTitle="Библия"
          />
        </CurrentForceViweAppContext>
      </BibleTranslatesContextProvider>
    </>
  );
}

import { CurrentForceViweAppContext } from '#features/broadcast/Translation.contexts';
import { BibleTranslatesContextProvider } from '$bible/shared/state/TranslatesContext';
import BibleTranslationControlled from '$bible/widgets/broadcast/ui/BibleTranslationControlled';
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

import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { BibleTranslatesContextProvider } from '$bible/shared/state/TranslatesContext';
import BibleBroadcastControlled from '$bible/widgets/broadcast/ui/Controlled';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <BibleTranslatesContextProvider>
        <CurrentForceViweAppContext value="bible">
          <BibleBroadcastControlled
            head
            headTitle="Библия"
          />
        </CurrentForceViweAppContext>
      </BibleTranslatesContextProvider>
    </>
  );
}

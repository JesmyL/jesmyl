import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { BibleTranslatesContextProvider } from '$bible/ext';
import { BibleBroadcastControlled } from '$bible/widgets/broadcast';
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

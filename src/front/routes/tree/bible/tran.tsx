import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { BibleBroadcastControlled } from '$bible/widgets/broadcast';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CurrentForceViweAppContext value="bible">
      <BibleBroadcastControlled
        head
        headTitle="Библия"
      />
    </CurrentForceViweAppContext>
  );
}

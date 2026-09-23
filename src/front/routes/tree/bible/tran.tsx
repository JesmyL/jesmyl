import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { BibleLiveControlled } from '$bible/features/Live';
import { createFileRoute } from '@tanstack/react-router';
import { ScheduleWidgetWidDef } from 'shared/api';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CurrentForceViweAppContext value="bible">
      <BibleLiveControlled
        headTitle="Библия"
        schw={ScheduleWidgetWidDef}
        fio=""
      />
    </CurrentForceViweAppContext>
  );
}

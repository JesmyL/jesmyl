import { translateBase } from '#basis/locale';
import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { BibleLiveControlled } from '$bible/features/Live';
import { createFileRoute } from '@tanstack/react-router';
import { ScheduleWidgetWidDef } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <CurrentForceViweAppContext value="bible">
      <BibleLiveControlled
        headTitle={translateBase(BaseLocaleKey.Bible)}
        schw={ScheduleWidgetWidDef}
        fio=""
      />
    </CurrentForceViweAppContext>
  );
}

import { translateBase } from '#basis/locale';
import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { CurrentForceViweAppContext } from '#features/broadcast/Broadcast.contexts';
import { BibleLiveControlled } from '$bible/features/Live';
import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';
import { ScheduleWidgetWidDef } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';

export const Route = createFileRoute('/bible/tran')({
  component: RouteComponent,
});

function RouteComponent() {
  useEffect(() => {
    const previousApp = broadcastCurrentTextAppAtom.get();
    broadcastCurrentTextAppAtom.set('bible');

    return () => {
      if (broadcastCurrentTextAppAtom.get() === 'bible') broadcastCurrentTextAppAtom.set(previousApp);
    };
  }, []);

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

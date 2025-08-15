import { ScheduleAlarmDay } from '#widgets/schedule/alarm/AlarmDay';
import { ScheduleCurrentSchwContext } from '#widgets/schedule/complect/lib/contexts';
import { ScheduleWidgetPage } from '#widgets/schedule/pages/ScheduleWidgetPage';
import { indexIDB } from '$index/db/index-idb';
import { createFileRoute } from '@tanstack/react-router';
import { useLiveQuery } from 'dexie-react-hooks';
import { ScheduleWidgetCleans } from 'shared/api';

export const Route = createFileRoute('/schedule-day/$schw/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { schw } = Route.useParams();
  const schedule = useLiveQuery(() => indexIDB.tb.schs.get(+schw), [schw]);

  if (schedule != null) {
    const dayi = ScheduleWidgetCleans.getCurrentDayiOrNull(schedule);

    if (dayi != null) {
      return (
        <div className="m-3">
          <ScheduleAlarmDay
            day={schedule.days[dayi]}
            dayi={dayi}
            schedule={schedule}
            scheduleScopeProps={{ schw: +schw }}
            isForceOpen
          />
        </div>
      );
    }
  }

  return (
    <ScheduleCurrentSchwContext.Provider value={+schw}>
      <ScheduleWidgetPage />
    </ScheduleCurrentSchwContext.Provider>
  );
}

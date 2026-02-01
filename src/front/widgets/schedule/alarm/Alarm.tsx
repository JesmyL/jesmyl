import { useIndexSchedules } from '$index/shared/state';
import { CatchBoundary } from '@tanstack/react-router';
import { useActualSchw } from '../useSch';
import { ScheduleWidgetAlarmContent } from './AlarmContent';

export function ScheduleWidgetAlarm({ isForceShow }: { isForceShow?: boolean }) {
  const schedules = useIndexSchedules();
  const schw = useActualSchw();

  return (
    <CatchBoundary getResetKey={() => 'ScheduleWidgetAlarm'}>
      {(isForceShow || schedules?.some(schedule => schedule.start)) && (
        <ScheduleWidgetAlarmContent observeSchw={schw} />
      )}
    </CatchBoundary>
  );
}

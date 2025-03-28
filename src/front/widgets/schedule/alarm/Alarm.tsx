import { useIndexSchedules } from 'front/components/index/atoms';
import { useActualSchw } from '../useSch';
import { ScheduleWidgetAlarmContent } from './AlarmContent';

export function ScheduleWidgetAlarm({ isForceShow }: { isForceShow?: boolean }) {
  const schedules = useIndexSchedules();
  const schw = useActualSchw();

  return (
    <>
      {(isForceShow || schedules?.some(schedule => schedule.start)) && (
        <ScheduleWidgetAlarmContent observeSchw={schw} />
      )}
    </>
  );
}

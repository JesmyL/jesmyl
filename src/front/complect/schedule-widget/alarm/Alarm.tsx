import { useIndexSchedules } from '../../../components/index/molecules';
import { useActualSchw } from '../useSch';
import ScheduleWidgetAlarmContent from './AlarmContent';

export default function ScheduleWidgetAlarm({ isForceShow }: { isForceShow?: boolean }) {
  const schedules = useIndexSchedules();
  const schw = useActualSchw();

  return (
    <>
      {(isForceShow || schedules.list.some(schedule => schedule.start)) && (
        <ScheduleWidgetAlarmContent observeSchw={schw} />
      )}
    </>
  );
}

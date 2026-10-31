import { cmComLastOpenSchwAtom } from '$cm/entities/index';
import { useIndexSchedules } from '$index/shared/state';
import { CatchBoundary } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useActualSchw } from '../useSch';
import { ScheduleWidgetAlarmContent } from './AlarmContent';

export function ScheduleWidgetAlarm({ isForceShow }: { isForceShow?: boolean }) {
  const schedules = useIndexSchedules();
  const lastOpenedSchw = useAtomValue(cmComLastOpenSchwAtom);
  const actualSchw = useActualSchw();
  const schw = lastOpenedSchw ?? actualSchw;

  return (
    <CatchBoundary getResetKey={() => 'ScheduleWidgetAlarm'}>
      {!schw ||
        ((isForceShow || schedules?.some(schedule => schedule.start)) && (
          <ScheduleWidgetAlarmContent observeSchw={schw} />
        ))}
    </CatchBoundary>
  );
}

import { hideAppFooterAtom } from '#basis/state/hideAppFooterAtom';
import { indexIDB } from '$index/shared/state';
import { useLiveQuery } from 'dexie-react-hooks';
import { useEffect } from 'react';
import { IScheduleWidgetWid, ScheduleWidgetCleans } from 'shared/api';
import { ScheduleAlarmDay } from './AlarmDay';

export function ScheduleSingleAlarmDay({ schw, dayi }: { schw: IScheduleWidgetWid; dayi: number | nil }) {
  const schedule = useLiveQuery(() => indexIDB.tb.schs.get(schw), [schw]);

  useEffect(() => {
    hideAppFooterAtom.set(true);
    return hideAppFooterAtom.reset;
  }, []);

  if (schedule == null) return;
  dayi ??= ScheduleWidgetCleans.getCurrentDayiOrNull(schedule);
  if (dayi == null) return;

  return (
    <div className="p-3 overflow-auto h-[100dvh]">
      <ScheduleAlarmDay
        day={schedule.days[dayi]}
        dayi={dayi}
        schedule={schedule}
        scheduleScopeProps={{ schw }}
        isForceOpen
      />
    </div>
  );
}

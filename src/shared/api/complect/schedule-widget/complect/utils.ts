import { IScheduleWidget, IScheduleWidgetDay, ScheduleWidgetCleans } from 'shared/api';
import { smylib } from 'shared/utils';

export const indexScheduleGetDayStartMs = (schedule: IScheduleWidget, dayi: number) => {
  return schedule.start + smylib.howMs.inDay * dayi - (schedule.withTech ? smylib.howMs.inDay : 0);
};

export const indexScheduleCheckIsDayIsPast = (schedule: IScheduleWidget, dayi: number) => {
  return Date.now() > indexScheduleGetDayStartMs(schedule, dayi) + smylib.howMs.inDay;
};

export const indexScheduleGetDayEventTimes = (schedule: IScheduleWidget, dayScalar: number | IScheduleWidgetDay) => {
  const day = smylib.isNum(dayScalar) ? schedule.days[dayScalar] : dayScalar;

  const times: number[] = [];
  for (const event of day.list)
    times.push(ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]) + (times[times.length - 1] ?? 0));

  return times;
};

export const indexScheduleGetEventFinishMs = (
  schedule: IScheduleWidget,
  wakeupMs: number,
  dayi: number,
  eventPrevTime: number,
) => {
  return (
    schedule.start +
    wakeupMs +
    eventPrevTime * smylib.howMs.inMin +
    dayi * smylib.howMs.inDay -
    (schedule.withTech ? smylib.howMs.inDay : 0)
  );
};

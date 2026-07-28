import { IScheduleWidget, IScheduleWidgetDay, ScheduleWidgetCleans, ScheduleWidgetDayi } from 'shared/api';
import { howMillisecondsInDay, howMillisecondsInMin } from 'shared/const/ms';
import { checkIsNumber } from 'shared/utils/checkIs';

export const indexScheduleGetDayStartMs = (schedule: IScheduleWidget, dayi: ScheduleWidgetDayi) => {
  return schedule.start + howMillisecondsInDay * dayi - (schedule.withTech ? howMillisecondsInDay : 0);
};

export const indexScheduleCheckIsDayIsPast = (schedule: IScheduleWidget, dayi: ScheduleWidgetDayi) => {
  return Date.now() > indexScheduleGetDayStartMs(schedule, dayi) + howMillisecondsInDay;
};

export const indexScheduleGetDayEventTimes = (
  schedule: IScheduleWidget,
  dayScalar: ScheduleWidgetDayi | IScheduleWidgetDay,
) => {
  const day = checkIsNumber(dayScalar) ? schedule.days[dayScalar] : dayScalar;

  const times: number[] = [];
  for (const event of day.list)
    times.push(ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]) + (times[times.length - 1] ?? 0));

  return times;
};

export const indexScheduleGetEventFinishMs = (
  schedule: IScheduleWidget,
  wakeupMs: number,
  dayi: ScheduleWidgetDayi,
  eventPrevTime: number,
) => {
  return (
    schedule.start +
    wakeupMs +
    eventPrevTime * howMillisecondsInMin +
    dayi * howMillisecondsInDay -
    (schedule.withTech ? howMillisecondsInDay : 0)
  );
};

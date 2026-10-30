import {
  IScheduleWidget,
  IScheduleWidgetDay,
  SchedulePeriodKind,
  ScheduleWidgetCleans,
  ScheduleWidgetDayEventMi,
  ScheduleWidgetDayi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  UserId,
} from 'shared/api';
import { howMillisecondsInDay, howMillisecondsInHour, howMillisecondsInMin } from 'shared/const/ms';
import { checkIsNumber } from 'shared/utils/checkIs';

export const checkIsCanRedactScheduleComsList = (
  schedule: IScheduleWidget,
  userId: UserId,
  dayi?: ScheduleWidgetDayi | nil,
  eventMi?: ScheduleWidgetDayEventMi | nil,
) => {
  const ctrl = schedule.ctrl;
  const comsRights = ctrl.comsRights;

  if (comsRights?.users?.includes(userId)) return true;

  if (dayi != null) {
    if (eventMi != null && comsRights?.events?.[dayi]?.[eventMi]?.includes(userId)) return true;
    if (comsRights?.days?.[dayi]?.includes(userId)) return true;
  }

  const userR = ctrl.users.find(user => user.id === userId)?.R ?? ctrl.defu;

  return (
    scheduleWidgetUserRights.checkIsHasIndividualRights(userR, ScheduleWidgetUserRoleRight.RedactComsList) ||
    scheduleWidgetUserRights.checkIsHasRights(userR, ScheduleWidgetUserRoleRight.TotalRedact)
  );
};

export const takeSchedulePeriodNextStart = (
  schedule: Pick<IScheduleWidget, 'start' | 'period'>,
  now = Date.now(),
): number | nil => {
  const period = schedule.period;
  if (period == null || period.kind === SchedulePeriodKind.Once) return null;

  const start = new Date(schedule.start);
  const acceptTime = (date: Date) => {
    date.setHours(start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
    return date;
  };

  if (period.kind === SchedulePeriodKind.Weekly) {
    const next = acceptTime(new Date(now));
    next.setDate(next.getDate() + ((start.getDay() - next.getDay() + 7) % 7));
    if (next.getTime() <= now) next.setDate(next.getDate() + 7);
    return next.getTime();
  }

  const lowerDate = new Date(now);
  let year = lowerDate.getFullYear();
  let month = lowerDate.getMonth();

  for (let monthi = 0; monthi < 24; monthi++) {
    const firstWeekday = new Date(year, month, 1).getDay();
    const dayi =
      period.kind === SchedulePeriodKind.MonthDay
        ? period.dayi
        : 1 + ((period.dayi - firstWeekday + 7) % 7) + (period.weeki - 1) * 7;
    const next = acceptTime(new Date(year, month, dayi));

    if (next.getMonth() === month && next.getTime() > now) return next.getTime();

    if (++month === 12) {
      month = 0;
      year++;
    }
  }

  return null;
};

export const takeScheduleNearestStartMs = (schedule: IScheduleWidget, now = Date.now()): number => {
  const nextStart = takeSchedulePeriodNextStart(schedule, now) ?? schedule.start;
  const wakeUpMs = ScheduleWidgetCleans.computeDayWakeUpTime(
    (schedule.withTech ? schedule.days[1] : schedule.days[0])?.wup ?? 0,
    'number',
  );
  if (!wakeUpMs) return nextStart;

  const date = new Date(nextStart);
  date.setHours(
    Math.trunc(wakeUpMs / howMillisecondsInHour),
    Math.trunc((wakeUpMs % howMillisecondsInHour) / howMillisecondsInMin),
    0,
    0,
  );

  return date.getTime();
};

export const checkIsSchedulePeriodic = (schedule: Pick<IScheduleWidget, 'period'>) =>
  schedule.period != null && schedule.period.kind !== SchedulePeriodKind.Once;

export const takeScheduleCurrentPeriodShiftMs = (
  schedule: Pick<IScheduleWidget, 'start' | 'period'>,
  now = Date.now(),
): number => {
  const start = new Date(schedule.start);
  const period = schedule.period;
  if (period == null || period.kind === SchedulePeriodKind.Once || schedule.start >= now) return 0;

  if (period.kind === SchedulePeriodKind.Weekly) {
    const weekMs = howMillisecondsInDay * 7;
    return Math.trunc((now - schedule.start) / weekMs) * weekMs;
  }

  // month-based: walk the months around now, tracking the latest period start within [schedule.start, now]
  const anchor = new Date(now);
  anchor.setMonth(anchor.getMonth() - 14);
  let year = anchor.getFullYear();
  let month = anchor.getMonth();
  let lastMs = schedule.start;

  for (let monthi = 0; monthi < 26; monthi++) {
    const firstWeekday = new Date(year, month, 1).getDay();
    const dayi =
      period.kind === SchedulePeriodKind.MonthDay
        ? period.dayi
        : 1 + ((period.dayi - firstWeekday + 7) % 7) + (period.weeki - 1) * 7;
    const next = new Date(year, month, dayi);
    next.setHours(start.getHours(), start.getMinutes(), start.getSeconds(), start.getMilliseconds());
    const nextMs = next.getTime();
    if (nextMs > now) break;
    // skip months where the day doesn't exist and candidates predating the schedule start
    if (nextMs >= schedule.start && next.getMonth() === month) lastMs = nextMs;
    if (++month === 12) {
      month = 0;
      year++;
    }
  }

  return lastMs - schedule.start;
};

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

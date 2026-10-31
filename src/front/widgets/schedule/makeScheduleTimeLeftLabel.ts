import { translateBase } from '#basis/locale';
import { howMillisecondsInDay, howMillisecondsInHour } from 'shared/const/ms';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';

const howMillisecondsInYear = howMillisecondsInDay * 365;

const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export const makeScheduleTimeLeftLabel = (startMs: number, nowMs: number, langCode?: string) => {
  const msTo = startMs - nowMs;

  if (msTo < howMillisecondsInHour) return translateBase(BaseLocaleKey.ScheduleLessThanHour);

  const startDate = new Date(startMs);
  if (isSameDay(startDate, new Date(nowMs)))
    return translateBase(BaseLocaleKey.ScheduleBeforeHours, { num: Math.floor(msTo / howMillisecondsInHour) });

  const tomorrowDate = new Date(nowMs);
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  if (isSameDay(startDate, tomorrowDate)) return makeDateLabel(startMs, langCode);

  if (msTo > howMillisecondsInYear) return translateBase(BaseLocaleKey.ScheduleMoreThanYear);

  return translateBase(BaseLocaleKey.ScheduleBeforeDays, { num: Math.ceil(msTo / howMillisecondsInDay) });
};

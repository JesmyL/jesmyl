import { atom } from 'atomaric';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi, ScheduleWidgetWid } from 'shared/api';
import { howMillisecondsInDay } from 'shared/const/ms';

export const cmMeetingLastOpenEventMiAtom = atom<
  SRecord<ScheduleWidgetWid, [ScheduleWidgetDayi, ScheduleWidgetDayEventMi]>
>(
  {},
  {
    storageKey: 'sch2com:lastOpenEventMi',
    exp: () => new Date(new Date().getTime() + howMillisecondsInDay * 2),
  },
);

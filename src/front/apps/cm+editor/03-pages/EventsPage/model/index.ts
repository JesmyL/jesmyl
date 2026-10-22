import { ScheduleWidgetDayEventMi, ScheduleWidgetDayi } from 'shared/api';

export type CmEditorEventsComsRightsScope =
  | { scope: 'users' }
  | { scope: 'day'; dayi: ScheduleWidgetDayi }
  | { scope: 'event'; dayi: ScheduleWidgetDayi; eventMi: ScheduleWidgetDayEventMi };

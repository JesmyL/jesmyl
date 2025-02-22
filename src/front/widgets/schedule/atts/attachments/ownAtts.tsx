import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import { checkListAtt } from './check-list/checkListAtt';

export const scheduleOwnAtts: ScheduleWidgetAppAtts<'SCH'> = {
  ...checkListAtt,
};

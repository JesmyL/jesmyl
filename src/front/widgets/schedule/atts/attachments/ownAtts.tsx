import { ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import { makeCheckListAtt } from './check-list/checkListAtt';

export const makeScheduleOwnAtts = (): ScheduleWidgetAppAtts<'SCH'> => ({
  ...makeCheckListAtt(),
});

import { IScheduleWidget } from 'shared/api';
import { ScheduleWidgetRights, useScheduleWidgetRights } from '../useScheduleWidget';

export function ScheduleWidgetAlarmInfoContent({
  schedule,
  content,
}: {
  schedule: IScheduleWidget;
  content: (rights: ScheduleWidgetRights) => JSX.Element;
}) {
  return content(useScheduleWidgetRights(schedule));
}

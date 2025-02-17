import { ReactNode, useMemo } from 'react';
import { IScheduleWidget } from 'shared/api';
import {
  ScheduleWidgetAppAttsContext,
  ScheduleWidgetRights,
  ScheduleWidgetRightsContext,
  makeAttStorage,
  useScheduleWidgetRights,
} from '../useScheduleWidget';

export default function ScheduleWidgetContextWrapper({
  schedule,
  rights: topRights,
  children,
}: {
  schedule: IScheduleWidget;
  rights?: ScheduleWidgetRights;
  children: ReactNode;
}) {
  const rights = useScheduleWidgetRights(schedule, topRights);
  const atts = useMemo(() => makeAttStorage(schedule), [schedule]);

  if (!schedule) return null;

  return (
    <ScheduleWidgetAppAttsContext.Provider value={atts}>
      <ScheduleWidgetRightsContext.Provider value={rights}>{children}</ScheduleWidgetRightsContext.Provider>
    </ScheduleWidgetAppAttsContext.Provider>
  );
}

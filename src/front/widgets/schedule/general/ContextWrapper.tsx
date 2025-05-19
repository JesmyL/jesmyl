import { ReactNode, useMemo } from 'react';
import { IScheduleWidget } from 'shared/api';
import { ScheduleWidgetRightsContext } from '../contexts';
import { makeAttStorage } from '../makeAttStorage';
import { ScheduleWidgetAppAttsContext, ScheduleWidgetRights, useScheduleWidgetRights } from '../useScheduleWidget';

export function ScheduleWidgetContextWrapper({
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

import { ReactNode, useMemo } from 'react';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { ScheduleScopePropsContext } from '../complect/lib/contexts';
import { ScheduleWidgetRightsContext } from '../contexts';
import { makeAttStorage } from '../makeAttStorage';
import { ScheduleWidgetAppAttsContext, ScheduleWidgetRights, useScheduleWidgetRights } from '../useScheduleWidget';

export function ScheduleWidgetContextWrapper({
  schedule,
  rights: topRights,
  children,
  scheduleScopeProps,
}: {
  schedule: IScheduleWidget;
  rights?: ScheduleWidgetRights;
  children: ReactNode;
  scheduleScopeProps: ScheduleScopeProps;
}) {
  const rights = useScheduleWidgetRights(schedule, topRights);
  const atts = useMemo(() => makeAttStorage(schedule), [schedule]);

  if (!schedule) return null;

  return (
    <ScheduleScopePropsContext.Provider value={scheduleScopeProps}>
      <ScheduleWidgetAppAttsContext.Provider value={atts}>
        <ScheduleWidgetRightsContext.Provider value={rights}>{children}</ScheduleWidgetRightsContext.Provider>
      </ScheduleWidgetAppAttsContext.Provider>
    </ScheduleScopePropsContext.Provider>
  );
}

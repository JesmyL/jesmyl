import { ReactNode, useMemo } from 'react';
import { IScheduleWidget } from 'shared/api';
import {
  ScheduleWidgetAppAttsContext,
  ScheduleWidgetRights,
  ScheduleWidgetRightsContext,
  makeAttStorage,
  useScheduleWidgetRights,
} from '../useScheduleWidget';

type Props = {
  schedule: IScheduleWidget;
  rights?: ScheduleWidgetRights;
  children: ReactNode;
};

export const ScheduleWidgetContextWrapper = ({ schedule, rights: topRights, children }: Props) => {
  const rights = useScheduleWidgetRights(schedule, topRights);
  const atts = useMemo(() => makeAttStorage(schedule), [schedule]);

  if (!schedule) return null;

  return (
    <ScheduleWidgetAppAttsContext.Provider value={atts}>
      <ScheduleWidgetRightsContext.Provider value={rights}>{children}</ScheduleWidgetRightsContext.Provider>
    </ScheduleWidgetAppAttsContext.Provider>
  );
};

import React, { use } from 'react';
import { ScheduleWidgetRights, defScheduleWidgetUserRights, defaultScheduleWidget } from './useScheduleWidget';

export const ScheduleWidgetRightsContext = React.createContext<ScheduleWidgetRights>({
  ...defScheduleWidgetUserRights,
  myUser: undefined,
  isSwPrivate: false,
  isSwBeforeRegistration: false,
  isSwHideContent: false,
  isSwPublic: false,
  auth: { level: 0 },
  schedule: defaultScheduleWidget,
});
export const useScheduleWidgetRightsContext = () => use(ScheduleWidgetRightsContext);

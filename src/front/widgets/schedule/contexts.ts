import React, { use } from 'react';
import { takeDefaultScheduleWidget } from 'shared/const/schedule-widget/const';
import { ScheduleWidgetRights, defScheduleWidgetUserRights } from './useScheduleWidget';

export const ScheduleWidgetRightsContext = React.createContext<ScheduleWidgetRights>({
  ...defScheduleWidgetUserRights,
  myUser: undefined,
  isSwPrivate: false,
  isSwBeforeRegistration: false,
  isSwHideContent: false,
  isSwPublic: false,
  auth: {},
  schedule: takeDefaultScheduleWidget(),
});
export const useScheduleWidgetRightsContext = () => use(ScheduleWidgetRightsContext);

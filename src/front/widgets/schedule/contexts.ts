import React, { use } from 'react';
import { ScheduleWidgetUserRoleRight } from 'shared/api';
import { takeDefaultScheduleWidget } from 'shared/const/schedule-widget/const';
import { ScheduleWidgetRights, defScheduleWidgetUserRights } from './useScheduleWidget';

export const ScheduleWidgetRightsContext = React.createContext<ScheduleWidgetRights>({
  ...defScheduleWidgetUserRights,
  myUser: undefined,
  myUserR: ScheduleWidgetUserRoleRight.Read,
  isTopUser: false,
  isSwPrivate: false,
  isSwBeforeRegistration: false,
  isSwHideContent: false,
  isSwPublic: false,
  auth: {},
  schedule: takeDefaultScheduleWidget(),
  userInfoById: new Map(),
  userInfoByLogin: new Map(),
});
export const useScheduleWidgetRightsContext = () => use(ScheduleWidgetRightsContext);

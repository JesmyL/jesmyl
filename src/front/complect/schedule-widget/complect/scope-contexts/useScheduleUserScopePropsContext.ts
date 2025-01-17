import { contextCreator } from 'front/complect/contextCreator';
import { IScheduleWidgetUserMi, IScheduleWidgetWid, ScheduleUserScopeProps } from 'shared/api';

export const [ScheduleUserScopePropsContext, useScheduleUserScopePropsContext] = contextCreator<ScheduleUserScopeProps>(
  {
    schw: IScheduleWidgetWid.def,
    userMi: IScheduleWidgetUserMi.def,
  },
);

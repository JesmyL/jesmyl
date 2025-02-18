import { contextCreator } from 'front/08-shared/lib/contextCreator';
import {
  IScheduleWidgetUserMi,
  IScheduleWidgetWid,
  ScheduleDayScopeProps,
  ScheduleScopeProps,
  ScheduleUserScopeProps,
} from 'shared/api';

export const [ScheduleScopePropsContext, useScheduleScopePropsContext] = contextCreator<ScheduleScopeProps>({
  schw: IScheduleWidgetWid.def,
});

export const [ScheduleUserScopePropsContext, useScheduleUserScopePropsContext] = contextCreator<ScheduleUserScopeProps>(
  {
    schw: IScheduleWidgetWid.def,
    userMi: IScheduleWidgetUserMi.def,
  },
);

export const [ScheduleDayScopePropsContext, useScheduleDayScopePropsContext] = contextCreator<ScheduleDayScopeProps>({
  schw: IScheduleWidgetWid.def,
  dayi: -1,
});

import { contextCreator } from '#shared/lib/contextCreator';
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

export const [ScheduleCurrentSchwContext, useScheduleCurrentSchwContext] = contextCreator<IScheduleWidgetWid>(
  IScheduleWidgetWid.def,
);

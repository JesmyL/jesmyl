import { contextCreator } from '#shared/lib/contextCreator';
import {
  ScheduleDayScopeProps,
  ScheduleScopeProps,
  ScheduleUserScopeProps,
  ScheduleWidgetDayi,
  ScheduleWidgetUserMi,
  ScheduleWidgetWid,
  ScheduleWidgetWidDef,
} from 'shared/api';

export const [ScheduleScopePropsContext, useScheduleScopePropsContext] = contextCreator<ScheduleScopeProps>({
  schw: ScheduleWidgetWidDef,
});

export const [ScheduleUserScopePropsContext, useScheduleUserScopePropsContext] = contextCreator<ScheduleUserScopeProps>(
  {
    schw: ScheduleWidgetWidDef,
    userMi: ScheduleWidgetUserMi.def,
  },
);

export const [ScheduleDayScopePropsContext, useScheduleDayScopePropsContext] = contextCreator<ScheduleDayScopeProps>({
  schw: ScheduleWidgetWidDef,
  dayi: -1 as ScheduleWidgetDayi,
});

export const [ScheduleCurrentSchwContext, useScheduleCurrentSchwContext] =
  contextCreator<ScheduleWidgetWid>(ScheduleWidgetWidDef);

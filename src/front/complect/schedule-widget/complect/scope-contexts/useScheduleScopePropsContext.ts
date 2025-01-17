import { contextCreator } from 'front/complect/contextCreator';
import { IScheduleWidgetWid, ScheduleScopeProps } from 'shared/api';

export const [ScheduleScopePropsContext, useScheduleScopePropsContext] = contextCreator<ScheduleScopeProps>({
  schw: IScheduleWidgetWid.def,
});

import {
  IScheduleWidget,
  IScheduleWidgetDayEvent,
  ScheduleDayScopeProps,
  ScheduleScopeProps,
  ScheduleWidgetDayListItemTypeBox,
} from 'shared/api';
import { Eventer } from 'shared/utils';

export const onScheduleDayEventListSetEvent = Eventer.createValue<
  {
    dayProps: ScheduleDayScopeProps;
    list: OmitOwn<IScheduleWidgetDayEvent, 'mi'>[];
  },
  Promise<IScheduleWidget>
>();

export const onScheduleDayBeginTimeSetEvent = Eventer.createValue<
  {
    dayProps: ScheduleDayScopeProps;
    strWup: string;
  },
  Promise<IScheduleWidget>
>();

export const onScheduleEventTypesAddManyEvent = Eventer.createValue<
  {
    schProps: ScheduleScopeProps;
    typeList: ScheduleWidgetDayListItemTypeBox[];
  },
  Promise<IScheduleWidget>
>();

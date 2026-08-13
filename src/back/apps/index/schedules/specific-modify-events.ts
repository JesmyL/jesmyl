import {
  IScheduleWidget,
  IScheduleWidgetDayEvent,
  ScheduleDayEventScopeProps,
  ScheduleDayScopeProps,
  ScheduleScopeProps,
  ScheduleWidgetDayListItemTypeBox,
  SokiAuthLogin,
} from 'shared/api';
import { Eventer } from 'shared/utils';

export const onScheduleDayEventListSetEvent = Eventer.createValue<
  {
    dayProps: ScheduleDayScopeProps;
    list: OmitOwn<IScheduleWidgetDayEvent, 'mi'>[];
  },
  Promise<IScheduleWidget>
>();

export const onScheduleDayEventIsNeedTgInformSetEvent = Eventer.createValue<
  {
    dayEventProps: ScheduleDayEventScopeProps;
    value: Bool;
    isNeedRefreshTgInformTime: boolean;
  },
  Promise<IScheduleWidget>
>();

export const onScheduleUserTgInformSetEvent = Eventer.createValue<
  {
    schProps: ScheduleScopeProps;
    isNotInform: Bool;
    userLogin: SokiAuthLogin | nil;
  },
  Promise<{ value: IScheduleWidget; description: string | null }>
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

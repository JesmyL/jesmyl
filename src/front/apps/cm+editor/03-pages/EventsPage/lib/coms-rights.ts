import { IScheduleWidgetComsRights, ScheduleWidgetDayEventMi, ScheduleWidgetDayi, UserId } from 'shared/api';
import { objectLength } from 'shared/utils/object.utils';
import { CmEditorEventsComsRightsScope } from '../model';

const takeKey = <Key extends number>(value: unknown, title: string): Key => {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0)
    throw new Error(`${title} must be a non-negative finite number, received ${String(value)}`);

  return value as Key;
};

export const takeCmEditorEventsDayi = (dayi: unknown) => takeKey<ScheduleWidgetDayi>(dayi, 'Schedule day key');

export const takeCmEditorEventsEventMi = (eventMi: unknown) =>
  takeKey<ScheduleWidgetDayEventMi>(eventMi, 'Schedule event key');

export const makeCmEditorEventsComsRightsValue = (
  rights: IScheduleWidgetComsRights | nil,
  scope: CmEditorEventsComsRightsScope,
  userIds: UserId[],
): IScheduleWidgetComsRights | nil => {
  const next: IScheduleWidgetComsRights = { ...rights };

  if (scope.scope === 'users') {
    if (userIds.length) next.users = userIds;
    else delete next.users;

    return objectLength(next) ? next : null;
  }

  const dayi = takeCmEditorEventsDayi(scope.dayi);

  if (scope.scope === 'day') {
    next.days = { ...next.days };

    if (userIds.length) next.days[dayi] = userIds;
    else delete next.days[dayi];

    if (!objectLength(next.days)) delete next.days;
  } else {
    const eventMi = takeCmEditorEventsEventMi(scope.eventMi);
    const dayEvents = { ...next.events?.[dayi] };

    next.events = { ...next.events };

    if (userIds.length) dayEvents[eventMi] = userIds;
    else delete dayEvents[eventMi];

    if (objectLength(dayEvents)) next.events[dayi] = dayEvents;
    else delete next.events[dayi];

    if (!objectLength(next.events)) delete next.events;
  }

  return objectLength(next) ? next : null;
};

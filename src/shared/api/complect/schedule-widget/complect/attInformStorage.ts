import {
  cmTgAttInform,
  IScheduleWidget,
  IScheduleWidgetDayEvent,
  ScheduleWidgetAttKey,
  ScheduleWidgetDayi,
} from 'shared/api';

export type AttTgInformStorage = Record<
  ScheduleWidgetAttKey,
  (
    value: unknown,
    eventTitle: string,
    schedule: IScheduleWidget,
    dayi: ScheduleWidgetDayi,
    event: IScheduleWidgetDayEvent,
    attMi: number | string,
  ) => `${string}\n\n` | null
>;

export const attInformStorage: AttTgInformStorage = {
  ...cmTgAttInform,
};

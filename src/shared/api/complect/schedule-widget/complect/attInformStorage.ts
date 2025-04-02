import { cmTgAttInform, IScheduleWidget, IScheduleWidgetDayEvent, ScheduleWidgetAttKey } from 'shared/api';

export type AttTgInformStorage = Record<
  ScheduleWidgetAttKey,
  (
    value: unknown,
    eventTitle: string,
    schedule: IScheduleWidget,
    dayi: number,
    event: IScheduleWidgetDayEvent,
    attMi: number | string,
  ) => `${string}\n\n` | null
>;

export const attInformStorage: AttTgInformStorage = {
  ...cmTgAttInform,
};

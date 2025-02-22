import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleWidgetAttKey } from 'shared/api';
import { cmTgAttInform } from '../../apps/cm/complect/attInformCm';

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

import { cmTgAttInform } from '../../../cm/attInformCm';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleWidgetAttKey } from '../../models/ScheduleWidget.model';

export type AttTgInformStorage = Record<
  ScheduleWidgetAttKey,
  (
    value: any,
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

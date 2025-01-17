import { IScheduleWidget } from 'shared/api/complect/schedule-widget';

export type SchSokiInvocatorSharesMethods = {
  editedSchedule: (sch: IScheduleWidget) => unknown;
  freshSchedules: (schs: IScheduleWidget[]) => unknown;
};

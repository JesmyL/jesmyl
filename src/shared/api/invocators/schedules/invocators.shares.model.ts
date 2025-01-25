import { IScheduleWidget } from 'shared/api/complect/schedule-widget';

export type SchSokiInvocatorSharesModel = {
  editedSchedule: (sch: IScheduleWidget) => unknown;
  refreshSchedules: (schs: IScheduleWidget[]) => unknown;
};

import { IScheduleWidget } from 'shared/api/complect/schedule-widget';

export type SchSokiInvocatorSharesModel = {
  editedSchedule: (args: { sch: IScheduleWidget }) => unknown;
  refreshSchedules: (args: { schs: IScheduleWidget[] }) => unknown;
};

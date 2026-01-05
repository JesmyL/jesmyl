import { DirStorage } from 'back/complect/DirStorage';
import { IScheduleWidget, IScheduleWidgetWid } from 'shared/api';
import { takeDefaultScheduleWidget } from 'shared/const/schedule-widget/const';

export const schedulesDirStore = new DirStorage<IScheduleWidget, IScheduleWidgetWid, 'w'>({
  dirPath: '/apps/index/schedules/',
  idKey: 'w',
  makeNewItem: takeDefaultScheduleWidget,
});

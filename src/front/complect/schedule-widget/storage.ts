import { IScheduleWidget, IScheduleWidgetUser, ScheduleWidgetPhotoKey } from 'shared/api';

export const getScheduleWidgetUserPhotoStorageKey = (
  user: IScheduleWidgetUser,
  schedule: IScheduleWidget,
): ScheduleWidgetPhotoKey => `${schedule.w}/mi:${user.mi}`;

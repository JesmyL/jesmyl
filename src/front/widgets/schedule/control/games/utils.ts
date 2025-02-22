import { IScheduleWidgetUser, scheduleWidgetUserRights, ScheduleWidgetUserRoleRight } from 'shared/api';

export const checkIsUserPhotoable = (user: IScheduleWidgetUser) =>
  !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.ReadTitles);

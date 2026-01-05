import { contextCreator } from '#shared/lib/contextCreator';
import { useAuth } from '$index/shared/state/atoms';
import { useMemo } from 'react';
import {
  IScheduleWidget,
  IScheduleWidgetRole,
  IScheduleWidgetUser,
  LocalSokiAuth,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { takeDefaultScheduleWidget } from 'shared/const/schedule-widget/const';
import { ScheduleWidgetAppAtts, ScheduleWidgetAttRefs } from './ScheduleWidget.model';

export const [ScheduleWidgetAppAttsContext, useScheduleWidgetAppAttsContext] = contextCreator<
  [ScheduleWidgetAppAtts, ScheduleWidgetAttRefs]
>([{}, {}]);

export interface ScheduleWidgetRights extends ScheduleWidgetUserRights, ScheduleWidgetScheduleWidgetRegType {
  myUser: IScheduleWidgetUser | undefined;
  schedule: IScheduleWidget;
  auth: LocalSokiAuth;
}

type ScheduleWidgetUserRights = Record<`isCan${Exclude<keyof typeof ScheduleWidgetUserRoleRight, 'Free'>}`, boolean>;
type ScheduleWidgetScheduleWidgetRegType = Record<`isSw${keyof typeof ScheduleWidgetRegType}`, boolean>;

export const defScheduleWidgetUserRights: ScheduleWidgetUserRights = {
  isCanTotalRedact: false,
  isCanRead: false,
  isCanReadSpecials: false,
  isCanReadTitles: false,
  isCanRedact: false,
  isCanRedactUsers: false,
};

export const useScheduleWidgetRights = (schedule: IScheduleWidget | nil, rights?: ScheduleWidgetRights) => {
  const auth = useAuth();

  return useMemo((): ScheduleWidgetRights => {
    if (rights !== undefined) return rights;
    if (schedule == null)
      return {
        auth,
        isCanRead: false,
        isCanReadSpecials: false,
        isCanReadTitles: false,
        isCanRedact: false,
        isCanRedactUsers: false,
        isCanTotalRedact: false,
        isSwBeforeRegistration: false,
        isSwHideContent: false,
        isSwPublic: false,
        isSwPrivate: false,
        myUser: undefined,
        schedule: takeDefaultScheduleWidget(),
      };

    const myUser = schedule.ctrl.users.find(user => user.login === auth.login);
    const isSwPublic = scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.Public);
    const isSwBeforeRegistration = scheduleWidgetRegTypeRights.checkIsHasRights(
      schedule.ctrl.type,
      ScheduleWidgetRegType.BeforeRegistration,
    );
    const isSwHideContent = scheduleWidgetRegTypeRights.checkIsHasRights(
      schedule.ctrl.type,
      ScheduleWidgetRegType.HideContent,
    );

    const myUserR = myUser?.R ?? schedule.ctrl.defu;

    const isCanRead =
      (isSwPublic && !isSwHideContent) ||
      scheduleWidgetUserRights.checkIsHasRights(myUserR, ScheduleWidgetUserRoleRight.Read);
    const isCanReadTitles =
      (isSwPublic && !isSwBeforeRegistration) ||
      (isCanRead && scheduleWidgetUserRights.checkIsHasRights(myUserR, ScheduleWidgetUserRoleRight.ReadTitles));
    const isCanReadSpecials = scheduleWidgetUserRights.checkIsHasRights(
      myUserR,
      ScheduleWidgetUserRoleRight.ReadSpecials,
    );
    const isCanRedact = scheduleWidgetUserRights.checkIsHasRights(myUserR, ScheduleWidgetUserRoleRight.Redact);
    const isCanRedactUsers = scheduleWidgetUserRights.checkIsHasRights(
      myUserR,
      ScheduleWidgetUserRoleRight.RedactUsers,
    );
    const isCanTotalRedact = scheduleWidgetUserRights.checkIsHasRights(
      myUserR,
      ScheduleWidgetUserRoleRight.TotalRedact,
    );

    return {
      auth,
      myUser,
      isCanTotalRedact,
      isCanRead,
      isCanReadSpecials,
      isCanReadTitles,
      isCanRedact,
      isCanRedactUsers,
      isSwBeforeRegistration,
      isSwHideContent,
      isSwPublic,
      isSwPrivate: !isSwPublic,
      schedule,
    };
  }, [auth, schedule, rights]);
};

export const extractScheduleWidgetRole = (schedule: IScheduleWidget, roleMi: number) => {
  return schedule.ctrl.roles.find(role => role.mi === roleMi);
};

export const extractScheduleWidgetRoleUser = (
  schedule: IScheduleWidget,
  roleMi: number,
  role?: IScheduleWidgetRole | nil,
) => {
  const roleUserMi = (role ?? extractScheduleWidgetRole(schedule, roleMi))?.userMi;
  if (roleUserMi === undefined) return null;
  const roleUser = schedule.ctrl.users.find(user => user.mi === roleUserMi);
  if (roleUser === undefined) return null;
  return roleUser;
};

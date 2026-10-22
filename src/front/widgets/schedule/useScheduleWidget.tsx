import { contextCreator } from '#shared/lib/contextCreator';
import { useAuth, useUserInfoDict } from '$index/shared/state';
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
  UserId,
  UserInfoUnsecure,
  UserLogin,
} from 'shared/api';
import { takeDefaultScheduleWidget } from 'shared/const/schedule-widget/const';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { ScheduleWidgetAppAtts, ScheduleWidgetAttRefs } from './ScheduleWidget.model';

export const [ScheduleWidgetAppAttsContext, useScheduleWidgetAppAttsContext] = contextCreator<
  [ScheduleWidgetAppAtts, ScheduleWidgetAttRefs]
>([{}, {}]);

export interface ScheduleWidgetRights extends ScheduleWidgetUserRights, ScheduleWidgetScheduleWidgetRegType {
  myUser: IScheduleWidgetUser | undefined;
  schedule: IScheduleWidget;
  auth: LocalSokiAuth;
  userInfoById: Map<UserId, UserInfoUnsecure>;
  userInfoByLogin: Map<UserLogin, UserInfoUnsecure>;
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
  isCanAddDays: false,
  isCanAddEvents: false,
  isCanRedactEventContent: false,
  isCanRedactComsList: false,
};

export const useScheduleWidgetRights = (schedule: IScheduleWidget | nil, rights?: ScheduleWidgetRights) => {
  const auth = useAuth();
  const userInfo = useUserInfoDict();

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
        isCanAddDays: false,
        isCanAddEvents: false,
        isCanRedactEventContent: false,
        isCanRedactComsList: false,
        isSwBeforeRegistration: false,
        isSwHideContent: false,
        isSwPublic: false,
        isSwPrivate: false,
        myUser: undefined,
        schedule: takeDefaultScheduleWidget(),
        userInfoById: userInfo.byId,
        userInfoByLogin: userInfo.byLogin,
      };

    const myUserId = auth.login ? userInfo.byLogin.get(auth.login)?.id : null;
    const myUser = myUserId == null ? undefined : schedule.ctrl.users.find(user => user.id === myUserId);
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
    const isCanAddDays = scheduleWidgetUserRights.checkIsHasIndividualRights(
      myUserR,
      ScheduleWidgetUserRoleRight.AddDays,
    );
    const isCanAddEvents = scheduleWidgetUserRights.checkIsHasIndividualRights(
      myUserR,
      ScheduleWidgetUserRoleRight.AddEvents,
    );
    const isCanRedactEventContent = scheduleWidgetUserRights.checkIsHasIndividualRights(
      myUserR,
      ScheduleWidgetUserRoleRight.RedactEventContent,
    );
    const isCanRedactComsList = scheduleWidgetUserRights.checkIsHasIndividualRights(
      myUserR,
      ScheduleWidgetUserRoleRight.RedactComsList,
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
      isCanAddDays,
      isCanAddEvents,
      isCanRedactEventContent,
      isCanRedactComsList,
      isSwBeforeRegistration,
      isSwHideContent,
      isSwPublic,
      isSwPrivate: !isSwPublic,
      schedule,
      userInfoById: userInfo.byId,
      userInfoByLogin: userInfo.byLogin,
    };
  }, [auth, schedule, rights, userInfo]);
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

export const takeScheduleWidgetUserName = (rights: ScheduleWidgetRights, user: IScheduleWidgetUser) => {
  const userAuth = rights.userInfoById.get(user.id)?.uauth;

  return userAuth?.fio && userAuth.nick && userAuth.fio !== userAuth.nick
    ? `${userAuth.fio} (${userAuth.nick})`
    : takeUserAuthName(userAuth);
};

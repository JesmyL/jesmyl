import {
  IScheduleWidget,
  IScheduleWidgetUser,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  SokiAuthLogin,
} from 'shared/api';
import { itNNil, smylib } from 'shared/utils';
import { knownStameskaIconNames, knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { StameskaIconPack } from 'stameska-icon/utils';
import { WebSocket } from 'ws';
import { indexServerTsjrpcBase } from '..';
import { indexStameskaIconsFileStore, userAccessRightsAndRolesFileStore } from '../../file-stores';
import { schedulesFileStore } from '../../schedules/file-stores';
import { schServerTsjrpcShareMethods } from '../../schedules/tsjrpc.shares';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { makeUserAccessRights } from './makeUserAccessRights';

export const indexTSJRPCBaseRequestFreshes: typeof indexServerTsjrpcBase.requestFreshes = async (
  { lastModfiedAt, iconPacks: userIconPacks, iconsMd5Hash: userIconsMd5Hash },
  { client, auth },
) => {
  const isNoAuth = auth == null;
  const login = auth?.login;
  const someScheduleUser = (user: IScheduleWidgetUser) => user.login === login;

  if (login != null && client != null) {
    const rightsAndRoles = userAccessRightsAndRolesFileStore.getValue();
    const userRights = rightsAndRoles.rights[login];

    if (userRights != null && userRights.info.m > lastModfiedAt) {
      refreshUserAccessRights(login, client, userRights.info.m);
    } else {
      const userRole = userRights?.info.role ? rightsAndRoles.roles[userRights.info.role] : null;

      if (smylib.isObj(userRole) && userRole.info.m > lastModfiedAt) {
        refreshUserAccessRights(login, client, userRole.info.m);
      }
    }
  }

  const schedules: IScheduleWidget[] = [];

  schedulesFileStore.getValue().forEach((sch): number | null => {
    const removedSch = { w: sch.w, isRemoved: 1 } as IScheduleWidget;

    if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public)) {
      if (sch.m <= lastModfiedAt) return null;
      return schedules.push(sch);
    }

    if (isNoAuth) return schedules.push(removedSch);
    if (!sch.ctrl.users.some(someScheduleUser)) return schedules.push(removedSch);

    if (sch.m <= lastModfiedAt) return null;

    return schedules.push(sch);
  });

  if (userIconsMd5Hash !== knownStameskaIconNamesMd5Hash || !userIconPacks?.length || !!schedules.length) {
    const userActualIconDict: PRecord<KnownStameskaIconName, StameskaIconPack | null> = {};
    const knownIconNamesSet = new Set(knownStameskaIconNames);

    userIconPacks?.forEach(iconName => {
      if (knownIconNamesSet.has(iconName)) {
        knownIconNamesSet.delete(iconName);

        if (userActualIconDict[iconName] === null) {
          delete userActualIconDict[iconName];
        }
        return;
      }

      userActualIconDict[iconName] = null;
    });

    knownIconNamesSet.forEach(knownIconName => {
      userActualIconDict[knownIconName] = indexStameskaIconsFileStore.getValue()[knownIconName];
    });

    const userIconPacksSet = new Set(userIconPacks);
    const userAccessSchedules: IScheduleWidget[] = [];

    schedulesFileStore.getValue().forEach(sch => {
      if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public)) {
        userAccessSchedules.push(sch);
      } else {
        if (
          scheduleWidgetUserRights.checkIsHasRights(
            sch.ctrl.users.find(user => user.login === login)?.R,
            ScheduleWidgetUserRoleRight.Read,
          )
        )
          userAccessSchedules.push(sch);
      }
    });

    userAccessSchedules
      .map(extractAllScheduleIcons)
      .flat(2)
      .filter(itNNil)
      .forEach(iconName => {
        if (userIconPacksSet.has(iconName)) return;
        userActualIconDict[iconName] = indexStameskaIconsFileStore.getValue()[iconName];
      });

    if (knownStameskaIconNamesMd5Hash !== userIconsMd5Hash || smylib.keys(userActualIconDict).length)
      indexServerTsjrpcShareMethods.updateKnownIconPacks(
        {
          actualIconPacks: userActualIconDict,
          iconsMd5Hash: knownStameskaIconNamesMd5Hash,
        },
        client,
      );
  }

  if (schedules.length) schServerTsjrpcShareMethods.refreshSchedules({ schs: schedules }, client);
};

const extractIcon = <Icon>(it: { icon?: Icon }) => it.icon;
const extractAllScheduleIcons = (sch: IScheduleWidget) => {
  return sch
    ? [
        //
        sch.tatts?.map(extractIcon) ?? [],
        sch.ctrl?.roles?.map(extractIcon) ?? [],
        sch.lists?.cats?.map(extractIcon) ?? [],
      ]
    : [];
};

const refreshUserAccessRights = (login: SokiAuthLogin, client: WebSocket, lastModifiedAt: number) =>
  indexServerTsjrpcShareMethods.refreshAccessRights({ rights: makeUserAccessRights(login), lastModifiedAt }, client);

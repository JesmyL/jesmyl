import { IScheduleWidget, IScheduleWidgetUser, ScheduleWidgetRegType, scheduleWidgetRegTypeRights } from 'shared/api';
import { itNNil, itNNull, smylib } from 'shared/utils';
import { knownStameskaIconNames, knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { stameskaIconPack } from 'stameska-icon/pack';
import { StameskaIconPack } from 'stameska-icon/utils';
import { indexServerTsjrpcBase } from '..';
import { userAccessRightsFileStore } from '../../file-stores';
import { schedulesFileStore } from '../../schedules/file-stores';
import { schServerTsjrpcShareMethods } from '../../schedules/tsjrpc.shares';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';

export const indexTSJRPCBaseRequestFreshes: typeof indexServerTsjrpcBase.requestFreshes = async (
  { lastModfiedAt, iconPacks: userIconPacks, iconsMd5Hash: userIconsMd5Hash },
  { client, auth },
) => {
  const isNoAuth = auth == null;
  const login = auth?.login;
  const someScheduleUser = (user: IScheduleWidgetUser) => user.login === login;
  const userRights = userAccessRightsFileStore.getValue();

  if (login != null && userRights[login] != null && userRights[login].info.m > lastModfiedAt) {
    const { info, ...rights } = userRights[login];
    indexServerTsjrpcShareMethods.refreshAccessRights({ rights });
  }

  const schedules = schedulesFileStore
    .getValue()
    .map((sch): IScheduleWidget | null => {
      const removedSch = { w: sch.w, isRemoved: 1 } as IScheduleWidget;

      if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public)) {
        if (sch.m <= lastModfiedAt) return null;
        return sch;
      }
      if (isNoAuth) return removedSch;
      if (!sch.ctrl.users.some(someScheduleUser)) return removedSch;

      if (sch.m <= lastModfiedAt) return null;

      return sch;
    })
    .filter(itNNull);

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
      userActualIconDict[knownIconName] = stameskaIconPack[knownIconName];
    });

    const userIconPacksSet = new Set(userIconPacks);

    schedules
      .map(extractAllScheduleIcons)
      .flat(2)
      .filter(itNNil)
      .forEach(iconName => {
        if (userIconPacksSet.has(iconName)) return;
        userActualIconDict[iconName] = stameskaIconPack[iconName];
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
  return [
    //
    sch.tatts?.map(extractIcon) ?? [],
    sch.ctrl.roles?.map(extractIcon) ?? [],
    sch.lists.cats?.map(extractIcon) ?? [],
  ];
};

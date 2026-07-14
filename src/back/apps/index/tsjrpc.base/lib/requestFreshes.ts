import { ServerTsjrpcSatisfy } from 'back/complect/model/tsjrpc.satisfy';
import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { and, eq, gt } from 'drizzle-orm';
import { makePgCheckedSelectSqlRaw, PgCheckFieldMode } from 'p/d';
import {
  IScheduleWidget,
  IScheduleWidgetUser,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  SokiAuthLogin,
} from 'shared/api';
import { IndexTsjrpcModel } from 'shared/api/tsjrpc/index/basics.tsjrpc.model';
import { Bool } from 'shared/enums';
import { itNNil } from 'shared/utils';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { knownStameskaIconNames, knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { StameskaIconPack } from 'stameska-icon/utils';
import { WebSocket } from 'ws';
import { indexStameskaIconsFileStore } from '../../file-stores';
import { schServerTsjrpcShareMethods } from '../../schedules/tsjrpc.shares';
import { takeUserRoleTiny } from '../../tinies/userRoleTiny';
import { takeUserTiny } from '../../tinies/userTiny';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { makeUserAccessRights } from './makeUserAccessRights';

export const indexTSJRPCBaseRequestFreshes = {
  requestFreshes: async (
    { lastModfiedAt, iconPacks: userIconPacks, iconsMd5Hash: userIconsMd5Hash },
    { client, auth },
  ) => {
    const isNoAuth = auth == null;
    const login = auth?.login;
    const someScheduleUser = (user: IScheduleWidgetUser) => user.login === login;

    if (login && client) {
      const userInfo = await takeUserTiny(login);

      if (userInfo && userInfo.m > lastModfiedAt) {
        await refreshUserAccessRights(login, client, userInfo.m);
      } else {
        const userRole = userInfo?.r && (await takeUserRoleTiny(userInfo.r));

        if (userRole && userRole.m > lastModfiedAt) {
          await refreshUserAccessRights(login, client, userRole.m);
        }
      }
    }

    const schedules: IScheduleWidget[] = [];

    const freshSchedules = await db
      .select({
        sch: makePgCheckedSelectSqlRaw(scheduleDB, {
          id: PgCheckFieldMode.Remove,
          isRemoved: PgCheckFieldMode.Remove,
          games: PgCheckFieldMode.RemoveIfNull,
          tgChatReqs: PgCheckFieldMode.RemoveIfNull,
          withTech: `=${Bool.False}`,
          tgInform: `=${Bool.True}`,
          prevStart: `=0`,
        }),
      })
      .from(scheduleDB)
      .where(and(gt(scheduleDB.m, lastModfiedAt), eq(scheduleDB.isRemoved, Bool.False)));

    freshSchedules.forEach(({ sch }): number | null => {
      const removedSch = { w: sch.w, isRemoved: 1 } as IScheduleWidget;

      if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public)) {
        return schedules.push(sch);
      }

      if (isNoAuth) return schedules.push(removedSch);
      if (!sch.ctrl.users.some(someScheduleUser)) return schedules.push(removedSch);

      return schedules.push(sch);
    });

    if (userIconsMd5Hash !== knownStameskaIconNamesMd5Hash || !userIconPacks?.length || !!schedules.length) {
      const userActualIconDict: PRecord<KnownStameskaIconName, StameskaIconPack | null> = {};
      const knownIconNamesSet = new Set(objectKeys(knownStameskaIconNames));

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

      freshSchedules.forEach(({ sch }) => {
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

      if (knownStameskaIconNamesMd5Hash !== userIconsMd5Hash || objectLength(userActualIconDict))
        indexServerTsjrpcShareMethods.updateKnownIconPacks(
          {
            actualIconPacks: userActualIconDict,
            iconsMd5Hash: knownStameskaIconNamesMd5Hash,
          },
          client,
        );
    }

    if (schedules.length) schServerTsjrpcShareMethods.refreshSchedules({ schs: schedules }, client);
  },
} satisfies ServerTsjrpcSatisfy<IndexTsjrpcModel>;

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

const refreshUserAccessRights = async (login: SokiAuthLogin, client: WebSocket, mod: number) =>
  indexServerTsjrpcShareMethods.refreshAccessRights({ rights: await makeUserAccessRights(login), mod }, client);

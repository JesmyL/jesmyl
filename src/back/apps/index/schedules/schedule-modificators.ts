import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import { scheduleDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { ServerTSJRPCTool } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { eq } from 'drizzle-orm';
import {
  checkIsCanRedactScheduleComsList,
  IScheduleWidget,
  IScheduleWidgetDay,
  LocalSokiAuth,
  ScheduleDayScopeProps,
  ScheduleScopeProps,
  ScheduleWidgetDayEventMi,
  ScheduleWidgetDayi,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { Bool } from 'shared/enums';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { deepClone } from 'shared/utils/clone';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { takeUserLoginsByIds, takeUserTiny } from '../tinies/userTiny';
import { schedulePushInformer } from './app-inform/schedule-informer';
import { takeScheduleWidgetTiny } from './schedule.tiny';
import { schServerTsjrpcShareMethods } from './tsjrpc.shares';

const uncheckedKeysSet = new Set<keyof IScheduleWidget>(['w', 'm']);

export const throwIfNoExternalMutationAuth = (tool: ServerTSJRPCTool) => {
  if (tool.client != null) takeLogginedAuthOrThrow(tool.auth);
};

export const throwIfNoScheduleTotalRedact = async (sch: IScheduleWidget, auth: LocalSokiAuth | nil) => {
  const authUser = await takeUserTiny({ l: takeLogginedAuthOrThrow(auth).login }, false);
  const schUser = authUser && sch.ctrl.users.find(user => user.id === authUser.id);

  if (
    schUser == null ||
    !scheduleWidgetUserRights.checkIsHasRights(schUser.R ?? sch.ctrl.defu, ScheduleWidgetUserRoleRight.TotalRedact)
  )
    throw backLocaleError(BackLocaleKey.NoRightsChangeScheduleMembers);
};

const takeAuthScheduleUserRights = async (sch: IScheduleWidget, auth: LocalSokiAuth | nil) => {
  const authUser = await takeUserTiny({ l: takeLogginedAuthOrThrow(auth).login }, false);

  return (authUser && sch.ctrl.users.find(user => user.id === authUser.id)?.R) ?? sch.ctrl.defu;
};

const makeThrowIfNoScheduleRights =
  (ruleKey: ScheduleWidgetUserRoleRight, message: string) => async (sch: IScheduleWidget, auth: LocalSokiAuth | nil) => {
    const R = await takeAuthScheduleUserRights(sch, auth);

    if (
      (scheduleWidgetUserRights.texts.find(({ id }) => id === ruleKey)?.individual
        ? scheduleWidgetUserRights.checkIsHasIndividualRights(R, ruleKey)
        : scheduleWidgetUserRights.checkIsHasRights(R, ruleKey)) ||
      scheduleWidgetUserRights.checkIsHasRights(R, ScheduleWidgetUserRoleRight.TotalRedact)
    )
      return;

    throw message;
  };

export const throwIfNoScheduleRedact = makeThrowIfNoScheduleRights(
  ScheduleWidgetUserRoleRight.Redact,
  backLocaleError(BackLocaleKey.NoRightsScheduleRedact),
);

export const throwIfNoScheduleUsersRedact = makeThrowIfNoScheduleRights(
  ScheduleWidgetUserRoleRight.RedactUsers,
  backLocaleError(BackLocaleKey.NoRightsScheduleUsersRedact),
);

export const throwIfNoScheduleDaysAdd = makeThrowIfNoScheduleRights(
  ScheduleWidgetUserRoleRight.AddDays,
  backLocaleError(BackLocaleKey.NoRightsScheduleAddDays),
);

export const throwIfNoScheduleEventsAdd = makeThrowIfNoScheduleRights(
  ScheduleWidgetUserRoleRight.AddEvents,
  backLocaleError(BackLocaleKey.NoRightsScheduleAddEvents),
);

export const throwIfNoScheduleEventContentRedact = makeThrowIfNoScheduleRights(
  ScheduleWidgetUserRoleRight.RedactEventContent,
  backLocaleError(BackLocaleKey.NoRightsScheduleEventContentRedact),
);

export const throwIfNoScheduleComsListRedact = async (
  sch: IScheduleWidget,
  auth: LocalSokiAuth | nil,
  dayi: ScheduleWidgetDayi,
  eventMi: ScheduleWidgetDayEventMi,
) => {
  const loggedAuth = takeLogginedAuthOrThrow(auth);
  const authUser = await takeUserTiny({ l: loggedAuth.login }, false);

  if (authUser) {
    if (checkIsCanRedactScheduleComsList(sch, authUser.id, dayi, eventMi)) return;

    const schUser = sch.ctrl.users.find(user => user.id === authUser.id);

    if (
      schUser &&
      scheduleWidgetUserRights.checkIsHasRights(schUser.R ?? sch.ctrl.defu, ScheduleWidgetUserRoleRight.TotalRedact)
    )
      return;
  }

  try {
    await throwIfNoUserScopeAccessRight(loggedAuth, 'cm', 'EVENT', 'U');
  } catch (error) {
    if (typeof error !== 'string') throw error;
    throw backLocaleError(BackLocaleKey.NoRightsChangeEventComs);
  }
};

export const modifySchedule =
  <Props extends { props: ScheduleScopeProps }>(
    isNeedRefreshInformTime: boolean,
    modifier: (sch: IScheduleWidget, props: Props, tool: ServerTSJRPCTool) => PromiseOr<string | null>,
  ) =>
  async (props: Props, tool: ServerTSJRPCTool) => {
    throwIfNoExternalMutationAuth(tool);

    const sch = await takeScheduleWidgetTiny({ w: props.props.schw });
    const clone = deepClone(sch);

    const description = await modifier(sch, props, tool);

    const updates: Partial<IScheduleWidget> = {};

    objectKeys({ ...sch, ...clone }).forEach(key => {
      if (key === 'id' || uncheckedKeysSet.has(key) || checkIsEq(clone[key], sch[key])) return;

      updates[key] = (sch[key] ?? null) as never;
    });

    if (objectLength(updates)) {
      const mod = Date.now();

      await dbUpdate(
        scheduleDB,
        {
          ...updates,
          isRemoved: updates.isRemoved ? Bool.True : Bool.False,
          withTech: updates.withTech ? Bool.True : Bool.False,
          isPaused: updates.isPaused ? Bool.True : Bool.False,
          appInform: updates.appInform ?? sch.appInform ?? 1,
          m: mod,
        },
        eq(scheduleDB.w, props.props.schw),
      );

      if (scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public))
        schServerTsjrpcShareMethods.editedSchedule({ sch }, null);
      else {
        const logins = await takeUserLoginsByIds(sch.ctrl.users.map(user => user.id));
        schServerTsjrpcShareMethods.editedSchedule({ sch }, { logins });
      }

      if (isNeedRefreshInformTime) schedulePushInformer.inform(sch.w);
    }

    return { value: sch, description };
  };

export const modifyScheduleDay = <Props extends { props: ScheduleDayScopeProps }>(
  isNeedRefreshInformTime: boolean,
  modifier: (
    day: IScheduleWidgetDay,
    props: Props,
    sch: IScheduleWidget,
    tool: ServerTSJRPCTool,
  ) => PromiseOr<string | null>,
) =>
  modifySchedule<Props>(isNeedRefreshInformTime, (sch, props, tool) => {
    const day = sch.days[props.props.dayi];
    if (!day) throw backLocaleError(BackLocaleKey.DayNotFound);
    return modifier(day, props, sch, tool);
  });

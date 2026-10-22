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
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { Bool } from 'shared/enums';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { deepClone } from 'shared/utils/clone';
import { objectKeys, objectLength } from 'shared/utils/object.utils';
import { takeUserTiny } from '../tinies/userTiny';
import { takeScheduleWidgetTiny } from './schedule.tiny';
import { scheduleTgInformer } from './tg-bot-inform/tg-inform';
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
    throw new Error('Нет прав на изменение прав участников расписания');
};

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
    throw new Error('Нет прав на изменение списка композиций события');
  }
};

export const modifySchedule =
  <Props extends { props: ScheduleScopeProps }>(
    isNeedRefreshTgInformTime: boolean,
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
          tgInform: updates.tgInform === 0 ? Bool.False : Bool.True,
          tgChatReqs: updates.tgChatReqs || '',
          m: mod,
        },
        eq(scheduleDB.w, props.props.schw),
      );

      schServerTsjrpcShareMethods.editedSchedule({ sch }, null);
      if (isNeedRefreshTgInformTime) scheduleTgInformer.inform(sch.w);
    }

    return { value: sch, description };
  };

export const modifyScheduleDay = <Props extends { props: ScheduleDayScopeProps }>(
  isNeedRefreshTgInformTime: boolean,
  modifier: (
    day: IScheduleWidgetDay,
    props: Props,
    sch: IScheduleWidget,
    tool: ServerTSJRPCTool,
  ) => PromiseOr<string | null>,
) =>
  modifySchedule<Props>(isNeedRefreshTgInformTime, (sch, props, tool) => {
    const day = sch.days[props.props.dayi];
    if (!day) throw new Error('День не найден');
    return modifier(day, props, sch, tool);
  });

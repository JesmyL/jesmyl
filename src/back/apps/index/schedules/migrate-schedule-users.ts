import { scheduleDB } from 'back/drizzle.schema';
import { dbUpdate } from 'back/drizzle/drizzle.db';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { eq } from 'drizzle-orm';
import { IScheduleWidget, IScheduleWidgetUser, SokiAuthLogin } from 'shared/api';
import { takeUserTiny } from '../tinies/userTiny';

type LegacyScheduleWidgetUser = IScheduleWidgetUser & {
  login?: SokiAuthLogin;
  fio?: string;
  nick?: string;
};

const logDroppedMember = (sch: IScheduleWidget, user: LegacyScheduleWidgetUser, reason: string) =>
  tglogger.systemError(
    `Migration of schedule "${sch.title}" (w=${sch.w}) dropped member mi=${user.mi}, R=${user.R}: ${reason}`,
  );

const takeActualUser = async (
  user: LegacyScheduleWidgetUser,
  sch: IScheduleWidget,
): Promise<IScheduleWidgetUser | nil> => {
  const { mi, R, li, tgId, tgInform } = user;
  let id = user.id;

  if (id == null) {
    if (user.login == null) {
      logDroppedMember(sch, user, 'member has neither id nor login');
      return null;
    }

    const userTiny = await takeUserTiny({ l: user.login }, false);

    if (userTiny == null) {
      logDroppedMember(sch, user, `login "${user.login}" not found`);
      return null;
    }

    id = userTiny.id;
  }

  return { mi, id, R, li, tgId, tgInform };
};

export const migrateScheduleUsers = async (sch: IScheduleWidget) => {
  const users = sch.ctrl.users as LegacyScheduleWidgetUser[];

  if (!users.some(user => user.id == null || 'login' in user || 'fio' in user || 'nick' in user)) return false;

  const actualUsers: IScheduleWidgetUser[] = [];

  for (const user of users) {
    const actualUser = await takeActualUser(user, sch);
    if (actualUser != null) actualUsers.push(actualUser);
  }

  sch.ctrl.users = actualUsers;

  return true;
};

export const migrateScheduleUsersAndSave = async (sch: IScheduleWidget) => {
  if (!(await migrateScheduleUsers(sch))) return false;

  await dbUpdate(scheduleDB, { ctrl: sch.ctrl, m: Date.now() }, eq(scheduleDB.w, sch.w));

  return true;
};

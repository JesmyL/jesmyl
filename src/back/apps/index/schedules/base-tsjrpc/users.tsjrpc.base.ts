import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import {
  IScheduleWidget,
  IScheduleWidgetUser,
  packScheduleWidgetInviteLink,
  ScheduleUserScopeProps,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  ScheduleWidgetUserMi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  SokiAuthLogin,
  UserId,
} from 'shared/api';
import { SchUsersTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';
import { takeUserAuthName } from 'shared/utils/user.utils';
import { takeAllUsersTiny, takeUserTiny } from '../../tinies/userTiny';
import { modifySchedule, throwIfNoScheduleTotalRedact, throwIfNoScheduleUsersRedact } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const noteSuffixReg = makeRegExp('/\\s*\\([^)]*\\)\\s*$/');

const takeUserName = async (user: IScheduleWidgetUser) => {
  const tiny = await takeUserTiny({ id: user.id }, false);

  return takeUserAuthName(tiny?.uauth) || tiny?.l || `mi=${user.mi}`;
};

export const schUsersTsjrpcBaseServer = new (class SchUsers extends TsjrpcBaseServer<SchUsersTsjrpcMethods> {
  constructor() {
    const modifyUser = <Props extends { props: ScheduleUserScopeProps }>(
      modifier: (
        user: IScheduleWidgetUser,
        props: Props,
        sch: IScheduleWidget,
        tool: ServerTSJRPCTool,
      ) => PromiseOr<string | null>,
    ) =>
      modifySchedule<Props>(false, async (sch, props, tool) => {
        await throwIfNoScheduleUsersRedact(sch, tool.auth);

        const user = sch.ctrl.users.find(user => user.mi === props.props.userMi);
        if (user === undefined) throw backLocaleError(BackLocaleKey.UserNotFound);
        return modifier(user, props, sch, tool);
      });

    super({
      scope: 'SchUsers',
      methods: {
        addUsersByExcel: modifySchedule(false, async (sch, { users }, tool) => {
          await throwIfNoScheduleUsersRedact(sch, tool.auth);

          const allUsers = await takeAllUsersTiny();
          const userIdByTitle = new Map<string, UserId>();

          allUsers.forEach(({ id, l, uauth }) => {
            if (uauth.fio) userIdByTitle.set(uauth.fio, id);
            if (uauth.nick) userIdByTitle.set(uauth.nick, id);
            userIdByTitle.set(l, id);
          });

          const actualUsers: IScheduleWidgetUser[] = [];
          const unknownTitles: string[] = [];
          let lastUserMi = takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def);

          users.forEach(({ fio }) => {
            const userId = userIdByTitle.get(fio) ?? userIdByTitle.get(fio.replace(noteSuffixReg, '').trim());

            if (userId == null) {
              unknownTitles.push(fio);
              return;
            }

            if (sch.ctrl.users.some(user => user.id === userId)) return;

            actualUsers.push({ mi: ++lastUserMi, id: userId });
          });

          if (unknownTitles.length) throw backLocaleError(BackLocaleKey.UsersNotFoundByTitles, { n: unknownTitles.join(', ') });

          sch.ctrl.users.push(...actualUsers);

          return backLocaleError(BackLocaleKey.SchUsersAddedFromExcel, {
            t: await scheduleTitleInBrackets(sch),
            l: users.map(u => u.fio).join(', '),
          });
        }),
        addUserByQr: modifySchedule(false, async (sch, { login }, tool) => {
          await throwIfNoScheduleUsersRedact(sch, tool.auth);

          const userTiny = await takeUserTiny({ l: login as SokiAuthLogin });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) throw backLocaleError(BackLocaleKey.UserAlreadyInSchedule);

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
          });

          return backLocaleError(BackLocaleKey.SchUserAddedByQr, {
            t: await scheduleTitleInBrackets(sch),
            u: takeUserAuthName(userTiny.uauth) || login,
          });
        }),
        addMe: modifySchedule(false, async (sch, { place }, { auth }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.AuthRequired);

          if (!scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public))
            throw backLocaleError(BackLocaleKey.PrivateScheduleQrOnly);

          const userTiny = await takeUserTiny({ l: auth.login });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) throw backLocaleError(BackLocaleKey.UserAlreadyInSchedule);

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
          });

          return backLocaleError(BackLocaleKey.SchUserAdded, {
            t: await scheduleTitleInBrackets(sch),
            p: place,
            u: takeUserAuthName(auth) || '?',
          });
        }),

        addMeByInvite: modifySchedule(false, async (sch, { inviteHash }, { auth }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.AuthRequired);

          const userTiny = await takeUserTiny({ l: auth.login });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) return null;

          if (!sch.ctrl.users.some(user => packScheduleWidgetInviteLink(sch.w, user.mi) === inviteHash))
            throw backLocaleError(BackLocaleKey.InviteInvalid);

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
          });

          return backLocaleError(BackLocaleKey.SchUserAddedByInvite, {
            t: await scheduleTitleInBrackets(sch),
            u: takeUserAuthName(auth) || '?',
          });
        }),

        removeMe: modifySchedule(false, async (sch, _props, { auth }) => {
          if (auth?.login == null) throw backLocaleError(BackLocaleKey.AuthRequired);

          const userTiny = await takeUserTiny({ l: auth.login });
          const user = sch.ctrl.users.find(({ id }) => id === userTiny.id);

          if (user === undefined) throw backLocaleError(BackLocaleKey.NotParticipant);

          if (
            scheduleWidgetUserRights.checkIsHasRights(
              user.R ?? sch.ctrl.defu,
              ScheduleWidgetUserRoleRight.TotalRedact,
            )
          )
            throw backLocaleError(BackLocaleKey.ManagerCannotLeave);

          sch.ctrl.users = sch.ctrl.users.filter(({ id }) => id !== userTiny.id);
          sch.ctrl.roles.forEach(role => {
            if (role.userMi === user.mi) delete role.userMi;
          });

          return backLocaleError(BackLocaleKey.SchYouLeft, { t: await scheduleTitleInBrackets(sch) });
        }),

        addUserListUnitMembership: modifyUser(async (user, { props, value }, sch) => {
          user.li ??= {};
          user.li[props.cati] = value;

          return backLocaleError(BackLocaleKey.SchUserListStatus, {
            t: await scheduleTitleInBrackets(sch),
            u: await takeUserName(user),
            l: value < 0 ? sch.lists.cats[props.cati].titles[0] : sch.lists.cats[props.cati].titles[1],
            c: sch.lists.cats[props.cati]?.title,
          });
        }),
        removeUserListUnitMembership: modifyUser(async (user, { props }, sch) => {
          if (user.li == null) return null;
          delete user.li[props.cati];
          if (!objectLength(user.li)) delete user.li;

          return backLocaleError(BackLocaleKey.SchUserRemovedFromList, {
            t: await scheduleTitleInBrackets(sch),
            u: await takeUserName(user),
            c: sch.lists.cats[props.cati]?.title,
          });
        }),

        setUserRights: modifyUser(async (user, { R }, sch, tool) => {
          if (
            scheduleWidgetUserRights.checkIsHasRights(
              user.R ?? sch.ctrl.defu,
              ScheduleWidgetUserRoleRight.TotalRedact,
            ) ||
            scheduleWidgetUserRights.checkIsHasRights(R, ScheduleWidgetUserRoleRight.TotalRedact)
          )
            await throwIfNoScheduleTotalRedact(sch, tool.auth);

          user.R = R;

          return backLocaleError(BackLocaleKey.SchUserRightsGranted, {
            t: await scheduleTitleInBrackets(sch),
            r:
              scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(R)].role?.[1] ??
              translateBackTexts(null, BackLocaleKey.SchUnknownRoleGenitive),
          });
        }),
      },
    });
  }
})();

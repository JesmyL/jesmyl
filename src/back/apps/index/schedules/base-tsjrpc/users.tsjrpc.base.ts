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
        if (user === undefined) throw new Error('User not found');
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

          if (unknownTitles.length) throw new Error(`Не найдены пользователи: ${unknownTitles.join(', ')}`);

          sch.ctrl.users.push(...actualUsers);

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} добавлены участники списком из Excel: ` +
            `${users.map(u => u.fio).join(', ')}`
          );
        }),
        addUserByQr: modifySchedule(false, async (sch, { login }, tool) => {
          await throwIfNoScheduleUsersRedact(sch, tool.auth);

          const userTiny = await takeUserTiny({ l: login as SokiAuthLogin });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) throw 'Пользователь уже в расписании';

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
          });

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник по QR: ` +
            (takeUserAuthName(userTiny.uauth) || login)
          );
        }),
        addMe: modifySchedule(false, async (sch, { place }, { auth }) => {
          if (auth?.login == null) throw new Error('Необходимо авторизоваться');

          if (!scheduleWidgetRegTypeRights.checkIsHasRights(sch.ctrl.type, ScheduleWidgetRegType.Public))
            throw new Error('В частное расписание можно попасть только по QR-приглашению');

          const userTiny = await takeUserTiny({ l: auth.login });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) throw new Error('user exists');

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
          });

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник  ` +
            `${place}: ${takeUserAuthName(auth) || '?'}`
          );
        }),

        addMeByInvite: modifySchedule(false, async (sch, { inviteHash }, { auth }) => {
          if (auth?.login == null) throw new Error('Необходимо авторизоваться');

          const userTiny = await takeUserTiny({ l: auth.login });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) return null;

          if (!sch.ctrl.users.some(user => packScheduleWidgetInviteLink(sch.w, user.mi) === inviteHash))
            throw new Error('Приглашение недействительно');

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
          });

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник ` +
            `по QR-приглашению: ${takeUserAuthName(auth) || '?'}`
          );
        }),

        removeMe: modifySchedule(false, async (sch, _props, { auth }) => {
          if (auth?.login == null) throw new Error('Необходимо авторизоваться');

          const userTiny = await takeUserTiny({ l: auth.login });
          const user = sch.ctrl.users.find(({ id }) => id === userTiny.id);

          if (user === undefined) throw new Error('Вы не являетесь участником');

          if (
            scheduleWidgetUserRights.checkIsHasRights(
              user.R ?? sch.ctrl.defu,
              ScheduleWidgetUserRoleRight.TotalRedact,
            )
          )
            throw 'Управляющий не может покинуть расписание';

          sch.ctrl.users = sch.ctrl.users.filter(({ id }) => id !== userTiny.id);
          sch.ctrl.roles.forEach(role => {
            if (role.userMi === user.mi) delete role.userMi;
          });

          return `Вы покинули расписание ${scheduleTitleInBrackets(sch)}`;
        }),

        addUserListUnitMembership: modifyUser(async (user, { props, value }, sch) => {
          user.li ??= {};
          user.li[props.cati] = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} ${await takeUserName(user)} теперь ` +
            (value < 0 ? sch.lists.cats[props.cati].titles[0] : sch.lists.cats[props.cati].titles[1]) +
            ` в списке ${sch.lists.cats[props.cati]?.title}`
          );
        }),
        removeUserListUnitMembership: modifyUser(async (user, { props }, sch) => {
          if (user.li == null) return null;
          delete user.li[props.cati];
          if (!objectLength(user.li)) delete user.li;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} ${await takeUserName(user)} ` +
            `удалён из списка ${sch.lists.cats[props.cati]?.title}`
          );
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

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} участнику выданы права ` +
            (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(R)].role?.[1] ?? 'Неизвестного')
          );
        }),
      },
    });
  }
})();

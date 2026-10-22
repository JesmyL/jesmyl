import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import {
  IScheduleWidget,
  IScheduleWidgetUser,
  ScheduleUserScopeProps,
  ScheduleWidgetUserMi,
  scheduleWidgetUserRights,
  UserId,
} from 'shared/api';
import { SchUsersTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi } from 'shared/utils';
import { objectLength } from 'shared/utils/object.utils';
import { takeAllUsersTiny, takeUserTiny } from '../../tinies/userTiny';
import { modifySchedule, throwIfNoScheduleTotalRedact } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const noteSuffixReg = makeRegExp('/\\s*\\([^)]*\\)\\s*$/');

const takeUserName = async (user: IScheduleWidgetUser) => {
  const tiny = await takeUserTiny({ id: user.id }, false);

  return tiny?.uauth.fio || tiny?.uauth.nick || tiny?.l || `mi=${user.mi}`;
};

export const schUsersTsjrpcBaseServer = new (class SchUsers extends TsjrpcBaseServer<SchUsersTsjrpcMethods> {
  constructor() {
    const modifyUser = <Props extends { props: ScheduleUserScopeProps }>(
      modifier: (
        user: IScheduleWidgetUser,
        props: Props,
        sch: IScheduleWidget,
      ) => PromiseOr<string | null>,
    ) =>
      modifySchedule<Props>(false, async (sch, props, tool) => {
        await throwIfNoScheduleTotalRedact(sch, tool.auth);

        const user = sch.ctrl.users.find(user => user.mi === props.props.userMi);
        if (user === undefined) throw new Error('User not found');
        return modifier(user, props, sch);
      });

    super({
      scope: 'SchUsers',
      methods: {
        addUsersByExcel: modifySchedule(false, async (sch, { users }, tool) => {
          await throwIfNoScheduleTotalRedact(sch, tool.auth);

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
        addMe: modifySchedule(false, async (sch, { place }, { auth }) => {
          if (auth?.login == null) throw new Error('Необходимо авторизоваться');

          const userTiny = await takeUserTiny({ l: auth.login });

          if (sch.ctrl.users.some(user => user.id === userTiny.id)) throw new Error('user exists');

          sch.ctrl.users.push({
            mi: takeNextMi(sch.ctrl.users, ScheduleWidgetUserMi.def),
            id: userTiny.id,
            tgId: auth.tgId,
          });

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник  ` +
            `${place}: ${auth?.fio ?? '?'} (${auth?.nick ?? '?'})`
          );
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

        setUserRights: modifyUser((user, { R }, sch) => {
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

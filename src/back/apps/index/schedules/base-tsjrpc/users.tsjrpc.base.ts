import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidgetUser,
  IScheduleWidgetUserMi,
  ScheduleUserScopeProps,
  scheduleWidgetUserRights,
} from 'shared/api';
import { SchUsersTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

export const schUsersTsjrpcBaseServer = new (class SchUsers extends TsjrpcBaseServer<SchUsersTsjrpcMethods> {
  constructor() {
    const modifyUser = <Props extends { props: ScheduleUserScopeProps }>(
      modifier: (user: IScheduleWidgetUser, props: Props) => void,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const user = sch.ctrl.users.find(user => user.mi === props.props.userMi);
        if (user === undefined) throw new Error('User not found');
        modifier(user, props);
      });

    super({
      scope: 'SchUsers',
      methods: {
        addUsersByExcel: modifySchedule(false, (sch, { users }) => {
          let lastUserMi = smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def);
          users.forEach(user => sch.ctrl.users.push({ ...user, mi: ++lastUserMi }));
        }),
        addMe: modifySchedule(false, (sch, _, { auth }) => {
          if (auth == null) throw new Error('Необходимо авторизоваться');
          if (sch.ctrl.users.some(user => user.login === auth.login)) throw new Error('user exists');
          const authClone: IScheduleWidgetUser & { level?: number } = {
            ...auth,
            mi: smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def),
          };

          delete authClone.level;

          sch.ctrl.users.push(authClone);
        }),

        addUserListUnitMembership: modifyUser((user, { props, value }) => {
          user.li ??= {};
          user.li[props.cati] = value;
        }),
        removeUserListUnitMembership: modifyUser((user, { props }) => {
          if (user.li == null) return;
          delete user.li[props.cati];
          if (!smylib.keys(user.li).length) delete user.li;
        }),

        setUserFio: modifyUser((user, { fio }) => (user.fio = fio)),
        setUserRights: modifyUser((user, { R }) => (user.R = R)),
      },
      onEachFeedback: {
        addMe:
          ({ place }, sch) =>
          ({ auth }) =>
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник  ` +
            `${place}: ${auth?.fio ?? '?'} (${auth?.nick ?? '?'})`,

        setUserFio: ({ fio }, sch) => `В расписании ${scheduleTitleInBrackets(sch)} переименован участник ${fio}`,
        setUserRights: ({ R }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} участнику выданы права ` +
          (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(R)].role?.[1] ?? 'Неизвестного'),

        addUsersByExcel: ({ users }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} добавлены участники списком из Excel: ` +
          `${users.map(u => u.fio).join(', ')}`,

        addUserListUnitMembership: ({ props, value }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} ` +
          sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
          ` теперь ` +
          (value < 0 ? sch.lists.cats[props.cati].titles[0] : sch.lists.cats[props.cati].titles[1]) +
          ` в списке ${sch.lists.cats[props.cati]?.title}`,

        removeUserListUnitMembership: ({ props }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} ` +
          sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
          ` удалён из списка ${sch.lists.cats[props.cati]?.title}`,
      },
    });
  }
})();

import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
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
      modifier: (user: IScheduleWidgetUser, props: Props, sch: IScheduleWidget) => string | null,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const user = sch.ctrl.users.find(user => user.mi === props.props.userMi);
        if (user === undefined) throw new Error('User not found');
        return modifier(user, props, sch);
      });

    super({
      scope: 'SchUsers',
      methods: {
        addUsersByExcel: modifySchedule(false, (sch, { users }) => {
          let lastUserMi = smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def);
          users.forEach(user => sch.ctrl.users.push({ ...user, mi: ++lastUserMi }));

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} добавлены участники списком из Excel: ` +
            `${users.map(u => u.fio).join(', ')}`
          );
        }),
        addMe: modifySchedule(false, (sch, { place }, { auth }) => {
          if (auth == null) throw new Error('Необходимо авторизоваться');
          if (sch.ctrl.users.some(user => user.login === auth.login)) throw new Error('user exists');
          const authClone: IScheduleWidgetUser & { level?: number } = {
            ...auth,
            mi: smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def),
          };

          delete authClone.level;

          sch.ctrl.users.push(authClone);

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник  ` +
            `${place}: ${auth?.fio ?? '?'} (${auth?.nick ?? '?'})`
          );
        }),

        addUserListUnitMembership: modifyUser((user, { props, value }, sch) => {
          user.li ??= {};
          user.li[props.cati] = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} ` +
            sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
            ` теперь ` +
            (value < 0 ? sch.lists.cats[props.cati].titles[0] : sch.lists.cats[props.cati].titles[1]) +
            ` в списке ${sch.lists.cats[props.cati]?.title}`
          );
        }),
        removeUserListUnitMembership: modifyUser((user, { props }, sch) => {
          if (user.li == null) return null;
          delete user.li[props.cati];
          if (!smylib.keys(user.li).length) delete user.li;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} ` +
            sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
            ` удалён из списка ${sch.lists.cats[props.cati]?.title}`
          );
        }),

        setUserFio: modifyUser((user, { fio }, sch) => {
          user.fio = fio;

          return `В расписании ${scheduleTitleInBrackets(sch)} переименован участник ${fio}`;
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

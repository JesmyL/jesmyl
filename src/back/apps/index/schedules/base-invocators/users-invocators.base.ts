import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
import {
  IScheduleWidgetUser,
  IScheduleWidgetUserMi,
  LocalSokiAuth,
  ScheduleUserScopeProps,
  scheduleWidgetUserRights,
} from 'shared/api';
import { SchUsersSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifySchedule, scheduleTitleInBrackets } from './general-invocators.base';

class SchUsersSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchUsersSokiInvocatorMethods> {
  constructor() {
    super(
      'SchUsersSokiInvocatorBaseServer',
      {
        addUsersByExcel: () => (props, users) =>
          modifySchedule(props, sch => {
            let lastUserMi = smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def);
            users.forEach(user => sch.ctrl.users.push({ ...user, mi: ++lastUserMi }));
          }),
        addMe:
          ({ auth }) =>
          props =>
            modifySchedule(props, sch => {
              if (auth == null) throw new Error('Необходимо авторизоваться');
              if (sch.ctrl.users.some(user => user.login === auth.login)) throw new Error('user exists');
              const authClone: Partial<LocalSokiAuth> = { ...auth };
              delete authClone.passw;
              delete authClone.level;

              sch.ctrl.users.push({ ...authClone, mi: smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def) });
            }),

        addUserListUnitMembership: () => (props, value) =>
          this.modifyUser(props, user => {
            user.li ??= {};
            user.li[props.cati] = value;
          }),
        removeUserListUnitMembership: () => props =>
          this.modifyUser(props, user => {
            if (user.li == null) return;
            delete user.li[props.cati];
            if (!mylib.keys(user.li).length) delete user.li;
          }),

        setUserFio: () => (props, value) => this.modifyUser(props, user => (user.fio = value)),
        setUserRights: () => (props, value) => this.modifyUser(props, user => (user.R = value)),
      },
      {
        addMe:
          (sch, _, place) =>
          ({ auth }) =>
            `В расписании ${scheduleTitleInBrackets(sch)} новый участник  ` +
            `${place}: ${auth?.fio ?? '?'} (${auth?.nick ?? '?'})`,

        setUserFio: (sch, _, value) => `В расписании ${scheduleTitleInBrackets(sch)} переименован участник ${value}`,
        setUserRights: (sch, _, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} участнику выданы права ` +
          (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(value)].role?.[1] ?? 'Неизвестного'),

        addUsersByExcel: (sch, _, users) =>
          `В расписании ${scheduleTitleInBrackets(sch)} добавлены участники списком из Excel: ` +
          `${users.map(u => u.fio).join(', ')}`,

        addUserListUnitMembership: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} ` +
          sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
          ` теперь ` +
          (value < 0 ? sch.lists.cats[props.cati].titles[0] : sch.lists.cats[props.cati].titles[1]) +
          ` в списке ${sch.lists.cats[props.cati]?.title}`,

        removeUserListUnitMembership: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)} ` +
          sch.ctrl.users.find(user => user.mi === props.userMi)?.fio +
          ` удалён из списка ${sch.lists.cats[props.cati]?.title}`,
      },
    );
  }

  private modifyUser = (props: ScheduleUserScopeProps, modifier: (user: IScheduleWidgetUser) => void) =>
    modifySchedule(props, sch => {
      const user = sch.ctrl.users.find(user => user.mi === props.userMi);
      if (user === undefined) throw new Error('User not found');
      modifier(user);
    });
}

export const schUsersSokiInvocatorBaseServer = new SchUsersSokiInvocatorBaseServer();

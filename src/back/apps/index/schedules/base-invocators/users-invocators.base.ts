import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidgetUser,
  IScheduleWidgetUserMi,
  ScheduleUserScopeProps,
  scheduleWidgetUserRights,
} from 'shared/api';
import { SchUsersSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general-invocators.base';

export const schUsersSokiInvocatorBaseServer =
  new (class SchUsersSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchUsersSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchUsersSokiInvocatorBaseServer',
        methods: {
          addUsersByExcel: ({ props, users }) =>
            modifySchedule(false, props, sch => {
              let lastUserMi = smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def);
              users.forEach(user => sch.ctrl.users.push({ ...user, mi: ++lastUserMi }));
            }),
          addMe: ({ props }, { auth }) =>
            modifySchedule(false, props, sch => {
              if (auth == null) throw new Error('Необходимо авторизоваться');
              if (sch.ctrl.users.some(user => user.login === auth.login)) throw new Error('user exists');
              const authClone: IScheduleWidgetUser & { level?: number } = {
                ...auth,
                mi: smylib.takeNextMi(sch.ctrl.users, IScheduleWidgetUserMi.def),
              };

              delete authClone.level;

              sch.ctrl.users.push(authClone);
            }),

          addUserListUnitMembership: ({ props, value }) =>
            this.modifyUser(props, user => {
              user.li ??= {};
              user.li[props.cati] = value;
            }),
          removeUserListUnitMembership: ({ props }) =>
            this.modifyUser(props, user => {
              if (user.li == null) return;
              delete user.li[props.cati];
              if (!smylib.keys(user.li).length) delete user.li;
            }),

          setUserFio: ({ props, fio: value }) => this.modifyUser(props, user => (user.fio = value)),
          setUserRights: ({ props, R: value }) => this.modifyUser(props, user => (user.R = value)),
        },
        onEachFeedbackTools: {
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

    private modifyUser = (props: ScheduleUserScopeProps, modifier: (user: IScheduleWidgetUser) => void) =>
      modifySchedule(false, props, sch => {
        const user = sch.ctrl.users.find(user => user.mi === props.userMi);
        if (user === undefined) throw new Error('User not found');
        modifier(user);
      });
  })();

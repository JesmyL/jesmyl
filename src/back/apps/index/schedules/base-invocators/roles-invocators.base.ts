import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IScheduleWidgetRole, ScheduleRoleScopeProps } from 'shared/api';
import { SchRolesSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general-invocators.base';

class SchRolesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchRolesSokiInvocatorMethods> {
  constructor() {
    super(
      'SchRolesSokiInvocatorBaseServer',
      {
        createRole: () => props =>
          modifySchedule(false, props, sch =>
            sch.ctrl.roles.push({ mi: smylib.takeNextMi(sch.ctrl.roles, 0), title: 'Помощьник' }),
          ),

        setRoleCategoryTitle: () => (props, cati, value) =>
          modifySchedule(false, props, sch => (sch.ctrl.cats[cati] = value)),
        addRoleCategory: () => props => modifySchedule(false, props, sch => sch.ctrl.cats.push('')),

        setRoleIcon: () => this.modifyRole((role, value) => (role.icon = value)),
        setRoleTitle: () => this.modifyRole((role, value) => (role.title = value)),
        setRoleUser: () => this.modifyRole((role, value) => (role.userMi = value)),
        setCategoryForRole: () => this.modifyRole((role, value) => (role.cati = value)),
        makeFreeRole: () => this.modifyRole(role => delete role.userMi),
      },
      {
        createRole: sch => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория ролей`,
        setRoleIcon: (sch, _, icon, roleTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для роли ${roleTitle} задана иконка ${icon}`,
        setRoleTitle: (sch, _, value, prevTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} роль "${prevTitle}" переименована на "${value}"`,
        addRoleCategory: sch => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория ролей`,
        setRoleCategoryTitle: (sch, _, __, title, prevTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} категория ролей "${prevTitle}" переименована на "${title}"`,
        setCategoryForRole: (sch, _, __, roleTitle, catTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} роль ${roleTitle} теперь относится к категории "${catTitle}"`,
        setRoleUser: (sch, _, __, roleTitle, userName) =>
          `В расписании ${scheduleTitleInBrackets(sch)} за ролью ${roleTitle} закреплён участник ${userName}`,
        makeFreeRole: (sch, _, roleTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} роль ${roleTitle} освобождена (стала вакантной)`,
      },
    );
  }

  private modifyRole =
    <Value>(modifier: (role: IScheduleWidgetRole, value: Value) => void) =>
    (props: ScheduleRoleScopeProps, value: Value) =>
      modifySchedule(false, props, sch => {
        const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
        if (role == null) throw new Error('role not found');
        modifier(role, value);
      });
}
export const schRolesSokiInvocatorBaseServer = new SchRolesSokiInvocatorBaseServer();

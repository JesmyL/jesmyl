import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { IScheduleWidgetRole, ScheduleRoleScopeProps } from 'shared/api';
import { SchRolesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { stameskaIconPack } from 'stameska-icon/pack';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const modifyRole =
  <Value>(modifier: (role: IScheduleWidgetRole, value: Value) => void) =>
  ({ props, value }: { props: ScheduleRoleScopeProps; value: Value }) =>
    modifySchedule(false, props, sch => {
      const role = sch.ctrl.roles.find(role => role.mi === props.roleMi);
      if (role == null) throw new Error('role not found');
      modifier(role, value);
    });

export const schRolesTsjrpcBaseServer = new (class SchRoles extends TsjrpcBaseServer<SchRolesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchRoles',
      methods: {
        createRole: ({ props }) =>
          modifySchedule(false, props, sch =>
            sch.ctrl.roles.push({ mi: smylib.takeNextMi(sch.ctrl.roles, 0 as number), title: 'Помощьник' }),
          ),

        setRoleCategoryTitle: ({ props, cati, title }) =>
          modifySchedule(false, props, sch => (sch.ctrl.cats[cati] = title)),
        addRoleCategory: ({ props }) => modifySchedule(false, props, sch => sch.ctrl.cats.push('')),

        setRoleIcon: modifyRole((role, value) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks({
            actualIconPacks: { [value]: stameskaIconPack[value] },
            iconsMd5Hash: knownStameskaIconNamesMd5Hash,
          });

          role.icon = value;
        }),
        setRoleTitle: modifyRole((role, value) => (role.title = value)),
        setRoleUser: modifyRole((role, value) => (role.userMi = value)),
        setCategoryForRole: modifyRole((role, value) => (role.cati = value)),
        makeFreeRole: modifyRole(role => delete role.userMi),
      },
      onEachFeedback: {
        createRole: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория ролей`,
        setRoleIcon: ({ value: icon, roleTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для роли ${roleTitle} задана иконка ${icon}`,
        setRoleTitle: ({ value: title, prevTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} роль "${prevTitle}" переименована на "${title}"`,
        addRoleCategory: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория ролей`,
        setRoleCategoryTitle: ({ title, prevTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} категория ролей "${prevTitle}" переименована на "${title}"`,
        setCategoryForRole: ({ roleTitle, catTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} роль ${roleTitle} теперь относится к категории "${catTitle}"`,
        setRoleUser: ({ roleTitle, userName }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} за ролью ${roleTitle} закреплён участник ${userName}`,
        makeFreeRole: ({ value: roleTitle }, sch) =>
          `В расписании ${scheduleTitleInBrackets(sch)} роль ${roleTitle} освобождена (стала вакантной)`,
      },
    });
  }
})();

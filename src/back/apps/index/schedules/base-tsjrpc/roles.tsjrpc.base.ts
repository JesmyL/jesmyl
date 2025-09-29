import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { IScheduleWidgetRole, ScheduleRoleScopeProps } from 'shared/api';
import { SchRolesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { stameskaIconPack } from 'stameska-icon/pack';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const modifyRole = <Props extends { props: ScheduleRoleScopeProps }>(
  modifier: (role: IScheduleWidgetRole, props: Props) => void,
) =>
  modifySchedule<Props>(false, (sch, props) => {
    const role = sch.ctrl.roles.find(role => role.mi === props.props.roleMi);
    if (role == null) throw new Error('role not found');
    modifier(role, props);
  });

export const schRolesTsjrpcBaseServer = new (class SchRoles extends TsjrpcBaseServer<SchRolesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchRoles',
      methods: {
        createRole: modifySchedule(false, sch =>
          sch.ctrl.roles.push({ mi: smylib.takeNextMi(sch.ctrl.roles, 0 as number), title: 'Помощьник' }),
        ),

        setRoleCategoryTitle: modifySchedule(false, (sch, { cati, title }) => (sch.ctrl.cats[cati] = title)),
        addRoleCategory: modifySchedule(false, sch => sch.ctrl.cats.push('')),

        setRoleIcon: modifyRole((role, { value }) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks(
            {
              actualIconPacks: { [value]: stameskaIconPack[value] },
              iconsMd5Hash: knownStameskaIconNamesMd5Hash,
            },
            // TODO: remove soon
            visit => !!visit?.version && visit?.version >= 1019,
          );

          role.icon = value;
        }),
        setRoleTitle: modifyRole((role, { value }) => (role.title = value)),
        setRoleUser: modifyRole((role, { value }) => (role.userMi = value)),
        setCategoryForRole: modifyRole((role, { value }) => (role.cati = value)),
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

import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { title } from 'process';
import { IScheduleWidget, IScheduleWidgetRole, ScheduleRoleScopeProps } from 'shared/api';
import { SchRolesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { stameskaIconPack } from 'stameska-icon/pack';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const modifyRole = <Props extends { props: ScheduleRoleScopeProps }>(
  modifier: (role: IScheduleWidgetRole, props: Props, sch: IScheduleWidget) => string | null,
) =>
  modifySchedule<Props>(false, (sch, props) => {
    const role = sch.ctrl.roles.find(role => role.mi === props.props.roleMi);
    if (role == null) throw new Error('role not found');
    return modifier(role, props, sch);
  });

export const schRolesTsjrpcBaseServer = new (class SchRoles extends TsjrpcBaseServer<SchRolesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchRoles',
      methods: {
        createRole: modifySchedule(false, sch => {
          sch.ctrl.roles.push({ mi: smylib.takeNextMi(sch.ctrl.roles, 0 as number), title: 'Помощьник' });

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория ролей`;
        }),

        setRoleCategoryTitle: modifySchedule(false, (sch, { cati, title, prevTitle }) => {
          sch.ctrl.cats[cati] = title;

          return `В расписании ${scheduleTitleInBrackets(sch)} категория ролей "${prevTitle}" переименована на "${title}"`;
        }),
        addRoleCategory: modifySchedule(false, sch => {
          sch.ctrl.cats.push('');

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория ролей`;
        }),

        setRoleIcon: modifyRole((role, { value, roleTitle }, sch) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks(
            {
              actualIconPacks: { [value]: stameskaIconPack[value] },
              iconsMd5Hash: knownStameskaIconNamesMd5Hash,
            },
            // TODO: remove soon
            visit => !!visit?.version && visit?.version >= 1019,
          );

          role.icon = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} для роли ${roleTitle} задана иконка ${value}`;
        }),
        setRoleTitle: modifyRole((role, { value, prevTitle }, sch) => {
          role.title = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} роль "${prevTitle}" переименована на "${title}"`;
        }),
        setRoleUser: modifyRole((role, { value, roleTitle, userName }, sch) => {
          role.userMi = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} за ролью ${roleTitle} закреплён участник ${userName}`;
        }),
        setCategoryForRole: modifyRole((role, { value, roleTitle, catTitle }, sch) => {
          role.cati = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} роль ${roleTitle} теперь относится к категории "${catTitle}"`;
        }),
        makeFreeRole: modifyRole((role, { value }, sch) => {
          delete role.userMi;

          return `В расписании ${scheduleTitleInBrackets(sch)} роль ${value} освобождена (стала вакантной)`;
        }),
      },
    });
  }
})();

import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { IScheduleWidget, IScheduleWidgetRole, ScheduleRoleScopeProps } from 'shared/api';
import { SchRolesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { indexStameskaIconsFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const modifyRole = <Props extends { props: ScheduleRoleScopeProps }>(
  modifier: (role: IScheduleWidgetRole, props: Props, sch: IScheduleWidget) => PromiseOr<string | null>,
) =>
  modifySchedule<Props>(false, (sch, props) => {
    const role = sch.ctrl.roles.find(role => role.mi === props.props.roleMi);
    if (role == null) throw backLocaleError(BackLocaleKey.RoleNotFound);
    return modifier(role, props, sch);
  });

export const schRolesTsjrpcBaseServer = new (class SchRoles extends TsjrpcBaseServer<SchRolesTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchRoles',
      methods: {
        createRole: modifySchedule(false, async sch => {
          sch.ctrl.roles.push({ mi: takeNextMi(sch.ctrl.roles, 0 as number), title: 'Помощьник' });

          return backLocaleError(BackLocaleKey.SchRoleAdded, { t: await scheduleTitleInBrackets(sch) });
        }),

        setRoleCategoryTitle: modifySchedule(false, async (sch, { cati, title, prevTitle }) => {
          sch.ctrl.cats[cati] = title;

          return backLocaleError(BackLocaleKey.SchRolesCatRenamed, {
            t: await scheduleTitleInBrackets(sch),
            p: prevTitle,
            n: title,
          });
        }),
        addRoleCategory: modifySchedule(false, async sch => {
          sch.ctrl.cats.push('');

          return backLocaleError(BackLocaleKey.SchRolesCatAdded, { t: await scheduleTitleInBrackets(sch) });
        }),

        setRoleIcon: modifyRole(async (role, { value, roleTitle }, sch) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks(
            {
              actualIconPacks: { [value]: indexStameskaIconsFileStore.getValue()[value] },
              iconsMd5Hash: knownStameskaIconNamesMd5Hash,
            },
            // TODO: remove soon
            visit => !!visit?.version && visit?.version >= 1019,
          );

          role.icon = value;

          return backLocaleError(BackLocaleKey.SchRoleIconSet, {
            t: await scheduleTitleInBrackets(sch),
            r: roleTitle,
            i: value,
          });
        }),
        setRoleTitle: modifyRole(async (role, { value, prevTitle }, sch) => {
          role.title = value;

          return backLocaleError(BackLocaleKey.SchRoleRenamed, {
            t: await scheduleTitleInBrackets(sch),
            p: prevTitle,
            n: value,
          });
        }),
        setRoleUser: modifyRole(async (role, { value, roleTitle, userName }, sch) => {
          role.userMi = value;

          return backLocaleError(BackLocaleKey.SchRoleUserSet, {
            t: await scheduleTitleInBrackets(sch),
            r: roleTitle,
            u: userName,
          });
        }),
        setCategoryForRole: modifyRole(async (role, { value, roleTitle, catTitle }, sch) => {
          role.cati = value;

          return backLocaleError(BackLocaleKey.SchRoleCategorySet, {
            t: await scheduleTitleInBrackets(sch),
            r: roleTitle,
            c: catTitle,
          });
        }),
        makeFreeRole: modifyRole(async (role, { value }, sch) => {
          delete role.userMi;

          return backLocaleError(BackLocaleKey.SchRoleFreed, {
            t: await scheduleTitleInBrackets(sch),
            v: value,
          });
        }),
      },
    });
  }
})();

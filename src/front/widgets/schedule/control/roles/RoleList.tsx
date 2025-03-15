import { useIsExpand } from '#shared/ui/expand/useIsExpand';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useScheduleScopePropsContext } from '#widgets/schedule/complect/lib/contexts';
import { schRolesSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { useMemo, useState } from 'react';
import { IScheduleWidgetRole } from 'shared/api';
import { ScheduleWidgetRole } from './Role';

export function ScheduleWidgetRoleList() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const [rolesExpandNode, isRolesExpand] = useIsExpand(
    false,
    <>Роли</>,
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact &&
      !rights.schedule.ctrl?.roles.some(role => !role.title) && (
        <TheIconSendButton
          icon="PlusSign"
          prefix="роль"
          confirm="Добавить новую роль?"
          onSend={() => schRolesSokiInvocatorClient.createRole(null, scheduleScopeProps)}
        />
      ),
  );
  const categories = useMemo(() => {
    const sorted = [...rights.schedule.ctrl.roles].sort((a, b) => (a.cati || 0) - (b.cati || 0));
    const roles: IScheduleWidgetRole[][] = [];
    sorted.forEach(role => {
      const list = (roles[role.cati || 0] ??= []);
      list.push(role);
    });
    return roles;
  }, [rights.schedule.ctrl.roles]);
  const [catExpands, setCatExpands] = useState([0]);

  return (
    <>
      <h3 className="flex between flex-gap">{rolesExpandNode}</h3>
      {isRolesExpand &&
        categories.map((list, listi) => {
          const isExpand = catExpands.includes(listi);
          return (
            <div key={listi}>
              <TheIconButton
                icon={isExpand ? 'ArrowUpDouble' : 'ArrowDownDouble'}
                prefix={rights.schedule.ctrl.cats[listi]}
                className="flex-max color--4"
                onClick={() => setCatExpands(isExpand ? catExpands.filter(it => it !== listi) : [...catExpands, listi])}
              />
              {isExpand &&
                list.map(role => {
                  return (
                    <ScheduleWidgetRole
                      key={role.mi}
                      role={role}
                    />
                  );
                })}
            </div>
          );
        })}
    </>
  );
}

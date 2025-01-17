import EvaSendButton from 'front/complect/sends/eva-send-button/EvaSendButton';
import { useMemo, useState } from 'react';
import { IScheduleWidgetRole } from 'shared/api';
import { IconArrowDownDoubleStrokeRounded } from '../../../../complect/the-icon/icons/arrow-down-double';
import { IconArrowUpDoubleStrokeRounded } from '../../../../complect/the-icon/icons/arrow-up-double';
import { IconPlusSignStrokeRounded } from '../../../../complect/the-icon/icons/plus-sign';
import useIsExpand from '../../../expand/useIsExpand';
import IconButton from '../../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../../complect/scope-contexts/useScheduleScopePropsContext';
import { schSokiInvocatorClient } from '../../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetRole from './Role';

export default function ScheduleWidgetRoleList() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();

  const [rolesExpandNode, isRolesExpand] = useIsExpand(
    false,
    <>Роли</>,
    isExpand =>
      isExpand &&
      rights.isCanTotalRedact &&
      !rights.schedule.ctrl?.roles.some(role => !role.title) && (
        <EvaSendButton
          // scope={scope}
          // fieldName="roles"
          Icon={IconPlusSignStrokeRounded}
          prefix="роль"
          confirm="Добавить новую роль?"
          onSend={async () => schSokiInvocatorClient.createRole(null, scheduleScopeProps)}
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
              <IconButton
                Icon={isExpand ? IconArrowUpDoubleStrokeRounded : IconArrowDownDoubleStrokeRounded}
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

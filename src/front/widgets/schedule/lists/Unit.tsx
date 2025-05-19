import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { Modal } from '#shared/ui/modal/Modal/Modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { useMemo } from 'react';
import { IScheduleWidgetListCat, IScheduleWidgetListUnit, IScheduleWidgetUserCati } from 'shared/api';
import styled from 'styled-components';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetUserList } from '../control/users/UserList';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { ScheduleWidgetListUnitRedactor } from './UnitRedactor';

type Props = {
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  shortTitles: [string, string];
};

const isModalOpenAtom = atom(false);

export function ScheduleWidgetListUnit(props: Props) {
  const { unit, cat, cati } = props;
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const title = <>{unit.title || <span className="text-italic">Без названия</span>}</>;
  const unitScopeData = useMemo(() => ({ ...scheduleScopeProps, unitMi: unit.mi }), [scheduleScopeProps, unit.mi]);

  return (
    <>
      <div className="margin-big-gap-t">
        <ExpandableContent
          HeaderNode={ExpHeader}
          title={title}
          postfix={
            rights.isCanRedact
              ? isExpand =>
                  isExpand && (
                    <LazyIcon
                      className="pointer"
                      icon="Edit02"
                      onClick={isModalOpenAtom.toggle}
                    />
                  )
              : null
          }
        >
          {unit.dsc && (
            <StrongEditableField
              icon="File02"
              value={unit}
              title="Описание"
              fieldKey="dsc"
              multiline
              setSelfRedact
              isRedact
              onSend={value => schListsSokiInvocatorClient.setUnitDescription({ props: unitScopeData, value, cati })}
            />
          )}

          <div className="margin-big-gap-h">
            <ScheduleWidgetUserList
              title={cat.titles[0]}
              filter={user => user.li?.[cati] === -unit.mi}
              isInitExpand
            />
            <ScheduleWidgetUserList
              title={cat.titles[1]}
              filter={user => user.li?.[cati] === unit.mi}
            />
          </div>
        </ExpandableContent>
      </div>

      <Modal openAtom={isModalOpenAtom}>
        <ScheduleWidgetListUnitRedactor
          {...props}
          unitScopeData={unitScopeData}
        />
      </Modal>
    </>
  );
}

const ExpHeader = styled.div`
  color: var(--color--3);
`;

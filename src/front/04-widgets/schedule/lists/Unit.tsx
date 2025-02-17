import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useMemo, useState } from 'react';
import { IScheduleWidgetListCat, IScheduleWidgetListUnit, IScheduleWidgetUserCati } from 'shared/api';
import styled from 'styled-components';
import { ExpandableContent } from '../../../07-shared/ui/expand/ExpandableContent';
import Modal from '../../modal/Modal/Modal';
import StrongEditableField from '../../schedule-widget/strong-control/field/StrongEditableField';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import ScheduleWidgetUserList from '../control/users/UserList';
import { schListsSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetListUnitRedactor } from './UnitRedactor';

type Props = {
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  shortTitles: [string, string];
};

export default function ScheduleWidgetListUnit(props: Props) {
  const { unit, cat, cati } = props;
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const title = <>{unit.title || <span className="text-italic">Без названия</span>}</>;
  const unitScopeData = useMemo(() => ({ ...scheduleScopeProps, unitMi: unit.mi }), [scheduleScopeProps, unit.mi]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ScheduleWidgetListUnitRedactor
            {...props}
            unitScopeData={unitScopeData}
          />
        </Modal>
      )}
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
                      onClick={() => setIsModalOpen(true)}
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
              onSend={value => schListsSokiInvocatorClient.setUnitDescription(null, unitScopeData, value, cati)}
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
    </>
  );
}

const ExpHeader = styled.div`
  color: var(--color--3);
`;

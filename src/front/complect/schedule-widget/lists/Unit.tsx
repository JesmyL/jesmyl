import { useMemo, useState } from 'react';
import { IScheduleWidgetListCat, IScheduleWidgetListUnit, IScheduleWidgetUserCati } from 'shared/api';
import styled from 'styled-components';
import { IconEdit02StrokeRounded } from '../../../complect/the-icon/icons/edit-02';
import { IconFile02StrokeRounded } from '../../../complect/the-icon/icons/file-02';
import { ExpandableContent } from '../../expand/ExpandableContent';
import Modal from '../../modal/Modal/Modal';
import { StrongComponentProps } from '../../strong-control/Strong.model';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import IconButton from '../../the-icon/IconButton';
import { useScheduleScopePropsContext } from '../complect/scope-contexts/useScheduleScopePropsContext';
import ScheduleWidgetUserList from '../control/users/UserList';
import { schSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetListUnitRedactor from './UnitRedactor';

type Props = StrongComponentProps<{
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  catScopePostfix: string;
  shortTitles: [string, string];
}>;

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
                    <IconButton
                      Icon={IconEdit02StrokeRounded}
                      onClick={() => setIsModalOpen(true)}
                    />
                  )
              : null
          }
        >
          {unit.dsc && (
            <StrongEditableField
              Icon={IconFile02StrokeRounded}
              value={unit}
              title="Описание"
              fieldKey="dsc"
              multiline
              setSelfRedact
              isRedact
              // onSend={value => schSokiInvocatorClient.setUnitDescription(null, unitScopeData, value)}
              onSend={value =>
                schSokiInvocatorClient.oooooooooooooooooooooooooooooooooooooo(null, unitScopeData, value)
              }
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

import { useState } from 'react';
import styled from 'styled-components';
import { IconEdit02StrokeRounded } from '../../../complect/the-icon/icons/edit-02';
import { IconFile02StrokeRounded } from '../../../complect/the-icon/icons/file-02';
import { IScheduleWidgetUserCati } from 'shared/api';
import { ExpandableContent } from '../../expand/ExpandableContent';
import Modal from '../../modal/Modal/Modal';
import { StrongComponentProps } from '../../strong-control/Strong.model';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import IconButton from '../../the-icon/IconButton';
import { IScheduleWidgetListCat, IScheduleWidgetListUnit } from 'shared/api';
import ScheduleWidgetUserList from '../control/users/UserList';
import { takeStrongScopeMaker, useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetListUnitRedactor from './UnitRedactor';

type Props = StrongComponentProps<{
  scheduleScope: string;
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  catScopePostfix: string;
  shortTitles: [string, string];
}>;

export default function ScheduleWidgetListUnit(props: Props) {
  const { scope, scheduleScope, unit, cat, cati } = props;
  const rights = useScheduleWidgetRightsContext();
  const unitScope = takeStrongScopeMaker(scope, ' unitMi/', unit.mi);
  const title = <>{unit.title || <span className="text-italic">Без названия</span>}</>;

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal onClose={setIsModalOpen}>
          <ScheduleWidgetListUnitRedactor {...props} />
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
              scope={unitScope}
              fieldName="field"
              Icon={IconFile02StrokeRounded}
              value={unit}
              title="Описание"
              fieldKey="dsc"
              multiline
              setSelfRedact
              isRedact
            />
          )}

          <div className="margin-big-gap-h">
            <ScheduleWidgetUserList
              scope={scheduleScope}
              title={cat.titles[0]}
              filter={user => user.li?.[cati] === -unit.mi}
              isInitExpand
            />
            <ScheduleWidgetUserList
              scope={scheduleScope}
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

import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Atom, atom } from 'atomaric';
import { useMemo } from 'react';
import { IScheduleWidgetListCat, IScheduleWidgetListUnit, IScheduleWidgetUserCati } from 'shared/api';
import styled from 'styled-components';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetUserList } from '../control/users/UserList';
import { schListsTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetListUnitRedactor } from './UnitRedactor';

type Props = {
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: IScheduleWidgetUserCati;
  shortTitles: [string, string];
};

let isModalOpenAtom: Atom<boolean>;

export function ScheduleWidgetListUnit(props: Props) {
  isModalOpenAtom ??= atom(false);

  const { unit, cat, cati } = props;
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const title = <>{unit.title || <span className="italic">Без названия</span>}</>;
  const unitScopeData = useMemo(() => ({ ...scheduleScopeProps, unitMi: unit.mi }), [scheduleScopeProps, unit.mi]);

  return (
    <>
      <div className="mt-5">
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
                      onClick={isModalOpenAtom.do.toggle}
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
              isSelfRedact
              isRedact
              onSend={value => schListsTsjrpcClient.setUnitDescription({ props: unitScopeData, value, cati })}
            />
          )}

          <div className="mx-5">
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

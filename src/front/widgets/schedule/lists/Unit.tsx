import { translateBase } from '#basis/locale';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { ExpandableContent } from '#shared/ui/expand/ExpandableContent';
import { Modal } from '#shared/ui/modal';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Atom, atom } from 'atomaric';
import { HTMLAttributes, useMemo } from 'react';
import { IScheduleWidgetListCat, IScheduleWidgetListUnit, ScheduleWidgetUserCati } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { twMerge } from 'tailwind-merge';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetUserList } from '../control/users/UserList';
import { schListsTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetListUnitRedactor } from './UnitRedactor';

type Props = {
  unit: IScheduleWidgetListUnit;
  cat: IScheduleWidgetListCat;
  cati: ScheduleWidgetUserCati;
  shortTitles: [string, string];
};

let isModalOpenAtom: Atom<boolean>;

export function ScheduleWidgetListUnit(props: Props) {
  isModalOpenAtom ??= atom(false);

  const { unit, cat, cati } = props;
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const title = (
    <>{unit.title || <span className="italic">{translateBase(BaseLocaleKey.ScheduleUntitled)}</span>}</>
  );
  const unitScopeData = useMemo(() => ({ ...scheduleScopeProps, unitMi: unit.mi }), [scheduleScopeProps, unit.mi]);

  return (
    <>
      <div className="mt-3 ml-3 pl-3 border-l border-x4/30">
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
              title={translateBase(BaseLocaleKey.Description)}
              fieldKey="dsc"
              multiline
              isSelfRedact
              isRedact
              onSend={value => schListsTsjrpcClient.setUnitDescription({ props: unitScopeData, value, cati })}
            />
          )}

          <div className="mx-2">
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

const ExpHeader = (props: HTMLAttributes<HTMLDivElement>) => (
  <div
    {...props}
    className={twMerge('text-x3 font-semibold hover:text-x4', props.className)}
  />
);

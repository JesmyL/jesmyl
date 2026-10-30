import { translateBase } from '#basis/locale';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { ScheduleWidgetUserAddByExcel } from '#widgets/schedule/control/users/excel/AddByExcel';
import { ScheduleWidgetUserList } from '#widgets/schedule/control/users/UserList';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName, useScheduleWidgetRights } from '#widgets/schedule/useScheduleWidget';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';

export function ScheduleUsersPage({ schedule }: { schedule: IScheduleWidget }) {
  const scheduleScopeProps: ScheduleScopeProps = useMemo(() => ({ schw: schedule.w }), [schedule.w]);
  const [termAtom] = useState(() => atom(''));
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const rights = useScheduleWidgetRights(schedule);

  return (
    <ScheduleWidgetContextWrapper
      schedule={schedule}
      rights={rights}
      scheduleScopeProps={scheduleScopeProps}
    >
      <PageContainerConfigurer
        className="ScheduleWidgetPage"
        headClass="flex between w-full"
        backButtonRender={(linkRef, children) => (
          <Link
            ref={linkRef}
            to="/schedule-manage/$schw"
            params={{ schw: `${schedule.w}` }}
          >
            {children}
          </Link>
        )}
        onMoreClick={rights.isCanRedactUsers ? setIsMoreOpen : undefined}
        head={
          <DebouncedSearchInput
            className="com-search debounced-searcher round-styled"
            placeholder={translateBase(BaseLocaleKey.ScheduleFilterByName)}
            termAtom={termAtom}
          />
        }
        content={<ScheduleUsersSearchList termAtom={termAtom} />}
      />
      {!isMoreOpen || (
        <BottomPopup onClose={setIsMoreOpen}>
          <BottomPopupItem
            title={translateBase(BaseLocaleKey.ScheduleExcelFile)}
            rightNode={<ScheduleWidgetUserAddByExcel />}
          />
        </BottomPopup>
      )}
    </ScheduleWidgetContextWrapper>
  );
}

function ScheduleUsersSearchList({ termAtom }: { termAtom: Atom<string> }) {
  const rights = useScheduleWidgetRightsContext();

  return (
    <WithAtomValue atom={termAtom}>
      {term => {
        const search = term.trim().toLowerCase();

        return (
          <ScheduleWidgetUserList
            isInitExpand
            withoutTitle
            filter={
              search
                ? user => takeScheduleWidgetUserName(rights, user).toLowerCase().includes(search)
                : undefined
            }
          />
        );
      }}
    </WithAtomValue>
  );
}

import { translateBase } from '#basis/locale';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { ScheduleWidgetUserAddByExcel } from '#widgets/schedule/control/users/excel/AddByExcel';
import { ScheduleWidgetUserList } from '#widgets/schedule/control/users/UserList';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { takeScheduleWidgetUserName } from '#widgets/schedule/useScheduleWidget';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';

export function ScheduleUsersPage({ schedule }: { schedule: IScheduleWidget }) {
  const scheduleScopeProps: ScheduleScopeProps = useMemo(() => ({ schw: schedule.w }), [schedule.w]);
  const [termAtom] = useState(() => atom(''));

  return (
    <ScheduleWidgetContextWrapper
      schedule={schedule}
      scheduleScopeProps={scheduleScopeProps}
    >
      <PageContainerConfigurer
        className="ScheduleWidgetPage"
        headTitle={translateBase(BaseLocaleKey.ScheduleMembers)}
        backButtonRender={(linkRef, children) => (
          <Link
            ref={linkRef}
            to="/schedule-manage/$schw"
            params={{ schw: `${schedule.w}` }}
          >
            {children}
          </Link>
        )}
        head={<ScheduleUsersHead termAtom={termAtom} />}
        content={<ScheduleUsersSearchList termAtom={termAtom} />}
      />
    </ScheduleWidgetContextWrapper>
  );
}

function ScheduleUsersHead({ termAtom }: { termAtom: Atom<string> }) {
  const rights = useScheduleWidgetRightsContext();

  return (
    <div className="flex gap-2 items-center w-full">
      <DebouncedSearchInput
        className="debounced-searcher round-styled"
        placeholder={translateBase(BaseLocaleKey.ScheduleFilterByName)}
        termAtom={termAtom}
      />
      {!rights.isCanRedactUsers || <ScheduleWidgetUserAddByExcel />}
    </div>
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

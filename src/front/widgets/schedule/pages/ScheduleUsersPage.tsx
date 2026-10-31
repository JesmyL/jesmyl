import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { DebouncedSearchInput } from '#shared/ui/DebouncedSearchInput';
import { makeToastOKMoodConfig } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { BottomPopup } from '#shared/ui/popup/bottom-popup/BottomPopup';
import { BottomPopupItem } from '#shared/ui/popup/bottom-popup/BottomPopupItem';
import { QrReader } from '#shared/ui/qr-code/QrReader';
import { WithAtomValue } from '#shared/ui/WithAtomValue';
import { ScheduleWidgetUserAddByExcel } from '#widgets/schedule/control/users/excel/AddByExcel';
import { ScheduleWidgetUserList } from '#widgets/schedule/control/users/UserList';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { schUsersTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { takeScheduleWidgetUserName, useScheduleWidgetRights } from '#widgets/schedule/useScheduleWidget';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { toast } from 'sonner';
import { IScheduleWidget, ScheduleScopeProps } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';

let isOpenAddUserByQrAtom: Atom<boolean> | nil;

const takeQrAuthLogin = (text: string) => {
  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    return null;
  }

  if (typeof parsed !== 'object' || parsed === null || !('login' in parsed)) return null;

  const { login } = parsed;

  return typeof login === 'string' && login ? login : null;
};

export function ScheduleUsersPage({ schedule }: { schedule: IScheduleWidget }) {
  const appName = useAppNameContext();
  const scheduleScopeProps: ScheduleScopeProps = useMemo(() => ({ schw: schedule.w }), [schedule.w]);
  const [termAtom] = useState(() => atom(''));
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const rights = useScheduleWidgetRights(schedule);
  const addUserByQrOpenAtom = (isOpenAddUserByQrAtom ??= atom(false));

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
            to="/!other/$appName/schs/manage"
            params={{ appName }}
            search={{ schw: schedule.w }}
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
          <BottomPopupItem
            title={translateBase(BaseLocaleKey.ScheduleAddUserByQr)}
            icon="QrCode01"
            onClick={() => addUserByQrOpenAtom.set(true)}
          />
        </BottomPopup>
      )}
      <QrReader
        openAtom={addUserByQrOpenAtom}
        formats={['any']}
        onReadData={text => {
          const login = takeQrAuthLogin(text);
          if (login == null) return;

          addUserByQrOpenAtom.set(false);
          void schUsersTsjrpcClient
            .addUserByQr({ props: scheduleScopeProps, login })
            .then(() => toast(translateBase(BaseLocaleKey.ScheduleUserAdded), makeToastOKMoodConfig()))
            .catch(emptyFunc);
        }}
      />
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

import { translateBase } from '#basis/locale';
import { useAppNameContext } from '#basis/state/contexts';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { Link } from '@tanstack/react-router';
import { Atom, atom } from 'atomaric';
import { useMemo, useState } from 'react';
import { IScheduleWidget, packScheduleWidgetInviteLink, ScheduleScopeProps, scheduleWidgetUserRights } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { ScheduleWidgetMyUserAppInform } from '../app-inform/UserAppInform';
import { useScheduleScopePropsContext } from '../complect/lib/contexts';
import { useScheduleWidgetRightsContext } from '../contexts';
import { ScheduleWidgetContextWrapper } from '../general/ContextWrapper';
import { schLinkAction } from '../links';
import { schUsersTsjrpcClient } from '../tsjrpc/tsjrpc.methods';

export function ScheduleToolsPage({ schedule }: { schedule: IScheduleWidget }) {
  const appName = useAppNameContext();
  const scheduleScopeProps: ScheduleScopeProps = useMemo(() => ({ schw: schedule.w }), [schedule.w]);
  const [isOpenInviteQrAtom] = useState(() => atom(false));

  return (
    <ScheduleWidgetContextWrapper
      schedule={schedule}
      scheduleScopeProps={scheduleScopeProps}
    >
      <PageContainerConfigurer
        className="ScheduleWidgetPage"
        headTitle={translateBase(BaseLocaleKey.Settings)}
        backButtonRender={(linkRef, children) => (
          <Link
            ref={linkRef}
            to="/!other/$appName/schs"
            params={{ appName }}
            search={{ schw: schedule.w }}
          >
            {children}
          </Link>
        )}
        content={
          <div className="mx-2 my-3">
            <ScheduleWidgetInviteQr openAtom={isOpenInviteQrAtom} />
            <ScheduleWidgetMyParticipation />
          </div>
        }
      />
    </ScheduleWidgetContextWrapper>
  );
}

function ScheduleWidgetMyParticipation() {
  const rights = useScheduleWidgetRightsContext();
  const scheduleScopeProps = useScheduleScopePropsContext();
  const myUser = rights.myUser;

  if (!myUser) return null;

  const roleTitle =
    rights.schedule.ctrl.roles.find(({ userMi }) => userMi === myUser.mi)?.title ||
    scheduleWidgetUserRights.texts[
      scheduleWidgetUserRights.rightsBalance(myUser.R ?? rights.schedule.ctrl.defu)
    ]?.role?.[0] ||
    translateBase(BaseLocaleKey.WithoutRole);

  return (
    <>
      <div className="flex gap-2 items-center my-4">
        <span className="grid place-items-center size-9 rounded-xl bg-x4/20 text-xOK ring-1 ring-xOK/30">
          <LazyIcon icon="UserGroup" />
        </span>
        <span className="text-[0.65rem] uppercase tracking-[0.22em] text-x7">
          {translateBase(BaseLocaleKey.ScheduleMyParticipation)}
        </span>
        <span className="flex-1 border-t border-x3" />
      </div>
      <ScheduleWidgetMyUserAppInform />
      <TheIconButton
        className="my-2"
        icon="User"
        postfix={`${translateBase(BaseLocaleKey.ScheduleMyRole)}: ${roleTitle}`}
      />
      {!rights.isCanTotalRedact && (
        <TheIconSendButton
          className="text-xKO my-2"
          icon="UserRemove01"
          postfix={translateBase(BaseLocaleKey.ScheduleLeave)}
          confirm={translateBase(BaseLocaleKey.ScheduleLeaveConfirm)}
          onSend={() => schUsersTsjrpcClient.removeMe({ props: scheduleScopeProps })}
        />
      )}
    </>
  );
}

function ScheduleWidgetInviteQr({ openAtom }: { openAtom: Atom<boolean> }) {
  const rights = useScheduleWidgetRightsContext();

  return (
    <>
      <QrCodeFullScreen
        openAtom={openAtom}
        text={schLinkAction.makeLink(
          rights.myUser
            ? { inviteSch: rights.schedule.w, inviteHash: packScheduleWidgetInviteLink(rights.schedule.w, rights.myUser.mi) }
            : { inviteSch: rights.schedule.w },
        )}
      />
      <TheIconButton
        className="my-2"
        icon="QrCode"
        postfix={translateBase(BaseLocaleKey.ScheduleInvite)}
        onClick={() => openAtom.do.toggle()}
      />
    </>
  );
}

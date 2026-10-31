import { useConnectionState } from '#basis/lib/useConnectionState';
import { translateBase } from '#basis/locale';
import { Button } from '#shared/components/ui/button';
import { closeAllAppNotifications } from '#shared/sw-register';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { cmComLastOpenSchwAtom } from '$cm/entities/index';
import { useAuth, useIndexSchedules, useUserInfoDict } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { ScheduleWidgetRegType, scheduleWidgetRegTypeRights } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';
import { useScheduleCurrentSchwContext } from '../complect/lib/contexts';
import { ScheduleWidget } from '../ScheduleWidget';
import { schUsersTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { useFixActualSchw } from '../useSch';
import { useScheduleWidgetRights } from '../useScheduleWidget';

export const ScheduleWidgetPage = ({ inviteHash }: { inviteHash?: string }) => {
  const schedules = useIndexSchedules();
  const schw = useScheduleCurrentSchwContext();
  const schedule = schedules?.find(({ w }) => w === schw);
  const rights = useScheduleWidgetRights(schedule);
  const isSwPublic =
    schedule != null &&
    scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.Public);
  const connectionNode = useConnectionState();
  const auth = useAuth();
  const { byLogin } = useUserInfoDict();
  const myUserId = auth.login ? byLogin.get(auth.login)?.id : null;
  const isCanControl =
    rights.isCanRedact ||
    rights.isCanAddDays ||
    rights.isCanAddEvents ||
    rights.isCanRedactEventContent ||
    rights.isCanRedactComsList;
  const [isInviteJoinInProcess, setIsInviteJoinInProcess] = useState(false);

  useFixActualSchw(schw);

  useEffect(() => {
    if (schedule) cmComLastOpenSchwAtom.set(schedule.w);
  }, [schedule]);

  useEffect(() => {
    if (!schw) return;

    void closeAllAppNotifications().catch(emptyFunc);
  }, [schw]);

  useEffect(() => {
    if (schedule || !inviteHash || !auth.login) return;

    let isMounted = true;
    setIsInviteJoinInProcess(true);

    void schUsersTsjrpcClient
      .addMeByInvite({ props: { schw }, inviteHash })
      .catch(emptyFunc)
      .finally(() => {
        if (isMounted) setIsInviteJoinInProcess(false);
      });

    return () => {
      isMounted = false;
    };
  }, [auth.login, inviteHash, schedule, schw]);

  return (
    <>
      <PageContainerConfigurer
        className="ScheduleWidgetPage"
        headTitle={schedule?.title ?? translateBase(BaseLocaleKey.ScheduleEvent)}
        head={
          <span className="flex gap-2 m-2 items-center">
            {connectionNode}
            {!schedule || (
              <>
                <Button
                  asChild
                  icon="Settings01"
                  variant="secondary"
                  size="icon"
                  className="size-8 rounded-full"
                >
                  <Link
                    to="/schedule-tools/$schw"
                    params={{ schw: `${schedule.w}` }}
                  />
                </Button>
                {!isCanControl || (
                  <Button
                    asChild
                    icon="PropertyEdit"
                    size="icon"
                    className="size-8 rounded-full"
                  >
                    <Link
                      to="/schedule-manage/$schw"
                      params={{ schw: `${schedule.w}` }}
                    />
                  </Button>
                )}
              </>
            )}
          </span>
        }
        backButtonRender={(linkRef, children) => {
          return (
            <Link
              to="."
              ref={linkRef}
              search={prev => ({
                ...prev,
                schw: undefined,
                inviteHash: undefined,
                attKey: undefined,
                dayi: undefined,
                eventMi: undefined,
              })}
            >
              {children}
            </Link>
          );
        }}
        content={
          schedule ? (
            schedule.start === 0 ? (
              schedule.ctrl.users.some(user => user.id === myUserId) ? (
                <>{translateBase(BaseLocaleKey.ScheduleRequestSent)}</>
              ) : isSwPublic ? (
                <SendButton
                  title={translateBase(BaseLocaleKey.ScheduleWillParticipate)}
                  onSend={() =>
                    schUsersTsjrpcClient.addMe({
                      props: { schw },
                      place: translateBase(BaseLocaleKey.ScheduleByLink),
                    })
                  }
                />
              ) : (
                <div className="flex center text-xKO">{translateBase(BaseLocaleKey.ScheduleEventNotFound)}</div>
              )
            ) : (
              <ScheduleWidget schedule={schedule} />
            )
          ) : isInviteJoinInProcess ? null : (
            <div className="flex center text-xKO">{translateBase(BaseLocaleKey.ScheduleEventNotFound)}</div>
          )
        }
      />
    </>
  );
};

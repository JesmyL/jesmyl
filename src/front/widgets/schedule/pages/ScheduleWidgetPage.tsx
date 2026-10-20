import { useConnectionState } from '#basis/lib/useConnectionState';
import { translateBase } from '#basis/locale';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { useAuth, useIndexSchedules } from '$index/shared/state';
import { Link } from '@tanstack/react-router';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { useScheduleCurrentSchwContext, useScheduleScopePropsContext } from '../complect/lib/contexts';
import { ScheduleWidget } from '../ScheduleWidget';
import { schUsersTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { useFixActualSchw } from '../useSch';

export const ScheduleWidgetPage = () => {
  const schedules = useIndexSchedules();
  const schw = useScheduleCurrentSchwContext();
  const schedule = schedules?.find(({ w }) => w === schw);
  const connectionNode = useConnectionState();
  const auth = useAuth();
  const scheduleScopeProps = useScheduleScopePropsContext();

  useFixActualSchw(schw);

  return (
    <>
      <PageContainerConfigurer
        className="ScheduleWidgetPage"
        headTitle={schedule?.title ?? translateBase(BaseLocaleKey.ScheduleEvent)}
        head={<span className="flex gap-2 m-2">{connectionNode}</span>}
        backButtonRender={(linkRef, children) => {
          return (
            <Link
              to="."
              ref={linkRef}
              search={prev => ({
                ...prev,
                schw: undefined,
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
              schedule.ctrl.users.some(user => user.login === auth.login) ? (
                <>{translateBase(BaseLocaleKey.ScheduleRequestSent)}</>
              ) : (
                <SendButton
                  title={translateBase(BaseLocaleKey.ScheduleWillParticipate)}
                  onSend={() =>
                    schUsersTsjrpcClient.addMe({
                      props: scheduleScopeProps,
                      place: translateBase(BaseLocaleKey.ScheduleByLink),
                    })
                  }
                />
              )
            ) : (
              <ScheduleWidget schedule={schedule} />
            )
          ) : (
            <div className="flex center text-xKO">{translateBase(BaseLocaleKey.ScheduleEventNotFound)}</div>
          )
        }
      />
    </>
  );
};

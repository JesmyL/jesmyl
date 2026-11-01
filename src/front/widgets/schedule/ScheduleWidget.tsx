import { translateBase } from '#basis/locale';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { useEffect, useMemo, useState } from 'react';
import {
  checkIsSchedulePeriodic,
  IScheduleWidget,
  ScheduleScopeProps,
  ScheduleWidgetDayi,
  ScheduleWidgetWidDef,
} from 'shared/api';
import { howMillisecondsInMin } from 'shared/const/ms';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { ScheduleWidgetStartTimeText } from './complect/StartTimeText';
import { ScheduleWidgetDay } from './days/Day';
import { ScheduleWidgetContextWrapper } from './general/ContextWrapper';
import { ScheduleWidgetLists } from './lists/Lists';
import { ScheduleWidgetWatchLiveBroadcastButton } from './live-broadcast/WatchLiveButton';
import { schUsersTsjrpcClient } from './tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRights, useScheduleWidgetRights } from './useScheduleWidget';

export function ScheduleWidget({
  schedule,
  rights: topRights,
}: {
  schedule?: IScheduleWidget;
  rights?: ScheduleWidgetRights;
}) {
  const rights = useScheduleWidgetRights(schedule, topRights);

  const scheduleScopeProps: ScheduleScopeProps = useMemo(
    () => ({ schw: schedule?.w ?? ScheduleWidgetWidDef }),
    [schedule?.w],
  );
  const prevDate =
    schedule && !checkIsSchedulePeriodic(schedule) && schedule.prevStart != null
      ? new Date(schedule.prevStart)
      : null;

  const date = useMemo(() => new Date(schedule?.start || Date.now()), [schedule?.start]);

  const [updates, setUpdates] = useState<null | number>(null);
  useEffect(() => {
    let time = howMillisecondsInMin;
    if (updates === null) {
      const now = Date.now();
      time = time - Math.floor((now / time - Math.floor(now / time)) * time);
    }
    const to = setTimeout(setUpdates, time, updates! + 1);
    return () => clearTimeout(to);
  }, [updates]);

  let blockContent = null;

  if (rights.myUser == null) {
    if (rights.isSwPublic) {
      if (rights.isSwBeforeRegistration) {
        blockContent = (
          <SendButton
            title={translateBase(BaseLocaleKey.ScheduleWillParticipate)}
            confirm={translateBase(BaseLocaleKey.ScheduleWillBeRegistered)}
            onSend={() =>
              schUsersTsjrpcClient.addMe({
                props: scheduleScopeProps,
                place: translateBase(BaseLocaleKey.ScheduleByScheduleButton),
              })
            }
          />
        );
      } else if (rights.isSwHideContent)
        blockContent = (
          <div className="text-x7 font-size:0.8em">
            {translateBase(BaseLocaleKey.ScheduleNoPreregistration)}
          </div>
        );
    }
  } else {
    if (rights.myUser.R === undefined || rights.myUser.R === 0) {
      if (!rights.isSwPublic || rights.isSwHideContent)
        blockContent = <div className="text-x7">{translateBase(BaseLocaleKey.ScheduleRequestAccepted)}</div>;
    } else if (!rights.isCanRead) {
      blockContent = (
        <div className="text-xKO">{translateBase(BaseLocaleKey.ScheduleContentAccessLimited)}</div>
      );
    }
  }

  const prevDateNode = prevDate && (
    <div className={'opacity-70 text-[0.8em]' + (schedule && prevDate.getTime() > schedule.start ? ' text-xKO' : '')}>
      {translateBase(BaseLocaleKey.SchedulePrevious, { d: makeDateLabel(prevDate) })}
    </div>
  );

  if (blockContent)
    return (
      <div className="m-1">
        <ScheduleWidgetStartTimeText schedule={schedule} />
        {prevDateNode}
        {blockContent}
      </div>
    );

  if (!schedule) return null;

  if (blockContent)
    return (
      <ScheduleWidgetContextWrapper
        schedule={schedule}
        rights={rights}
        scheduleScopeProps={scheduleScopeProps}
      >
        {blockContent}
      </ScheduleWidgetContextWrapper>
    );

  return (
    <ScheduleWidgetContextWrapper
      schedule={schedule}
      rights={rights}
      scheduleScopeProps={scheduleScopeProps}
    >
      <AppDialogProvider title="schedule">
        <div className="schedule-widget p-[5px] transition-[margin] duration-300 [&.expand]:mb-[50px]">
          <div className="my-5">
            {rights.isCanRead && (
              <>
                <ScheduleWidgetStartTimeText
                  schedule={schedule}
                  date={date}
                />
                {prevDateNode}
                {rights.isCanReadTitles && <ScheduleWidgetLists />}

                <ScheduleWidgetWatchLiveBroadcastButton
                  schw={schedule.w}
                  postfix={translateBase(BaseLocaleKey.ScheduleWatchBroadcast)}
                />

                {rights.isSwPublic &&
                  rights.myUser === undefined &&
                  (rights.auth.login ? (
                    <SendButton
                      title={translateBase(BaseLocaleKey.ScheduleWantCommentEvents)}
                      className="mt-10"
                      onSend={() =>
                        schUsersTsjrpcClient.addMe({
                          props: scheduleScopeProps,
                          place: translateBase(BaseLocaleKey.ScheduleByCommentButton),
                        })
                      }
                    />
                  ) : (
                    <div className="mt-5">{translateBase(BaseLocaleKey.ScheduleOnlyRegComment)}</div>
                  ))}
                {schedule.days.map((day, dayi) => {
                  if (dayi === 0 && schedule.withTech && !rights.isCanReadSpecials) return null;

                  return (
                    <ScheduleWidgetDay
                      key={dayi}
                      day={day}
                      dayi={dayi as ScheduleWidgetDayi}
                      schedule={schedule}
                      isCanOpenFull
                      scheduleScopeProps={scheduleScopeProps}
                    />
                  );
                })}
              </>
            )}
          </div>
        </div>
      </AppDialogProvider>
    </ScheduleWidgetContextWrapper>
  );
}

import { useCheckUserAccessRightsInScope } from '#basis/lib/useCheckUserAccessRightsInScope';
import { translateBase } from '#basis/locale';
import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { StrongInputDateTimeExtracter } from '#basis/ui/strong-control/StrongDateTimeExtracter';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import styled from '@emotion/styled';
import { Atom, atom } from 'atomaric';
import { useEffect, useMemo, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { IScheduleWidget, ScheduleScopeProps, ScheduleWidgetDayi, ScheduleWidgetWidDef } from 'shared/api';
import { howMillisecondsInMin } from 'shared/const/ms';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { ScheduleWidgetCustomAttachments } from './atts/custom/CustomAttachments';
import { ScheduleWidgetStartTimeText } from './complect/StartTimeText';
import { ScheduleWidgetTopicTitle } from './complect/TopicTitle';
import { ScheduleWidgetControl } from './control/Control';
import { ScheduleWidgetDay } from './days/Day';
import { ScheduleWidgetEventTypeList } from './events/EventTypeList';
import { ScheduleWidgetContextWrapper } from './general/ContextWrapper';
import { ScheduleWidgetCopy } from './general/Copy';
import { schLinkAction } from './links';
import { ScheduleWidgetLists } from './lists/Lists';
import { ScheduleWidgetWatchLiveBroadcastButton } from './live-broadcast/WatchLiveButton';
import { ScheduleWidgetMyUserTgInform } from './tg-inform/UserTgInform';
import { schDaysTsjrpcClient, schGeneralTsjrpcClient, schUsersTsjrpcClient } from './tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRights, useScheduleWidgetRights } from './useScheduleWidget';

let isOpenInviteQrAtom: Atom<boolean>;

export function ScheduleWidget({
  schedule,
  rights: topRights,
}: {
  schedule?: IScheduleWidget;
  rights?: ScheduleWidgetRights;
}) {
  isOpenInviteQrAtom ??= atom(false);

  const rights = useScheduleWidgetRights(schedule, topRights);
  const checkAccess = useCheckUserAccessRightsInScope();

  const scheduleScopeProps: ScheduleScopeProps = useMemo(
    () => ({ schw: schedule?.w ?? ScheduleWidgetWidDef }),
    [schedule?.w],
  );
  const prevDate = schedule?.prevStart == null ? null : new Date(schedule.prevStart);

  const { editIcon, isRedact } = useIsRedactArea({
    redactable: true,
    canRedact: rights.isCanRedact,
    isShowDoneButton: true,
    icon: 'PropertyEdit',
  });
  const [startTime, setStartTime] = useState(schedule?.start);

  const titleNode = (
    <div className="flex w-full between">
      <ScheduleWidgetTopicTitle
        prefix={<LazyIcon icon="Calendar03" />}
        titleBox={schedule ?? {}}
        altTitle={translateBase(BaseLocaleKey.ScheduleEvent)}
        topicBox={schedule}
      />
      <span className="flex gap-2">
        <LazyIcon
          icon="QrCode"
          onClick={isOpenInviteQrAtom.do.toggle}
        />
        {editIcon}
      </span>
    </div>
  );

  const date = useMemo(() => new Date(schedule?.start || Date.now()), [schedule?.start]);
  const dateValue = useMemo(
    () => (date.getTime() ? date.toLocaleDateString().replace(makeRegExp('/\\./g'), ' ') : ''),
    [date],
  );

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
    <StyledPrevDateText className={schedule && prevDate.getTime() > schedule.start ? 'text-xKO' : undefined}>
      {translateBase(BaseLocaleKey.SchedulePrevious, { d: makeDateLabel(prevDate) })}
    </StyledPrevDateText>
  );

  if (blockContent)
    return (
      <div className="m-1">
        <div className="my-2">{titleNode}</div>
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
        <QrCodeFullScreen
          openAtom={isOpenInviteQrAtom}
          text={schLinkAction.makeLink({ inviteSch: schedule.w })}
        />

        <StyledWidget className="schedule-widget">
          {titleNode}
          <div className="my-5">
            {rights.isCanRedact && isRedact ? (
              <StrongInputDateTimeExtracter
                title={translateBase(BaseLocaleKey.ScheduleStart)}
                icon="Calendar03"
                value={dateValue}
                takeDate="day"
                takeTime="NO"
                onComponentsChange={(_, __, ___, date) => setStartTime(date.getTime())}
                onSend={async () =>
                  startTime && schGeneralTsjrpcClient.setStartTime({ props: scheduleScopeProps, value: startTime })
                }
              />
            ) : (
              <>
                <ScheduleWidgetStartTimeText
                  schedule={schedule}
                  date={date}
                />
                {prevDateNode}
              </>
            )}
            {rights.isCanRead && (
              <>
                {isRedact && (
                  <>
                    <StrongEditableField
                      fieldKey="title"
                      value={schedule}
                      isRedact
                      icon="SchoolReportCard"
                      title={translateBase(BaseLocaleKey.ScheduleHeader)}
                      onSend={value => schGeneralTsjrpcClient.rename({ props: scheduleScopeProps, value })}
                    />
                    <StrongEditableField
                      fieldKey="topic"
                      value={schedule}
                      isRedact
                      icon="Bookmark03"
                      title={translateBase(BaseLocaleKey.ScheduleTopic)}
                      onSend={value => schGeneralTsjrpcClient.setTopic({ props: scheduleScopeProps, value })}
                    />
                  </>
                )}
                {(isRedact || schedule.dsc) && (
                  <StrongEditableField
                    fieldKey="dsc"
                    value={schedule}
                    isRedact={isRedact}
                    multiline
                    textClassName=" "
                    icon="File02"
                    title={translateBase(BaseLocaleKey.Description)}
                    onSend={value => schGeneralTsjrpcClient.setDescription({ props: scheduleScopeProps, value })}
                  />
                )}
                {rights.isCanReadTitles && (
                  <>
                    {rights.myUser && <ScheduleWidgetControl />}
                    <ScheduleWidgetLists />
                  </>
                )}

                <ScheduleWidgetMyUserTgInform
                  schedule={schedule}
                  scheduleScopeProps={scheduleScopeProps}
                />

                <ScheduleWidgetWatchLiveBroadcastButton
                  schw={schedule.w}
                  postfix={translateBase(BaseLocaleKey.ScheduleWatchBroadcast)}
                />

                {isRedact && (
                  <>
                    <ScheduleWidgetEventTypeList
                      postfix={
                        <>
                          {translateBase(BaseLocaleKey.ScheduleEventTemplates)} <LazyIcon icon="ArrowRight01" />
                        </>
                      }
                      icon="Shapes"
                      schedule={schedule}
                    />
                    <ScheduleWidgetCustomAttachments tatts={schedule.tatts} />
                    {!schedule.days.length && !schedule.tatts.length && !schedule.types.length && (
                      <ScheduleWidgetCopy schw={schedule.w} />
                    )}
                    {!schedule.start || (
                      <TheIconSendButton
                        icon="PlusSign"
                        postfix={translateBase(BaseLocaleKey.ScheduleAddDay)}
                        confirm={translateBase(BaseLocaleKey.ScheduleAddDayConfirm)}
                        className="my-2"
                        onSend={() => schDaysTsjrpcClient.addDay({ props: scheduleScopeProps })}
                      />
                    )}
                    {checkAccess('sch', 'SCH', 'D') && (
                      <TheIconSendButton
                        className="text-xKO"
                        icon="Delete02"
                        confirm={translateBase(BaseLocaleKey.ScheduleRemoveConfirm)}
                        postfix={translateBase(BaseLocaleKey.ScheduleRemove)}
                        onSend={() => schGeneralTsjrpcClient.remove({ props: scheduleScopeProps })}
                      />
                    )}
                  </>
                )}
                {rights.myUser === undefined &&
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
        </StyledWidget>
      </AppDialogProvider>
    </ScheduleWidgetContextWrapper>
  );
}

const StyledWidget = styled.div`
  transition: margin 0.3s;
  padding: 5px;

  &.expand {
    margin-bottom: 50px;
  }

  .icon-scale-05 {
    --icon-scale: 0.5;
  }
`;

const StyledPrevDateText = styled.div`
  opacity: 0.7;
  font-size: 0.8em;
`;

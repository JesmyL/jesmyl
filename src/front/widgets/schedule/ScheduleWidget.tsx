import { AppDialogProvider } from '#basis/ui/AppDialogProvider';
import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { StrongInputDateTimeExtracter } from '#basis/ui/strong-control/StrongDateTimeExtracter';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { mylib } from '#shared/lib/my-lib';
import { QrCodeFullScreen } from '#shared/ui/qr-code/QrCodeFullScreen';
import { SendButton } from '#shared/ui/sends/send-button/SendButton';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { atom } from 'atomaric';
import { useAuth } from 'front/components/index/atoms';
import { useEffect, useMemo, useState } from 'react';
import { makeRegExp } from 'regexpert';
import { IScheduleWidget, IScheduleWidgetWid, ScheduleScopeProps } from 'shared/api';
import styled from 'styled-components';
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
import { ScheduleWidgetWatchLiveTranslationButton } from './live-translations/WatchLiveButton';
import { ScheduleWidgetMyUserTgInform } from './tg-inform/UserTgInform';
import { schDaysTsjrpcClient, schGeneralTsjrpcClient, schUsersTsjrpcClient } from './tsjrpc/tsjrpc.methods';
import { ScheduleWidgetRights, useScheduleWidgetRights } from './useScheduleWidget';

const msInMin = mylib.howMs.inMin;
const isOpenInviteQrAtom = atom(false);

export function ScheduleWidget({
  schedule,
  rights: topRights,
}: {
  schedule?: IScheduleWidget;
  rights?: ScheduleWidgetRights;
}) {
  const auth = useAuth();
  const rights = useScheduleWidgetRights(schedule, topRights);
  const scheduleScopeProps: ScheduleScopeProps = useMemo(
    () => ({ schw: schedule?.w ?? IScheduleWidgetWid.def }),
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
        altTitle="Мероприятие"
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
    let time = msInMin;
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
            title="Буду участвовать"
            confirm="Вы будете записаны как участник"
            onSend={() => schUsersTsjrpcClient.addMe({ props: scheduleScopeProps, place: 'по кнопке в расписании' })}
          />
        );
      } else if (rights.isSwHideContent)
        blockContent = <div className="text-x7 font-size:0.8em">Предварительной регистрации на мероприятие нет</div>;
    }
  } else {
    if (rights.myUser.R === undefined || rights.myUser.R === 0) {
      if (!rights.isSwPublic || rights.isSwHideContent) blockContent = <div className="text-x7">Заявка принята</div>;
    } else if (!rights.isCanRead) {
      blockContent = <div className="text-xKO">Доступ к содержимому ограничен</div>;
    }
  }

  const prevDateNode = prevDate && (
    <StyledPrevDateText className={schedule && prevDate.getTime() > schedule.start ? 'text-xKO' : undefined}>
      Предыдущее - {prevDate.toLocaleDateString('ru', { month: 'long', day: '2-digit', year: 'numeric' })}
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
                title="Начало"
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
                      title="Заголовок"
                      onSend={value => schGeneralTsjrpcClient.rename({ props: scheduleScopeProps, value })}
                    />
                    <StrongEditableField
                      fieldKey="topic"
                      value={schedule}
                      isRedact
                      icon="Bookmark03"
                      title="Тема"
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
                    title="Описание"
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

                <ScheduleWidgetWatchLiveTranslationButton
                  schw={schedule.w}
                  postfix="Следить за трансляцией"
                />

                {isRedact && (
                  <>
                    <ScheduleWidgetEventTypeList
                      postfix={
                        <>
                          Шаблоны событий <LazyIcon icon="ArrowRight01" />
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
                        postfix="Добавить день"
                        confirm="Дни удалять не возможно! Создать новый?"
                        className="my-2"
                        onSend={() => schDaysTsjrpcClient.addDay({ props: scheduleScopeProps })}
                      />
                    )}
                    {auth && auth.level >= 80 && (
                      <TheIconSendButton
                        className="text-xKO"
                        icon="Delete02"
                        confirm="Восстановить расписание будет не возможно. Продолжить?"
                        postfix="Удалить расписание"
                        onSend={() => schGeneralTsjrpcClient.remove({ props: scheduleScopeProps })}
                      />
                    )}
                  </>
                )}
                {rights.myUser === undefined &&
                  (rights.auth.level > 0 ? (
                    <SendButton
                      title="Хочу комментить события"
                      className="mt-10"
                      onSend={() =>
                        schUsersTsjrpcClient.addMe({
                          props: scheduleScopeProps,
                          place: 'по кнопке "Хочу комментить события"',
                        })
                      }
                    />
                  ) : (
                    <div className="mt-5">Комментировать события могут только регистрированные пользователи</div>
                  ))}
                {schedule.days.map((day, dayi) => {
                  if (dayi === 0 && schedule.withTech && !rights.isCanReadSpecials) return null;

                  return (
                    <ScheduleWidgetDay
                      key={dayi}
                      day={day}
                      dayi={dayi}
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

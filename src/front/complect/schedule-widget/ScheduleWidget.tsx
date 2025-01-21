import { mylib } from 'front/utils';
import { useEffect, useMemo, useState } from 'react';
import { IScheduleWidget, IScheduleWidgetWid, ScheduleScopeProps } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import styled from 'styled-components';
import { IconArrowRight01StrokeRounded } from '../../complect/the-icon/icons/arrow-right-01';
import { IconBookmark03StrokeRounded } from '../../complect/the-icon/icons/bookmark-03';
import { IconCalendar03StrokeRounded } from '../../complect/the-icon/icons/calendar-03';
import { IconDelete02StrokeRounded } from '../../complect/the-icon/icons/delete-02';
import { IconFile02StrokeRounded } from '../../complect/the-icon/icons/file-02';
import { IconPlusSignStrokeRounded } from '../../complect/the-icon/icons/plus-sign';
import { IconSchoolReportCardStrokeRounded } from '../../complect/the-icon/icons/school-report-card';
import { IconShapesStrokeRounded } from '../../complect/the-icon/icons/shapes';
import { useAuth } from '../../components/index/molecules';
import { QrCodeFullScreen } from '../qr-code/QrCodeFullScreen';
import EvaSendButton from '../sends/eva-send-button/EvaSendButton';
import SendButton from '../sends/send-button/SendButton';
import StrongControlDateTimeExtracter from '../strong-control/StrongDateTimeExtracter';
import StrongEditableField from '../strong-control/field/StrongEditableField';
import { IconQrCodeStrokeRounded } from '../the-icon/icons/qr-code';
import useIsRedactArea from '../useIsRedactArea';
import ScheduleWidgetCustomAttachments from './atts/custom/CustomAttachments';
import ScheduleWidgetStartTimeText from './complect/StartTimeText';
import ScheduleWidgetTopicTitle from './complect/TopicTitle';
import { ScheduleScopePropsContext } from './complect/scope-contexts/scope-props-contexts';
import { ScheduleWidgetControl } from './control/Control';
import { ScheduleWidgetDay } from './days/Day';
import { ScheduleWidgetEventTypeList } from './events/EventTypeList';
import ScheduleWidgetContextWrapper from './general/ContextWrapper';
import { ScheduleWidgetCopy } from './general/Copy';
import {
  schDaysSokiInvocatorClient,
  schGeneralSokiInvocatorClient,
  schUsersSokiInvocatorClient,
} from './invocators/invocators.methods';
import { schLinkAction } from './links';
import ScheduleWidgetLists from './lists/Lists';
import { ScheduleWidgetWatchLiveTranslationButton } from './live-translations/WatchLiveButton';
import { ScheduleWidgetMyUserTgInform } from './tg-inform/UserTgInform';
import { ScheduleWidgetRights, useScheduleWidgetRights } from './useScheduleWidget';

const msInMin = mylib.howMs.inMin;

export default function ScheduleWidget({
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

  const { editIcon, isRedact } = useIsRedactArea(true, null, rights.isCanRedact, true);
  const [startTime, setStartTime] = useState(schedule?.start);
  const [isOpenInviteQr, setIsOpenInviteQr] = useState(false);

  const titleNode = (
    <div className="flex full-width between">
      <ScheduleWidgetTopicTitle
        prefix={<IconCalendar03StrokeRounded />}
        titleBox={schedule ?? {}}
        altTitle="Мероприятие"
        topicBox={schedule}
      />
      <span className="flex flex-gap">
        <IconQrCodeStrokeRounded onClick={() => setIsOpenInviteQr(true)} />
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
            onSend={() => schUsersSokiInvocatorClient.addMe(null, scheduleScopeProps, 'по кнопке в расписании')}
          />
        );
      } else if (rights.isSwHideContent)
        blockContent = <div className="color--7 font-size:0.8em">Предварительной регистрации на мероприятие нет</div>;
    }
  } else {
    if (rights.myUser.R === undefined || rights.myUser.R === 0) {
      if (!rights.isSwPublic || rights.isSwHideContent) blockContent = <div className="color--7">Заявка принята</div>;
    } else if (!rights.isCanRead) {
      blockContent = <div className="color--ko">Доступ к содержимому ограничен</div>;
    }
  }

  if (blockContent)
    return (
      <div className="margin-sm-gap">
        <div className="margin-gap-v">{titleNode}</div>
        <ScheduleWidgetStartTimeText schedule={schedule} />
        {blockContent}
      </div>
    );

  if (!schedule) return null;

  if (blockContent)
    return (
      <ScheduleWidgetContextWrapper
        schedule={schedule}
        rights={rights}
      >
        {blockContent}
      </ScheduleWidgetContextWrapper>
    );

  return (
    <ScheduleWidgetContextWrapper
      schedule={schedule}
      rights={rights}
    >
      <ScheduleScopePropsContext.Provider value={scheduleScopeProps}>
        {isOpenInviteQr && (
          <QrCodeFullScreen
            text={schLinkAction.makeLink({ inviteSch: schedule.w })}
            onClose={setIsOpenInviteQr}
          />
        )}
        <Widget className={'schedule-widget'}>
          {titleNode}
          <div className="margin-big-gap-v">
            {rights.isCanRedact && isRedact ? (
              <StrongControlDateTimeExtracter
                title="Начало"
                Icon={IconCalendar03StrokeRounded}
                value={dateValue}
                takeDate="day"
                takeTime="NO"
                onComponentsChange={(_, __, ___, date) => setStartTime(date.getTime())}
                onSend={async () =>
                  startTime && schGeneralSokiInvocatorClient.setStartTime(null, scheduleScopeProps, startTime)
                }
              />
            ) : (
              <ScheduleWidgetStartTimeText
                schedule={schedule}
                date={date}
              />
            )}
            {rights.isCanRead && (
              <>
                {isRedact && (
                  <>
                    <StrongEditableField
                      fieldKey="title"
                      value={schedule}
                      isRedact
                      Icon={IconSchoolReportCardStrokeRounded}
                      title="Заголовок"
                      onSend={value => schGeneralSokiInvocatorClient.rename(null, scheduleScopeProps, value)}
                    />
                    <StrongEditableField
                      fieldKey="topic"
                      value={schedule}
                      isRedact
                      Icon={IconBookmark03StrokeRounded}
                      title="Тема"
                      onSend={value => schGeneralSokiInvocatorClient.setTopic(null, scheduleScopeProps, value)}
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
                    Icon={IconFile02StrokeRounded}
                    title="Описание"
                    onSend={value => schGeneralSokiInvocatorClient.setDescription(null, scheduleScopeProps, value)}
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

                <ScheduleWidgetWatchLiveTranslationButton schedule={schedule} />

                {isRedact && (
                  <>
                    <ScheduleWidgetEventTypeList
                      postfix={
                        <>
                          Шаблоны событий <IconArrowRight01StrokeRounded />
                        </>
                      }
                      Icon={IconShapesStrokeRounded}
                      schedule={schedule}
                    />
                    <ScheduleWidgetCustomAttachments tatts={schedule.tatts} />
                    {!schedule.days.length && !schedule.tatts.length && !schedule.types.length && (
                      <ScheduleWidgetCopy schw={schedule.w} />
                    )}
                    {!schedule.start || (
                      <EvaSendButton
                        Icon={IconPlusSignStrokeRounded}
                        postfix="Добавить день"
                        confirm="Дни удалять не возможно! Создать новый?"
                        className="margin-gap-v"
                        onSend={() => schDaysSokiInvocatorClient.addDay(null, scheduleScopeProps)}
                      />
                    )}
                    {auth && auth.level >= 80 && (
                      <EvaSendButton
                        className="color--ko"
                        Icon={IconDelete02StrokeRounded}
                        confirm="Восстановить расписание будет не возможно. Продолжить?"
                        postfix="Удалить расписание"
                        onSend={() => schGeneralSokiInvocatorClient.remove(null, scheduleScopeProps)}
                      />
                    )}
                  </>
                )}
                {rights.myUser === undefined &&
                  (rights.auth.level > 0 ? (
                    <SendButton
                      title="Хочу комментить события"
                      className="margin-giant-gap-t"
                      onSend={() =>
                        schUsersSokiInvocatorClient.addMe(
                          null,
                          scheduleScopeProps,
                          'по кнопке "Хочу комментить события"',
                        )
                      }
                    />
                  ) : (
                    <div className="margin-big-gap-t">
                      Комментировать события могут только регистрированные пользователи
                    </div>
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
        </Widget>
      </ScheduleScopePropsContext.Provider>
    </ScheduleWidgetContextWrapper>
  );
}

const Widget = styled.div`
  transition: margin 0.3s;
  padding: 5px;

  &.expand {
    margin-bottom: 50px;
  }

  .icon-scale-05 {
    --icon-scale: 0.5;
  }
`;

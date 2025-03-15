import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { mylib, MyLib } from '#shared/lib/my-lib';
import { useIsRememberExpand } from '#shared/ui/expand/useIsRememberExpand';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { ScheduleWidgetBindAttRefKeyButton } from '#widgets/schedule/atts/BindAttRefKeyButton';
import { ScheduleWidgetBindAtts } from '#widgets/schedule/atts/BindAtts';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { ScheduleWidgetDayEventAtts } from '#widgets/schedule/events/atts/DayEventAtts';
import { schDayEventsSokiInvocatorClient } from '#widgets/schedule/invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/useScheduleWidget';
import { ReactNode, useMemo } from 'react';
import {
  indexScheduleGetEventFinishMs,
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleDayEventScopeProps,
  ScheduleDayScopeProps,
  ScheduleWidgetAttKey,
  ScheduleWidgetCleans,
} from 'shared/api';
import styled from 'styled-components';
import { ScheduleWidgetDayEventRating } from './DayEventRating';
import { DayEventRedactControls } from './RedactControls';

const msInMin = mylib.howMs.inMin;

interface Props {
  schedule: IScheduleWidget;
  event: IScheduleWidgetDayEvent;
  eventi: number;
  dayi: number;
  day: IScheduleWidgetDay;
  eventTimes: number[];
  secretTime: number;
  isShowPeriodsNotTs: boolean;
  onClickOnTs: () => void;
  redact: boolean | nil;
  isPastDay: boolean;
  isLastEvent: boolean;
  bottomContent: (isRedact: boolean) => ReactNode;
  className?: string;
  isForceExpand?: boolean;
  isForceCanRedact?: boolean;
  isForceHideRating?: boolean;
  dayScopeProps: ScheduleDayScopeProps;
}

export function ScheduleWidgetDayEvent(props: Props) {
  let timeMark = '';
  let timerClassNamePlus = '';
  const rights = useScheduleWidgetRightsContext();
  const eventType = props.schedule.types[props.event.type];
  const { editIcon, isRedact, isSelfRedact, setIsSelfRedact } = useIsRedactArea(true, null, rights.isCanRedact, true);
  const dayEventScopeProps: ScheduleDayEventScopeProps = useMemo(
    () => ({ ...props.dayScopeProps, eventMi: props.event.mi }),
    [props.dayScopeProps, props.event.mi],
  );

  const now = Date.now();
  const eventTm = ScheduleWidgetCleans.takeEventTm(props.event, eventType);
  const wakeupMs = ScheduleWidgetCleans.computeDayWakeUpTime(props.day.wup, 'number');
  const eventFinishMs = indexScheduleGetEventFinishMs(
    props.schedule,
    wakeupMs,
    props.dayi,
    props.eventTimes[props.eventi],
  );
  const eventStartMs = eventFinishMs - eventTm * msInMin;
  let isPrevEvent = now > eventFinishMs;

  if (eventTm === 0) {
    if (isPrevEvent && !props.isPastDay) {
      let eventTmMs = eventFinishMs;
      let eventiPlus = 1;

      while (true) {
        const nextEvent = props.day.list[props.eventi + eventiPlus++] as IScheduleWidgetDayEvent | und;

        if (nextEvent == null) break;

        const nextBox = props.schedule.types[nextEvent.type];
        const nextEventTm = ScheduleWidgetCleans.takeEventTm(nextEvent, nextBox);

        if (nextEventTm !== 0) {
          eventTmMs += nextEventTm * mylib.howMs.inMin;
          break;
        }
      }

      isPrevEvent = now > eventTmMs;
    }
  }

  const prevEvent = props.day.list[props.eventi - 1] as IScheduleWidgetDayEvent | und;
  const prevTm = ScheduleWidgetCleans.takeEventTm(prevEvent, prevEvent && rights.schedule.types[prevEvent.type]);

  const isFirstInGroup = prevEvent && prevTm !== 0 && eventTm === 0;
  const isInGroup = prevEvent && prevTm === 0 && eventTm === 0;
  const isLastInGroup = prevEvent && prevTm === 0 && eventTm !== 0;

  const [, isExpand, switchIsExpand] = useIsRememberExpand(JSON.stringify(dayEventScopeProps));

  const isCanExpandEvent =
    props.isForceExpand ??
    (((rights.myUser && rights.isCanReadTitles) ||
      (props.event.atts && MyLib.entries(props.event.atts).some(item => item[0] === '[cm]:coms'))) &&
      !props.redact);

  const isExpandEvent = (isSelfRedact || isExpand) && isCanExpandEvent;

  if (!eventType) return <>Неизвестный шаблон события</>;

  if (props.isShowPeriodsNotTs) {
    timeMark = eventTm + props.secretTime + 'м';
    timerClassNamePlus =
      props.event.tm == null || props.event.tm === eventType.tm || (props.event.tm === 0 && eventType.tm == null)
        ? ''
        : ' color--7';
  } else {
    const date = new Date(eventStartMs);
    timeMark = `${('' + date.getHours()).padStart(2, '0')}:${('' + date.getMinutes()).padStart(2, '0')}`;
    timerClassNamePlus = prevTm === 0 && prevEvent != null ? ' fade-03' : '';
  }

  const isCurrentEvent = now > eventStartMs && now < eventFinishMs;

  const timeToTitle = rights.isCanReadSpecials && !props.redact && isCurrentEvent && (
    <div className="absolute pos-left pos-bottom margin-big-gap-l font-size:0.7em">
      {props.isLastEvent
        ? ScheduleWidgetCleans.minutesToTextTemplate(eventFinishMs - now, 'остал$onNum{{ась}{ось}} $num $txt')
        : 'через ' + ScheduleWidgetCleans.minutesToText(eventFinishMs - now, true)}
    </div>
  );

  const onRemoveAttSend = (attKey: ScheduleWidgetAttKey) =>
    schDayEventsSokiInvocatorClient.removeAttachment(null, dayEventScopeProps, attKey);

  return (
    <>
      <StyledScheduleWidgetDayEvent
        className={
          (props.className || '') +
          ' day-event relative' +
          (props.isPastDay ? '' : isPrevEvent ? ' past' : '') +
          (timeToTitle ? ' margin-big-gap-b' : '') +
          (isInGroup ? ' in-group' : '') +
          (isFirstInGroup ? ' first-in-group' : '') +
          (isLastInGroup && !timeToTitle ? ' last-in-group' : '')
        }
      >
        <div
          className={'event-header flex flex-gap between' + (props.redact || !isCanExpandEvent ? '' : ' pointer')}
          onClick={
            isCanExpandEvent
              ? () => {
                  if (!props.redact) switchIsExpand();
                  setIsSelfRedact(false);
                }
              : undefined
          }
        >
          <div className="left-part flex flex-gap">
            <span
              className={'time-mark' + timerClassNamePlus}
              onClick={
                rights.isCanReadSpecials && rights.myUser && !props.redact
                  ? event => {
                      event.stopPropagation();
                      props.onClickOnTs();
                    }
                  : undefined
              }
            >
              {timeMark}
            </span>
            {!isExpandEvent && !!props.event.secret && (
              <LazyIcon
                icon="ViewOffSlash"
                className="color--ko"
              />
            )}
            <ScheduleWidgetTopicTitle
              titleBox={eventType}
              topicBox={props.event}
            />
          </div>
          {(props.isForceCanRedact ?? rights.isCanRedact)
            ? isExpand || isRedact
              ? editIcon
              : (props.event.dsc || MyLib.keys(props.event.atts).length !== 0) && <LazyIcon icon="ArrowDown01" />
            : props.isForceExpand ||
              (isCanExpandEvent ? isExpand ? <LazyIcon icon="ArrowUp01" /> : <LazyIcon icon="ArrowDown01" /> : null)}
        </div>
        {(isExpandEvent || props.isForceExpand) && (
          <StyledContent className="no-scrollbar">
            <div className="sign-line" />
            {isRedact ? (
              <DayEventRedactControls
                isPastEvent={isPrevEvent || isCurrentEvent}
                eventTopic={props.event.topic}
                eventTypeTitle={eventType.title}
                isSecret={props.event.secret}
                tgInform={props.event.tgInform}
                dayEventScopeProps={dayEventScopeProps}
                eventTm={eventTm}
              />
            ) : (
              !!props.event.secret && (
                <TheIconButton
                  icon="ViewOffSlash"
                  className="color--ko margin-gap-v"
                  postfix="Это событие только для лидеров"
                />
              )
            )}
            {(isRedact || props.event.dsc) && (
              <StrongEditableField
                isRedact={isRedact}
                multiline
                value={props.event}
                fieldKey="dsc"
                title="Содержание"
                textClassName=" "
                icon="File02"
                onSend={value => schDayEventsSokiInvocatorClient.setDescription(null, dayEventScopeProps, value)}
              />
            )}
            {isRedact ? (
              <div>
                <ScheduleWidgetBindAtts
                  atts={props.event.atts}
                  schedule={props.schedule}
                  forTitle={
                    <>
                      <span className="color--7">{eventType.title}</span> - вставить вложение
                    </>
                  }
                  onAddAttSend={(attKey, defaultValue) =>
                    schDayEventsSokiInvocatorClient.addAttachment(null, dayEventScopeProps, attKey, defaultValue)
                  }
                  onRemoveAttSend={onRemoveAttSend}
                  inAttNodeAdds={(attKey, tatt, refs) => {
                    return (
                      !refs.length || (
                        <ScheduleWidgetBindAttRefKeyButton
                          refs={refs}
                          forTitle={<span className="color--7">{eventType.title}</span>}
                          tatt={tatt}
                          attKey={attKey}
                          atts={props.event.atts}
                          schedule={rights.schedule}
                          onRemoveAttSend={onRemoveAttSend}
                          onSend={attRef =>
                            schDayEventsSokiInvocatorClient.addAttachmentRef(null, dayEventScopeProps, attKey, attRef)
                          }
                        />
                      )
                    );
                  }}
                />
              </div>
            ) : (
              <>
                <ScheduleWidgetDayEventAtts
                  dayEventScopeProps={dayEventScopeProps}
                  typeBox={eventType}
                  event={props.event}
                  day={props.day}
                  dayi={props.dayi}
                  schedule={props.schedule}
                  isPrevEvent={isPrevEvent || props.isPastDay}
                />
                {rights.isCanReadTitles && rights.myUser && !props.isForceHideRating && (
                  <ScheduleWidgetDayEventRating
                    dayEventScopeProps={dayEventScopeProps}
                    event={props.event}
                  />
                )}
              </>
            )}
            {props.bottomContent(isRedact)}
            <div className="sign-line" />
          </StyledContent>
        )}
      </StyledScheduleWidgetDayEvent>
      {timeToTitle}
    </>
  );
}

const StyledContent = styled.div`
  opacity: 0;
  animation: expand-content 0.5s cubic-bezier(0.39, 0.58, 0.57, 1) forwards;
  max-height: 0px;
  overflow: auto;

  @keyframes expand-content {
    0% {
      opacity: 0;
      max-height: 0px;
    }

    90% {
      opacity: 1;
      max-height: 100vh;
    }

    100% {
      opacity: 1;
      max-height: 900vh;
    }
  }
`;

export const StyledScheduleWidgetDayEvent = styled.div`
  border-radius: 0.5rem;
  background-color: var(--color--2);
  padding: 0.7rem;
  width: 100%;
  overflow: hidden;

  &.past {
    filter: grayscale(0.7);
  }

  .sign-line {
    opacity: 0.3;
    margin: 5px 0;
    background: var(--color--4);
    width: 100%;
    height: 1px;
  }

  > .event-header {
    height: 1.2em;

    > .left-part {
      > .time-mark {
        width: 2.2rem;
        min-height: 1rem;
        font-size: 0.9rem;
      }
    }
  }

  .edit-button {
    transition: margin-right 0.2s;
  }

  &.in-group {
    border-radius: 0;
  }

  &.first-in-group {
    margin-top: 10px;

    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.last-in-group {
    margin-bottom: 10px;

    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

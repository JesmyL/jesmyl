import { MyLib, mylib } from 'front/utils';
import { ReactNode } from 'react';
import {
  indexScheduleGetEventFinishMs,
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleWidgetCleans,
} from 'shared/api';
import styled from 'styled-components';
import { IconArrowDown01StrokeRounded } from '../../../../complect/the-icon/icons/arrow-down-01';
import { IconArrowUp01StrokeRounded } from '../../../../complect/the-icon/icons/arrow-up-01';
import { IconBookmark03StrokeRounded } from '../../../../complect/the-icon/icons/bookmark-03';
import { IconCheckmarkSquare02StrokeRounded } from '../../../../complect/the-icon/icons/checkmark-square-02';
import { IconClock01StrokeRounded } from '../../../../complect/the-icon/icons/clock-01';
import { IconFile02StrokeRounded } from '../../../../complect/the-icon/icons/file-02';
import { IconNotification01StrokeRounded } from '../../../../complect/the-icon/icons/notification-01';
import { IconNotificationOff01StrokeRounded } from '../../../../complect/the-icon/icons/notification-off-01';
import { IconSquareStrokeRounded } from '../../../../complect/the-icon/icons/square';
import { IconViewOffSlashStrokeRounded } from '../../../../complect/the-icon/icons/view-off-slash';
import { useIsRememberExpand } from '../../../expand/useIsRememberExpand';
import StrongEvaButton from '../../../strong-control/StrongEvaButton';
import StrongEditableField from '../../../strong-control/field/StrongEditableField';
import IconButton from '../../../the-icon/IconButton';
import useIsRedactArea from '../../../useIsRedactArea';
import ScheduleWidgetBindAtts from '../../atts/BindAtts';
import ScheduleWidgetTopicTitle from '../../complect/TopicTitle';
import ScheduleWidgetDayEventAtts from '../../events/atts/DayEventAtts';
import { takeStrongScopeMaker, useScheduleWidgetRightsContext } from '../../useScheduleWidget';
import ScheduleWidgetDayEventRating from './DayEventRating';

const msInMin = mylib.howMs.inMin;

const mapExecTmArgs = (args: {}) => ({ ...args, techKey: 'tm' });
const mapExecTgInformArgs = (args: {}) => ({ ...args, techKey: 'tgInform' });

interface Props {
  scope: string;
  scheduleScope: string;
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
}

export default function ScheduleWidgetDayEvent(props: Props) {
  let timeMark = '';
  let timerClassNamePlus = '';
  const rights = useScheduleWidgetRightsContext();
  const box = props.schedule.types[props.event.type];
  const { editIcon, isRedact, isSelfRedact, setIsSelfRedact } = useIsRedactArea(true, null, rights.isCanRedact, true);
  const selfScope = takeStrongScopeMaker(props.scope, ' eventMi/', props.event.mi);

  const now = Date.now();
  const eventTm = ScheduleWidgetCleans.takeEventTm(props.event, box);
  const wakeupMs = ScheduleWidgetCleans.computeDayWakeUpTime(props.day.wup, 'number');
  const eventFinishMs = indexScheduleGetEventFinishMs(
    props.schedule,
    wakeupMs,
    props.dayi,
    props.eventTimes[props.eventi],
  );
  const eventStartMs = eventFinishMs - eventTm * msInMin;
  let isPastEvent = now > eventFinishMs;

  if (eventTm === 0) {
    if (isPastEvent && !props.isPastDay) {
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

      isPastEvent = now > eventTmMs;
    }
  }

  const prevEvent = props.day.list[props.eventi - 1] as IScheduleWidgetDayEvent | und;
  const prevTm = ScheduleWidgetCleans.takeEventTm(prevEvent, prevEvent && rights.schedule.types[prevEvent.type]);

  let isFirstInGroup = prevEvent && prevTm !== 0 && eventTm === 0;
  let isInGroup = prevEvent && prevTm === 0 && eventTm === 0;
  let isLastInGroup = prevEvent && prevTm === 0 && eventTm !== 0;

  const [, isExpand, switchIsExpand] = useIsRememberExpand(selfScope);

  const isCanExpandEvent =
    props.isForceExpand ??
    (((rights.myUser && rights.isCanReadTitles) ||
      (props.event.atts && MyLib.entries(props.event.atts).some(item => item[0] === '[cm]:coms'))) &&
      !props.redact);

  const isExpandEvent = (isSelfRedact || isExpand) && isCanExpandEvent;

  if (!box) return <>Неизвестный шаблон события</>;

  if (props.isShowPeriodsNotTs) {
    timeMark = eventTm + props.secretTime + 'м';
    timerClassNamePlus =
      props.event.tm == null || props.event.tm === box.tm || (props.event.tm === 0 && box.tm == null)
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

  return (
    <>
      <StyledScheduleWidgetDayEvent
        className={
          (props.className || '') +
          ' day-event relative' +
          (props.isPastDay ? '' : isPastEvent ? ' past' : '') +
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
                  !props.redact && switchIsExpand();
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
            {!isExpandEvent && !!props.event.secret && <IconViewOffSlashStrokeRounded className="color--ko" />}
            <ScheduleWidgetTopicTitle
              titleBox={box}
              topicBox={props.event}
            />
          </div>
          {props.isForceCanRedact ?? rights.isCanRedact
            ? isExpand || isRedact
              ? editIcon
              : (props.event.dsc || MyLib.keys(props.event.atts).length !== 0) && <IconArrowDown01StrokeRounded />
            : props.isForceExpand ||
              (isCanExpandEvent ? isExpand ? <IconArrowUp01StrokeRounded /> : <IconArrowDown01StrokeRounded /> : null)}
        </div>
        {(isExpandEvent || props.isForceExpand) && (
          <StyledContent className="no-scrollbar">
            <div className="sign-line" />
            {isRedact ? (
              <>
                <StrongEvaButton
                  scope={selfScope}
                  fieldName="secret"
                  fieldValue={props.event.secret ? 0 : 1}
                  cud="U"
                  Icon={props.event.secret ? IconCheckmarkSquare02StrokeRounded : IconSquareStrokeRounded}
                  confirm={`Событие ${box.title} ${
                    props.event.secret ? 'больше не только для лидеров' : 'будет только для лидеров'
                  }?`}
                  postfix="Событие только для лидеров"
                />
                {props.event.tgInform === 0 || isPastEvent || isCurrentEvent ? (
                  <StrongEvaButton
                    scope={selfScope}
                    fieldName="techField"
                    fieldValue={1}
                    cud="U"
                    disabled={isPastEvent || isCurrentEvent}
                    Icon={IconNotificationOff01StrokeRounded}
                    postfix="TG-Напоминания не будет"
                    mapExecArgs={mapExecTgInformArgs}
                  />
                ) : (
                  <StrongEvaButton
                    scope={selfScope}
                    fieldName="techField"
                    fieldValue={0}
                    cud="U"
                    disabled={isPastEvent || isCurrentEvent}
                    Icon={IconNotification01StrokeRounded}
                    postfix="TG-Напоминание будет"
                    mapExecArgs={mapExecTgInformArgs}
                  />
                )}
                <StrongEditableField
                  isRedact
                  scope={selfScope}
                  fieldName="techField"
                  type="number"
                  value={'' + eventTm}
                  postfix=" мин"
                  title="Продолжительность, мин"
                  Icon={IconClock01StrokeRounded}
                  mapExecArgs={mapExecTmArgs}
                />
                <StrongEditableField
                  isRedact
                  scope={selfScope}
                  fieldName="field"
                  value={props.event}
                  fieldKey="topic"
                  title="Тема"
                  Icon={IconBookmark03StrokeRounded}
                />
              </>
            ) : (
              !!props.event.secret && (
                <IconButton
                  Icon={IconViewOffSlashStrokeRounded}
                  className="color--ko margin-gap-v"
                  postfix="Это событие только для лидеров"
                />
              )
            )}
            {(isRedact || props.event.dsc) && (
              <StrongEditableField
                isRedact={isRedact}
                scope={selfScope}
                fieldName="field"
                multiline
                value={props.event}
                fieldKey="dsc"
                title="Содержание"
                textClassName=" "
                Icon={IconFile02StrokeRounded}
              />
            )}
            {isRedact ? (
              <ScheduleWidgetBindAtts
                atts={props.event.atts}
                scope={selfScope}
                schedule={props.schedule}
                scheduleScope={props.scheduleScope}
                forTitle={<span className="color--7">{box.title}</span>}
              />
            ) : (
              <>
                <ScheduleWidgetDayEventAtts
                  scope={selfScope}
                  typeBox={box}
                  event={props.event}
                  day={props.day}
                  dayi={props.dayi}
                  schedule={props.schedule}
                  isPast={isPastEvent || props.isPastDay}
                />
                {rights.isCanReadTitles && rights.myUser && !props.isForceHideRating && (
                  <ScheduleWidgetDayEventRating
                    scope={selfScope}
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

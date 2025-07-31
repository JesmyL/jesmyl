import { StrongDiv } from '#basis/ui/strong-control/StrongDiv';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { useIsRememberExpand } from '#shared/ui/expand/useIsRememberExpand';
import { TheIconSendButton } from '#shared/ui/sends/the-icon-send-button/TheIconSendButton';
import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { ScheduleWidgetEventTypeList } from '#widgets/schedule/events/EventTypeList';
import { schDaysTsjrpcClient } from '#widgets/schedule/tsjrpc/tsjrpc.methods';
import { useEffect, useMemo, useState } from 'react';
import { IScheduleWidgetDay, ScheduleDayScopeProps, indexScheduleGetDayEventTimes } from 'shared/api';
import { isNIs } from 'shared/utils';
import styled from 'styled-components';
import { ScheduleWidgetDayEvent, StyledScheduleWidgetDayEvent } from './DayEvent';
import { ScheduleWidgetDayEventEventActions } from './EventActions';

type Props = {
  day: IScheduleWidgetDay;
  isPastDay: boolean;
  isForceExpand?: boolean;
  dayi: number;
  dayScopeProps: ScheduleDayScopeProps;
};

export function ScheduleWidgetDayEventList({ day, isPastDay, dayi, isForceExpand, dayScopeProps }: Props) {
  const [isShowPeriodsNotTs, setIsShowTsNotPeriods] = useState(false);
  const [isReplacementInProcess, setIsReplacementInProcess] = useState(false);
  const rights = useScheduleWidgetRightsContext();
  const [isIndividualReplacement, setIsIndividualReplacement] = useState(false);
  const { editIcon, isRedact } = useIsRedactArea({
    redactable: true,
    redact: isIndividualReplacement || null,
    canRedact: rights.isCanRedact,
    isShowDoneButton: true,
    icon: 'DashboardSquareEdit',
  });
  const [listTitle, isExpand, switchIsExpand] = useIsRememberExpand(
    JSON.stringify(dayScopeProps),
    <>
      <LazyIcon
        icon="LeftToRightListBullet"
        className="color--7"
      />
      {' Распорядок'}
    </>,
    isExpand => (isExpand || isForceExpand) && editIcon,
  );

  const usedCounts = useMemo(() => {
    const usedCounts: Record<number, number> = {};
    day.list.forEach(({ type }) => {
      if (type != null) usedCounts[type] = (usedCounts[type] || 0) + 1;
    });
    return usedCounts;
  }, [day.list]);
  const [moveEventMi, setMoveEventMi] = useState<number | null>(null);
  const movementEvent = moveEventMi !== null ? day.list.find(event => event.mi === moveEventMi) : undefined;
  const movementBox = movementEvent && rights.schedule.types[movementEvent.type];
  const times = useMemo(() => indexScheduleGetDayEventTimes(rights.schedule, day), [day, rights.schedule]);

  let secretTime = 0;
  let isFirstSecrets = true;

  useEffect(() => {
    if (isRedact) switchIsExpand(true);
    else setMoveEventMi(null);
  }, [isRedact, switchIsExpand]);

  return (
    <StyledList
      className={
        'schedule-widget-day-event-list' +
        (isRedact ? ' redact' : '') +
        (moveEventMi === null ? '' : ' event-movement') +
        (isIndividualReplacement ? ' individual-replacement' : '')
      }
    >
      <div className="max-width hide-on-print">{listTitle}</div>
      {(isExpand || isForceExpand) && (
        <>
          {day.list.map((event, eventi, eventa) => {
            if (!rights.isCanReadSpecials) {
              if (!isFirstSecrets && eventa[eventi + 1]?.secret)
                secretTime += event.tm ?? rights.schedule.types[event.type].tm ?? 0;
              if (event.secret) return null;
              isFirstSecrets = false;
            }

            const isNeighbour = moveEventMi === event.mi || moveEventMi === eventa[eventi + 1]?.mi;
            const insertControl = (beforei: number) =>
              isRedact && (
                <div className={'insert-panel flex flex-gap' + (beforei === 0 ? ' first' : '')}>
                  <StrongDiv
                    className="flex flex-gap pointer"
                    onSuccess={() => {
                      setIsReplacementInProcess(false);
                      setIsIndividualReplacement(false);
                      setTimeout(() => setMoveEventMi(null), 300);
                    }}
                    onSend={async () =>
                      movementEvent &&
                      schDaysTsjrpcClient.moveEvent({
                        props: dayScopeProps,
                        value: {
                          eventMi: movementEvent.mi,
                          beforei,
                        },
                      })
                    }
                  >
                    {movementBox && (
                      <div className="flex flex-gap fade-05">
                        <StyledMoveTitle className="ellipsis nowrap">{movementBox.title}</StyledMoveTitle>
                        <div className="nowrap">будет здесь</div>
                      </div>
                    )}
                    <LazyIcon icon="ArrowLeftDouble" />
                  </StrongDiv>
                </div>
              );

            const node = (
              <ScheduleWidgetDayEventWrapper
                key={event.mi}
                className={
                  'day-event-wrapper flex flex-gap' +
                  (moveEventMi === event.mi ? ' move-me pointer' : '') +
                  (isNeighbour ? ' neighbour' : '') +
                  (eventi === 0 ? ' first' : '')
                }
                onClick={
                  moveEventMi === event.mi
                    ? () => {
                        setIsIndividualReplacement(false);
                        setMoveEventMi(null);
                      }
                    : undefined
                }
              >
                {eventi === 0 && insertControl(0)}
                <ScheduleWidgetDayEvent
                  dayScopeProps={dayScopeProps}
                  schedule={rights.schedule}
                  isPastDay={isPastDay}
                  day={day}
                  event={event}
                  eventi={eventi}
                  isLastEvent={eventa.length - 1 === eventi}
                  dayi={dayi}
                  redact={isRedact}
                  eventTimes={times}
                  secretTime={secretTime}
                  isShowPeriodsNotTs={isShowPeriodsNotTs}
                  onClickOnTs={() => setIsShowTsNotPeriods(isNIs)}
                  bottomContent={isRedact =>
                    isRedact && (
                      <>
                        {isReplacementInProcess && moveEventMi === event.mi ? (
                          <TheIconLoading />
                        ) : (
                          <ScheduleWidgetDayEventEventActions
                            event={event}
                            schedule={rights.schedule}
                            onEventCut={() => {
                              setIsIndividualReplacement(true);
                              setMoveEventMi(event.mi);
                            }}
                            dayScopeProps={dayScopeProps}
                          />
                        )}
                      </>
                    )
                  }
                />
                {!isIndividualReplacement && isRedact && (
                  <>
                    <TheIconLoading isLoading={isReplacementInProcess && moveEventMi === event.mi}>
                      <LazyIcon
                        icon="Crop"
                        onClick={() => setMoveEventMi(event.mi)}
                      />
                    </TheIconLoading>
                    {rights.schedule.types && (
                      <TheIconSendButton
                        icon="Delete01"
                        confirm={
                          <ScheduleWidgetTopicTitle
                            prefix="Удалить"
                            titleBox={rights.schedule.types[event.type]}
                            topicBox={event}
                          />
                        }
                        className="color--ko"
                        disabled={moveEventMi !== null}
                        onSend={() =>
                          schDaysTsjrpcClient.removeEvent({
                            props: dayScopeProps,
                            value: { eventMi: event.mi, eventTypeTitle: rights.schedule.types[event.type].title },
                          })
                        }
                      />
                    )}
                  </>
                )}
                {insertControl(eventi + 1)}
              </ScheduleWidgetDayEventWrapper>
            );

            secretTime = 0;

            return node;
          })}
          {isRedact && moveEventMi === null && (
            <ScheduleWidgetEventTypeList
              postfix="Добавить событие"
              icon="CreditCardAdd"
              schedule={rights.schedule}
              usedCounts={usedCounts}
              onItemSelectSend={typei => schDaysTsjrpcClient.addEvent({ props: dayScopeProps, value: typei })}
            />
          )}
        </>
      )}
    </StyledList>
  );
}

const StyledMoveTitle = styled.div`
  max-width: calc(100vw - 180px);
`;

const ScheduleWidgetDayEventWrapper = styled.div`
  position: relative;
  transition:
    margin-bottom 0.2s,
    margin-top 0.2s,
    opacity 0.7s;
  margin: 0.3rem 0;

  &.move-me {
    opacity: 0.5;
  }

  > .insert-panel {
    position: absolute;
    right: 70px;
    opacity: 0.5;
    transition:
      height 0.7s,
      opacity 0.2s,
      right 0.2s;
    height: 25px;
    overflow: hidden;
    pointer-events: none;
  }
`;

const StyledList = styled.div`
  &.redact {
    ${ScheduleWidgetDayEventWrapper} {
      margin-bottom: 40px;

      .insert-panel {
        bottom: -30px;
      }

      &.first {
        margin-top: 40px;

        .insert-panel.first {
          top: -30px;
        }
      }

      &.neighbour {
        margin-bottom: 0.3rem;

        &:not(.first),
        &.move-me {
          margin-top: 0.3rem;

          .insert-panel {
            opacity: 0;
          }
        }

        .insert-panel:not(.first) {
          opacity: 0;
        }
      }

      ${StyledScheduleWidgetDayEvent} {
        .edit-button {
          display: inline-block;
          transition: none;
          margin-right: -40px;
          width: 0;
          overflow: hidden;
        }
      }
    }
  }

  &.event-movement {
    ${ScheduleWidgetDayEventWrapper} {
      > .insert-panel {
        right: 100px;
        opacity: 1;
        pointer-events: all;
      }
    }
  }

  &.individual-replacement {
    ${ScheduleWidgetDayEventWrapper} {
      > .insert-panel {
        right: 10px;
        opacity: 1;
        pointer-events: all;
      }
    }
  }
`;

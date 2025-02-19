import { mylib } from '#shared/lib/my-lib';
import { LazyIcon } from '#shared/ui/icon';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleWidgetCleans,
  ScheduleWidgetDayListItemTypeBox,
} from 'shared/api';
import { itNNull } from 'shared/utils';
import styled from 'styled-components';
import { useIndexSchedules } from '../../../components/index/atoms';
import useFullContent, { FullContentValue } from '../../../shared/ui/fullscreen-content/useFullContent';
import { ScheduleWidgetTopicTitle } from '../complect/TopicTitle';
import { ScheduleAlarmDay } from './AlarmDay';
import { ScheduleWidgetAlarmInfoContent } from './InfoContent';

const msInDay = mylib.howMs.inDay;
const msInHour = mylib.howMs.inHour;
const msInMin = mylib.howMs.inMin;

const makeNextDayFirstEventNode = (
  scheduleTitle: string | und,
  nextDay: IScheduleWidgetDay | und,
  types: ScheduleWidgetDayListItemTypeBox[],
  now: number,
  dayFinishMs: number,
) => {
  if (now > dayFinishMs && nextDay !== undefined && nextDay.list[0] !== undefined)
    return (
      <>
        {'Завтра '}
        {types[nextDay.list[0].type].title}
        {' в '}
        {ScheduleWidgetCleans.computeDayWakeUpTime(nextDay.wup, 'string')}
      </>
    );

  return (
    <div>
      {scheduleTitle && <div className="color--7">{scheduleTitle}</div>}
      <div className="flex flex-gap">
        Это был последний день
        <LazyIcon icon="Smile" />
      </div>
    </div>
  );
};

interface Props {
  observeSchw?: number | NaN;
  schedule?: IScheduleWidget;
  isJustShowAllDay?: boolean;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

export const ScheduleWidgetAlarmContent = ({ observeSchw, schedule, isJustShowAllDay }: Props) => {
  const schedules = useIndexSchedules();
  const now = Date.now();
  const [isFullOpen, setIsFullOpen] = useState(false);

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

  const scheduleBoxes = useMemo(() => {
    return (schedule ? [schedule] : [...(schedules ?? [])].sort((a, b) => a.start - b.start))
      .map(sch => {
        const lastFullDayIndex = mylib.findLastIndex(sch.days, day => day.list.length) ?? -1;
        const days = sch.days.slice(0, lastFullDayIndex + 1) ?? [];
        const dayStartMsList = days.map(day => {
          return ScheduleWidgetCleans.computeDayWakeUpTime(day.wup, 'number');
        });
        const dayMsList = days.map(
          day => day.list.reduce((sum, event) => sum + (event.tm ?? sch.types[event.type]?.tm ?? 0), 0) * msInMin,
        );

        return {
          sch,
          days,
          startMs: sch.start + ((sch.withTech ? dayStartMsList[1] : dayStartMsList[0]) || 0),
          startDayMs: sch.start + ((sch.withTech ? dayStartMsList[1] : dayStartMsList[0]) || 0),
          dayStartMsList,
          dayMsList,
          types: sch.types,
          lastDayTm: lastFullDayIndex == null ? 0 : dayMsList[lastFullDayIndex],
        };
      })
      .filter(itNNull);
  }, [schedule, schedules]);

  const [node, fullValue, observeSchedule]: [ReactNode, FullContentValue | und, (typeof scheduleBoxes)[number] | und] =
    useMemo(() => {
      let node = null;
      let fullValue: FullContentValue | und;
      let schBox;

      if (observeSchw !== undefined && !mylib.isNaN(observeSchw)) {
        schBox = scheduleBoxes.find(wr => wr.sch.w === observeSchw);
        if (schBox === undefined) node = <span className="color--ko">Мероприятие не найдено</span>;
        else if (schBox.days.length === 0)
          node = (
            <div className={isJustShowAllDay ? 'full-size flex center column' : undefined}>
              <ScheduleWidgetTopicTitle
                titleBox={schBox.sch!}
                altTitle="Мероприятие"
                topicBox={schBox.sch}
              />
              <div className="text-italic">Составляется</div>
            </div>
          );
      }

      if (node === null) {
        const filter: (box: (typeof scheduleBoxes)[number]) => boolean = box => {
          if (box.days.length === 0) return false;
          const endMs = box.startMs + box.days.length * msInDay + box.lastDayTm;
          return endMs > today.getTime() && box.sch.start <= today.getTime();
        };
        const currSchBox = schBox === undefined ? scheduleBoxes.find(filter) : filter(schBox) ? schBox : undefined;

        if (currSchBox) {
          const start = currSchBox.sch.start - (currSchBox.sch.withTech ? msInDay : 0);
          const currDayi = currSchBox.days.findIndex((_, dayi) => {
            return start + dayi * msInDay < now && start + (dayi + 1) * msInDay > now;
          });

          if (currDayi > -1 && currDayi < currSchBox.days.length) {
            const currDay = currSchBox.days[currDayi];
            const dayBeginMs = start + currDayi * msInDay;
            const dayStartMs = dayBeginMs + currSchBox.dayStartMsList[currDayi];
            const dayFinishMs = dayStartMs + currSchBox.dayMsList[currDayi];
            const events = currDay.list;

            let currEventMs = dayStartMs;
            let lastCompEventMs = 0;
            const currEventi = events.findIndex(event => {
              lastCompEventMs = (event.tm ?? currSchBox.types[event.type]?.tm ?? 0) * msInMin;
              if (now > currEventMs && now < currEventMs + lastCompEventMs) return true;

              currEventMs += lastCompEventMs;

              return false;
            });

            fullValue = () => {
              return (
                <ScheduleAlarmDay
                  day={currDay}
                  dayi={currDayi}
                  schedule={currSchBox.sch}
                  isForceOpen
                  scheduleScopeProps={{ schw: currSchBox.sch.w }!}
                />
              );
            };

            if (currEventi < 0) {
              let content = null;

              if (now < dayStartMs) {
                let timeMessage = '';

                if (dayStartMs - now < msInHour) {
                  const minutesTo = Math.ceil((dayStartMs - now) / msInMin);
                  timeMessage = `через ${ScheduleWidgetCleans.minutesToText(minutesTo)}`;
                } else timeMessage = `в ${ScheduleWidgetCleans.computeDayWakeUpTime(currDay.wup, 'string')}`;

                content = events[0] && (
                  <>
                    {currSchBox.types[events[0].type].title} {timeMessage}
                  </>
                );
              }

              if (content === null) {
                content = makeNextDayFirstEventNode(
                  currSchBox.sch.title,
                  currSchBox.days[currDayi + 1],
                  currSchBox.types,
                  now,
                  dayFinishMs,
                );
              }

              node = <div className="flex flex-gap">{content}</div>;
            } else {
              node = (
                <ScheduleWidgetAlarmInfoContent
                  schedule={currSchBox.sch}
                  content={rights => {
                    let event: IScheduleWidgetDayEvent | null = events[currEventi];
                    let nextEvent: IScheduleWidgetDayEvent | null = events[currEventi + 1];
                    let minTo = Math.ceil((currEventMs + lastCompEventMs - now) / msInMin);

                    if (!rights.isCanReadSpecials) {
                      if (event.secret) {
                        let isUnsecretNotFound = true;

                        for (let i = currEventi - 1; i > -1; i--)
                          if (!events[i].secret) {
                            event = events[i];
                            isUnsecretNotFound = false;
                            break;
                          }

                        if (isUnsecretNotFound) event = null;
                      }

                      if (nextEvent?.secret) {
                        let isUnsecretNotFound = true;
                        let minutesPlus = 0;

                        for (let i = currEventi + 1; i < events.length; i++) {
                          if (!events[i].secret) {
                            nextEvent = events[i];
                            isUnsecretNotFound = false;
                            break;
                          }

                          minutesPlus += ScheduleWidgetCleans.takeEventTm(events[i], currSchBox.types[events[i].type]);
                        }

                        if (isUnsecretNotFound) nextEvent = null;
                        else minTo += minutesPlus;
                      }
                    }

                    const nextEventType = nextEvent && currSchBox.types[nextEvent.type];

                    if (event !== events[currEventi] && nextEvent == null) {
                      return makeNextDayFirstEventNode(
                        currSchBox.sch.title,
                        currSchBox.days[currDayi + 1],
                        currSchBox.types,
                        now,
                        dayFinishMs,
                      );
                    }

                    return (
                      <div>
                        <div className="flex flex-big-gap">
                          <span>Сейчас</span>
                          {event === null ? (
                            <span className="color--3 text-italic">Тех. перерыв</span>
                          ) : (
                            <ScheduleWidgetTopicTitle
                              titleBox={currSchBox.types[event.type]}
                              topicBox={event}
                            />
                          )}
                        </div>
                        {nextEvent === null || nextEventType === null || (
                          <div className="flex flex-big-gap">
                            <span>Через {minTo}м.</span>
                            {nextEventType === undefined ? (
                              <div>конец дня</div>
                            ) : (
                              <ScheduleWidgetTopicTitle
                                titleBox={nextEventType}
                                topicBox={nextEvent}
                              />
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }}
                />
              );
            }
          }
        }
      }

      if (node === null) {
        const willSchBox =
          schBox === undefined
            ? scheduleBoxes.find(box => box.startMs > now)
            : schBox.startMs > now
              ? schBox
              : undefined;

        if (willSchBox) {
          const nowDate = new Date();
          const startDate = new Date(willSchBox.startMs);
          const msTo = willSchBox.startMs - now;

          if (startDate.getDate() === nowDate.getDate()) {
            if (willSchBox.sch.withTech)
              if (willSchBox.days[1])
                fullValue = () => {
                  return (
                    <ScheduleAlarmDay
                      day={willSchBox.days[1]}
                      dayi={1}
                      schedule={willSchBox.sch}
                      isForceOpen
                      scheduleScopeProps={{ schw: willSchBox.sch.w }}
                    />
                  );
                };
              else if (willSchBox.days[0])
                fullValue = () => {
                  return (
                    <ScheduleAlarmDay
                      day={willSchBox.days[0]}
                      dayi={0}
                      schedule={willSchBox.sch}
                      isForceOpen
                      scheduleScopeProps={{ schw: willSchBox.sch.w }}
                    />
                  );
                };
          }

          node = (
            <div className={isJustShowAllDay ? 'full-size flex center column' : undefined}>
              <ScheduleWidgetTopicTitle
                titleBox={willSchBox.sch!}
                altTitle="Мероприятие"
                topicBox={willSchBox.sch}
              />
              {startDate.getDate() === nowDate.getDate() ? (
                msTo / msInHour < 1 ? (
                  <>до начала меньше часа</>
                ) : (
                  <>до начала {ScheduleWidgetCleans.hoursToText(Math.floor(msTo / msInHour))}</>
                )
              ) : startDate.getDate() === nowDate.getDate() + 1 && startDate.getFullYear() === nowDate.getFullYear() ? (
                <>начало завтра</>
              ) : (
                <>до начала {ScheduleWidgetCleans.daysToText(Math.floor(msTo / msInDay))}</>
              )}
            </div>
          );
        }
      }

      if (!fullValue) setIsFullOpen(false);

      return [node, fullValue, schBox];
    }, [observeSchw, scheduleBoxes, isJustShowAllDay, now]);

  const [fullNode] = useFullContent(fullValue, isFullOpen ? 'open' : null, setIsFullOpen);

  return isJustShowAllDay ? (
    <>
      {fullValue?.(() => {}, null) ??
        node ??
        (schedule && (
          <div className="flex center column full-size">
            <h2>{schedule.title}</h2>
            {schedule.topic && <h4>{schedule.topic}</h4>}
            {schedule.dsc && <p className="text-center">{schedule.dsc}</p>}
          </div>
        ))}
    </>
  ) : (
    <>
      {fullNode}
      <Alarm
        className={'flex flex-gap between' + (fullValue ? ' pointer' : '')}
        onClick={fullValue && (() => setIsFullOpen(true))}
      >
        <Link to={observeSchedule === undefined ? '.' : `schs/${observeSchedule.sch.w}`}>
          <div className="flex">
            <LazyIcon
              icon="Calendar01"
              className="margin-big-gap"
            />
            {node ??
              (observeSchedule !== undefined ? (
                <div>
                  <ScheduleWidgetTopicTitle
                    titleBox={observeSchedule.sch!}
                    altTitle="Мероприятие"
                    topicBox={observeSchedule.sch}
                  />
                  <span className="text-italic">Мероприятие прошло</span>
                </div>
              ) : (
                <>Мероприятий нет</>
              ))}
          </div>
        </Link>

        <Link to="schs">
          <LazyIcon
            icon="LeftToRightListDash"
            className="margin-gap"
          />
        </Link>
      </Alarm>
    </>
  );
};

const Alarm = styled.div`
  --icon-color: var(--color--3);

  margin-top: calc(0px - var(--main-gap) + 5px);
  background-color: var(--color--1);
  padding: var(--main-big-gap) var(--main-gap);

  width: calc(100% + var(--main-gap) * 2);
  height: 4em;
  color: var(--color--4);
`;

import { StrongEditableField } from '#basis/ui/strong-control/field/StrongEditableField';
import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { mylib, MyLib } from '#shared/lib/my-lib';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { useMemo, useState } from 'react';
import {
  indexScheduleCheckIsDayIsPast,
  indexScheduleGetDayStartMs,
  IScheduleWidget,
  IScheduleWidgetDay,
  ScheduleDayScopeProps,
  ScheduleScopeProps,
} from 'shared/api';
import { isNIs } from 'shared/utils';
import styled from 'styled-components';
import { ScheduleAlarmDay } from '../alarm/AlarmDay';
import { ScheduleDayScopePropsContext } from '../complect/lib/contexts';
import { schDaysSokiInvocatorClient } from '../invocators/invocators.methods';
import { useScheduleWidgetRightsContext } from '../useScheduleWidget';
import { ScheduleWidgetDayEditPanel } from './DayEditPanel';
import { ScheduleWidgetDayEventList } from './events/DayEventList';

export interface ScheduleWidgetDayProps {
  day: IScheduleWidgetDay;
  dayi: number;
  schedule: IScheduleWidget;
  isPrint?: boolean;
  isCanOpenFull?: boolean;
  isForceOpen?: boolean;
  scheduleScopeProps: ScheduleScopeProps;
}

const defaultPrint = {
  title: true,
};

export const ScheduleWidgetDay = ({
  day,
  dayi,
  schedule,
  isPrint,
  isCanOpenFull,
  isForceOpen,
  scheduleScopeProps,
}: ScheduleWidgetDayProps) => {
  const date = new Date(indexScheduleGetDayStartMs(schedule, dayi));
  const isPastDay = indexScheduleCheckIsDayIsPast(schedule, dayi);
  const title = mylib.dayFullTitles[date.getDay()];
  const times: number[] = [];
  const [isShowDay, setIsShowDay] = useState(!isPastDay);
  const rights = useScheduleWidgetRightsContext();
  const { editIcon, isRedact } = useIsRedactArea(true, null, rights.isCanRedact, true);
  const [print, setPrint] = useState(defaultPrint);
  const [isFullDayOpen, setIsFullDayOpen] = useState<unknown>(false);
  const dayScopeProps: ScheduleDayScopeProps = useMemo(
    () => ({ ...scheduleScopeProps, dayi }),
    [dayi, scheduleScopeProps],
  );

  const dayRating = useMemo(() => {
    let rating = 0;
    day.list.forEach(event => {
      if (event.rate) MyLib.values(event.rate).forEach(rate => (rating += rate[0]));
    });
    return rating;
  }, [day.list]);

  day.list.forEach(item => {
    times.push((item.tm || schedule.types[item.type]?.tm || 0) + (times[times.length - 1] || 0));
  });

  return (
    <ScheduleDayScopePropsContext.Provider value={dayScopeProps}>
      <StyledScheduleWidgetDay
        className={'ScheduleWidgetDay relative' + (isPastDay ? ' past' : '') + (isPrint ? ' print' : '')}
      >
        <div
          className={'day-title flex flex-gap padding-gap-v sticky pos-top' + (print.title ? '' : ' not-printable')}
          onClick={isCanOpenFull ? setIsFullDayOpen : undefined}
        >
          {title}
          {schedule.withTech ? (
            dayi === 0 ? (
              <span className="color--ko"> подготовка</span>
            ) : (
              <>, {dayi} день</>
            )
          ) : (
            <>, {dayi + 1} день</>
          )}
          {isPrint && (
            <LazyIcon
              icon={print.title ? 'View' : 'ViewOffSlash'}
              className="pointer not-printable"
              onClick={event => {
                event.stopPropagation();
                setPrint(prev => ({ ...prev, title: !prev.title }));
              }}
            />
          )}
        </div>
        <div className="edit-day-panel absolute pos-top pos-right margin-gap-t flex flex-gap">
          {isPastDay ? (
            <>
              <LazyIcon
                className="pointer"
                icon={isShowDay ? 'ViewOffSlash' : 'View'}
                onClick={() => setIsShowDay(isNIs)}
              />
              {isShowDay && editIcon}
            </>
          ) : (
            editIcon
          )}
        </div>
        {isShowDay && (
          <>
            {rights.isCanReadTitles && (
              <div className="day-info">
                {(isRedact || day.topic) && (
                  <StrongEditableField
                    value={day}
                    fieldKey="topic"
                    isRedact={isRedact}
                    icon="Bookmark03"
                    title="Тема дня"
                    onSend={value => schDaysSokiInvocatorClient.setTopic({ props: dayScopeProps, value })}
                  />
                )}
                {(isRedact || day.dsc) && (
                  <StrongEditableField
                    value={day}
                    fieldKey="dsc"
                    isRedact={isRedact}
                    multiline
                    textClassName=" "
                    icon="File02"
                    title="Описание дня"
                    onSend={value => schDaysSokiInvocatorClient.setDescription({ props: dayScopeProps, value })}
                  />
                )}
                {isRedact ? (
                  <ScheduleWidgetDayEditPanel
                    day={day}
                    dayi={dayi}
                    schedule={schedule}
                    scheduleScopeProps={scheduleScopeProps}
                  />
                ) : (
                  <TheIconButton
                    icon="Favourite"
                    className={'flex-max ' + (dayRating < 0 ? 'color--ko' : dayRating > 0 ? 'color--ok' : 'color--3')}
                    postfix={'Рейтинг дня: ' + dayRating}
                  />
                )}
              </div>
            )}
            <ScheduleWidgetDayEventList
              day={day}
              dayi={dayi}
              dayScopeProps={dayScopeProps}
              isPastDay={isPastDay}
              isForceExpand={isPrint || isForceOpen}
            />
          </>
        )}
      </StyledScheduleWidgetDay>
      {!isFullDayOpen || (
        <FullContent onClose={setIsFullDayOpen}>
          <ScheduleAlarmDay
            day={day}
            dayi={dayi}
            schedule={schedule}
            scheduleScopeProps={scheduleScopeProps}
          />
        </FullContent>
      )}
    </ScheduleDayScopePropsContext.Provider>
  );
};

export const StyledScheduleWidgetDay = styled.div`
  &:not(.past) {
    margin-top: 50px;
  }

  &.past {
    filter: grayscale(0.7);

    > .day-title {
      opacity: 0.5;
      font-size: 1.1rem;
    }
  }

  > .day-title {
    top: -10px;
    background-color: var(--color--5);
    color: var(--color--3);
    font-weight: bold;
    font-size: 1.5rem;
  }

  > .edit-day-panel {
    z-index: 2;
  }

  > .day-info {
    margin: 1rem 0;

    .day-topic {
      color: var(--color--7);
      font-size: 1.2rem;
    }

    .day-description {
      color: var(--color--3);
      font-size: 0.9rem;
    }
  }
`;

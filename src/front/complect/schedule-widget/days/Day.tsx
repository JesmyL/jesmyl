import { FullContent } from 'front/complect/fullscreen-content/FullContent';
import { mylib, MyLib } from 'front/utils';
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
import { IconBookmark03StrokeRounded } from '../../../complect/the-icon/icons/bookmark-03';
import { IconFavouriteStrokeRounded } from '../../../complect/the-icon/icons/favourite';
import { IconFile02StrokeRounded } from '../../../complect/the-icon/icons/file-02';
import { IconViewStrokeRounded } from '../../../complect/the-icon/icons/view';
import { IconViewOffSlashStrokeRounded } from '../../../complect/the-icon/icons/view-off-slash';
import StrongEditableField from '../../strong-control/field/StrongEditableField';
import IconButton from '../../the-icon/IconButton';
import useIsRedactArea from '../../useIsRedactArea';
import ScheduleAlarmDay from '../alarm/AlarmDay';
import { ScheduleDayScopePropsContext } from '../complect/scope-contexts/scope-props-contexts';
import { schDaysSokiInvocatorClient } from '../invocators/invocators.methods';
import { takeStrongScopeMaker, useScheduleWidgetRightsContext } from '../useScheduleWidget';
import ScheduleWidgetDayEditPanel from './DayEditPanel';
import ScheduleWidgetDayEventList from './events/DayEventList';

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
  const selfScope = takeStrongScopeMaker('', ' dayi/', dayi);
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
      event.rate && MyLib.values(event.rate).forEach(rate => (rating += rate[0]));
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
            <IconButton
              Icon={print.title ? IconViewStrokeRounded : IconViewOffSlashStrokeRounded}
              className="not-printable"
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
              <IconButton
                Icon={isShowDay ? IconViewOffSlashStrokeRounded : IconViewStrokeRounded}
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
                    Icon={IconBookmark03StrokeRounded}
                    title="Тема дня"
                    onSend={value => schDaysSokiInvocatorClient.setTopic(null, dayScopeProps, value)}
                  />
                )}
                {(isRedact || day.dsc) && (
                  <StrongEditableField
                    value={day}
                    fieldKey="dsc"
                    isRedact={isRedact}
                    multiline
                    textClassName=" "
                    Icon={IconFile02StrokeRounded}
                    title="Описание дня"
                    onSend={value => schDaysSokiInvocatorClient.setDescription(null, dayScopeProps, value)}
                  />
                )}
                {isRedact ? (
                  <ScheduleWidgetDayEditPanel
                    day={day}
                    dayScope={selfScope}
                    dayi={dayi}
                    schedule={schedule}
                    scheduleScopeProps={scheduleScopeProps}
                  />
                ) : (
                  <IconButton
                    Icon={IconFavouriteStrokeRounded}
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

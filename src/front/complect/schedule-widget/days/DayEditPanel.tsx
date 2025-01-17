import { useState } from 'react';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleScopeProps } from 'shared/api';
import { makeRegExp } from 'shared/utils';
import { renderComponentInNewWindow } from '../../..';
import { FullContent } from '../../fullscreen-content/FullContent';
import StrongControlDateTimeExtracter from '../../strong-control/StrongDateTimeExtracter';
import IconButton from '../../the-icon/IconButton';
import { IconCalendarUpload02StrokeRounded } from '../../the-icon/icons/calendar-upload-02';
import { IconClock01StrokeRounded } from '../../the-icon/icons/clock-01';
import { IconPrinterStrokeRounded } from '../../the-icon/icons/printer';
import { ScheduleWidgetEventListUpdater } from './EventListUpdater';
import ScheduleWidgetPrintableDay from './PrintableDay';

const dotReg = makeRegExp('/\\./');

interface Props {
  scheduleScopeProps: ScheduleScopeProps;
  day: IScheduleWidgetDay;
  dayi: number;
  schedule: IScheduleWidget;
  dayScope: string;
}

export default function ScheduleWidgetDayEditPanel({ day, dayi, schedule, dayScope, scheduleScopeProps }: Props) {
  const [isOpenDayListUpdater, setIsOpenDayListUpdater] = useState<unknown>(false);

  return (
    <>
      {isOpenDayListUpdater && (
        <FullContent onClose={setIsOpenDayListUpdater}>
          <ScheduleWidgetEventListUpdater
            day={day}
            dayScope={dayScope}
            dayi={dayi}
            schedule={schedule}
            onClose={setIsOpenDayListUpdater}
            scheduleScopeProps={scheduleScopeProps}
          />
        </FullContent>
      )}
      <StrongControlDateTimeExtracter
        scope={dayScope}
        fieldName="wup"
        value={day.wup?.toFixed?.(2).replace(dotReg, ' ') || ''}
        Icon={IconClock01StrokeRounded}
        title="Начало дня"
        takeDate="NO"
        takeTime="hour-min"
        mapExecArgs={(args, value) => {
          return {
            ...args,
            value: +value.replace(makeRegExp('/:/'), '.'),
          };
        }}
        onSend={() => {}}
      />
      <IconButton
        Icon={IconPrinterStrokeRounded}
        className="flex-max margin-gap-v"
        onClick={() =>
          renderComponentInNewWindow(win => (
            <ScheduleWidgetPrintableDay
              scheduleScopeProps={scheduleScopeProps}
              day={day}
              dayi={dayi}
              schedule={schedule}
              win={win}
            />
          ))
        }
        postfix="Распечатать распорядок дня"
      />
      <IconButton
        Icon={IconCalendarUpload02StrokeRounded}
        postfix="Загрузить текстовое расписание"
        disabled={day.list.length > 0}
        disabledReason="Расписание дня должно быть пустым"
        onClick={setIsOpenDayListUpdater}
      />
    </>
  );
}

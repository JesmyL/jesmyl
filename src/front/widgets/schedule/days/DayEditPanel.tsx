import { StrongInputDateTimeExtracter } from '#basis/ui/strong-control/StrongDateTimeExtracter';
import { atom } from '#shared/lib/atom';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { makeRegExp } from 'regexp-master';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleScopeProps } from 'shared/api';
import { useScheduleDayScopePropsContext } from '../complect/lib/contexts';
import { schDaysSokiInvocatorClient } from '../invocators/invocators.methods';
import { ScheduleWidgetEventListUpdater } from './EventListUpdater';
import { ScheduleWidgetPrintableDay } from './PrintableDay';

const dotReg = makeRegExp('/\\./');

interface Props {
  scheduleScopeProps: ScheduleScopeProps;
  day: IScheduleWidgetDay;
  dayi: number;
  schedule: IScheduleWidget;
}

const isOpenDayListUpdaterAtom = atom(false);

export function ScheduleWidgetDayEditPanel({ day, dayi, schedule, scheduleScopeProps }: Props) {
  const dayScopeProps = useScheduleDayScopePropsContext();

  return (
    <>
      <StrongInputDateTimeExtracter
        value={day.wup?.toFixed?.(2).replace(dotReg, ' ') || ''}
        icon="Clock01"
        title="Начало дня"
        takeDate="NO"
        takeTime="hour-min"
        onSend={async (isChanged, value) =>
          isChanged && schDaysSokiInvocatorClient.setBeginTime({ props: dayScopeProps, value })
        }
      />
      <TheIconButton
        icon="Printer"
        className="flex-max margin-gap-v"
        postfix="Распечатать распорядок дня"
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
      />
      <TheIconButton
        icon="CalendarUpload02"
        postfix="Загрузить текстовое расписание"
        disabled={day.list.length > 0}
        disabledReason="Расписание дня должно быть пустым"
        onClick={isOpenDayListUpdaterAtom.toggle}
      />

      <FullContent openAtom={isOpenDayListUpdaterAtom}>
        <ScheduleWidgetEventListUpdater
          day={day}
          dayi={dayi}
          schedule={schedule}
          onClose={isOpenDayListUpdaterAtom.reset}
          scheduleScopeProps={scheduleScopeProps}
        />
      </FullContent>
    </>
  );
}

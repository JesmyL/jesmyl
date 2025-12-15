import { StrongInputDateTimeExtracter } from '#basis/ui/strong-control/StrongDateTimeExtracter';
import { renderComponentInNewWindow } from '#shared/lib/renders';
import { FullContent } from '#shared/ui/fullscreen-content/FullContent';
import { TheIconButton } from '#shared/ui/the-icon/TheIconButton';
import { atom } from 'atomaric';
import { makeRegExp } from 'regexpert';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleScopeProps } from 'shared/api';
import { useScheduleDayScopePropsContext } from '../complect/lib/contexts';
import { schDaysTsjrpcClient } from '../tsjrpc/tsjrpc.methods';
import { ScheduleWidgetEventListUpdater } from './EventListUpdater';
import { ScheduleWidgetPrintableDay } from './PrintableDay';

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
        value={day.wup?.toFixed?.(2).replace(makeRegExp('/\\./'), ' ') || ''}
        icon="Clock01"
        title="Начало дня"
        takeDate="NO"
        takeTime="hour-min"
        onSend={async (isChanged, value) =>
          isChanged && schDaysTsjrpcClient.setBeginTime({ props: dayScopeProps, value })
        }
      />
      <TheIconButton
        icon="Printer"
        className="flex-max my-2"
        postfix="Распечатать распорядок дня"
        onClick={() =>
          renderComponentInNewWindow({
            reactNode: win => (
              <ScheduleWidgetPrintableDay
                scheduleScopeProps={scheduleScopeProps}
                day={day}
                dayi={dayi}
                schedule={schedule}
                win={win}
              />
            ),
          })
        }
      />
      <TheIconButton
        icon="CalendarUpload02"
        postfix="Загрузить текстовое расписание"
        disabled={day.list.length > 0}
        disabledReason="Расписание дня должно быть пустым"
        onClick={isOpenDayListUpdaterAtom.do.toggle}
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

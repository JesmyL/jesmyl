import { languageSystemCode } from '#basis/locale';
import { IScheduleWidget, ScheduleWidgetCleans } from 'shared/api';
import { howMillisecondsInMin } from 'shared/const/ms';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { useScheduleWidgetRights } from '../useScheduleWidget';

interface Props {
  schedule?: IScheduleWidget;
  date?: Date;
}

export function ScheduleWidgetStartTimeText({ schedule, date: topDate }: Props) {
  const rights = useScheduleWidgetRights(schedule);

  if (!schedule) return null;
  const date = topDate ?? new Date(schedule.start);

  const firstDay = schedule.days[schedule.withTech ? 1 : 0];
  let firstWup =
    schedule.start + (firstDay === undefined ? 0 : ScheduleWidgetCleans.computeDayWakeUpTime(firstDay.wup, 'number'));
  const types = schedule.types;
  if (!rights.isCanReadSpecials)
    firstDay?.list.some(event => {
      if (event.secret) {
        firstWup += (event.tm ?? types[event.type]?.tm ?? 0) * howMillisecondsInMin;
        return false;
      }

      return true;
    });
  const timeDate = new Date(firstWup);

  return (
    <>
      {!schedule.start || (
        <div>
          Начало: {makeDateLabel(date, languageSystemCode)}
          {!firstWup ||
            ', ' +
              timeDate.getHours().toString().padStart(2, '0') +
              ':' +
              timeDate.getMinutes().toString().padStart(2, '0')}
        </div>
      )}
    </>
  );
}

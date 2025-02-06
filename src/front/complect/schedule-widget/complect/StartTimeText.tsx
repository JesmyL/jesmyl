import { mylib } from 'front/utils';
import { IScheduleWidget, ScheduleWidgetCleans } from 'shared/api';
import { useScheduleWidgetRights } from '../useScheduleWidget';

interface Props {
  schedule?: IScheduleWidget;
  date?: Date;
}

export default function ScheduleWidgetStartTimeText({ schedule, date: topDate }: Props) {
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
        firstWup += (event.tm ?? types[event.type]?.tm ?? 0) * mylib.howMs.inMin;
        return false;
      }

      return true;
    });
  const timeDate = new Date(firstWup);

  return (
    <>
      {!schedule.start || (
        <div>
          Начало: {date.getDate()} {mylib.monthFullTitles[date.getMonth()]} {date.getFullYear()}
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

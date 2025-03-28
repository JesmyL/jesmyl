import { useScheduleWidgetAppAttsContext } from '#widgets/schedule/useScheduleWidget';
import { DayEventKnownAtt, ScheduleDayEventKnownAttProps } from './DayEventKnownAtt';

export function ScheduleDayEventAtt(props: ScheduleDayEventKnownAttProps) {
  const [appAtts] = useScheduleWidgetAppAttsContext();
  const appAtt = appAtts[props.attKey];

  if (!appAtt) return <div className="error-message">Неизвестное вложение</div>;

  return <DayEventKnownAtt {...props} />;
}

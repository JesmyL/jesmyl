import { translateBase } from '#basis/locale';
import { useScheduleWidgetAppAttsContext } from '#widgets/schedule/useScheduleWidget';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { DayEventKnownAtt, ScheduleDayEventKnownAttProps } from './DayEventKnownAtt';

export function ScheduleDayEventAtt(props: ScheduleDayEventKnownAttProps) {
  const [appAtts] = useScheduleWidgetAppAttsContext();
  const appAtt = appAtts[props.attKey];

  if (!appAtt) return <div className="text-xKO">{translateBase(BaseLocaleKey.ScheduleUnknownEventAttachment)}</div>;

  return <DayEventKnownAtt {...props} />;
}

import { ScheduleWidgetAppAtt, ScheduleWidgetAppAtts } from '#widgets/schedule/ScheduleWidget.model';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAttKey,
  ScheduleWidgetDayEventAttValue,
} from 'shared/api';

type Props = {
  day: IScheduleWidgetDay;
  dayi: number;
  attKey: ScheduleWidgetAttKey;
  schedule: IScheduleWidget;
  isCanRedact: boolean;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;

  appAtt: ScheduleWidgetAppAtt<any>;

  appAtts: ScheduleWidgetAppAtts;
  isRedact: boolean;
  setIsSelfRedact: (is?: boolean) => void;
  attValue: ScheduleWidgetDayEventAttValue;
};

export function ScheduleWidgetDayEventAttResult({
  attKey,
  day,
  dayi,
  isCanRedact,
  dayEventAttScopeProps,
  schedule,
  appAtt,
  appAtts,
  isRedact,
  setIsSelfRedact,
  attValue,
}: Props) {
  try {
    if (appAtt.im) {
      const att = appAtts[appAtt.im];

      if (att) {
        return (
          <div>
            {att.result?.(
              att?.[appAtt.im as never] ?? att.initVal,
              dayEventAttScopeProps,
              isRedact,
              setIsSelfRedact,
              schedule,
            )}
          </div>
        );
      }
    } else {
      return (
        <div>
          {appAtt.result?.(attValue ?? appAtt.initVal, dayEventAttScopeProps, isRedact, setIsSelfRedact, schedule)}
        </div>
      );
    }
  } catch (error) {
    console.error(error);
    return <div className="color--ko">Контент не доступен</div>;
  }
}

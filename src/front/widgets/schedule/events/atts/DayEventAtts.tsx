import { MyLib } from '#shared/lib/my-lib';
import { useScheduleWidgetRightsContext } from '#widgets/schedule/contexts';
import { useScheduleWidgetAppAttsContext } from '#widgets/schedule/useScheduleWidget';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleDayEventScopeProps,
  ScheduleWidgetDayListItemTypeBox,
  scheduleWidgetUserRights,
} from 'shared/api';
import { ScheduleDayEventAtt } from './DayEventAtt';

export function ScheduleWidgetDayEventAtts(props: {
  typeBox: ScheduleWidgetDayListItemTypeBox;
  event: IScheduleWidgetDayEvent;
  day: IScheduleWidgetDay;
  dayi: number;
  isPrevEvent: boolean;
  schedule: IScheduleWidget;
  dayEventScopeProps: ScheduleDayEventScopeProps;
}) {
  const [appAtts] = useScheduleWidgetAppAttsContext();
  const rights = useScheduleWidgetRightsContext();
  const userR = rights.myUser?.R ?? rights.schedule.ctrl.defu;
  const atts = MyLib.entries(props.event.atts);

  MyLib.entries(props.typeBox.atts).forEach(attEntry => {
    if (!atts.some(entry => entry[0] === attEntry[0])) atts.push(attEntry);
  });

  return (
    <>
      {atts.map(([attKey, att]) => {
        const appAtt = appAtts[attKey];

        if (
          !appAtt ||
          (!scheduleWidgetUserRights.checkInvertIsCan(userR, appAtt.R) &&
            (appAtt.Rs?.length ? rights.myUser && !appAtt.Rs.includes(rights.myUser.mi) : false))
        )
          return null;

        const isCanUpdate =
          scheduleWidgetUserRights.checkInvertIsCan(userR, appAtt.U) ||
          (appAtt.Us?.length ? !!rights.myUser && appAtt.Us.includes(rights.myUser.mi) : false);

        return (
          <ScheduleDayEventAtt
            key={attKey}
            dayEventScopeProps={props.dayEventScopeProps}
            att={att}
            attKey={attKey}
            day={props.day}
            dayi={props.dayi}
            schedule={props.schedule}
            isCanRedact={isCanUpdate}
          />
        );
      })}
    </>
  );
}

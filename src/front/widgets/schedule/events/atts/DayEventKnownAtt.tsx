import { useIsRedactArea } from '#shared/lib/hooks/useIsRedactArea';
import { mylib } from '#shared/lib/my-lib';
import { useIsRememberExpand } from '#shared/ui/expand/useIsRememberExpand';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { useScheduleWidgetAppAttsContext } from '#widgets/schedule/useScheduleWidget';
import { useMemo } from 'react';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleDayEventScopeProps,
  ScheduleWidgetAttKey,
  ScheduleWidgetDayEventAttValue,
} from 'shared/api';
import { isNIs, retNull } from 'shared/utils';
import { ScheduleWidgetDayEventAttResult } from './DayEventAttResult';
import { ScheduleWidgetDayEventPeriodicTranslation } from './DayEventPeriodicTranslationAtt';

export type ScheduleDayEventKnownAttProps = {
  day: IScheduleWidgetDay;
  dayi: number;
  attKey: ScheduleWidgetAttKey;
  att: ScheduleWidgetDayEventAttValue;
  schedule: IScheduleWidget;
  isCanRedact: boolean;
  dayEventScopeProps: ScheduleDayEventScopeProps;
};

export const DayEventKnownAtt = (props: ScheduleDayEventKnownAttProps) => {
  const [appAtts] = useScheduleWidgetAppAttsContext();
  const appAtt = appAtts[props.attKey];
  const dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps = useMemo(
    () => ({ ...props.dayEventScopeProps, attKey: props.attKey }),
    [props.attKey, props.dayEventScopeProps],
  );
  const [attTitleNode, isExpand] = useIsRememberExpand(
    JSON.stringify(dayEventAttScopeProps),
    <>
      <LazyIcon icon={appAtt.icon} />
      {appAtt.title}
    </>,
  );

  const useActionPanelNode = (appAtt.im ? appAtts[appAtt.im].useActionPanelNode : appAtt.useActionPanelNode) ?? retNull;
  const isCanRedact = props.isCanRedact && (!mylib.isArr(props.att) || props.att[0] < 0);
  const { isRedact, editIcon, setIsSelfRedact } = useIsRedactArea({
    redactable: true,
    canRedact: props.isCanRedact,
    isShowDoneButton: true,
    icon: 'TaskEdit01',
  });
  const editIconNode = isCanRedact && isExpand && editIcon;

  const actionPanelNode = useActionPanelNode(
    {
      attKey: props.attKey,
      attTitle: appAtt.title,
      ...props.dayEventScopeProps,
    },
    editIconNode,
    isCanRedact,
    isExpand,
  );

  let notateNode = null;
  let linkTitle = null;
  let attContent = null;

  try {
    let attValue = props.att;

    if (mylib.isArr(attValue)) {
      const [dayi, eventMi] = attValue;
      const day = props.schedule.days[dayi];
      const event = day?.list.find(event => event.mi === eventMi);

      if (attValue[0] < 0) {
        notateNode = (
          <LazyIcon
            icon="View"
            className="color--3 icon-scale-05"
          />
        );

        attContent = isExpand && (
          <ScheduleWidgetDayEventPeriodicTranslation
            att={attValue}
            attKey={props.attKey}
            schedule={props.schedule}
            day={props.day}
            dayi={props.dayi}
            appAtt={appAtt}
            dayEventAttScopeProps={dayEventAttScopeProps}
          />
        );
      } else
        notateNode = (
          <LazyIcon
            icon="Link02"
            className="color--3 icon-scale-05"
          />
        );

      if (props.schedule.days && day && event?.atts) {
        attValue = event.atts[props.attKey];

        if (props.schedule.types)
          linkTitle = isExpand && (
            <div className="flex margin-big-gap-l margin-gap-b">
              <LazyIcon
                icon="Link02"
                className="color--3 icon-scale-05"
              />
              <ScheduleWidgetTopicTitle
                titleBox={props.schedule.types[event.type]}
                topicBox={event}
                prefix={props.day.mi !== day.mi && <span>{`${props.schedule.days.indexOf(day) + 1} день, `}</span>}
              />
            </div>
          );
      } else attContent ??= <div className="error-message">Источник удалён</div>;
    }

    attContent ??= isExpand && (
      <ScheduleWidgetDayEventAttResult
        dayEventAttScopeProps={dayEventAttScopeProps}
        schedule={props.schedule}
        attKey={props.attKey}
        day={props.day}
        dayi={props.dayi}
        isCanRedact={isCanRedact}
        appAtt={appAtt}
        appAtts={appAtts}
        isRedact={isRedact}
        setIsSelfRedact={is => setIsSelfRedact(is ?? isNIs)}
        attValue={attValue}
      />
    );
  } catch (error) {
    console.error(error);
    attContent = <div className="color--ko">Контент не доступен</div>;
  }

  return (
    <>
      <div className="flex flex-gap inline-block between color--7">
        {attTitleNode}
        <div className="flex">
          {actionPanelNode ?? editIconNode}
          {notateNode}
        </div>
      </div>
      {linkTitle}
      <div className="margin-big-gap-l">{attContent}</div>
    </>
  );
};

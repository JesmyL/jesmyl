import { mylib } from 'front/utils';
import { useMemo } from 'react';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleDayEventScopeProps,
  ScheduleWidgetAttKey,
  ScheduleWidgetDayEventAttValue,
  ScheduleWidgetDayListItemTypeBox,
} from 'shared/api';
import { isNIs } from 'shared/utils';
import { IconLink02StrokeRounded } from '../../../../complect/the-icon/icons/link-02';
import { IconViewStrokeRounded } from '../../../../complect/the-icon/icons/view';
import { useIsRememberExpand } from '../../../expand/useIsRememberExpand';
import TheIcon from '../../../the-icon/TheIcon';
import useIsRedactArea from '../../../useIsRedactArea';
import ScheduleWidgetTopicTitle from '../../complect/TopicTitle';
import { useScheduleWidgetAppAttsContext } from '../../useScheduleWidget';
import ScheduleWidgetDayEventPeriodicTranslation from './DayEventPeriodicTranslationAtt';

type Props = {
  typeBox: ScheduleWidgetDayListItemTypeBox;
  event: IScheduleWidgetDayEvent;
  day: IScheduleWidgetDay;
  dayi: number;
  attKey: ScheduleWidgetAttKey;
  att: ScheduleWidgetDayEventAttValue;
  isPast: boolean;
  schedule: IScheduleWidget;
  isCanRedact: boolean;
  dayEventScopeProps: ScheduleDayEventScopeProps;
};

export default function ScheduleWidgetDayEventAtt(props: Props) {
  const [appAtts] = useScheduleWidgetAppAttsContext();
  const appAtt = appAtts[props.attKey];
  const attScopeProps = useMemo(
    () => ({ ...props.dayEventScopeProps, attKey: props.attKey }),
    [props.attKey, props.dayEventScopeProps],
  );
  const [attTitleNode, isExpand] = useIsRememberExpand(
    JSON.stringify(attScopeProps),
    <>
      <TheIcon name={appAtt.icon} />
      {appAtt.title}
    </>,
  );

  const { isRedact, editIcon, setIsSelfRedact } = useIsRedactArea(true, null, props.isCanRedact, true);

  if (!appAtt) return <div className="error-message">Неизвестное вложение</div>;
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
        props.isCanRedact = false;
        notateNode = <IconViewStrokeRounded className="color--3 icon-scale-05" />;

        attContent = isExpand && (
          <ScheduleWidgetDayEventPeriodicTranslation
            att={attValue}
            attKey={props.attKey}
            schedule={props.schedule}
            day={props.day}
            dayi={props.dayi}
            appAtt={appAtt}
          />
        );
      } else notateNode = <IconLink02StrokeRounded className="color--3 icon-scale-05" />;

      if (props.schedule.days && day && event?.atts) {
        attValue = event.atts[props.attKey];

        if (props.schedule.types)
          linkTitle = isExpand && (
            <div className="flex margin-big-gap-l margin-gap-b">
              <IconLink02StrokeRounded className="color--3 icon-scale-05" />
              <ScheduleWidgetTopicTitle
                titleBox={props.schedule.types[event.type]}
                topicBox={event}
                prefix={props.day.mi !== day.mi && <span>{`${props.schedule.days.indexOf(day) + 1} день, `}</span>}
              />
            </div>
          );
      } else attContent ??= <div className="error-message">Источник удалён</div>;
    }

    if (appAtt.im) {
      const att = appAtts[appAtt.im];

      if (att) {
        attContent ??= isExpand && (
          <div>
            {att.result?.(
              props.att?.[appAtt.im as never] ?? att.initVal,
              { ...attScopeProps, imAttKey: appAtt.im },
              isRedact,
              is => setIsSelfRedact(is ?? isNIs),
              props.schedule,
            )}
          </div>
        );
      }
    } else {
      attContent ??= isExpand && (
        <div>
          {appAtt.result?.(
            attValue ?? appAtt.initVal,
            attScopeProps,
            isRedact,
            is => setIsSelfRedact(is ?? isNIs),
            props.schedule,
          )}
        </div>
      );
    }
  } catch (error) {
    attContent = <div className="error-message">Контент не доступен</div>;
  }

  return (
    <>
      <div className="flex flex-gap inline-block between color--7">
        {attTitleNode}
        <div className="flex">
          {props.isCanRedact && isExpand && editIcon}
          {notateNode}
        </div>
      </div>
      {linkTitle}
      <div className="margin-big-gap-l">{attContent}</div>
    </>
  );
}

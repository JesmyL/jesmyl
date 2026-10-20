import { languageSystemCode, translateBase } from '#basis/locale';
import { ScheduleWidgetTopicTitle } from '#widgets/schedule/complect/TopicTitle';
import { ScheduleWidgetAppAtt } from '#widgets/schedule/ScheduleWidget.model';
import React, { ReactNode } from 'react';
import {
  AttTranslatorType,
  attTranslatorTypes,
  IScheduleWidget,
  IScheduleWidgetDay,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttRef,
  ScheduleWidgetDayi,
} from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { emptyFunc } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';

const weekdayShort = (dayi: number) =>
  new Date(2024, 0, 7 + dayi).toLocaleDateString(languageSystemCode, { weekday: 'short' });

export function ScheduleWidgetDayEventPeriodicBroadcast(props: {
  day: IScheduleWidgetDay;
  dayi: ScheduleWidgetDayi;
  attKey: ScheduleWidgetAttKey;
  att: ScheduleWidgetAttRef;
  schedule: IScheduleWidget;
  appAtt: ScheduleWidgetAppAtt;
  dayEventAttScopeProps: ScheduleDayEventAttachmentScopeProps;
}) {
  const [attTranslatorType] = props.att;
  const periodTitle = attTranslatorTypes.find(({ id }) => attTranslatorType === id)?.title;
  const nodes: ReactNode[][] = [];
  const types = props.schedule.types ?? [];
  const days = props.schedule.days ?? [];
  const todayi = days.findIndex((_, dayi) => dayi === props.dayi);
  let date: Date;

  if (todayi > -1)
    days.forEach((day, dayi) => {
      let title: string = translateBase(it => it[BaseLocaleKey.SchedulePeriod]);
      let titlePostfix = ', ';
      let blockText = '';

      switch (attTranslatorType) {
        case AttTranslatorType.AllTime: {
          date ??= new Date(props.schedule.start);

          title =
            weekdayShort((date.getDay() + dayi) % 7) +
            translateBase(BaseLocaleKey.ScheduleDayWordNumber, { num: dayi + 1 });
          break;
        }
        case AttTranslatorType.Today: {
          titlePostfix = '';
          if (dayi === todayi) title = '';
          else return;

          break;
        }
        case AttTranslatorType.TodayTomorrow: {
          if (dayi === todayi) title = translateBase(BaseLocaleKey.ScheduleToday);
          else if (dayi === todayi + 1) title = translateBase(BaseLocaleKey.ScheduleTomorrow);
          else return;

          break;
        }
        case AttTranslatorType.TodayYesterday: {
          if (dayi === todayi) title = translateBase(BaseLocaleKey.ScheduleToday);
          else if (dayi === todayi - 1) title = translateBase(BaseLocaleKey.ScheduleYesterday);
          else return;

          break;
        }
        case AttTranslatorType.Tomorrow: {
          titlePostfix = '';
          if (todayi === dayi) blockText = translateBase(BaseLocaleKey.ScheduleTodayLastDay);

          if (dayi === todayi + 1) title = '';
          else return;

          break;
        }
        case AttTranslatorType.Yesterday: {
          titlePostfix = '';
          if (dayi === todayi - 1) title = '';
          else return;

          break;
        }
        case AttTranslatorType.TodayPrev: {
          if (dayi <= todayi)
            title =
              dayi === todayi
                ? translateBase(it => it[BaseLocaleKey.ScheduleToday])
                : dayi === todayi - 1
                  ? translateBase(it => it[BaseLocaleKey.ScheduleYesterday])
                  : translateBase(it => it[BaseLocaleKey.ScheduleDayNumber], { n: dayi + 1 });
          else return;

          break;
        }
      }

      const node: ReactNode[] = [];
      nodes.push(node);

      day.list.forEach(event => {
        const type = types[event.type];

        if (event.atts)
          forEachObjectEntries(event.atts, (attKey, att) => {
            if (attKey !== props.attKey || checkIsArray(att)) return;
            node.push(
              <>
                <ScheduleWidgetTopicTitle
                  prefix={title + titlePostfix}
                  titleBox={type}
                  topicBox={event}
                  className="underline"
                />
                <div className="ml-2">
                  {blockText ||
                    props.appAtt.result?.(
                      att ?? props.appAtt.initVal,
                      props.dayEventAttScopeProps,
                      false,
                      emptyFunc,
                      props.schedule,
                    )}
                </div>
              </>,
            );
          });
      });
    });

  return (
    <>
      <div className="flex gap-2 my-2">
        {translateBase(BaseLocaleKey.ScheduleOverviewOf)}
        <span className="text-x7">{periodTitle}:</span>
      </div>
      {attTranslatorType === AttTranslatorType.Tomorrow && todayi === days.length - 1 ? (
        <div>{translateBase(BaseLocaleKey.ScheduleTodayLastDay)}</div>
      ) : (
        nodes.map((nodes, nodesi) => {
          return (
            <React.Fragment key={nodesi}>
              {nodes.map((node, nodei) => (
                <div key={nodei}>{node}</div>
              ))}
            </React.Fragment>
          );
        })
      )}
    </>
  );
}

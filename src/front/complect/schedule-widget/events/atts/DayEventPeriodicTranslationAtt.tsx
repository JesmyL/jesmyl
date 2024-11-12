import { mylib, MyLib } from 'front/utils';
import React, { ReactNode } from 'react';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleWidgetAttKey, ScheduleWidgetAttRef } from 'shared/api';
import { emptyFunc } from 'shared/utils';
import { ScheduleWidgetAppAtt } from '../../ScheduleWidget.model';
import ScheduleWidgetTopicTitle from '../../complect/TopicTitle';
import { AttTranslatorType, attTranslatorTypes } from '../../complect/attTranslatorType';

export default function ScheduleWidgetDayEventPeriodicTranslation(props: {
  day: IScheduleWidgetDay;
  dayi: number;
  attKey: ScheduleWidgetAttKey;
  att: ScheduleWidgetAttRef;
  schedule: IScheduleWidget;
  appAtt: ScheduleWidgetAppAtt;
}) {
  const [attTranslatorType] = props.att as [AttTranslatorType, 0];
  const periodTitle = attTranslatorTypes.find(({ id }) => attTranslatorType === id)?.title;
  const nodes: ReactNode[][] = [];
  const types = props.schedule.types ?? [];
  const days = props.schedule.days ?? [];
  const todayi = days.findIndex((_, dayi) => dayi === props.dayi);
  let date: Date;

  if (todayi > -1)
    days.forEach((day, dayi) => {
      let title = 'Период';
      let titlePostfix = ', ';
      let blockText = '';

      switch (attTranslatorType) {
        case AttTranslatorType.AllTime: {
          if (date === undefined) date = new Date(props.schedule.start);

          title = mylib.dayShortTitles[(date.getDay() + dayi) % 7] + ', день ' + (dayi + 1);
          break;
        }
        case AttTranslatorType.Today: {
          titlePostfix = '';
          if (dayi === todayi) title = '';
          else return;

          break;
        }
        case AttTranslatorType.TodayTomorrow: {
          if (dayi === todayi) title = 'Сегодня';
          else if (dayi === todayi + 1) title = 'Завтра';
          else return;

          break;
        }
        case AttTranslatorType.TodayYesterday: {
          if (dayi === todayi) title = 'Сегодня';
          else if (dayi === todayi - 1) title = 'Вчера';
          else return;

          break;
        }
        case AttTranslatorType.Tomorrow: {
          titlePostfix = '';
          if (todayi === dayi) blockText = 'Сегодня последний день';

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
          if (dayi <= todayi) title = dayi === todayi ? 'Сегодня' : dayi === todayi - 1 ? 'Вчера' : `${dayi + 1} день`;
          else return;

          break;
        }
      }

      const node: ReactNode[] = [];
      nodes.push(node);

      day.list.forEach(event => {
        const type = types[event.type];

        event.atts &&
          MyLib.entries(event.atts).forEach(([attKey, att]) => {
            if (attKey !== props.attKey || mylib.isArr(att)) return;
            node.push(
              <>
                <ScheduleWidgetTopicTitle
                  prefix={title + titlePostfix}
                  titleBox={type}
                  topicBox={event}
                  className="text-underline"
                />
                <div className="margin-gap-l">
                  {blockText ||
                    props.appAtt.result?.(att ?? props.appAtt.initVal, '', false, emptyFunc, props.schedule)}
                </div>
              </>,
            );
          });
      });
    });

  return (
    <>
      <div className="flex flex-gap margin-gap-v">
        Обзор на
        <span className="color--7">{periodTitle}:</span>
      </div>
      {attTranslatorType === AttTranslatorType.Tomorrow && todayi === days.length - 1 ? (
        <div>Сегодня последний день</div>
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

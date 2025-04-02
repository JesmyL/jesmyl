import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IScheduleWidgetDayEventMi } from 'shared/api';
import { SchDaysSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { makeRegExp, smylib } from 'shared/utils';
import { modifySchedule, modifyScheduleDay } from '../schedule-modificators';
import { onScheduleDayBeginTimeSetEvent, onScheduleDayEventListSetEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general-invocators.base';

onScheduleDayEventListSetEvent.listen(({ list, dayProps }) => {
  return modifyScheduleDay(true, day => {
    let miniMi = 0;
    day.list = list.map(event => ({ ...event, mi: miniMi++ }));
  })({ props: dayProps, value: undefined });
});

onScheduleDayBeginTimeSetEvent.listen(({ dayProps, strWup }) => {
  return modifyScheduleDay(true, day => {
    const wup = +strWup.replace(makeRegExp('/:/'), '.');
    if (isNaN(wup)) throw new Error(`time ${strWup} is invalid`);
    day.wup = wup;
  })({ props: dayProps, value: undefined });
});

export const schDaysSokiInvocatorBaseServer =
  new (class SchDaysSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchDaysSokiInvocatorMethods> {
    constructor() {
      super({
        className: 'SchDaysSokiInvocatorBaseServer',
        methods: {
          addDay: ({ props }) =>
            modifySchedule(true, props, sch =>
              sch.days.push({
                list: [],
                mi: smylib.takeNextMi(sch.days, 0),
                wup: 7,
              }),
            ),

          setBeginTime: async ({ props: dayProps, value: strTm }) =>
            onScheduleDayBeginTimeSetEvent.invoke({ dayProps, strWup: strTm }),
          setEventList: async ({ props: dayProps, list }) => onScheduleDayEventListSetEvent.invoke({ dayProps, list }),

          setTopic: modifyScheduleDay(false, (day, value) => (day.topic = value)),
          setDescription: modifyScheduleDay(false, (day, value) => (day.dsc = value)),
          addEvent: modifyScheduleDay(true, (day, type) =>
            day.list.push({
              type,
              mi: smylib.takeNextMi(day.list, IScheduleWidgetDayEventMi.def),
            }),
          ),

          removeEvent: modifyScheduleDay(true, (day, { eventMi }) => {
            const eventi = day.list.findIndex(event => event.mi === eventMi);
            if (eventi < 0) throw new Error('event not found');
            day.list.splice(eventi, 1);
          }),

          moveEvent: modifyScheduleDay(true, (day, { eventMi, beforei }) => {
            const eventi = day.list.findIndex(event => event.mi === eventMi);
            if (eventi < 0) throw new Error('event not found');

            day.list = smylib.withInsertedBeforei(day.list, beforei, eventi);
          }),
        },
        onEachFeedback: {
          addDay: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} добавлен день`,
          setTopic: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлена тема "${value}"`,
          setEventList: ({ props }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено расписание из текста`,
          setDescription: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено описание "${value}"`,
          setBeginTime: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено время начала - ${value}`,
          addEvent: ({ props, value: type }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} ` +
            `дне добавлено событие ${sch.types[type]?.title}`,
          removeEvent: ({ props, value: eventTypeTitle }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, из ${props.dayi + 1} дня удалено событие ${eventTypeTitle}`,
          moveEvent: ({ props }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне перемещено событие`,
        },
      });
    }
  })();

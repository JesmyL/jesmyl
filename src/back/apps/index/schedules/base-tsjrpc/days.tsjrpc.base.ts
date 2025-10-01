import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { IScheduleWidgetDayEventMi } from 'shared/api';
import { SchDaysTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifySchedule, modifyScheduleDay } from '../schedule-modificators';
import { onScheduleDayBeginTimeSetEvent, onScheduleDayEventListSetEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

onScheduleDayEventListSetEvent.listen(async ({ list, dayProps }) => {
  return (
    await modifyScheduleDay(true, day => {
      let miniMi = 0;
      day.list = list.map(event => ({ ...event, mi: miniMi++ }));

      return null;
    })({ props: dayProps }, { auth: undefined, client: null, visitInfo: undefined })
  ).value;
});

onScheduleDayBeginTimeSetEvent.listen(async ({ dayProps, strWup }) => {
  return (
    await modifyScheduleDay(true, day => {
      const wup = +strWup.replace(makeRegExp('/:/'), '.');
      if (isNaN(wup)) throw new Error(`time ${strWup} is invalid`);
      day.list.forEach(event => delete event.tgInform);
      day.wup = wup;

      return null;
    })({ props: dayProps }, { auth: undefined, client: null, visitInfo: undefined })
  ).value;
});

export const schDaysTsjrpcBaseServer = new (class SchDays extends TsjrpcBaseServer<SchDaysTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchDays',
      methods: {
        addDay: modifySchedule(true, sch => {
          sch.days.push({
            list: [],
            mi: smylib.takeNextMi(sch.days, 0 as number),
            wup: 7,
          });

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлен день`;
        }),

        setBeginTime: async ({ props, value: strTm }) => {
          return {
            value: await onScheduleDayBeginTimeSetEvent.invoke({ dayProps: props, strWup: strTm }),
            description: `В расписании ${scheduleTitleInBrackets(props.schw)}, в ${props.dayi + 1} дне установлено время начала - ${strTm}`,
          };
        },
        setEventList: async ({ props: dayProps, list }) => {
          return {
            value: await onScheduleDayEventListSetEvent.invoke({ dayProps, list }),
            description: `В расписании ${scheduleTitleInBrackets(dayProps.schw)}, в ${dayProps.dayi + 1} дне установлено расписание из текста`,
          };
        },

        setTopic: modifyScheduleDay(false, (day, { value, props }, sch) => {
          day.topic = value;

          return `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлена тема "${value}"`;
        }),
        setDescription: modifyScheduleDay(false, (day, { value, props }, sch) => {
          day.dsc = value;

          return `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено описание "${value}"`;
        }),
        addEvent: modifyScheduleDay(true, (day, { value, props }, sch) => {
          day.list.push({
            type: value,
            mi: smylib.takeNextMi(day.list, IScheduleWidgetDayEventMi.def),
          });

          return (
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} ` +
            `дне добавлено событие ${sch.types[value]?.title}`
          );
        }),

        removeEvent: modifyScheduleDay(true, (day, { value, props }, sch) => {
          const eventi = day.list.findIndex(event => event.mi === value.eventMi);
          if (eventi < 0) throw new Error('event not found');
          day.list.splice(eventi, 1);

          return `В расписании ${scheduleTitleInBrackets(sch)}, из ${props.dayi + 1} дня удалено событие ${value}`;
        }),

        moveEvent: modifyScheduleDay(true, (day, { value: { eventMi, beforei }, props }) => {
          const eventi = day.list.findIndex(event => event.mi === eventMi);
          if (eventi < 0) throw new Error('event not found');

          day.list = smylib.withInsertedBeforei(day.list, beforei, eventi);

          return `В расписании ${scheduleTitleInBrackets(props.schw)}, в ${props.dayi + 1} дне перемещено событие`;
        }),
      },
    });
  }
})();

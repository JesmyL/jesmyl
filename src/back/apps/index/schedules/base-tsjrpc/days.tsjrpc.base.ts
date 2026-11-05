import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { makeRegExp } from 'regexpert';
import { ScheduleWidgetDayEventMi, ScheduleWidgetDayEventMiDef, ScheduleWidgetDayi } from 'shared/api';
import { SchDaysTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi, withInsertedBeforei } from 'shared/utils';
import {
  modifySchedule,
  modifyScheduleDay,
  throwIfNoExternalMutationAuth,
  throwIfNoScheduleDaysAdd,
  throwIfNoScheduleEventsAdd,
  throwIfNoScheduleRedact,
} from '../schedule-modificators';
import { onScheduleDayBeginTimeSetEvent, onScheduleDayEventListSetEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

onScheduleDayEventListSetEvent.listen(async ({ list, dayProps, auth }) => {
  return (
    await modifyScheduleDay(true, async (day, _props, sch) => {
      await throwIfNoScheduleEventsAdd(sch, auth);

      let miniMi = 0;
      day.list = list.map(event => ({ ...event, mi: miniMi++ as ScheduleWidgetDayEventMi }));

      return null;
    })({ props: dayProps }, { auth: auth ?? undefined, client: null, visitInfo: undefined })
  ).value;
});

onScheduleDayBeginTimeSetEvent.listen(async ({ dayProps, strWup, auth }) => {
  return (
    await modifyScheduleDay(true, async (day, _props, sch) => {
      await throwIfNoScheduleRedact(sch, auth);

      const wup = +strWup.replace(makeRegExp('/:/'), '.');
      if (isNaN(wup)) throw backLocaleError(BackLocaleKey.TimeInvalid, { t: strWup });
      day.wup = wup;

      return null;
    })({ props: dayProps }, { auth: auth ?? undefined, client: null, visitInfo: undefined })
  ).value;
});

export const schDaysTsjrpcBaseServer = new (class SchDays extends TsjrpcBaseServer<SchDaysTsjrpcMethods> {
  constructor() {
    super({
      scope: 'SchDays',
      methods: {
        addDay: modifySchedule(true, async (sch, _props, tool) => {
          await throwIfNoScheduleDaysAdd(sch, tool.auth);

          sch.days.push({
            list: [],
            i: takeNextMi(sch.days, 0 as ScheduleWidgetDayi, 'i'),
            wup: 7,
          });

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлен день`;
        }),

        setBeginTime: async ({ props, value: strTm }, tool) => {
          throwIfNoExternalMutationAuth(tool);

          return {
            value: await onScheduleDayBeginTimeSetEvent.invoke({ dayProps: props, strWup: strTm, auth: tool.auth }),
            description: `В расписании ${scheduleTitleInBrackets(props.schw)}, в ${props.dayi + 1} дне установлено время начала - ${strTm}`,
          };
        },
        setEventList: async ({ props: dayProps, list }, tool) => {
          throwIfNoExternalMutationAuth(tool);

          return {
            value: await onScheduleDayEventListSetEvent.invoke({ dayProps, list, auth: tool.auth }),
            description: `В расписании ${scheduleTitleInBrackets(dayProps.schw)}, в ${dayProps.dayi + 1} дне установлено расписание из текста`,
          };
        },

        setTopic: modifyScheduleDay(false, async (day, { value, props }, sch, tool) => {
          await throwIfNoScheduleRedact(sch, tool.auth);

          day.topic = value;

          return `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлена тема "${value}"`;
        }),
        setDescription: modifyScheduleDay(false, async (day, { value, props }, sch, tool) => {
          await throwIfNoScheduleRedact(sch, tool.auth);

          day.dsc = value;

          return `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено описание "${value}"`;
        }),
        addEvent: modifyScheduleDay(true, async (day, { value, props }, sch, tool) => {
          await throwIfNoScheduleEventsAdd(sch, tool.auth);

          day.list.push({
            type: value,
            mi: takeNextMi(day.list, ScheduleWidgetDayEventMiDef),
          });

          return (
            `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} ` +
            `дне добавлено событие ${sch.types[value]?.title}`
          );
        }),

        removeEvent: modifyScheduleDay(true, async (day, { value, props }, sch, tool) => {
          await throwIfNoScheduleEventsAdd(sch, tool.auth);

          const eventi = day.list.findIndex(event => event.mi === value.eventMi);
          if (eventi < 0) throw backLocaleError(BackLocaleKey.EventNotFound);
          day.list.splice(eventi, 1);

          return `В расписании ${scheduleTitleInBrackets(sch)}, из ${props.dayi + 1} дня удалено событие ${value}`;
        }),

        moveEvent: modifyScheduleDay(true, async (day, { value: { eventMi, beforei }, props }, sch, tool) => {
          await throwIfNoScheduleEventsAdd(sch, tool.auth);

          const eventi = day.list.findIndex(event => event.mi === eventMi);
          if (eventi < 0) throw backLocaleError(BackLocaleKey.EventNotFound);

          day.list = withInsertedBeforei(day.list, beforei, eventi);

          return `В расписании ${scheduleTitleInBrackets(props.schw)}, в ${props.dayi + 1} дне перемещено событие`;
        }),
      },
    });
  }
})();

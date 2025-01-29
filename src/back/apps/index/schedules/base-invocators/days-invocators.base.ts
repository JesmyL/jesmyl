import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
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
  })(dayProps);
});

onScheduleDayBeginTimeSetEvent.listen(({ dayProps, strWup }) => {
  return modifyScheduleDay(true, day => {
    const wup = +strWup.replace(makeRegExp('/:/'), '.');
    if (isNaN(wup)) throw new Error(`time ${strWup} is invalid`);
    day.wup = wup;
  })(dayProps);
});

class SchDaysSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchDaysSokiInvocatorMethods> {
  constructor() {
    super(
      'SchDaysSokiInvocatorBaseServer',
      {
        addDay: () => props =>
          modifySchedule(true, props, sch =>
            sch.days.push({
              list: [],
              mi: smylib.takeNextMi(sch.days, 0),
              wup: 7,
            }),
          ),

        setBeginTime: () => async (dayProps, strTm) =>
          onScheduleDayBeginTimeSetEvent.invoke({ dayProps, strWup: strTm }),
        setEventList: () => async (dayProps, list) => onScheduleDayEventListSetEvent.invoke({ dayProps, list }),

        setTopic: () => modifyScheduleDay(false, (day, _, value) => (day.topic = value)),
        setDescription: () => modifyScheduleDay(false, (day, _, value) => (day.dsc = value)),
        addEvent: () =>
          modifyScheduleDay(true, (day, _, type) =>
            day.list.push({
              type,
              mi: mylib.takeNextMi(day.list, IScheduleWidgetDayEventMi.def),
            }),
          ),

        removeEvent: () =>
          modifyScheduleDay(true, (day, _, eventMi) => {
            const eventi = day.list.findIndex(event => event.mi === eventMi);
            if (eventi < 0) throw new Error('event not found');
            day.list.splice(eventi, 1);
          }),

        moveEvent: () =>
          modifyScheduleDay(true, (day, _, eventMi, beforei) => {
            const eventi = day.list.findIndex(event => event.mi === eventMi);
            if (eventi < 0) throw new Error('event not found');

            day.list = mylib.withInsertedBeforei(day.list, beforei, eventi);
          }),
      },
      {
        addDay: sch => `В расписании ${scheduleTitleInBrackets(sch)} добавлен день`,
        setTopic: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлена тема "${value}"`,
        setEventList: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено расписание из текста`,
        setDescription: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено описание "${value}"`,
        setBeginTime: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне установлено время начала - ${value}`,
        addEvent: (sch, props, type) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} ` +
          `дне добавлено событие ${sch.types[type]?.title}`,
        removeEvent: (sch, props, _, eventTypeTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, из ${props.dayi + 1} дня удалено событие ${eventTypeTitle}`,
        moveEvent: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне перемещено событие`,
      },
    );
  }
}
export const schDaysSokiInvocatorBaseServer = new SchDaysSokiInvocatorBaseServer();

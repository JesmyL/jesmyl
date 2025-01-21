import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { mylib } from 'front/utils';
import { IScheduleWidget, IScheduleWidgetDay, IScheduleWidgetDayEventMi, ScheduleDayScopeProps } from 'shared/api';
import { SchDaysSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { makeRegExp, smylib } from 'shared/utils';
import { modifySchedule, scheduleTitleInBrackets } from './general-invocators.base';

class SchDaysSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchDaysSokiInvocatorMethods> {
  constructor() {
    super(
      'SchDaysSokiInvocatorBaseServer',
      {
        addDay: () => props =>
          modifySchedule(props, sch =>
            sch.days.push({
              list: [],
              mi: smylib.takeNextMi(sch.days, 0),
              wup: 7,
            }),
          ),

        setBeginTime: () =>
          modifyScheduleDay((day, _, value) => {
            const wup = +value.replace(makeRegExp('/:/'), '.');
            if (isNaN(wup)) throw new Error(`time ${value} is invalid`);
            day.wup = wup;
          }),

        setEventList: () =>
          modifyScheduleDay((day, _, events) => {
            let miniMi = 0;

            day.list = events.map(event => {
              return {
                ...event,
                mi: miniMi++,
              };
            });
          }),

        setTopic: () => modifyScheduleDay((day, _, value) => (day.topic = value)),
        setDescription: () => modifyScheduleDay((day, _, value) => (day.dsc = value)),
        addEvent: () =>
          modifyScheduleDay((day, _, type) =>
            day.list.push({
              type,
              mi: mylib.takeNextMi(day.list, IScheduleWidgetDayEventMi.def),
            }),
          ),

        removeEvent: () =>
          modifyScheduleDay((day, _, eventMi) => {
            const eventi = day.list.findIndex(event => event.mi === eventMi);
            if (eventi < 0) throw new Error('event not found');
            day.list.splice(eventi, 1);
          }),

        moveEvent: () =>
          modifyScheduleDay((day, _, eventMi, beforei) => {
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
          `В расписании ${scheduleTitleInBrackets(sch)}, из ${props.dayi + 1} ` +
          `дня удалено событие ${eventTypeTitle}`,
        moveEvent: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)}, в ${props.dayi + 1} дне перемещено событие`,
      },
    );
  }
}

export const modifyScheduleDay =
  <Values extends unknown[]>(modifier: (day: IScheduleWidgetDay, sch: IScheduleWidget, ...values: Values) => void) =>
  (props: ScheduleDayScopeProps, ...values: Values) =>
    modifySchedule(props, sch => {
      const day = sch.days[props.dayi];
      if (day == null) throw new Error('day not found');
      modifier(day, sch, ...values);
    });

export const schDaysSokiInvocatorBaseServer = new SchDaysSokiInvocatorBaseServer();

import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleDayEventScopeProps } from 'shared/api';
import { SchDayEventsSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { modifyScheduleDay } from './days-invocators.base';
import { scheduleTitleInBrackets } from './general-invocators.base';

class SchDaysSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchDayEventsSokiInvocatorMethods> {
  constructor() {
    super(
      'SchDaysSokiInvocatorBaseServer',
      {
        setTopic: () => this.modifyEvent((event, value) => (event.topic = value)),
        toggleIsSecret: () =>
          this.modifyEvent(event => {
            if (event.secret) delete event.secret;
            else event.secret = 1;
          }),

        // setEventTypeTm,
        // setEventRatingComment,
        // setTitle,
      },
      {
        setTopic: (sch, props, value) => `${this.inEventTypeTtileOfDay(sch, props)} установлена тема "${value}"`,
        toggleIsSecret: (sch, props) => `${this.inEventTypeTtileOfDay(sch, props)} установлен признак секретности`,
      },
    );
  }

  private modifyEvent =
    <Values extends unknown[]>(modifier: (event: IScheduleWidgetDayEvent, ...values: Values) => void) =>
    (props: ScheduleDayEventScopeProps, ...values: Values) =>
      modifyScheduleDay(day => {
        const event = day.list.find(event => event.mi === props.eventMi);
        if (event == null) throw new Error('day event not found');
        modifier(event, ...values);
      })(props);

  private inEventTypeTtileOfDay = (sch: IScheduleWidget, props: ScheduleDayEventScopeProps) => {
    const eventTypei = sch.days[props.dayi]?.list.find(event => event.mi === props.eventMi)?.type;
    if (eventTypei == null) return '[event type not found]';

    return (
      `В расписании ${scheduleTitleInBrackets(sch)} в событии ` +
      `"${sch.types[eventTypei]?.title}" ${props.dayi}-го дня`
    );
  };
}

export const schDaysSokiInvocatorBaseServer = new SchDaysSokiInvocatorBaseServer();

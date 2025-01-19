import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleDayEventScopeProps } from 'shared/api';
import { SchDayEventsSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifyScheduleDay } from './days-invocators.base';
import { scheduleTitleInBrackets } from './general-invocators.base';

class SchDayEventsSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchDayEventsSokiInvocatorMethods> {
  constructor() {
    super(
      'SchDayEventsSokiInvocatorBaseServer',
      {
        setTopic: () => (props, value) => this.modifyEvent(props, event => (event.topic = value)),
        setTm: () => (props, value) => this.modifyEvent(props, event => (event.tm = value)),
        toggleIsSecret: () => props =>
          this.modifyEvent(props, event => {
            if (event.secret) delete event.secret;
            else event.secret = 1;
          }),
        addAttachment: () => (props, attKey, defaultValue) =>
          this.modifyEvent(props, event => {
            event.atts ??= {};
            event.atts[attKey] = defaultValue;
          }),

        removeAttachment: () => (props, attKey) =>
          this.modifyEvent(props, event => {
            event.atts ??= {};
            delete event.atts[attKey];
            if (!smylib.keys(event.atts).length) delete event.atts;
          }),
      },
      {
        setTopic: (sch, props, value) => `${this.inEventTypeTtileOfDay(sch, props)} установлена тема "${value}"`,
        setTm: (sch, props, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} установлена время продолжительности - ${value}`,
        toggleIsSecret: (sch, props) => `${this.inEventTypeTtileOfDay(sch, props)} установлен признак секретности`,
        addAttachment: (sch, props, attKey) => `${this.inEventTypeTtileOfDay(sch, props)} добавлено вложение ${attKey}`,
        removeAttachment: (sch, props, attKey) =>
          `${this.inEventTypeTtileOfDay(sch, props)} удалено вложение ${attKey}`,
      },
    );
  }

  private modifyEvent = (props: ScheduleDayEventScopeProps, modifier: (event: IScheduleWidgetDayEvent) => void) =>
    modifyScheduleDay(day => {
      const event = day.list.find(event => event.mi === props.eventMi);
      if (event == null) throw new Error('day event not found');
      modifier(event);
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
export const schDayEventsSokiInvocatorBaseServer = new SchDayEventsSokiInvocatorBaseServer();

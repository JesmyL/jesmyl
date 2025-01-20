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
        setTopic: () => this.setEventValue('topic'),
        setDescription: () => this.setEventValue('dsc'),
        setTm: () => this.setEventValue('tm'),
        setIsNeedTgInform: () => this.setEventValue('tgInform'),
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
        addAttachmentRef: () => (props, attKey, attRef) =>
          this.modifyEvent(props, event => {
            event.atts ??= {};
            event.atts[attKey] = attRef;
          }),

        removeAttachment: () => (props, attKey) =>
          this.modifyEvent(props, event => {
            event.atts ??= {};
            delete event.atts[attKey];
            if (!smylib.keys(event.atts).length) delete event.atts;
          }),

        setRatePoint: () => (props, userMi, ratePoint) =>
          this.modifyEvent(props, event => {
            event.rate ??= {} as never;
            event.rate[userMi] ??= [ratePoint, ''];
            event.rate[userMi][0] = ratePoint;
          }),

        setRateComment: () => (props, userMi, comment) =>
          this.modifyEvent(props, event => {
            event.rate ??= {} as never;
            event.rate[userMi] ??= [0, comment];
            event.rate[userMi][1] = comment;
          }),
      },
      {
        setTopic: (sch, props, value) => `${this.inEventTypeTtileOfDay(sch, props)} установлена тема "${value}"`,
        setDescription: (sch, props, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} установлено описание - "${value}"`,
        setIsNeedTgInform: (sch, props, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} установлено ${value ? 'напомнить' : 'не напоминать'} в TG`,
        setTm: (sch, props, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} установлено время продолжительности - ${value}`,
        toggleIsSecret: (sch, props) => `${this.inEventTypeTtileOfDay(sch, props)} установлен признак секретности`,

        addAttachment: (sch, props, attKey) => `${this.inEventTypeTtileOfDay(sch, props)} добавлено вложение ${attKey}`,
        addAttachmentRef: (sch, props, attKey, attRef) =>
          `${this.inEventTypeTtileOfDay(sch, props)} добавлена ссылка на вложение ${attKey} ${attRef[0] + 1}-го дня`,
        removeAttachment: (sch, props, attKey) =>
          `${this.inEventTypeTtileOfDay(sch, props)} удалено вложение ${attKey}`,

        setRatePoint: (sch, props, _, ratePoint, userName) =>
          `${this.inEventTypeTtileOfDay(sch, props)} участником ${userName} поставлена оценка - (${ratePoint})`,
        setRateComment: (sch, props, _, comment, userName) =>
          `${this.inEventTypeTtileOfDay(sch, props)} участником ${userName} оставлен комментарий - "${comment}"`,
      },
    );
  }

  private setEventValue =
    <Key extends keyof IScheduleWidgetDayEvent, Value extends IScheduleWidgetDayEvent[Key]>(key: Key) =>
    (props: ScheduleDayEventScopeProps, value: Value) =>
      this.modifyEvent(props, event => (event[key] = value));

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
      `"${sch.types[eventTypei]?.title}" ${props.dayi + 1}-го дня`
    );
  };
}
export const schDayEventsSokiInvocatorBaseServer = new SchDayEventsSokiInvocatorBaseServer();

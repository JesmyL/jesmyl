import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleDayEventScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
} from 'shared/api';
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

        updateCheckListAttachmentValue: () => (props, itemMi, key, value) =>
          this.modifyKeyValueAttachmentValueList(props, null, 'list', values => {
            if (itemMi == null) {
              if (key == null || value == null) return;
              values.push([key, value, smylib.takeNextMi(values, 0, '2')]);
              return;
            }

            const item = values.find(([, , mi]) => mi === itemMi);
            if (item == null) throw new Error('item not found 3187614431009');

            if (key != null) item[0] = key;
            if (value != null) item[1] = value;
          }),

        putKeyValueAttachment: () => (props, key, value) =>
          this.modifyKeyValueAttachmentValueList(props, null, 'values', values => {
            if (value === null) {
              const index = values.findIndex(([, , mi]) => mi === key);
              if (index < 0) throw new Error('value not found');
              values.splice(index, 1);
            } else values.push([key, value, smylib.takeNextMi(values, 0, '2')]);
          }),

        setKeyValueAttachmentValue: () => (props, itemMi, value) =>
          this.modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
            if (value === null) values.splice(itemi, 1);
            else values[itemi][1] = value;
          }),

        setKeyValueAttachmentKey: () => (props, itemMi, value) =>
          this.modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
            values[itemi][0] = value;
          }),

        changeKeyValueAttachmentKey: () => (props, key, value) =>
          this.modifyKeyValueAttachmentValueList(props, null, 'values', values => {
            const item = values.find(item => item[0] === key);
            if (item == null) throw new Error('item not found');
            item[0] = value;
          }),

        addKeyValueAttachmentListItem: () => (props, itemMi, value) =>
          this.modifyKeyValueAttachmentListValue(props, itemMi, itemValue => {
            itemValue.push(value);
          }),

        setKeyValueAttachmentListItemValue: () => (props, itemMi, valuei, value) =>
          this.modifyKeyValueAttachmentListValue(props, itemMi, itemValue => {
            itemValue[valuei] = value;
          }),

        removeKeyValueAttachmentListItemValue: () => (props, itemMi, value) =>
          this.modifyKeyValueAttachmentListValue(props, itemMi, itemValue => {
            const index = itemValue.findIndex(val => val === value);
            if (index < 0) throw new Error('value not found 238716818');
            itemValue.splice(index, 1);
          }),

        moveKeyValueAttachmentListItem: () => (props, itemMi, value) =>
          this.modifyKeyValueAttachmentListValue(props, itemMi, (itemValue, item) => {
            const index = itemValue.findIndex(val => val === value);
            if (index < 0) throw new Error('value not found 238716818');

            item[1] = smylib.withInsertedBeforei(itemValue, index === 0 ? 2 : index - 1, index);
          }),

        moveKeyValueAttachment: () => (props, itemMi) =>
          this.modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
            return smylib.withInsertedBeforei(values, itemi === 0 ? 2 : itemi - 1, itemi);
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

        updateCheckListAttachmentValue: (sch, props, itemMi, key, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} ` +
          `${value === null ? 'удалён выполняемый пункт из вложения' : 'добавлен выполняемый пункт во вложение'} ` +
          `${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value, itemMi])}`,

        putKeyValueAttachment: (sch, props, key, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} ${value === null ? 'удалено' : 'добавлено'} ` +
          `списочное значение во вложение ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

        addKeyValueAttachmentListItem: (sch, props, key, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} ${value === null ? 'удалено' : 'добавлено'} ` +
          `списочное значение во вложение ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

        setKeyValueAttachmentListItemValue: (sch, props, key, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} изменено ` +
          `списочное значение во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

        setKeyValueAttachmentValue: (sch, props, _, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} изменено ` +
          `списочное значение во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify(value)}`,

        setKeyValueAttachmentKey: (sch, props, _, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} установлен ключ ` +
          `списочного значения во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify(value)}`,

        changeKeyValueAttachmentKey: (sch, props, key, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} изменён ключ ` +
          `списочного значения во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

        moveKeyValueAttachment: (sch, props) =>
          `${this.inEventTypeTtileOfDay(sch, props)} изменён ` +
          `порядок в списочном значении во вложении ${props.attTitle ?? props.attKey}`,

        moveKeyValueAttachmentListItem: (sch, props) =>
          `${this.inEventTypeTtileOfDay(sch, props)} изменён ` +
          `порядок в списочном значении во вложении ${props.attTitle ?? props.attKey}`,

        removeKeyValueAttachmentListItemValue: (sch, props, key, value) =>
          `${this.inEventTypeTtileOfDay(sch, props)} удалено ` +
          `списочное значение из вложения ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

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

  private modifyEvent = (
    props: ScheduleDayEventScopeProps,
    modifier: (event: IScheduleWidgetDayEvent, day: IScheduleWidgetDay, sch: IScheduleWidget) => void,
  ) =>
    modifyScheduleDay((day, sch) => {
      const event = day.list.find(event => event.mi === props.eventMi);
      if (event == null) throw new Error('day event not found');
      modifier(event, day, sch);
    })(props);

  private inEventTypeTtileOfDay = (sch: IScheduleWidget, props: ScheduleDayEventScopeProps) => {
    const eventTypei = sch.days[props.dayi]?.list.find(event => event.mi === props.eventMi)?.type;
    if (eventTypei == null) return '[event type not found]';

    return (
      `В расписании ${scheduleTitleInBrackets(sch)} в событии ` +
      `"${sch.types[eventTypei]?.title}" ${props.dayi + 1}-го дня`
    );
  };

  private modifyKeyValueAttachmentValueList = <Itemi extends number | null, ListField extends 'values' | 'list'>(
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: Itemi,
    listField: ListField,
    modifier: (
      values: Required<ScheduleWidgetAppAttCustomizableValue>[ListField],
      itemi: Itemi,
    ) => void | Required<ScheduleWidgetAppAttCustomizableValue>[ListField],
  ) =>
    this.modifyEvent(props, (event, _, sch) => {
      event.atts ??= {};
      event.atts[props.attKey] ??= {};

      let att = event.atts[props.attKey] as ScheduleWidgetAppAttCustomizableValue;

      if (smylib.isArr(att)) {
        if (att[0] < 0) throw new Error('attachment type is anchor');
        const [dayi, eventMi] = att as unknown as [number, number];

        att = sch.days[dayi].list.find(event => event.mi === eventMi)?.atts?.[
          props.attKey
        ] as ScheduleWidgetAppAttCustomizableValue;

        if (att == null) throw new Error('attachment anchor is invalid 84194422067');
      }

      const listFieldValue = listField;
      let itemi = null;
      att[listFieldValue] ??= [] as never;

      if (itemMi !== null) {
        itemi = att[listFieldValue].findIndex(([, , mi]) => mi === itemMi);
        if (itemi < 0) throw new Error('value not found 019988172');
      }

      const newList = modifier(att[listFieldValue] as never, itemi as Itemi);

      if (newList !== undefined) att[listFieldValue] = newList;
      if (!att[listFieldValue].length) delete att[listFieldValue];
    });

  private modifyKeyValueAttachmentListValue = (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    modifier: (listItem: (string | number)[], item: ScheduleWidgetAppAttCustomizableValueItem) => void,
  ) => {
    return this.modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
      const [, itemValue] = values[itemi];
      if (!smylib.isArr(itemValue)) throw new Error('att value list item not array type');
      modifier(itemValue, values[itemi]);
    });
  };
}
export const schDayEventsSokiInvocatorBaseServer = new SchDayEventsSokiInvocatorBaseServer();

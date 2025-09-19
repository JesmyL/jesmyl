import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleDayEventScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
} from 'shared/api';
import { SchDayEventsTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifyScheduleDay } from '../schedule-modificators';
import { onScheduleDayEventIsNeedTgInformSetEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

onScheduleDayEventIsNeedTgInformSetEvent.listen(({ dayEventProps, value, isNeedRefreshTgInformTime }) => {
  return modifyEvent(dayEventProps, event => (event.tgInform = value), isNeedRefreshTgInformTime);
});

const modifyEvent = (
  props: ScheduleDayEventScopeProps,
  modifier: (event: IScheduleWidgetDayEvent, day: IScheduleWidgetDay, sch: IScheduleWidget) => void,
  isNeedRefreshTgInformTime?: boolean,
) =>
  modifyScheduleDay(isNeedRefreshTgInformTime || false, (day, _, sch) => {
    const event = day.list.find(event => event.mi === props.eventMi);
    if (event == null) throw new Error('day event not found');
    modifier(event, day, sch);
  })({ props, value: undefined });

export const schDayEventsTsjrpcBaseServer =
  new (class SchDayEvents extends TsjrpcBaseServer<SchDayEventsTsjrpcMethods> {
    constructor() {
      const setEventValue =
        <Key extends keyof IScheduleWidgetDayEvent, Value extends IScheduleWidgetDayEvent[Key]>(key: Key) =>
        ({ props, value }: { props: ScheduleDayEventScopeProps; value: Value }) =>
          modifyEvent(props, event => (event[key] = value));

      const inEventTypeTtileOfDay = (sch: IScheduleWidget, props: ScheduleDayEventScopeProps) => {
        const eventTypei = sch.days[props.dayi]?.list.find(event => event.mi === props.eventMi)?.type;
        if (eventTypei == null) return '[event type not found]';

        return (
          `В расписании ${scheduleTitleInBrackets(sch)} в событии ` +
          `"${sch.types[eventTypei]?.title}" ${props.dayi + 1}-го дня`
        );
      };

      const modifyKeyValueAttachmentValueList = <Itemi extends number | null, ListField extends 'values' | 'list'>(
        props: ScheduleDayEventAttachmentScopeProps,
        itemMi: Itemi,
        listField: ListField,
        modifier: (
          values: Required<ScheduleWidgetAppAttCustomizableValue>[ListField],
          itemi: Itemi,
        ) => void | Required<ScheduleWidgetAppAttCustomizableValue>[ListField],
      ) =>
        modifyEvent(props, (event, _, sch) => {
          event.atts ??= {};
          event.atts[props.attKey] ??= {};

          let att = event.atts[props.attKey] as ScheduleWidgetAppAttCustomizableValue;

          if (smylib.isArr(att)) {
            if (+att[0]! < 0) throw new Error('attachment type is anchor');
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

      const modifyKeyValueAttachmentListValue = (
        props: ScheduleDayEventAttachmentScopeProps,
        itemMi: number,
        modifier: (listItem: (string | number)[], item: ScheduleWidgetAppAttCustomizableValueItem) => void,
      ) => {
        return modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
          const [, itemValue] = values[itemi];
          if (!smylib.isArr(itemValue)) throw new Error('att value list item not array type');
          modifier(itemValue, values[itemi]);
        });
      };

      super({
        scope: 'SchDayEvents',
        methods: {
          setTopic: setEventValue('topic'),
          setDescription: setEventValue('dsc'),
          setTm: ({ props, value }) => modifyEvent(props, event => (event.tm = value), true),

          setIsNeedTgInform: ({ props: dayEventProps, value }) =>
            onScheduleDayEventIsNeedTgInformSetEvent.invoke({ dayEventProps, value, isNeedRefreshTgInformTime: true }),

          toggleIsSecret: ({ props }) =>
            modifyEvent(props, event => {
              if (event.secret) delete event.secret;
              else event.secret = 1;
            }),

          addAttachment: ({ props, attKey, defaultValue }) =>
            modifyEvent(props, event => {
              event.atts ??= {};
              event.atts[attKey] = defaultValue;
            }),

          addAttachmentRef: ({ props, attKey, attRef }) =>
            modifyEvent(props, event => {
              event.atts ??= {};
              event.atts[attKey] = attRef;
            }),

          removeAttachment: ({ props, attKey }) =>
            modifyEvent(props, event => {
              event.atts ??= {};
              delete event.atts[attKey];
              if (!smylib.keys(event.atts).length) delete event.atts;
            }),

          updateCheckListAttachmentValue: ({ props, itemMi, key, value }) =>
            modifyKeyValueAttachmentValueList(props, null, 'list', values => {
              if (itemMi == null) {
                if (key == null || value == null) return;
                values.push([key, value, smylib.takeNextMi(values, 0 as number, '2')]);
                return;
              }

              const item = values.find(([, , mi]) => mi === itemMi);
              if (item == null) throw new Error('item not found 3187614431009');

              if (key != null) item[0] = key;
              if (value != null) item[1] = value;
            }),

          putKeyValueAttachment: ({ props, key, value }) =>
            modifyKeyValueAttachmentValueList(props, null, 'values', values => {
              if (value === null) {
                const index = values.findIndex(([, , mi]) => mi === key);
                if (index < 0) throw new Error('value not found');
                values.splice(index, 1);
              } else values.push([key, value, smylib.takeNextMi(values, 0 as number, '2')]);
            }),

          setKeyValueAttachmentValue: ({ props, itemMi, value }) =>
            modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
              if (value === null) values.splice(itemi, 1);
              else values[itemi][1] = value;
            }),

          setKeyValueAttachmentKey: ({ props, itemMi, value }) =>
            modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
              values[itemi][0] = value;
            }),

          changeKeyValueAttachmentKey: ({ props, key, value }) =>
            modifyKeyValueAttachmentValueList(props, null, 'values', values => {
              const item = values.find(item => item[0] === key);
              if (item == null) throw new Error('item not found');
              item[0] = value;
            }),

          addKeyValueAttachmentListItem: ({ props, itemMi, value }) =>
            modifyKeyValueAttachmentListValue(props, itemMi, itemValue => {
              itemValue.push(value);
            }),

          setKeyValueAttachmentListItemValue: ({ props, itemMi, valuei, value }) =>
            modifyKeyValueAttachmentListValue(props, itemMi, itemValue => {
              itemValue[valuei] = value;
            }),

          removeKeyValueAttachmentListItemValue: ({ props, itemMi, value }) =>
            modifyKeyValueAttachmentListValue(props, itemMi, itemValue => {
              const index = itemValue.findIndex(val => val === value);
              if (index < 0) throw new Error('value not found 238716818');
              itemValue.splice(index, 1);
            }),

          moveKeyValueAttachmentListItem: ({ props, itemMi, value }) =>
            modifyKeyValueAttachmentListValue(props, itemMi, (itemValue, item) => {
              const index = itemValue.findIndex(val => val === value);
              if (index < 0) throw new Error('value not found 238716818');

              item[1] = smylib.withInsertedBeforei(itemValue, index === 0 ? 2 : index - 1, index);
            }),

          moveKeyValueAttachment: ({ props, itemMi }) =>
            modifyKeyValueAttachmentValueList(props, itemMi, 'values', (values, itemi) => {
              return smylib.withInsertedBeforei(values, itemi === 0 ? 2 : itemi - 1, itemi);
            }),

          setRatePoint: ({ props, userMi, ratePoint }) =>
            modifyEvent(props, event => {
              event.rate ??= {} as never;
              event.rate[userMi] ??= [ratePoint, ''];
              event.rate[userMi][0] = ratePoint;
            }),

          setRateComment: ({ props, userMi, comment }) =>
            modifyEvent(props, event => {
              event.rate ??= {} as never;
              event.rate[userMi] ??= [0, comment];
              event.rate[userMi][1] = comment;
            }),
        },
        onEachFeedback: {
          setTopic: ({ props, value }, sch) => `${inEventTypeTtileOfDay(sch, props)} установлена тема "${value}"`,

          setDescription: ({ props, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} установлено описание - "${value}"`,

          setIsNeedTgInform: ({ props, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} установлено ${value ? 'напомнить' : 'не напоминать'} в TG`,

          setTm: ({ props, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} установлено время продолжительности - ${value}`,

          toggleIsSecret: ({ props }, sch) => `${inEventTypeTtileOfDay(sch, props)} установлен признак секретности`,

          addAttachment: ({ props, attKey }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} добавлено вложение ${attKey}`,

          updateCheckListAttachmentValue: ({ props, itemMi, key, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} ` +
            `${value === null ? 'удалён выполняемый пункт из вложения' : 'добавлен выполняемый пункт во вложение'} ` +
            `${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value, itemMi])}`,

          putKeyValueAttachment: ({ props, key, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} ${value === null ? 'удалено' : 'добавлено'} ` +
            `списочное значение во вложение ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

          addKeyValueAttachmentListItem: ({ props, itemMi: key, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} ${value === null ? 'удалено' : 'добавлено'} ` +
            `списочное значение во вложение ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

          setKeyValueAttachmentListItemValue: ({ props, itemMi: key, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} изменено ` +
            `списочное значение во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

          setKeyValueAttachmentValue: ({ props, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} изменено ` +
            `списочное значение во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify(value)}`,

          setKeyValueAttachmentKey: ({ props, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} установлен ключ ` +
            `списочного значения во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify(value)}`,

          changeKeyValueAttachmentKey: ({ props, key, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} изменён ключ ` +
            `списочного значения во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

          moveKeyValueAttachment: ({ props }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} изменён ` +
            `порядок в списочном значении во вложении ${props.attTitle ?? props.attKey}`,

          moveKeyValueAttachmentListItem: ({ props }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} изменён ` +
            `порядок в списочном значении во вложении ${props.attTitle ?? props.attKey}`,

          removeKeyValueAttachmentListItemValue: ({ props, itemMi: key, value }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} удалено ` +
            `списочное значение из вложения ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,

          addAttachmentRef: ({ props, attKey, attRef }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} добавлена ссылка на вложение ${attKey} ${attRef[0] + 1}-го дня`,

          removeAttachment: ({ props, attKey }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} удалено вложение ${attKey}`,

          setRatePoint: ({ props, ratePoint, userName }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} участником ${userName} поставлена оценка - (${ratePoint})`,

          setRateComment: ({ props, comment, userName }, sch) =>
            `${inEventTypeTtileOfDay(sch, props)} участником ${userName} оставлен комментарий - "${comment}"`,
        },
      });
    }
  })();

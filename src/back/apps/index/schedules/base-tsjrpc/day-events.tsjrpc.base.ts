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

const inEventTypeTtileOfDay = (sch: IScheduleWidget, props: ScheduleDayEventScopeProps) => {
  const eventTypei = sch.days[props.dayi]?.list.find(event => event.mi === props.eventMi)?.type;
  if (eventTypei == null) return '[event type not found]';

  return (
    `В расписании ${scheduleTitleInBrackets(sch)} в событии ` +
    `"${sch.types[eventTypei]?.title}" ${props.dayi + 1}-го дня`
  );
};

onScheduleDayEventIsNeedTgInformSetEvent.listen(async ({ dayEventProps, value, isNeedRefreshTgInformTime }) => {
  return (
    await modifyEvent((event, { props }, sch) => {
      event.tgInform = value;

      return `${inEventTypeTtileOfDay(sch, props)} установлено ${value ? 'напомнить' : 'не напоминать'} в TG`;
    }, isNeedRefreshTgInformTime)({ props: dayEventProps }, { auth: undefined, client: null, visitInfo: undefined })
  ).value;
});

const modifyEvent = <Props extends { props: ScheduleDayEventScopeProps }>(
  modifier: (
    event: IScheduleWidgetDayEvent,
    props: Props,
    sch: IScheduleWidget,
    day: IScheduleWidgetDay,
  ) => string | null,
  isNeedRefreshTgInformTime?: boolean,
) =>
  modifyScheduleDay<Props>(isNeedRefreshTgInformTime || false, (day, props, sch) => {
    const event = day.list.find(event => event.mi === props.props.eventMi);
    if (event == null) throw new Error('day event not found');

    return modifier(event, props, sch, day);
  });

export const schDayEventsTsjrpcBaseServer =
  new (class SchDayEvents extends TsjrpcBaseServer<SchDayEventsTsjrpcMethods> {
    constructor() {
      const modifyKeyValueAttachmentValueList = <
        Props extends { props: ScheduleDayEventAttachmentScopeProps; itemMi?: number | null },
        ListField extends 'values' | 'list',
      >(
        listField: ListField,
        modifier: (
          values: Required<ScheduleWidgetAppAttCustomizableValue>[ListField],
          props: Props,
          itemi: number | null,
          sch: IScheduleWidget,
        ) => {
          list?: Required<ScheduleWidgetAppAttCustomizableValue>[ListField];
          description: string | null;
        },
      ) =>
        modifyEvent<Props>((event, props, sch) => {
          event.atts ??= {};
          event.atts[props.props.attKey] ??= {};

          let att = event.atts[props.props.attKey] as ScheduleWidgetAppAttCustomizableValue;

          if (smylib.isArr(att)) {
            if (+att[0]! < 0) throw new Error('attachment type is anchor');
            const [dayi, eventMi] = att as unknown as [number, number];

            att = sch.days[dayi].list.find(event => event.mi === eventMi)?.atts?.[
              props.props.attKey
            ] as ScheduleWidgetAppAttCustomizableValue;

            if (att == null) throw new Error('attachment anchor is invalid 84194422067');
          }

          let itemi = null;
          att[listField] ??= [] as never;

          if (props.itemMi != null) {
            itemi = att[listField].findIndex(([, , mi]) => mi === props.itemMi);

            if (itemi < 0) throw new Error('value not found 019988172');
          }

          const { list: newList, description } = modifier(att[listField] as never, props, itemi, sch);

          if (newList !== undefined) att[listField] = newList;
          if (!att[listField].length) delete att[listField];

          return description;
        });

      const modifyKeyValueAttachmentListValue = <
        Props extends { props: ScheduleDayEventAttachmentScopeProps; itemMi: number },
      >(
        modifier: (
          listItem: (string | number)[],
          props: Props,
          item: ScheduleWidgetAppAttCustomizableValueItem,
          sch: IScheduleWidget,
        ) => string | null,
      ) =>
        modifyKeyValueAttachmentValueList<Props, 'values'>('values', (values, props, itemi, sch) => {
          if (itemi == null) throw 'Error 76521387462345';
          const [, itemValue] = values[itemi];
          if (!smylib.isArr(itemValue)) throw new Error('att value list item not array type');

          return { description: modifier(itemValue, props, values[itemi], sch) };
        });

      super({
        scope: 'SchDayEvents',
        methods: {
          setTopic: modifyEvent((event, { props, value }, sch) => {
            event.topic = value;

            return `${inEventTypeTtileOfDay(sch, props)} установлена тема "${value}"`;
          }),
          setDescription: modifyEvent((event, { props, value }, sch) => {
            event.dsc = value;

            return `${inEventTypeTtileOfDay(sch, props)} установлено описание - "${value}"`;
          }),
          setTm: modifyEvent((event, { props, value }, sch) => {
            event.tm = value;

            return `${inEventTypeTtileOfDay(sch, props)} установлено время продолжительности - ${value}`;
          }, true),

          setIsNeedTgInform: async ({ props: dayEventProps, value }) => {
            const sch = await onScheduleDayEventIsNeedTgInformSetEvent.invoke({
              dayEventProps,
              value,
              isNeedRefreshTgInformTime: true,
            });

            return {
              value: sch,
              description: `${inEventTypeTtileOfDay(sch, dayEventProps)} установлено ${value ? 'напомнить' : 'не напоминать'} в TG`,
            };
          },

          toggleIsSecret: modifyEvent((event, { props }, sch) => {
            if (event.secret) delete event.secret;
            else event.secret = 1;

            return `${inEventTypeTtileOfDay(sch, props)} установлен признак секретности`;
          }),

          addAttachment: modifyEvent((event, { props, attKey, defaultValue }, sch) => {
            event.atts ??= {};
            event.atts[attKey] = defaultValue;

            return `${inEventTypeTtileOfDay(sch, props)} добавлено вложение ${attKey}`;
          }),

          addAttachmentRef: modifyEvent((event, { props, attKey, attRef }, sch) => {
            event.atts ??= {};
            event.atts[attKey] = attRef;

            return `${inEventTypeTtileOfDay(sch, props)} добавлена ссылка на вложение ${attKey} ${attRef[0] + 1}-го дня`;
          }),

          removeAttachment: modifyEvent((event, { props, attKey }, sch) => {
            event.atts ??= {};
            delete event.atts[attKey];
            if (!smylib.keys(event.atts).length) delete event.atts;

            return `${inEventTypeTtileOfDay(sch, props)} удалено вложение ${attKey}`;
          }),

          updateCheckListAttachmentValue: modifyKeyValueAttachmentValueList(
            'list',
            (values, { itemMi, key, value, props }, _, sch) => {
              if (itemMi == null) {
                if (key == null || value == null) return { description: null };
                values.push([key, value, smylib.takeNextMi(values, 0 as number, '2')]);
                return { description: null };
              }

              const item = values.find(([, , mi]) => mi === itemMi);
              if (item == null) throw new Error('item not found 3187614431009');

              if (key != null) item[0] = key;
              if (value != null) item[1] = value;

              return {
                description:
                  `${inEventTypeTtileOfDay(sch, props)} ` +
                  `${value === null ? 'удалён выполняемый пункт из вложения' : 'добавлен выполняемый пункт во вложение'} ` +
                  `${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value, itemMi])}`,
              };
            },
          ),

          putKeyValueAttachment: modifyKeyValueAttachmentValueList(
            'values',
            (values, { key, value, props }, _, sch) => {
              if (value === null) {
                const index = values.findIndex(([, , mi]) => mi === key);
                if (index < 0) throw new Error('value not found');
                values.splice(index, 1);
              } else values.push([key, value, smylib.takeNextMi(values, 0 as number, '2')]);

              return {
                description:
                  `${inEventTypeTtileOfDay(sch, props)} ${value === null ? 'удалено' : 'добавлено'} ` +
                  `списочное значение во вложение ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,
              };
            },
          ),

          setKeyValueAttachmentValue: modifyKeyValueAttachmentValueList(
            'values',
            (values, { value, props }, itemi, sch) => {
              if (itemi == null) return { description: null };
              if (value === null) values.splice(itemi, 1);
              else values[itemi][1] = value;

              return {
                description:
                  `${inEventTypeTtileOfDay(sch, props)} изменено ` +
                  `списочное значение во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify(value)}`,
              };
            },
          ),

          setKeyValueAttachmentKey: modifyKeyValueAttachmentValueList(
            'values',
            (values, { value, props }, itemi, sch) => {
              if (itemi == null) return { description: null };
              values[itemi][0] = value;

              return {
                description:
                  `${inEventTypeTtileOfDay(sch, props)} установлен ключ ` +
                  `списочного значения во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify(value)}`,
              };
            },
          ),

          changeKeyValueAttachmentKey: modifyKeyValueAttachmentValueList(
            'values',
            (values, { key, value, props }, _, sch) => {
              const item = values.find(item => item[0] === key);
              if (item == null) throw new Error('item not found');
              item[0] = value;

              return {
                description:
                  `${inEventTypeTtileOfDay(sch, props)} изменён ключ ` +
                  `списочного значения во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify([key, value])}`,
              };
            },
          ),

          addKeyValueAttachmentListItem: modifyKeyValueAttachmentListValue(
            (itemValue, { value, itemMi, props }, _, sch) => {
              itemValue.push(value);

              return (
                `${inEventTypeTtileOfDay(sch, props)} ${value === null ? 'удалено' : 'добавлено'} ` +
                `списочное значение во вложение ${props.attTitle ?? props.attKey} - ${JSON.stringify([itemMi, value])}`
              );
            },
          ),

          setKeyValueAttachmentListItemValue: modifyKeyValueAttachmentListValue(
            (itemValue, { value, valuei, props, itemMi }, _, sch) => {
              itemValue[valuei] = value;

              return (
                `${inEventTypeTtileOfDay(sch, props)} изменено ` +
                `списочное значение во вложении ${props.attTitle ?? props.attKey} - ${JSON.stringify([itemMi, value])}`
              );
            },
          ),

          removeKeyValueAttachmentListItemValue: modifyKeyValueAttachmentListValue(
            (itemValue, { value, itemMi, props }, _, sch) => {
              const index = itemValue.findIndex(val => val === value);
              if (index < 0) throw new Error('value not found 238716818');
              itemValue.splice(index, 1);

              return (
                `${inEventTypeTtileOfDay(sch, props)} удалено ` +
                `списочное значение из вложения ${props.attTitle ?? props.attKey} - ${JSON.stringify([itemMi, value])}`
              );
            },
          ),

          moveKeyValueAttachmentListItem: modifyKeyValueAttachmentListValue(
            (itemValue, { value, props }, item, sch) => {
              const index = itemValue.findIndex(val => val === value);
              if (index < 0) throw new Error('value not found 238716818');

              item[1] = smylib.withInsertedBeforei(itemValue, index === 0 ? 2 : index - 1, index);

              return (
                `${inEventTypeTtileOfDay(sch, props)} изменён ` +
                `порядок в списочном значении во вложении ${props.attTitle ?? props.attKey}`
              );
            },
          ),

          transferKeyValueAttachment: modifyKeyValueAttachmentValueList(
            'values',
            (values, { grabbedItemMi, targetItemMi, props }, _, sch) => {
              if (grabbedItemMi == null) return { description: null };

              return {
                list: smylib.withInsertedBeforei(
                  values,
                  targetItemMi == null ? values.length : values.findIndex(item => targetItemMi === item[2]),
                  values.findIndex(item => grabbedItemMi === item[2]),
                ),
                description:
                  `${inEventTypeTtileOfDay(sch, props)} изменён ` +
                  `порядок в списочном значении во вложении ${props.attTitle ?? props.attKey}`,
              };
            },
          ),

          setRatePoint: modifyEvent((event, { props, ratePoint, userMi, userName }, sch) => {
            event.rate ??= {} as never;
            event.rate[userMi] ??= [ratePoint, ''];
            event.rate[userMi][0] = ratePoint;

            return `${inEventTypeTtileOfDay(sch, props)} участником ${userName} поставлена оценка - (${ratePoint})`;
          }),

          setRateComment: modifyEvent((event, { comment, userMi, props, userName }, sch) => {
            event.rate ??= {} as never;
            event.rate[userMi] ??= [0, comment];
            event.rate[userMi][1] = comment;

            return `${inEventTypeTtileOfDay(sch, props)} участником ${userName} оставлен комментарий - "${comment}"`;
          }),
        },
      });
    }
  })();

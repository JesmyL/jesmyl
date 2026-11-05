import { backLocaleError } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { ServerTSJRPCTool, TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleDayEventScopeProps,
  ScheduleWidgetAppAttCustomizableValue,
  ScheduleWidgetAppAttCustomizableValueItem,
  ScheduleWidgetAttKey,
} from 'shared/api';
import { SchDayEventsTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi, withInsertedBeforei } from 'shared/utils';
import { checkIsArray } from 'shared/utils/checkIs';
import { objectLength } from 'shared/utils/object.utils';
import {
  modifyScheduleDay,
  throwIfNoScheduleComsListRedact,
  throwIfNoScheduleEventContentRedact,
} from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const eventDayIntr = async (sch: IScheduleWidget, props: ScheduleDayEventScopeProps) => {
  const eventTypei = sch.days[props.dayi]?.list.find(event => event.mi === props.eventMi)?.type;

  return {
    t: await scheduleTitleInBrackets(sch),
    e: (eventTypei == null ? null : sch.types[eventTypei]?.title) ?? '?',
    d: props.dayi + 1,
  };
};

const modifyEvent = <Props extends { props: ScheduleDayEventScopeProps }>(
  modifier: (
    event: IScheduleWidgetDayEvent,
    props: Props,
    sch: IScheduleWidget,
    day: IScheduleWidgetDay,
    tool: ServerTSJRPCTool,
  ) => PromiseOr<string | null>,
  isNeedRefreshInformTime?: boolean,
) =>
  modifyScheduleDay<Props>(isNeedRefreshInformTime || false, (day, props, sch, tool) => {
    const event = day.list.find(event => event.mi === props.props.eventMi);
    if (event == null) throw backLocaleError(BackLocaleKey.DayEventNotFound);

    return modifier(event, props, sch, day, tool);
  });

const throwIfNoComsListRedact = async (
  attKey: ScheduleWidgetAttKey,
  props: ScheduleDayEventScopeProps,
  sch: IScheduleWidget,
  tool: ServerTSJRPCTool,
) => {
  if (attKey === '[cm]:coms') await throwIfNoScheduleComsListRedact(sch, tool.auth, props.dayi, props.eventMi);
};

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
        ) => PromiseOr<{
          list?: Required<ScheduleWidgetAppAttCustomizableValue>[ListField];
          description: string | null;
        }>,
      ) =>
        modifyEvent<Props>(async (event, props, sch, _day, tool) => {
          await throwIfNoComsListRedact(props.props.attKey, props.props, sch, tool);

          event.atts ??= {};
          event.atts[props.props.attKey] ??= {};

          let att = event.atts[props.props.attKey] as ScheduleWidgetAppAttCustomizableValue;

          if (checkIsArray(att)) {
            if (+att[0]! < 0) throw backLocaleError(BackLocaleKey.AttachmentTypeIsAnchor);
            const [dayi, eventMi] = att as unknown as [number, number];

            att = sch.days[dayi].list.find(event => event.mi === eventMi)?.atts?.[
              props.props.attKey
            ] as ScheduleWidgetAppAttCustomizableValue;

            if (att == null) throw backLocaleError(BackLocaleKey.AttachmentAnchorInvalid);
          }

          let itemi = null;
          att[listField] ??= [] as never;

          if (props.itemMi != null) {
            itemi = att[listField].findIndex(([, , mi]) => mi === props.itemMi);

            if (itemi < 0) throw backLocaleError(BackLocaleKey.ValueNotFound);
          }

          const { list: newList, description } = await modifier(att[listField] as never, props, itemi, sch);

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
        ) => PromiseOr<string | null>,
      ) =>
        modifyKeyValueAttachmentValueList<Props, 'values'>('values', async (values, props, itemi, sch) => {
          if (itemi == null) throw backLocaleError(BackLocaleKey.ValueNotFound);
          const [, itemValue] = values[itemi];
          if (!checkIsArray(itemValue)) throw backLocaleError(BackLocaleKey.AttachmentValueNotArray);

          return { description: await modifier(itemValue, props, values[itemi], sch) };
        });

      super({
        scope: 'SchDayEvents',
        methods: {
          setTopic: modifyEvent(async (event, { props, value }, sch, _day, tool) => {
            await throwIfNoScheduleEventContentRedact(sch, tool.auth);

            event.topic = value;

            return backLocaleError(BackLocaleKey.SchEventTopicSet, {
              ...(await eventDayIntr(sch, props)),
              v: value,
            });
          }),
          setDescription: modifyEvent(async (event, { props, value }, sch, _day, tool) => {
            await throwIfNoScheduleEventContentRedact(sch, tool.auth);

            event.dsc = value;

            return backLocaleError(BackLocaleKey.SchEventDescriptionSet, {
              ...(await eventDayIntr(sch, props)),
              v: value,
            });
          }),
          setTm: modifyEvent(async (event, { props, value }, sch, _day, tool) => {
            await throwIfNoScheduleEventContentRedact(sch, tool.auth);

            event.tm = value;

            return backLocaleError(BackLocaleKey.SchEventDurationSet, {
              ...(await eventDayIntr(sch, props)),
              v: value,
            });
          }, true),

          toggleIsSecret: modifyEvent(async (event, { props }, sch, _day, tool) => {
            await throwIfNoScheduleEventContentRedact(sch, tool.auth);

            if (event.secret) delete event.secret;
            else event.secret = 1;

            return backLocaleError(BackLocaleKey.SchEventSecretToggled, await eventDayIntr(sch, props));
          }),

          setIsNeedAppInform: modifyEvent(async (event, { props, value }, sch, _day, tool) => {
            await throwIfNoScheduleEventContentRedact(sch, tool.auth);

            if (value) event.noAppInform = 1;
            else delete event.noAppInform;

            return backLocaleError(
              value ? BackLocaleKey.SchEventAppInformOff : BackLocaleKey.SchEventAppInformOn,
              await eventDayIntr(sch, props),
            );
          }, true),

          addAttachment: modifyEvent(async (event, { props, attKey, defaultValue }, sch, _day, tool) => {
            await throwIfNoComsListRedact(attKey, props, sch, tool);

            event.atts ??= {};
            event.atts[attKey] = defaultValue;

            return backLocaleError(BackLocaleKey.SchEventAttachmentAdded, {
              ...(await eventDayIntr(sch, props)),
              a: attKey,
            });
          }),

          addAttachmentRef: modifyEvent(async (event, { props, attKey, attRef }, sch, _day, tool) => {
            await throwIfNoComsListRedact(attKey, props, sch, tool);

            event.atts ??= {};
            event.atts[attKey] = attRef;

            return backLocaleError(BackLocaleKey.SchEventAttachmentRefAdded, {
              ...(await eventDayIntr(sch, props)),
              a: attKey,
              r: attRef[0] + 1,
            });
          }),

          removeAttachment: modifyEvent(async (event, { props, attKey }, sch, _day, tool) => {
            await throwIfNoComsListRedact(attKey, props, sch, tool);

            event.atts ??= {};
            delete event.atts[attKey];
            if (!objectLength(event.atts)) delete event.atts;

            return backLocaleError(BackLocaleKey.SchEventAttachmentRemoved, {
              ...(await eventDayIntr(sch, props)),
              a: attKey,
            });
          }),

          updateCheckListAttachmentValue: modifyKeyValueAttachmentValueList(
            'list',
            async (values, { itemMi, key, value, props }, _, sch) => {
              if (itemMi == null) {
                if (key == null || value == null) return { description: null };
                values.push([key, value, takeNextMi(values, 0 as number, '2')]);
                return { description: null };
              }

              const item = values.find(([, , mi]) => mi === itemMi);
              if (item == null) throw backLocaleError(BackLocaleKey.ItemNotFound);

              if (key != null) item[0] = key;
              if (value != null) item[1] = value;

              return {
                description: backLocaleError(
                  value === null ? BackLocaleKey.SchEventCheckItemRemoved : BackLocaleKey.SchEventCheckItemAdded,
                  {
                    ...(await eventDayIntr(sch, props)),
                    a: props.attTitle ?? props.attKey,
                    v: JSON.stringify([key, value, itemMi]),
                  },
                ),
              };
            },
          ),

          putKeyValueAttachment: modifyKeyValueAttachmentValueList(
            'values',
            async (values, { key, value, props }, _, sch) => {
              if (value === null) {
                const index = values.findIndex(([, , mi]) => mi === key);
                if (index < 0) throw backLocaleError(BackLocaleKey.ValueNotFound);
                values.splice(index, 1);
              } else values.push([key, value, takeNextMi(values, 0 as number, '2')]);

              return {
                description: backLocaleError(
                  value === null ? BackLocaleKey.SchEventListValueRemoved : BackLocaleKey.SchEventListValueAdded,
                  {
                    ...(await eventDayIntr(sch, props)),
                    a: props.attTitle ?? props.attKey,
                    v: JSON.stringify([key, value]),
                  },
                ),
              };
            },
          ),

          setKeyValueAttachmentValue: modifyKeyValueAttachmentValueList(
            'values',
            async (values, { value, props }, itemi, sch) => {
              if (itemi == null) return { description: null };
              if (value === null) values.splice(itemi, 1);
              else values[itemi][1] = value;

              return {
                description: backLocaleError(BackLocaleKey.SchEventListValueSet, {
                  ...(await eventDayIntr(sch, props)),
                  a: props.attTitle ?? props.attKey,
                  v: JSON.stringify(value),
                }),
              };
            },
          ),

          setKeyValueAttachmentKey: modifyKeyValueAttachmentValueList(
            'values',
            async (values, { value, props }, itemi, sch) => {
              if (itemi == null) return { description: null };
              values[itemi][0] = value;

              return {
                description: backLocaleError(BackLocaleKey.SchEventListKeySet, {
                  ...(await eventDayIntr(sch, props)),
                  a: props.attTitle ?? props.attKey,
                  v: JSON.stringify(value),
                }),
              };
            },
          ),

          changeKeyValueAttachmentKey: modifyKeyValueAttachmentValueList(
            'values',
            async (values, { key, value, props }, _, sch) => {
              const item = values.find(item => item[0] === key);
              if (item == null) throw backLocaleError(BackLocaleKey.ItemNotFound);
              item[0] = value;

              return {
                description: backLocaleError(BackLocaleKey.SchEventListKeyChanged, {
                  ...(await eventDayIntr(sch, props)),
                  a: props.attTitle ?? props.attKey,
                  v: JSON.stringify([key, value]),
                }),
              };
            },
          ),

          addKeyValueAttachmentListItem: modifyKeyValueAttachmentListValue(
            async (itemValue, { value, itemMi, props }, _, sch) => {
              itemValue.push(value);

              return backLocaleError(
                value === null ? BackLocaleKey.SchEventListValueRemoved : BackLocaleKey.SchEventListValueAdded,
                {
                  ...(await eventDayIntr(sch, props)),
                  a: props.attTitle ?? props.attKey,
                  v: JSON.stringify([itemMi, value]),
                },
              );
            },
          ),

          setKeyValueAttachmentListItemValue: modifyKeyValueAttachmentListValue(
            async (itemValue, { value, valuei, props, itemMi }, _, sch) => {
              itemValue[valuei] = value;

              return backLocaleError(BackLocaleKey.SchEventListValueSet, {
                ...(await eventDayIntr(sch, props)),
                a: props.attTitle ?? props.attKey,
                v: JSON.stringify([itemMi, value]),
              });
            },
          ),

          removeKeyValueAttachmentListItemValue: modifyKeyValueAttachmentListValue(
            async (itemValue, { value, itemMi, props }, _, sch) => {
              const index = itemValue.findIndex(val => val === value);
              if (index < 0) throw backLocaleError(BackLocaleKey.ValueNotFound);
              itemValue.splice(index, 1);

              return backLocaleError(BackLocaleKey.SchEventListValueRemoved, {
                ...(await eventDayIntr(sch, props)),
                a: props.attTitle ?? props.attKey,
                v: JSON.stringify([itemMi, value]),
              });
            },
          ),

          moveKeyValueAttachmentListItem: modifyKeyValueAttachmentListValue(
            async (itemValue, { value, props }, item, sch) => {
              const index = itemValue.findIndex(val => val === value);
              if (index < 0) throw backLocaleError(BackLocaleKey.ValueNotFound);

              item[1] = withInsertedBeforei(itemValue, index === 0 ? 2 : index - 1, index);

              return backLocaleError(BackLocaleKey.SchEventListOrderChanged, {
                ...(await eventDayIntr(sch, props)),
                a: props.attTitle ?? props.attKey,
              });
            },
          ),

          transferKeyValueAttachment: modifyKeyValueAttachmentValueList(
            'values',
            async (values, { grabbedItemMi, targetItemMi, props }, _, sch) => {
              if (grabbedItemMi == null) return { description: null };

              return {
                list: withInsertedBeforei(
                  values,
                  targetItemMi == null ? values.length : values.findIndex(item => targetItemMi === item[2]),
                  values.findIndex(item => grabbedItemMi === item[2]),
                ),
                description: backLocaleError(BackLocaleKey.SchEventListOrderChanged, {
                  ...(await eventDayIntr(sch, props)),
                  a: props.attTitle ?? props.attKey,
                }),
              };
            },
          ),

          setRatePoint: modifyEvent(async (event, { props, ratePoint, userMi, userName }, sch) => {
            event.rate ??= {} as never;
            event.rate[userMi] ??= [ratePoint, ''];
            event.rate[userMi][0] = ratePoint;

            return backLocaleError(BackLocaleKey.SchEventRatePoint, {
              ...(await eventDayIntr(sch, props)),
              u: userName,
              p: ratePoint,
            });
          }),

          setRateComment: modifyEvent(async (event, { comment, userMi, props, userName }, sch) => {
            event.rate ??= {} as never;
            event.rate[userMi] ??= [0, comment];
            event.rate[userMi][1] = comment;

            return backLocaleError(BackLocaleKey.SchEventRateComment, {
              ...(await eventDayIntr(sch, props)),
              u: userName,
              c: comment,
            });
          }),
        },
      });
    }
  })();

import { backLocaleError, backLocalePayload, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { attTranslatorTypes } from 'shared/api';
import { SchEventTypesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { objectLength } from 'shared/utils/object.utils';
import { modifySchedule, throwIfNoExternalMutationAuth } from '../schedule-modificators';
import { onScheduleEventTypesAddManyEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

onScheduleEventTypesAddManyEvent.listen(async ({ schProps, typeList }) => {
  return (
    await modifySchedule(false, async sch => {
      sch.types = sch.types.concat(typeList);

      return backLocaleError(BackLocaleKey.SchEventTypesAdded, { t: await scheduleTitleInBrackets(sch) });
    })(
      { props: schProps },
      {
        auth: undefined,
        client: null,
        visitInfo: undefined,
      },
    )
  ).value;
});

export const schEventTypesTsjrpcBaseServer =
  new (class SchEventTypes extends TsjrpcBaseServer<SchEventTypesTsjrpcMethods> {
    constructor() {
      super({
        scope: 'SchEventTypes',
        methods: {
          create: modifySchedule(false, async (sch, { title, tm }) => {
            sch.types.push({ title, tm });

            return backLocaleError(BackLocaleKey.SchEventTypeCreated, {
              t: await scheduleTitleInBrackets(sch),
              n: title,
              m: tm,
            });
          }),
          setTitle: modifySchedule(false, async (sch, { props, value: title, prevTitle }) => {
            sch.types[props.typei] ??= { title };
            sch.types[props.typei].title = title;

            return backLocaleError(BackLocaleKey.SchEventTypeTitleSet, {
              t: await scheduleTitleInBrackets(sch),
              p: prevTitle,
              n: title,
            });
          }),

          setTm: modifySchedule(true, async (sch, { props, tm }) => {
            sch.types[props.typei] ??= { title: '?', tm };
            sch.types[props.typei].tm = tm;

            return backLocaleError(BackLocaleKey.SchEventTypeTmSet, {
              t: await scheduleTitleInBrackets(sch),
              n: sch.types[props.typei]?.title ?? '?',
              m: tm,
            });
          }),

          bindAttImagine: modifySchedule(false, async (sch, { attTranslatorType, props }) => {
            sch.types[props.typei] ??= { title: '?', atts: {} };
            const type = sch.types[props.typei];
            type.atts ??= {};
            type.atts[props.attKey] = [attTranslatorType] as never;

            return backLocaleError(BackLocaleKey.SchEventTypeAttBound, {
              t: await scheduleTitleInBrackets(sch),
              n: sch.types[props.typei]?.title ?? '?',
              a: props.attKey,
              p: attTranslatorTypes.find(s => s.id === attTranslatorType)?.title ?? '??',
            });
          }),

          removeAttImagine: modifySchedule(false, async (sch, { props }) => {
            if (sch.types[props.typei] == null) return null;
            const type = sch.types[props.typei];
            if (type.atts == null) return null;
            delete type.atts[props.attKey];
            if (!objectLength(type.atts)) delete type.atts;

            return backLocaleError(BackLocaleKey.SchEventTypeAttRemoved, {
              t: await scheduleTitleInBrackets(sch),
              n: sch.types[props.typei]?.title ?? '?',
              a: props.attKey,
            });
          }),

          setAttImaginePeriod: modifySchedule(false, async (sch, { props, value }) => {
            if (sch.types[props.typei] == null) return null;
            const type = sch.types[props.typei];
            if (type.atts == null) return null;
            type.atts[props.attKey][0] = value;

            return backLocaleError(BackLocaleKey.SchEventTypeAttPeriodSet, {
              t: await scheduleTitleInBrackets(sch),
              n: sch.types[props.typei]?.title ?? '?',
              a: props.attKey,
              p: attTranslatorTypes.find(s => s.id === value)?.title ?? '??',
            });
          }),

          putMany: async ({ props: schProps, tatts: typeList }, tool) => {
            throwIfNoExternalMutationAuth(tool);

            const scheduleTitle = await scheduleTitleInBrackets(schProps.schw);

            return {
              value: await onScheduleEventTypesAddManyEvent.invoke({ schProps, typeList }),
              description: backLocalePayload(langi =>
                translateBackTexts(langi, BackLocaleKey.SchEventTypesAddedMany, {
                  t: scheduleTitle,
                  l: typeList
                    .map(
                      ({ title, tm }) =>
                        `${title} (${translateBackTexts(langi, BackLocaleKey.SchMinutesShort, { n: tm })})`,
                    )
                    .join(';\n'),
                }),
              ),
            };
          },
        },
      });
    }
  })();

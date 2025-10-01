import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { attTranslatorTypes } from 'shared/api';
import { SchEventTypesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { onScheduleEventTypesAddManyEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

onScheduleEventTypesAddManyEvent.listen(async ({ schProps, typeList }) => {
  return (
    await modifySchedule(false, sch => {
      sch.types = sch.types.concat(typeList);

      return `В событии ${scheduleTitleInBrackets(sch)} добавлены новые события списком`;
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
          create: modifySchedule(false, (sch, { title, tm }) => {
            sch.types.push({ title, tm });

            return `В расписании ${scheduleTitleInBrackets(sch)} создан тип событий ${title} продолжительностью в ${tm} мин.`;
          }),
          setTitle: modifySchedule(false, (sch, { props, value: title, prevTitle }) => {
            sch.types[props.typei] ??= { title };
            sch.types[props.typei].title = title;

            return `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ${prevTitle} задано имя ${title}`;
          }),

          setTm: modifySchedule(true, (sch, { props, tm }) => {
            sch.types[props.typei] ??= { title: '?', tm };
            sch.types[props.typei].tm = tm;

            return (
              `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ` +
              `${sch.types[props.typei]?.title ?? '?'} задано время проведения по умолчанию - ${tm} мин.`
            );
          }),

          bindAttImagine: modifySchedule(false, (sch, { attTranslatorType, props }) => {
            sch.types[props.typei] ??= { title: '?', atts: {} };
            const type = sch.types[props.typei];
            type.atts ??= {};
            type.atts[props.attKey] = [attTranslatorType] as never;

            return (
              `В расписании ${scheduleTitleInBrackets(sch)} к типу событий ` +
              `${sch.types[props.typei]?.title ?? '?'} прикреплено обзорное вложение ${props.attKey} ` +
              `с периодом обзроа - ${attTranslatorTypes.find(s => s.id === attTranslatorType)?.title ?? '??'}`
            );
          }),

          removeAttImagine: modifySchedule(false, (sch, { props }) => {
            if (sch.types[props.typei] == null) return null;
            const type = sch.types[props.typei];
            if (type.atts == null) return null;
            delete type.atts[props.attKey];
            if (!smylib.keys(type.atts).length) delete type.atts;

            return (
              `В расписании ${scheduleTitleInBrackets(sch)} из типа событий ` +
              `${sch.types[props.typei]?.title ?? '?'} удалено обзорное вложение ${props.attKey}`
            );
          }),

          setAttImaginePeriod: modifySchedule(false, (sch, { props, value }) => {
            if (sch.types[props.typei] == null) return null;
            const type = sch.types[props.typei];
            if (type.atts == null) return null;
            type.atts[props.attKey][0] = value;

            return (
              `В расписании ${scheduleTitleInBrackets(sch)} в типе событий ` +
              `${sch.types[props.typei]?.title ?? '?'} в обзорном вложении ${props.attKey} ` +
              `установлен период обзора - ${attTranslatorTypes.find(s => s.id === value)?.title ?? '??'}`
            );
          }),

          putMany: async ({ props: schProps, tatts: typeList }) => {
            return {
              value: await onScheduleEventTypesAddManyEvent.invoke({ schProps, typeList }),
              description:
                `В расписание ${scheduleTitleInBrackets(schProps.schw)} добавлено несколько типов событий:\n` +
                `${typeList.map(({ title, tm }) => `${title} (${tm} мин.)`).join(';\n')}`,
            };
          },
        },
      });
    }
  })();

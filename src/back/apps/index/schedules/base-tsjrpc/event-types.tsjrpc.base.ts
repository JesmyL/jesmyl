import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { attTranslatorTypes } from 'shared/api';
import { SchEventTypesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { onScheduleEventTypesAddManyEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

onScheduleEventTypesAddManyEvent.listen(({ schProps, typeList }) => {
  return modifySchedule(false, sch => (sch.types = sch.types.concat(typeList)))(
    { props: schProps },
    {
      auth: undefined,
      client: null,
      visitInfo: undefined,
    },
  );
});

export const schEventTypesTsjrpcBaseServer =
  new (class SchEventTypes extends TsjrpcBaseServer<SchEventTypesTsjrpcMethods> {
    constructor() {
      super({
        scope: 'SchEventTypes',
        methods: {
          create: modifySchedule(false, (sch, { title, tm }) => sch.types.push({ title, tm })),
          setTitle: modifySchedule(false, (sch, { props, value: title }) => {
            sch.types[props.typei] ??= { title };
            sch.types[props.typei].title = title;
          }),

          setTm: modifySchedule(true, (sch, { props, tm }) => {
            sch.types[props.typei] ??= { title: '?', tm };
            sch.types[props.typei].tm = tm;
          }),

          bindAttImagine: modifySchedule(false, (sch, { attTranslatorType, props }) => {
            sch.types[props.typei] ??= { title: '?', atts: {} };
            const type = sch.types[props.typei];
            type.atts ??= {};
            type.atts[props.attKey] = [attTranslatorType] as never;
          }),

          removeAttImagine: modifySchedule(false, (sch, { props }) => {
            if (sch.types[props.typei] == null) return;
            const type = sch.types[props.typei];
            if (type.atts == null) return;
            delete type.atts[props.attKey];
            if (!smylib.keys(type.atts).length) delete type.atts;
          }),

          setAttImaginePeriod: modifySchedule(false, (sch, { props, value }) => {
            if (sch.types[props.typei] == null) return;
            const type = sch.types[props.typei];
            if (type.atts == null) return;
            type.atts[props.attKey][0] = value;
          }),

          putMany: ({ props: schProps, tatts: typeList }) =>
            onScheduleEventTypesAddManyEvent.invoke({ schProps, typeList }),
        },
        onEachFeedback: {
          create: ({ title, tm }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} создан тип событий ${title} продолжительностью в ${tm} мин.`,

          setTitle: ({ value, prevTitle }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ${prevTitle} задано имя ${value}`,

          setTm: ({ props, tm }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ` +
            `${sch.types[props.typei]?.title ?? '?'} задано время проведения по умолчанию - ${tm} мин.`,

          bindAttImagine: ({ props, attTranslatorType }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} к типу событий ` +
            `${sch.types[props.typei]?.title ?? '?'} прикреплено обзорное вложение ${props.attKey} ` +
            `с периодом обзроа - ${attTranslatorTypes.find(s => s.id === attTranslatorType)?.title ?? '??'}`,

          removeAttImagine: ({ props }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} из типа событий ` +
            `${sch.types[props.typei]?.title ?? '?'} удалено обзорное вложение ${props.attKey}`,

          setAttImaginePeriod: ({ props, value: attTranslatorType }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} в типе событий ` +
            `${sch.types[props.typei]?.title ?? '?'} в обзорном вложении ${props.attKey} ` +
            `установлен период обзроа - ${attTranslatorTypes.find(s => s.id === attTranslatorType)?.title ?? '??'}`,

          putMany: ({ tatts }, sch) =>
            `В расписание ${scheduleTitleInBrackets(sch)} добавлено несколько типов событий:\n` +
            `${tatts.map(({ title, tm }) => `${title} (${tm} мин.)`).join(';\n')}`,
        },
      });
    }
  })();

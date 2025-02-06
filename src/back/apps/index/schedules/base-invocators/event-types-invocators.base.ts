import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { SchEventTypesSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { attTranslatorTypes } from '../attTranslatorType';
import { modifySchedule } from '../schedule-modificators';
import { onScheduleEventTypesAddManyEvent } from '../specific-modify-events';
import { scheduleTitleInBrackets } from './general-invocators.base';

onScheduleEventTypesAddManyEvent.listen(({ schProps, typeList }) => {
  return modifySchedule(false, schProps, sch => (sch.types = sch.types.concat(typeList)));
});

class SchEventTypesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchEventTypesSokiInvocatorMethods> {
  constructor() {
    super(
      'SchEventTypesSokiInvocatorBaseServer',
      {
        create: () => (props, title, tm) => modifySchedule(false, props, sch => sch.types.push({ title, tm })),
        setTitle: () => (props, title) =>
          modifySchedule(false, props, sch => {
            sch.types[props.typei] ??= { title };
            sch.types[props.typei].title = title;
          }),

        setTm: () => (props, tm) =>
          modifySchedule(true, props, sch => {
            sch.types[props.typei] ??= { title: '?', tm };
            sch.types[props.typei].tm = tm;
          }),

        bindAttImagine: () => (props, defaultValue) =>
          modifySchedule(false, props, sch => {
            sch.types[props.typei] ??= { title: '?', atts: {} };
            const type = sch.types[props.typei];
            type.atts ??= {};
            type.atts[props.attKey] = [defaultValue] as never;
          }),

        removeAttImagine: () => props =>
          modifySchedule(false, props, sch => {
            if (sch.types[props.typei] == null) return;
            const type = sch.types[props.typei];
            if (type.atts == null) return;
            delete type.atts[props.attKey];
            if (!smylib.keys(type.atts).length) delete type.atts;
          }),

        setAttImaginePeriod: () => (props, value) =>
          modifySchedule(false, props, sch => {
            if (sch.types[props.typei] == null) return;
            const type = sch.types[props.typei];
            if (type.atts == null) return;
            type.atts[props.attKey][0] = value;
          }),

        putMany: () => (schProps, typeList) => onScheduleEventTypesAddManyEvent.invoke({ schProps, typeList }),
      },
      {
        create: (sch, _, title, tm) =>
          `В расписании ${scheduleTitleInBrackets(sch)} создан тип событий ${title} продолжительностью в ${tm} мин.`,

        setTitle: (sch, _, value, prevTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ${prevTitle} задано имя ${value}`,

        setTm: (sch, props, tm) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ` +
          `${sch.types[props.typei]?.title ?? '?'} задано время проведения по умолчанию - ${tm} мин.`,

        bindAttImagine: (sch, props, attTranslatorType) =>
          `В расписании ${scheduleTitleInBrackets(sch)} к типу событий ` +
          `${sch.types[props.typei]?.title ?? '?'} прикреплено обзорное вложение ${props.attKey} ` +
          `с периодом обзроа - ${attTranslatorTypes.find(s => s.id === attTranslatorType)?.title ?? '??'}`,

        removeAttImagine: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)} из типа событий ` +
          `${sch.types[props.typei]?.title ?? '?'} удалено обзорное вложение ${props.attKey}`,

        setAttImaginePeriod: (sch, props, attTranslatorType) =>
          `В расписании ${scheduleTitleInBrackets(sch)} в типе событий ` +
          `${sch.types[props.typei]?.title ?? '?'} в обзорном вложении ${props.attKey} ` +
          `установлен период обзроа - ${attTranslatorTypes.find(s => s.id === attTranslatorType)?.title ?? '??'}`,

        putMany: (sch, _, tatts) =>
          `В расписание ${scheduleTitleInBrackets(sch)} добавлено несколько типов событий:\n` +
          `${tatts.map(({ title, tm }) => `${title} (${tm} мин.)`).join(';\n')}`,
      },
    );
  }
}
export const schEventTypesSokiInvocatorBaseServer = new SchEventTypesSokiInvocatorBaseServer();

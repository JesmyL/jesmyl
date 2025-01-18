import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import { SchEventTypesSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { modifySchedule, scheduleTitleInBrackets } from './general-invocators.base';

class SchEventTypesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchEventTypesSokiInvocatorMethods> {
  constructor() {
    super(
      'SchEventTypesSokiInvocatorBaseServer',
      {
        create: () => (props, title, tm) => modifySchedule(props, sch => sch.types.push({ title, tm })),
        setTitle: () => (props, title) =>
          modifySchedule(props, sch => {
            sch.types[props.typei] ??= { title };
            sch.types[props.typei].title = title;
          }),

        setTm: () => (props, tm) =>
          modifySchedule(props, sch => {
            sch.types[props.typei] ??= { title: '?', tm };
            sch.types[props.typei].tm = tm;
          }),

        bindAttImagine: () => (props, defaultValue) =>
          modifySchedule(props, sch => {
            sch.types[props.typei] ??= { title: '?', atts: {} };
            const type = sch.types[props.typei];
            type.atts ??= {};
            type.atts[props.attKey] = defaultValue;
          }),

        removeAttImagine: () => props =>
          modifySchedule(props, sch => {
            if (sch.types[props.typei] == null) return;
            const type = sch.types[props.typei];
            if (type.atts == null) return;
            delete type.atts[props.attKey];
          }),
      },
      {
        create: (sch, title, tm) =>
          `В расписании ${scheduleTitleInBrackets(sch)} создан тип событий ${title} продолжительностью в ${tm} мин.`,
        setTitle: (sch, _, value, prevTitle) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ${prevTitle} задано имя ${value}`,
        setTm: (sch, props, tm) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для типа событий ` +
          `${sch.types[props.typei]?.title ?? '?'} задано время проведения по умолчанию - ${tm} мин.`,
        bindAttImagine: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)} к типу событий ` +
          `${sch.types[props.typei]?.title ?? '?'} прикреплено обзорное вложение ${props.attKey}`,
        removeAttImagine: (sch, props) =>
          `В расписании ${scheduleTitleInBrackets(sch)} из типа событий ` +
          `${sch.types[props.typei]?.title ?? '?'} удалено обзорное вложение ${props.attKey}`,
      },
    );
  }
}
export const schEventTypesSokiInvocatorBaseServer = new SchEventTypesSokiInvocatorBaseServer();

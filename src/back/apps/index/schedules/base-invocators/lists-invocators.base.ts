import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  ScheduleListCategoryScopeProps,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { SchListsSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general-invocators.base';

export const schListsSokiInvocatorBaseServer =
  new (class SchLists extends SokiInvocatorBaseServer<SchListsSokiInvocatorMethods> {
    constructor() {
      const modifyCategory =
        <Value>(modifier: (cat: IScheduleWidgetListCat, value: Value) => void) =>
        ({ props, value }: { props: ScheduleListCategoryScopeProps; value: Value }) =>
          modifySchedule(false, props, sch => {
            const cat = sch.lists.cats[props.cati];
            if (cat == null) throw new Error('category not found');
            modifier(cat, value);
          });

      const modifyUnit =
        <Value>(modifier: (unit: IScheduleWidgetListUnit, value: Value) => void) =>
        ({ props, value }: { props: ScheduleUnitScopeProps; value: Value }) =>
          modifySchedule(false, props, sch => {
            const unit = sch.lists.units.find(unit => unit.mi === props.unitMi);
            if (unit == null) throw new Error('The list unit not found');
            modifier(unit, value);
          });

      super({
        scope: 'SchLists',
        methods: {
          createCategory: ({ props }) =>
            modifySchedule(false, props, sch =>
              sch.lists.cats.push({
                title: '',
                icon: 'CheckList',
                titles: ['Руководители', 'Участники'],
              }),
            ),

          createUnit: ({ props, cati }) =>
            modifySchedule(false, props, sch => {
              const mi = smylib.takeNextMi(sch.lists.units, 0);

              sch.lists.units.push({
                mi,
                cati,
                dsc: '',
                title: `${sch.lists.cats[cati].title} ${mi}`,
              });
            }),
          setCategoryTitle: modifyCategory((cat, value) => (cat.title = value)),
          setCategoryMembersTitle: modifyCategory((cat, value) => (cat.titles[1] = value)),
          setCategoryMentorsTitle: modifyCategory((cat, value) => (cat.titles[0] = value)),
          setCategoryIcon: modifyCategory((cat, value) => (cat.icon = value)),

          setUnitTitle: modifyUnit((unit, value) => (unit.title = value)),
          setUnitDescription: modifyUnit((unit, value) => (unit.dsc = value)),
        },
        onEachFeedback: {
          createCategory: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория списков`,
          createUnit: ({ cati }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} добавлен новый список для категории ${
              sch.lists.cats[cati].title
            }`,

          setCategoryTitle: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для ${props.cati + 1} ` +
            `категории списков задано название "${value}"`,

          setCategoryIcon: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для ${
              props.cati + 1
            } категории списков задана иконка "${value}"`,

          setCategoryMembersTitle: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для ${
              props.cati + 1
            } категории списков задано название для участников: "${value}"`,

          setCategoryMentorsTitle: ({ props, value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для ${props.cati + 1} ` +
            `категории списков задано название для наставников: "${value}"`,

          setUnitTitle: ({ value, cati }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для ` +
            `задано название для списка ${sch.lists.cats[cati]}: "${value}"`,

          setUnitDescription: ({ value, cati }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для ` +
            `задано описание для списка ${sch.lists.cats[cati]}: "${value}"`,
        },
      });
    }
  })();

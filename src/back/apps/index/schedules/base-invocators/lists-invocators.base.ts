import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  ScheduleListCategoryScopeProps,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { SchListsSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifySchedule, scheduleTitleInBrackets } from './general-invocators.base';

class SchListsSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchListsSokiInvocatorMethods> {
  constructor() {
    super(
      'SchListsSokiInvocatorBaseServer',
      {
        createCategory: () => props =>
          modifySchedule(props, sch =>
            sch.lists.cats.push({
              title: '',
              icon: 'CheckList',
              titles: ['Руководители', 'Участники'],
            }),
          ),

        createUnit: () => (props, cati) =>
          modifySchedule(props, sch => {
            const mi = smylib.takeNextMi(sch.lists.units, 0);

            sch.lists.units.push({
              mi,
              cati,
              dsc: '',
              title: `${sch.lists.cats[cati].title} ${mi}`,
            });
          }),
        setCategoryTitle: () => this.modifyCategory((cat, value) => (cat.title = value)),
        setCategoryMembersTitle: () => this.modifyCategory((cat, value) => (cat.titles[1] = value)),
        setCategoryMentorsTitle: () => this.modifyCategory((cat, value) => (cat.titles[0] = value)),
        setCategoryIcon: () => this.modifyCategory((cat, value) => (cat.icon = value)),

        setUnitTitle: () => this.modifyUnit((unit, value) => (unit.title = value)),
        setUnitDescription: () => this.modifyUnit((unit, value) => (unit.dsc = value)),
      },
      {
        createCategory: sch => `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория списков`,
        createUnit: (sch, _, cati) =>
          `В расписании ${scheduleTitleInBrackets(sch)} добавлен новый список для категории ${
            sch.lists.cats[cati].title
          }`,

        setCategoryTitle: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для ${props.cati + 1} ` +
          `категории списков задано название "${value}"`,

        setCategoryIcon: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для ${
            props.cati + 1
          } категории списков задана иконка "${value}"`,

        setCategoryMembersTitle: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для ${
            props.cati + 1
          } категории списков задано название для участников: "${value}"`,

        setCategoryMentorsTitle: (sch, props, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для ${props.cati + 1} ` +
          `категории списков задано название для наставников: "${value}"`,

        setUnitTitle: (sch, _, value, cati) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для ` +
          `задано название для списка ${sch.lists.cats[cati]}: "${value}"`,

        setUnitDescription: (sch, _, value, cati) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для ` +
          `задано описание для списка ${sch.lists.cats[cati]}: "${value}"`,
      },
    );
  }

  private modifyCategory =
    <Value>(modifier: (cat: IScheduleWidgetListCat, value: Value) => void) =>
    (props: ScheduleListCategoryScopeProps, value: Value) =>
      modifySchedule(props, sch => {
        const cat = sch.lists.cats[props.cati];
        if (cat == null) throw new Error('category not found');
        modifier(cat, value);
      });

  private modifyUnit =
    <Value>(modifier: (unit: IScheduleWidgetListUnit, value: Value) => void) =>
    (props: ScheduleUnitScopeProps, value: Value) =>
      modifySchedule(props, sch => {
        const unit = sch.lists.units.find(unit => unit.mi === props.unitMi);
        if (unit == null) throw new Error('The list unit not found');
        modifier(unit, value);
      });
}

export const schListsSokiInvocatorBaseServer = new SchListsSokiInvocatorBaseServer();

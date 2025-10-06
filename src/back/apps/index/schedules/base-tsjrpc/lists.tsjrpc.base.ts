import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  ScheduleListCategoryScopeProps,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { SchListsTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { indexStameskaIconsFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

export const schListsTsjrpcBaseServer = new (class SchLists extends TsjrpcBaseServer<SchListsTsjrpcMethods> {
  constructor() {
    const modifyCategory = <Props extends { props: ScheduleListCategoryScopeProps }>(
      modifier: (cat: IScheduleWidgetListCat, props: Props, sch: IScheduleWidget) => string | null,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const cat = sch.lists.cats[props.props.cati];
        if (cat == null) throw new Error('category not found');
        return modifier(cat, props, sch);
      });

    const modifyUnit = <Props extends { props: ScheduleUnitScopeProps }>(
      modifier: (unit: IScheduleWidgetListUnit, props: Props, sch: IScheduleWidget) => string | null,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const unit = sch.lists.units.find(unit => unit.mi === props.props.unitMi);
        if (unit == null) throw new Error('The list unit not found');
        return modifier(unit, props, sch);
      });

    super({
      scope: 'SchLists',
      methods: {
        createCategory: modifySchedule(false, sch => {
          sch.lists.cats.push({
            title: '',
            icon: 'CheckList',
            titles: ['Руководители', 'Участники'],
          });

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлена новая категория списков`;
        }),

        createUnit: modifySchedule(false, (sch, { cati }) => {
          const mi = smylib.takeNextMi(sch.lists.units, 0 as number);

          sch.lists.units.push({
            mi,
            cati,
            dsc: '',
            title: `${sch.lists.cats[cati].title} ${mi}`,
          });

          return `В расписании ${scheduleTitleInBrackets(sch)} добавлен новый список для категории ${
            sch.lists.cats[cati].title
          }`;
        }),
        setCategoryTitle: modifyCategory((cat, { value, props }, sch) => {
          cat.title = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} для ${props.cati + 1} ` +
            `категории списков задано название "${value}"`
          );
        }),
        setCategoryMembersTitle: modifyCategory((cat, { value, props }, sch) => {
          cat.titles[1] = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} для ${
            props.cati + 1
          } категории списков задано название для участников: "${value}"`;
        }),
        setCategoryMentorsTitle: modifyCategory((cat, { value, props }, sch) => {
          cat.titles[0] = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} для ${props.cati + 1} ` +
            `категории списков задано название для наставников: "${value}"`
          );
        }),
        setCategoryIcon: modifyCategory((cat, { value, props }, sch) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks(
            {
              actualIconPacks: { [value]: indexStameskaIconsFileStore.getValue()[value] },
              iconsMd5Hash: knownStameskaIconNamesMd5Hash,
            },
            // TODO: remove soon
            visit => !!visit?.version && visit?.version >= 1019,
          );

          cat.icon = value;

          return `В расписании ${scheduleTitleInBrackets(sch)} для ${
            props.cati + 1
          } категории списков задана иконка "${value}"`;
        }),

        setUnitTitle: modifyUnit((unit, { value, cati }, sch) => {
          unit.title = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} для ` +
            `задано название для списка ${sch.lists.cats[cati]}: "${value}"`
          );
        }),
        setUnitDescription: modifyUnit((unit, { value, cati }, sch) => {
          unit.dsc = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} для ` +
            `задано описание для списка ${sch.lists.cats[cati]}: "${value}"`
          );
        }),
      },
    });
  }
})();

import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  ScheduleListCategoryScopeProps,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { SchListsTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { stameskaIconPack } from 'stameska-icon/pack';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

export const schListsTsjrpcBaseServer = new (class SchLists extends TsjrpcBaseServer<SchListsTsjrpcMethods> {
  constructor() {
    const modifyCategory = <Props extends { props: ScheduleListCategoryScopeProps }>(
      modifier: (cat: IScheduleWidgetListCat, props: Props) => void,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const cat = sch.lists.cats[props.props.cati];
        if (cat == null) throw new Error('category not found');
        modifier(cat, props);
      });

    const modifyUnit = <Props extends { props: ScheduleUnitScopeProps }>(
      modifier: (unit: IScheduleWidgetListUnit, props: Props) => void,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const unit = sch.lists.units.find(unit => unit.mi === props.props.unitMi);
        if (unit == null) throw new Error('The list unit not found');
        modifier(unit, props);
      });

    super({
      scope: 'SchLists',
      methods: {
        createCategory: modifySchedule(false, sch =>
          sch.lists.cats.push({
            title: '',
            icon: 'CheckList',
            titles: ['Руководители', 'Участники'],
          }),
        ),

        createUnit: modifySchedule(false, (sch, { cati }) => {
          const mi = smylib.takeNextMi(sch.lists.units, 0 as number);

          sch.lists.units.push({
            mi,
            cati,
            dsc: '',
            title: `${sch.lists.cats[cati].title} ${mi}`,
          });
        }),
        setCategoryTitle: modifyCategory((cat, { value }) => (cat.title = value)),
        setCategoryMembersTitle: modifyCategory((cat, { value }) => (cat.titles[1] = value)),
        setCategoryMentorsTitle: modifyCategory((cat, { value }) => (cat.titles[0] = value)),
        setCategoryIcon: modifyCategory((cat, { value }) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks(
            {
              actualIconPacks: { [value]: stameskaIconPack[value] },
              iconsMd5Hash: knownStameskaIconNamesMd5Hash,
            },
            // TODO: remove soon
            visit => !!visit?.version && visit?.version >= 1019,
          );

          cat.icon = value;
        }),

        setUnitTitle: modifyUnit((unit, { value }) => (unit.title = value)),
        setUnitDescription: modifyUnit((unit, { value }) => (unit.dsc = value)),
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

import { backLocaleError, translateBackTexts } from 'back/locales/back';
import { takeUserLangi } from 'back/complect/userLangiFileStore';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  IScheduleWidgetListCat,
  IScheduleWidgetListUnit,
  ScheduleListCategoryScopeProps,
  ScheduleUnitScopeProps,
} from 'shared/api';
import { SchListsTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { indexStameskaIconsFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

export const schListsTsjrpcBaseServer = new (class SchLists extends TsjrpcBaseServer<SchListsTsjrpcMethods> {
  constructor() {
    const modifyCategory = <Props extends { props: ScheduleListCategoryScopeProps }>(
      modifier: (cat: IScheduleWidgetListCat, props: Props, sch: IScheduleWidget) => PromiseOr<string | null>,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const cat = sch.lists.cats[props.props.cati];
        if (cat == null) throw backLocaleError(BackLocaleKey.ListCategoryNotFound);
        return modifier(cat, props, sch);
      });

    const modifyUnit = <Props extends { props: ScheduleUnitScopeProps }>(
      modifier: (unit: IScheduleWidgetListUnit, props: Props, sch: IScheduleWidget) => PromiseOr<string | null>,
    ) =>
      modifySchedule<Props>(false, (sch, props) => {
        const unit = sch.lists.units.find(unit => unit.mi === props.props.unitMi);
        if (unit == null) throw backLocaleError(BackLocaleKey.ListUnitNotFound);
        return modifier(unit, props, sch);
      });

    super({
      scope: 'SchLists',
      methods: {
        createCategory: modifySchedule(false, async (sch, _props, { auth, visitInfo }) => {
          const langi = takeUserLangi(auth?.login) ?? visitInfo?.langi;

          sch.lists.cats.push({
            title: '',
            icon: 'CheckList',
            titles: [
              translateBackTexts(langi, BackLocaleKey.SchListCatMentorsDefaultTitle),
              translateBackTexts(langi, BackLocaleKey.SchListCatMembersDefaultTitle),
            ],
          });

          return backLocaleError(BackLocaleKey.SchListCatAdded, { t: await scheduleTitleInBrackets(sch) });
        }),

        createUnit: modifySchedule(false, async (sch, { cati }) => {
          const mi = takeNextMi(sch.lists.units, 0 as number);

          sch.lists.units.push({
            mi,
            cati,
            dsc: '',
            title: `${sch.lists.cats[cati].title} ${mi}`,
          });

          return backLocaleError(BackLocaleKey.SchListUnitAdded, {
            t: await scheduleTitleInBrackets(sch),
            c: sch.lists.cats[cati].title,
          });
        }),
        setCategoryTitle: modifyCategory(async (cat, { value, props }, sch) => {
          cat.title = value;

          return backLocaleError(BackLocaleKey.SchListCatTitleSet, {
            t: await scheduleTitleInBrackets(sch),
            i: props.cati + 1,
            v: value,
          });
        }),
        setCategoryMembersTitle: modifyCategory(async (cat, { value, props }, sch) => {
          cat.titles[1] = value;

          return backLocaleError(BackLocaleKey.SchListCatMembersTitleSet, {
            t: await scheduleTitleInBrackets(sch),
            i: props.cati + 1,
            v: value,
          });
        }),
        setCategoryMentorsTitle: modifyCategory(async (cat, { value, props }, sch) => {
          cat.titles[0] = value;

          return backLocaleError(BackLocaleKey.SchListCatMentorsTitleSet, {
            t: await scheduleTitleInBrackets(sch),
            i: props.cati + 1,
            v: value,
          });
        }),
        setCategoryIcon: modifyCategory(async (cat, { value, props }, sch) => {
          indexServerTsjrpcShareMethods.updateKnownIconPacks(
            {
              actualIconPacks: { [value]: indexStameskaIconsFileStore.getValue()[value] },
              iconsMd5Hash: knownStameskaIconNamesMd5Hash,
            },
            // TODO: remove soon
            visit => !!visit?.version && visit?.version >= 1019,
          );

          cat.icon = value;

          return backLocaleError(BackLocaleKey.SchListCatIconSet, {
            t: await scheduleTitleInBrackets(sch),
            i: props.cati + 1,
            v: value,
          });
        }),

        setUnitTitle: modifyUnit(async (unit, { value, cati }, sch) => {
          unit.title = value;

          return backLocaleError(BackLocaleKey.SchListUnitTitleSet, {
            t: await scheduleTitleInBrackets(sch),
            c: sch.lists.cats[cati].title,
            v: value,
          });
        }),
        setUnitDescription: modifyUnit(async (unit, { value, cati }, sch) => {
          unit.dsc = value;

          return backLocaleError(BackLocaleKey.SchListUnitDescriptionSet, {
            t: await scheduleTitleInBrackets(sch),
            c: sch.lists.cats[cati].title,
            v: value,
          });
        }),
      },
    });
  }
})();

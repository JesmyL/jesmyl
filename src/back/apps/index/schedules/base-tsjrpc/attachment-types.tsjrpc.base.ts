import { backLocaleError, backLocalePayload, translateBackTexts } from 'back/locales/back';
import { BackLocaleKey } from 'shared/model/+locale/_BackLocaleKey';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  ScheduleAttachmentTypeScopeProps,
  ScheduleWidgetAppAttCustomizable,
  ScheduleWidgetAppAttCustomized,
  ScheduleWidgetAttachmentTypeMi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { SchAttachmentTypesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { takeNextMi } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { indexStameskaIconsFileStore } from '../../file-stores';
import { indexServerTsjrpcShareMethods } from '../../tsjrpc.methods';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general.tsjrpc.base';

const newTatt = () =>
  ({
    title: '',
    description: '',
    icon: 'Attachment',
    initVal: {},
    R: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
    U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
  }) satisfies ScheduleWidgetAppAttCustomizable;

export const schAttachmentTypesTsjrpcBaseServer =
  new (class SchAttachmentTypes extends TsjrpcBaseServer<SchAttachmentTypesTsjrpcMethods> {
    constructor() {
      const modifyAttType = <Props extends { props: ScheduleAttachmentTypeScopeProps }>(
        modifier: (tatt: ScheduleWidgetAppAttCustomized, props: Props, sch: IScheduleWidget) => PromiseOr<string | null>,
      ) =>
        modifySchedule<Props>(false, (sch, props) => {
          const tatt = sch.tatts.find(tatt => tatt.mi === props.props.tattMi);
          if (tatt == null) throw backLocaleError(BackLocaleKey.AttachmentTypeNotFound);

          return modifier(tatt, props, sch);
        });

      super({
        scope: 'SchAttachmentTypes',
        methods: {
          create: modifySchedule(false, async sch => {
            sch.tatts.push({
              ...newTatt(),
              mi: takeNextMi(sch.tatts, ScheduleWidgetAttachmentTypeMi.def),
            });

            return backLocaleError(BackLocaleKey.SchAttTypeCreated, { t: await scheduleTitleInBrackets(sch) });
          }),

          setTitle: modifyAttType(async (tatt, { value, prevTitle }, sch) => {
            tatt.title = value;

            return backLocaleError(BackLocaleKey.SchAttTypeTitleSet, {
              t: await scheduleTitleInBrackets(sch),
              p: prevTitle,
              v: value,
            });
          }),
          setDescription: modifyAttType(async (tatt, { value, tattTitle }, sch) => {
            tatt.description = value;

            return backLocaleError(BackLocaleKey.SchAttTypeDescriptionSet, {
              t: await scheduleTitleInBrackets(sch),
              a: tattTitle,
              v: value,
            });
          }),
          setIcon: modifyAttType(async (tatt, { value, tattTitle }, sch) => {
            indexServerTsjrpcShareMethods.updateKnownIconPacks(
              {
                actualIconPacks: { [value]: indexStameskaIconsFileStore.getValue()[value] },
                iconsMd5Hash: knownStameskaIconNamesMd5Hash,
              },
              null,
            );

            tatt.icon = value;

            return backLocaleError(BackLocaleKey.SchAttTypeIconSet, {
              t: await scheduleTitleInBrackets(sch),
              a: tattTitle,
              v: value,
            });
          }),

          setUse: modifyAttType(async (tatt, { value, tattTitle }, sch) => {
            tatt.use = value;

            return backLocaleError(BackLocaleKey.SchAttTypeUseSet, {
              t: await scheduleTitleInBrackets(sch),
              a: tattTitle,
              v: value,
            });
          }),

          setRolesUses: modifyAttType(async (tatt, { value, tattTitle }, sch) => {
            tatt.roles = value;

            return backLocaleError(BackLocaleKey.SchAttTypeRolesUseSet, {
              t: await scheduleTitleInBrackets(sch),
              a: tattTitle,
              v: value,
            });
          }),

          setListsUses: modifyAttType(async (tatt, { value, tattTitle }, sch) => {
            tatt.list = value;

            return backLocaleError(BackLocaleKey.SchAttTypeListsUseSet, {
              t: await scheduleTitleInBrackets(sch),
              a: tattTitle,
              v: value,
            });
          }),

          setTitleValue: modifyAttType(async (tatt, { value, titlei, prevTitle, tattTitle }, sch) => {
            tatt.titles ??= [];
            tatt.titles[titlei] = value;

            return backLocaleError(BackLocaleKey.SchAttTypeTitleValueSet, {
              t: await scheduleTitleInBrackets(sch),
              i: titlei + 1,
              a: tattTitle,
              p: prevTitle,
              v: value,
            });
          }),

          createTitleValue: modifyAttType(async (tatt, { tattTitle, titlesCount }, sch) => {
            tatt.titles ??= [];
            tatt.titles.push('');

            return backLocaleError(BackLocaleKey.SchAttTypeTitleValueCreated, {
              t: await scheduleTitleInBrackets(sch),
              i: titlesCount + 1,
              a: tattTitle,
            });
          }),

          setWhoCanLevel: modifyAttType(async (tatt, { rule, value, tattTitle }, sch) => {
            tatt[rule] = value;

            const balance = scheduleWidgetUserRights.rightsBalance(value);
            const id = scheduleWidgetUserRights.enumOrder[balance];
            const role = scheduleWidgetUserRights.texts.find(txt => txt.id === id)?.role?.[0];
            const title = await scheduleTitleInBrackets(sch);
            const descriptionKey =
              rule === 'U' ? BackLocaleKey.SchAttTypeRedactLevelSet : BackLocaleKey.SchAttTypeReadLevelSet;

            return backLocalePayload(langi => {
              const level =
                balance === 0
                  ? translateBackTexts(langi, BackLocaleKey.SchAttLevelAll)
                  : role
                    ? translateBackTexts(
                        langi,
                        balance === scheduleWidgetUserRights.enumOrder.length - 1
                          ? BackLocaleKey.SchAttLevelOnly
                          : BackLocaleKey.SchAttLevelAndOlder,
                        { r: role },
                      )
                    : '???';

              return translateBackTexts(langi, descriptionKey, { t: title, a: tattTitle, v: level });
            });
          }),
          toggleUserWhoCan: modifyAttType(async (tatt, { rule, userMi, tattTitle, userName }, sch) => {
            const set = new Set(tatt[rule]);

            if (set.has(userMi)) set.delete(userMi);
            else set.add(userMi);

            if (set.size === 0) delete tatt[rule];
            else tatt[rule] = Array.from(set);

            const isAdded = tatt[rule]?.includes(userMi);
            const isRedact = rule !== 'Rs';

            return backLocaleError(
              isRedact
                ? isAdded
                  ? BackLocaleKey.SchAttTypeUserRedactAdded
                  : BackLocaleKey.SchAttTypeUserRedactRemoved
                : isAdded
                  ? BackLocaleKey.SchAttTypeUserReadAdded
                  : BackLocaleKey.SchAttTypeUserReadRemoved,
              { t: await scheduleTitleInBrackets(sch), u: userName, a: tattTitle },
            );
          }),
        },
      });
    }
  })();

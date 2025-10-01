import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import {
  IScheduleWidget,
  IScheduleWidgetAttachmentTypeMi,
  ScheduleAttachmentTypeScopeProps,
  ScheduleWidgetAppAttCustomizable,
  ScheduleWidgetAppAttCustomized,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { SchAttachmentTypesTsjrpcMethods } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { knownStameskaIconNamesMd5Hash } from 'shared/values/index/known-icons';
import { stameskaIconPack } from 'stameska-icon/pack';
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
        modifier: (tatt: ScheduleWidgetAppAttCustomized, props: Props, sch: IScheduleWidget) => string | null,
      ) =>
        modifySchedule<Props>(false, (sch, props) => {
          const tatt = sch.tatts.find(tatt => tatt.mi === props.props.tattMi);
          if (tatt == null) throw new Error('attachment type not found');

          return modifier(tatt, props, sch);
        });

      super({
        scope: 'SchAttachmentTypes',
        methods: {
          create: modifySchedule(false, sch => {
            sch.tatts.push({
              ...newTatt(),
              mi: smylib.takeNextMi(sch.tatts, IScheduleWidgetAttachmentTypeMi.def),
            });

            return `${this.inSchTitle(sch)} создан тип вложений`;
          }),

          setTitle: modifyAttType((tatt, { value, prevTitle }, sch) => {
            tatt.title = value;

            return `${this.inSchTitle(sch)} тип вложений "${prevTitle}" переименован на "${value}"`;
          }),
          setDescription: modifyAttType((tatt, { value, tattTitle }, sch) => {
            tatt.description = value;

            return `${this.inSchTitle(sch)} описание типа вложений "${tattTitle}" изменено на "${value}"`;
          }),
          setIcon: modifyAttType((tatt, { value, tattTitle }, sch) => {
            indexServerTsjrpcShareMethods.updateKnownIconPacks(
              {
                actualIconPacks: { [value]: stameskaIconPack[value] },
                iconsMd5Hash: knownStameskaIconNamesMd5Hash,
              },
              // TODO: remove soon
              visit => !!visit?.version && visit?.version >= 1019,
            );

            tatt.icon = value;

            return `${this.inSchTitle(sch)} иконка типа вложений "${tattTitle}" изменена на "${value}"`;
          }),

          setUse: modifyAttType((tatt, { value, tattTitle }, sch) => {
            tatt.use = value;

            return `${this.inSchTitle(sch)} значение использований типа вложений "${tattTitle}" изменено на ${value}`;
          }),

          setRolesUses: modifyAttType((tatt, { value, tattTitle }, sch) => {
            tatt.roles = value;

            return `${this.inSchTitle(sch)} значение использования ролей типа вложений "${tattTitle}" изменено на ${value}`;
          }),

          setListsUses: modifyAttType((tatt, { value, tattTitle }, sch) => {
            tatt.list = value;

            return (
              `${this.inSchTitle(sch)} значение использования списков типа вложений ` +
              `"${tattTitle}" изменено на ${value}`
            );
          }),

          setTitleValue: modifyAttType((tatt, { value, titlei, prevTitle, tattTitle }, sch) => {
            tatt.titles ??= [];
            tatt.titles[titlei] = value;

            return (
              `${this.inSchTitle(sch)} значение ${titlei + 1}-го заголовка типа вложений ` +
              `"${tattTitle}", "${prevTitle}" изменено на "${value}"`
            );
          }),

          createTitleValue: modifyAttType((tatt, { tattTitle, titlesCount }, sch) => {
            tatt.titles ??= [];
            tatt.titles.push('');

            return `${this.inSchTitle(sch)} создан ${titlesCount + 1}-й заголовок для типа вложений "${tattTitle}"`;
          }),

          setWhoCanLevel: modifyAttType((tatt, { rule, value, tattTitle }, sch) => {
            tatt[rule] = value;

            const balance = scheduleWidgetUserRights.rightsBalance(value);
            const id = scheduleWidgetUserRights.enumOrder[balance];
            const role = scheduleWidgetUserRights.texts.find(txt => txt.id === id)?.role?.[0];

            return (
              `${this.inSchTitle(sch)} уровень доступа для ${rule === 'U' ? 'редактирования' : 'чтения'} ` +
              `типа вложений "${tattTitle}" - ${
                balance === 0
                  ? 'имеют ВСЕ!'
                  : balance === scheduleWidgetUserRights.enumOrder.length - 1
                    ? `имеет только ${role}`
                    : role
                      ? `имеет ${role} и старше`
                      : '???'
              }`
            );
          }),
          toggleUserWhoCan: modifyAttType((tatt, { rule, userMi, tattTitle, userName }, sch) => {
            const set = new Set(tatt[rule]);

            if (set.has(userMi)) set.delete(userMi);
            else set.add(userMi);

            if (set.size === 0) delete tatt[rule];
            else tatt[rule] = Array.from(set);

            return (
              `${this.inSchTitle(sch)} ${userName} ` +
              `${tatt[rule]?.includes(userMi) ? 'добавлен в список' : 'удалён из списка'} ` +
              `${rule === 'Rs' ? 'для чтения' : 'для редактирования'} вложений с типом "${tattTitle}"`
            );
          }),
        },
      });
    }

    private inSchTitle = (sch: IScheduleWidget) => `В расписании ${scheduleTitleInBrackets(sch)}`;
  })();

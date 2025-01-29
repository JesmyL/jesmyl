import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidget,
  IScheduleWidgetAttachmentTypeMi,
  ScheduleAttachmentTypeScopeProps,
  ScheduleWidgetAppAttCustomizable,
  ScheduleWidgetAppAttCustomized,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { SchAttachmentTypesSokiInvocatorMethods } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { modifySchedule } from '../schedule-modificators';
import { scheduleTitleInBrackets } from './general-invocators.base';

const newTatt = () =>
  ({
    title: '',
    description: '',
    icon: 'Attachment',
    initVal: {},
    R: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
    U: scheduleWidgetUserRights.includeRights(ScheduleWidgetUserRoleRight.Redact),
  }) satisfies ScheduleWidgetAppAttCustomizable;

class SchAttachmentTypesSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchAttachmentTypesSokiInvocatorMethods> {
  constructor() {
    super(
      'SchAttachmentTypesSokiInvocatorBaseServer',
      {
        create: () => props =>
          modifySchedule(false, props, sch =>
            sch.tatts.push({
              ...newTatt(),
              mi: smylib.takeNextMi(sch.tatts, IScheduleWidgetAttachmentTypeMi.def),
            }),
          ),

        setTitle: () => (props, value) => this.modifyAttType(props, tatt => (tatt.title = value)),
        setDescription: () => (props, value) => this.modifyAttType(props, tatt => (tatt.description = value)),
        setIcon: () => (props, value) => this.modifyAttType(props, tatt => (tatt.icon = value)),
        setUse: () => (props, value) => this.modifyAttType(props, tatt => (tatt.use = value)),
        setRolesUses: () => (props, value) => this.modifyAttType(props, tatt => (tatt.roles = value)),
        setListsUses: () => (props, value) => this.modifyAttType(props, tatt => (tatt.list = value)),

        setTitleValue: () => (props, titlei, value) =>
          this.modifyAttType(props, tatt => {
            tatt.titles ??= [];
            tatt.titles[titlei] = value;
          }),

        createTitleValue: () => props =>
          this.modifyAttType(props, tatt => {
            tatt.titles ??= [];
            tatt.titles.push('');
          }),

        setWhoCanLevel: () => (props, rule, value) => this.modifyAttType(props, tatt => (tatt[rule] = value)),
        toggleUserWhoCan: () => (props, rule, userMi) =>
          this.modifyAttType(props, tatt => {
            const set = new Set(tatt[rule]);

            if (set.has(userMi)) set.delete(userMi);
            else set.add(userMi);

            if (set.size === 0) delete tatt[rule];
            else tatt[rule] = Array.from(set);
          }),
      },
      {
        create: sch => `${this.inSchTitle(sch)} создан тип вложений`,
        setTitle: (sch, _, value, prevTitle) =>
          `${this.inSchTitle(sch)} тип вложений "${prevTitle}" переименован на "${value}"`,
        setDescription: (sch, _, value, attTitle) =>
          `${this.inSchTitle(sch)} описание типа вложений "${attTitle}" изменено на "${value}"`,
        setIcon: (sch, _, value, attTitle) =>
          `${this.inSchTitle(sch)} иконка типа вложений "${attTitle}" изменена на "${value}"`,
        setUse: (sch, _, value, attTitle) =>
          `${this.inSchTitle(sch)} значение использований типа вложений "${attTitle}" изменено на ${value}`,
        setRolesUses: (sch, _, value, attTitle) =>
          `${this.inSchTitle(sch)} значение использования ролей типа вложений "${attTitle}" изменено на ${value}`,
        setListsUses: (sch, _, value, attTitle) =>
          `${this.inSchTitle(sch)} значение использования списков типа вложений ` +
          `"${attTitle}" изменено на ${value}`,
        setTitleValue: (sch, _, titlei, value, attTitle, prevTitle) =>
          `${this.inSchTitle(sch)} значение ${titlei + 1}-го заголовка типа вложений ` +
          `"${attTitle}", "${prevTitle}" изменено на "${value}"`,
        createTitleValue: (sch, _, attTitle, titlesCount) =>
          `${this.inSchTitle(sch)} создан ${titlesCount + 1}-й заголовок для типа вложений "${attTitle}"`,

        setWhoCanLevel: (sch, _, rule, value, attTitle) => {
          const balance = scheduleWidgetUserRights.rightsBalance(value);
          const id = scheduleWidgetUserRights.enumOrder[balance];
          const role = scheduleWidgetUserRights.texts.find(txt => txt.id === id)?.role?.[0];

          return (
            `${this.inSchTitle(sch)} уровень доступа для ${rule === 'U' ? 'редактирования' : 'чтения'} ` +
            `типа вложений "${attTitle}" - ${
              balance === 0
                ? 'имеют ВСЕ!'
                : balance === scheduleWidgetUserRights.enumOrder.length - 1
                  ? `имеет только ${role}`
                  : role
                    ? `имеет ${role} и старше`
                    : '???'
            }`
          );
        },

        toggleUserWhoCan: (sch, props, rule, userMi, tattTitle, userName) => {
          const tatt = sch.tatts.find(tatt => tatt.mi === props.tattMi);
          if (tatt == null) return '';

          return (
            `${this.inSchTitle(sch)} ${userName} ` +
            `${tatt[rule]?.includes(userMi) ? 'добавлен в список' : 'удалён из списка'} ` +
            `${rule === 'Rs' ? 'для чтения' : 'для редактирования'} вложений с типом "${tattTitle}"`
          );
        },
      },
    );
  }

  private modifyAttType = (
    props: ScheduleAttachmentTypeScopeProps,
    modifier: (tatt: ScheduleWidgetAppAttCustomized) => void,
  ) =>
    modifySchedule(false, props, sch => {
      const tatt = sch.tatts.find(tatt => tatt.mi === props.tattMi);
      if (tatt == null) throw new Error('attachment type not found');
      modifier(tatt);
    });

  private inSchTitle = (sch: IScheduleWidget) => `В расписании ${scheduleTitleInBrackets(sch)}`;
}
export const schAttachmentTypesSokiInvocatorBaseServer = new SchAttachmentTypesSokiInvocatorBaseServer();

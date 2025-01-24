import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidget,
  IScheduleWidgetUserMi,
  IScheduleWidgetWid,
  ScheduleScopeProps,
  ScheduleWidgetCleans,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetRegTypeTitles,
  scheduleWidgetUserRights,
} from 'shared/api';
import { SchGeneralSokiInvocatorModel } from 'shared/api/invocators/schedules/invocators.model';
import { smylib } from 'shared/utils';
import { newSchedule } from '../action-box/action-box';
import { schServerInvocatorShareMethods } from '../invocators.shares';
import { schLiveSokiInvocatorServer } from '../live-invocators';
import { schAttachmentTypesSokiInvocatorBaseServer } from './attachment-types-invocators.base';
import { schDayEventsSokiInvocatorBaseServer } from './day-events-invocators.base';
import { schDaysSokiInvocatorBaseServer } from './days-invocators.base';
import { schEventTypesSokiInvocatorBaseServer } from './event-types-invocators.base';
import { schedulesFileStore } from './file-stores';
import { schGamesSokiInvocatorBaseServer } from './games-invocators.base';
import { schListsSokiInvocatorBaseServer } from './lists-invocators.base';
import { schPhotosSokiInvocatorBaseServer } from './photos-invocators.base';
import { schRolesSokiInvocatorBaseServer } from './roles-invocators.base';
import { schUsersSokiInvocatorBaseServer } from './users-invocators.base';

class SchGeneralSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchGeneralSokiInvocatorModel> {
  constructor() {
    super(
      'SchGeneralSokiInvocatorBaseServer',
      {
        create:
          ({ auth }) =>
          async title => {
            if (auth == null) throw new Error('no auth');

            const sch = smylib.clone(newSchedule);

            const date = new Date();
            sch.m = sch.w = date.getTime();
            sch.title = title;

            date.setMonth(date.getMonth() + 1);
            date.setHours(0, 0, 0, 0);
            sch.start = date.getTime();

            sch.ctrl.users = [
              {
                mi: IScheduleWidgetUserMi.def,
                fio: auth.fio,
                login: auth.login,
                nick: auth.nick,
                tgId: auth.tgId,
                R: scheduleWidgetUserRights.getAllRights(),
              },
            ];

            schedulesFileStore.getValue().push(sch);
            schedulesFileStore.saveValue();
            schServerInvocatorShareMethods.editedSchedule(null, sch);

            return sch;
          },

        rename: () => this.updateScheduleValue('title'),
        setTopic: () => this.updateScheduleValue('topic'),
        setDescription: () => this.updateScheduleValue('dsc'),
        setStartTime: () => this.updateScheduleValue('start'),
        setFirstDayAsTech: () => this.updateScheduleValue('withTech'),
        setTgChatRequisites: () => this.updateScheduleValue('tgChatReqs'),
        setTgInformTime: () => this.updateScheduleValue('tgInformTime'),

        setIsTgInformMe:
          ({ auth }) =>
          (props, isNotInform) =>
            modifySchedule(props, sch => {
              if (auth == null) throw new Error('Не авторизован');
              const login = auth.login;
              const user = sch.ctrl.users.find(user => user.login === login);
              if (user == null) throw new Error('user not found');
              user.tgInform = isNotInform;
            }),

        toggleIsTgInform: () => props =>
          modifySchedule(props, sch => (sch.tgInform = sch.tgInform === 0 ? undefined : 0)),

        remove: () => props => modifySchedule(props, sch => (sch.isRemoved = 1)),
        copySchedule: () => (props, copiedSchedule) =>
          modifySchedule(props, sch => Object.assign(sch, copiedSchedule, { title: sch.title })),

        setScheduleRegisterType: () => (props, value) => modifySchedule(props, sch => (sch.ctrl.type = value)),
        setDefaultUserRights: () => (props, value) => modifySchedule(props, sch => (sch.ctrl.defu = value)),
      },
      {
        create: sch => `Создано новое расписание ${scheduleTitleInBrackets(sch)}`,
        rename: sch => `Расписание ${scheduleTitleInBrackets(sch)} переименовано`,
        setTopic: sch => `В расписании ${scheduleTitleInBrackets(sch)} изменена тема: ${sch.topic}`,
        setDescription: sch => `В расписании ${scheduleTitleInBrackets(sch)} изменено описание: ${sch.dsc}`,
        remove: sch => `Расписание ${scheduleTitleInBrackets(sch)} удалено`,
        copySchedule: (sch, _, copiedSch) =>
          `Расписание ${scheduleTitleInBrackets(copiedSch)} скопировано в ${scheduleTitleInBrackets} `,

        setDefaultUserRights: (sch, _, value) =>
          `В расписании ${scheduleTitleInBrackets(sch)} для новых участников установлены права по умолчанию: ` +
          (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(value)].role?.[0] ?? 'Неизвестный'),

        setFirstDayAsTech: sch =>
          `В расписании ${scheduleTitleInBrackets(sch)} первый день сделан ${sch.withTech ? 'техническим' : 'обычным'}`,
        setScheduleRegisterType: (schedule, _, value) => {
          if (!smylib.isNum(value)) return `В расписании <b>${scheduleTitleInBrackets(schedule)}</b> изменение типа`;

          const isSwPublic = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
            value,
            ScheduleWidgetRegType.Public,
          );

          const isSwBeforeRegistration = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
            value,
            ScheduleWidgetRegType.BeforeRegistration,
          );

          const isSwHideContent = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
            value,
            ScheduleWidgetRegType.HideContent,
          );

          try {
            const publicRule = scheduleWidgetRegTypeTitles.find(item => item.id === ScheduleWidgetRegType.Public)!;
            const beforeRegistrationRule = scheduleWidgetRegTypeTitles.find(
              item => item.id === ScheduleWidgetRegType.BeforeRegistration,
            )!;
            const hideContentRule = scheduleWidgetRegTypeTitles.find(
              item => item.id === ScheduleWidgetRegType.HideContent,
            )!;

            return (
              `В расписании <b>${scheduleTitleInBrackets(schedule)}</b> изменение типа:` +
              `\n\n${ScheduleWidgetCleans.putInTgTag(isSwPublic ? '' : 's', publicRule.title)}` +
              `\n${ScheduleWidgetCleans.putInTgTag(
                isSwPublic && isSwBeforeRegistration ? '' : 's',
                beforeRegistrationRule.title,
              )}` +
              `\n${ScheduleWidgetCleans.putInTgTag(
                isSwPublic && isSwBeforeRegistration && isSwHideContent ? '' : 's',
                hideContentRule.title,
              )}`
            );
          } catch (error) {
            return `В расписании <b>${scheduleTitleInBrackets(schedule)}</b> изменение типа`;
          }
        },
        setStartTime: sch =>
          `В расписании ${scheduleTitleInBrackets(sch)} установлена дата начала - ` +
          `${new Date(sch.start).toLocaleDateString('ru')}`,

        setTgChatRequisites: sch =>
          `В расписании ${scheduleTitleInBrackets(sch)} изменены реквизиты TG-чата: ${sch.tgChatReqs}`,

        setTgInformTime: sch =>
          `В расписании ${scheduleTitleInBrackets(sch)} TG-напоминания будут ` +
          `${sch.tgInformTime ? `за ${sch.tgInformTime} минут` : 'только в начале события'} `,

        toggleIsTgInform: sch =>
          `В расписании ${scheduleTitleInBrackets(sch)} TG-напоминания ${
            sch.tgInform === 0 ? 'отключены' : 'включены'
          }`,

        setIsTgInformMe:
          (sch, _, isNotInform) =>
          ({ auth }) =>
            `В расписании ${scheduleTitleInBrackets(sch)} участник ${auth?.fio ?? '?'} (${auth?.nick ?? '?'}) ` +
            `${isNotInform ? 'отключил' : 'включил'} TG-напоминания`,
      },
    );
  }

  private updateScheduleValue =
    <Key extends keyof IScheduleWidget>(key: Key) =>
    (props: ScheduleScopeProps, value: IScheduleWidget[Key]) =>
      modifySchedule(props, sch => (sch[key] = value));
}

export const modifySchedule = async ({ schw }: ScheduleScopeProps, modifier: (sch: IScheduleWidget) => void) => {
  const sch = schedulesFileStore.getValue().find(sch => sch.w === schw);
  if (sch === undefined) throw new Error('schedule not found');

  modifier(sch);
  sch.m = Date.now() + Math.random();
  schedulesFileStore.saveValue();
  schServerInvocatorShareMethods.editedSchedule(null, sch);

  return sch;
};

export const scheduleTitleInBrackets = (schScalar: IScheduleWidget | IScheduleWidgetWid) => {
  if (smylib.isNum(schScalar)) {
    const sch = schedulesFileStore.getValue().find(sch => sch.w === schScalar);
    if (sch === undefined) throw new Error('schedule not found');
    return `"${sch.title}"`;
  }
  return `"${schScalar.title}"`;
};

export const schGeneralSokiInvocatorBaseServer = new SchGeneralSokiInvocatorBaseServer();

schDaysSokiInvocatorBaseServer.$$register();
schDayEventsSokiInvocatorBaseServer.$$register();
schGamesSokiInvocatorBaseServer.$$register();
schListsSokiInvocatorBaseServer.$$register();
schRolesSokiInvocatorBaseServer.$$register();
schUsersSokiInvocatorBaseServer.$$register();
schPhotosSokiInvocatorBaseServer.$$register();
schEventTypesSokiInvocatorBaseServer.$$register();
schAttachmentTypesSokiInvocatorBaseServer.$$register();

schLiveSokiInvocatorServer.$$register();

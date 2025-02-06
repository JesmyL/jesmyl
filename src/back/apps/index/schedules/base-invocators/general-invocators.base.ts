import { SokiInvocatorBaseServer } from 'back/SokiInvocatorBase.server';
import {
  IScheduleWidget,
  IScheduleWidgetUserCati,
  IScheduleWidgetUserMi,
  IScheduleWidgetWid,
  ScheduleScopeProps,
  ScheduleWidgetCleans,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetRegTypeTitles,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { SchGeneralSokiInvocatorModel } from 'shared/api/invocators/schedules/invocators.model';
import { emptyArray, smylib } from 'shared/utils';
import { schedulesFileStore } from '../file-stores';
import { schServerInvocatorShareMethods } from '../invocators.shares';
import { schLiveSokiInvocatorServer } from '../live-invocators';
import { modifySchedule } from '../schedule-modificators';
import { onScheduleUserTgInformSetEvent } from '../specific-modify-events';
import { schAttachmentTypesSokiInvocatorBaseServer } from './attachment-types-invocators.base';
import { schDayEventsSokiInvocatorBaseServer } from './day-events-invocators.base';
import { schDaysSokiInvocatorBaseServer } from './days-invocators.base';
import { schEventTypesSokiInvocatorBaseServer } from './event-types-invocators.base';
import { schGamesSokiInvocatorBaseServer } from './games-invocators.base';
import { schListsSokiInvocatorBaseServer } from './lists-invocators.base';
import { schPhotosSokiInvocatorBaseServer } from './photos-invocators.base';
import { schRolesSokiInvocatorBaseServer } from './roles-invocators.base';
import { schUsersSokiInvocatorBaseServer } from './users-invocators.base';

export const newSchedule: IScheduleWidget = {
  w: IScheduleWidgetWid.def,
  m: IScheduleWidgetUserCati.def,
  title: '',
  app: 'index',
  dsc: '',
  topic: '',
  days: emptyArray,
  tatts: emptyArray,
  types: emptyArray,
  tgInformTime: 5,
  start: 0,
  ctrl: {
    cats: ['Основное'],
    users: [],
    roles: [
      {
        mi: 0,
        title: 'Координатор',
        icon: 'Teacher',
        userMi: IScheduleWidgetUserMi.def,
      },
    ],
    type: scheduleWidgetRegTypeRights.collectRights(),
    defu: scheduleWidgetUserRights.collectRights(ScheduleWidgetUserRoleRight.Read),
  },
  games: {
    criterias: [{ title: 'Сила', sorts: {} as never }],
    list: [],
  },
  lists: {
    cats: [
      {
        icon: 'UserGroup',
        title: 'Группа',
        titles: ['Наставники', 'Участники'],
      },
    ],
    units: [
      {
        cati: IScheduleWidgetUserCati.def,
        mi: 1,
        title: 'Группа 1',
        dsc: '',
      },
    ],
  },
};

onScheduleUserTgInformSetEvent.listen(({ isNotInform, schProps, userLogin }) => {
  return modifySchedule(false, schProps, sch => {
    if (userLogin == null) throw new Error('Не авторизован');

    const user = sch.ctrl.users.find(user => user.login === userLogin);
    if (user == null) throw new Error('user not found');
    user.tgInform = isNotInform;
  });
});

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
        setFirstDayAsTech: () => this.updateScheduleValue('withTech', true),
        setTgChatRequisites: () => this.updateScheduleValue('tgChatReqs', true),
        setTgInformTime: () => this.updateScheduleValue('tgInformTime', true),

        setStartTime: () => (props: ScheduleScopeProps, value) =>
          modifySchedule(true, props, sch => {
            sch.prevStart = sch.start;
            sch.start = value;
          }),

        setIsTgInformMe:
          ({ auth }) =>
          (schProps, isNotInform) =>
            onScheduleUserTgInformSetEvent.invoke({ schProps, isNotInform, userLogin: auth?.login }),

        toggleIsTgInform: () => props =>
          modifySchedule(true, props, sch => (sch.tgInform = sch.tgInform === 0 ? undefined : 0)),

        remove: () => props => modifySchedule(true, props, sch => (sch.isRemoved = 1)),
        copySchedule: () => (props, copiedSchedule) =>
          modifySchedule(false, props, sch => Object.assign(sch, copiedSchedule, { title: sch.title })),

        setScheduleRegisterType: () => (props, value) => modifySchedule(false, props, sch => (sch.ctrl.type = value)),
        setDefaultUserRights: () => (props, value) => modifySchedule(false, props, sch => (sch.ctrl.defu = value)),
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
    <Key extends keyof IScheduleWidget>(key: Key, isNeedRefreshTgInformTime?: boolean) =>
    (props: ScheduleScopeProps, value: IScheduleWidget[Key]) =>
      modifySchedule(isNeedRefreshTgInformTime || false, props, sch => (sch[key] = value));
}

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

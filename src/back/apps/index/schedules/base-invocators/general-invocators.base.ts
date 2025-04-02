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

export const schGeneralSokiInvocatorBaseServer =
  new (class SchGeneralSokiInvocatorBaseServer extends SokiInvocatorBaseServer<SchGeneralSokiInvocatorModel> {
    constructor() {
      const updateScheduleValue =
        <Key extends keyof IScheduleWidget>(key: Key, isNeedRefreshTgInformTime?: boolean) =>
        ({ props, value }: { props: ScheduleScopeProps; value: IScheduleWidget[Key] }) =>
          modifySchedule(isNeedRefreshTgInformTime || false, props, sch => (sch[key] = value));

      super({
        className: 'SchGeneralSokiInvocatorBaseServer',
        methods: {
          create: async ({ title }, { auth }) => {
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
            schServerInvocatorShareMethods.editedSchedule({ sch });

            return sch;
          },

          rename: updateScheduleValue('title'),
          setTopic: updateScheduleValue('topic'),
          setDescription: updateScheduleValue('dsc'),
          setFirstDayAsTech: updateScheduleValue('withTech', true),
          setTgChatRequisites: updateScheduleValue('tgChatReqs', true),
          setTgInformTime: updateScheduleValue('tgInformTime', true),

          setStartTime: ({ props, value }) =>
            modifySchedule(true, props, sch => {
              sch.prevStart = sch.start;
              sch.start = value;
            }),

          setIsTgInformMe: ({ props: schProps, type: isNotInform }, { auth }) =>
            onScheduleUserTgInformSetEvent.invoke({ schProps, isNotInform, userLogin: auth?.login }),

          toggleIsTgInform: ({ props }) =>
            modifySchedule(true, props, sch => (sch.tgInform = sch.tgInform === 0 ? undefined : 0)),

          remove: ({ props }) => modifySchedule(true, props, sch => (sch.isRemoved = 1)),
          copySchedule: ({ props, schedule: copiedSchedule }) =>
            modifySchedule(false, props, sch => Object.assign(sch, copiedSchedule, { title: sch.title })),

          setScheduleRegisterType: ({ props, type: value }) =>
            modifySchedule(false, props, sch => (sch.ctrl.type = value)),
          setDefaultUserRights: ({ props, R: value }) => modifySchedule(false, props, sch => (sch.ctrl.defu = value)),
        },
        onEachFeedback: {
          create: (_, sch) => `Создано новое расписание ${scheduleTitleInBrackets(sch)}`,
          rename: (_, sch) => `Расписание ${scheduleTitleInBrackets(sch)} переименовано`,
          setTopic: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} изменена тема: ${sch.topic}`,
          setDescription: (_, sch) => `В расписании ${scheduleTitleInBrackets(sch)} изменено описание: ${sch.dsc}`,
          remove: (_, sch) => `Расписание ${scheduleTitleInBrackets(sch)} удалено`,
          copySchedule: ({ schedule: copiedSch }) =>
            `Расписание ${scheduleTitleInBrackets(copiedSch)} скопировано в ${scheduleTitleInBrackets} `,

          setDefaultUserRights: ({ R: value }, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} для новых участников установлены права по умолчанию: ` +
            (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(value)].role?.[0] ?? 'Неизвестный'),

          setFirstDayAsTech: (_, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} первый день сделан ${sch.withTech ? 'техническим' : 'обычным'}`,
          setScheduleRegisterType: ({ type: value }, schedule) => {
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
            } catch (_error) {
              return `В расписании <b>${scheduleTitleInBrackets(schedule)}</b> изменение типа`;
            }
          },
          setStartTime: (_, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} установлена дата начала - ` +
            `${new Date(sch.start).toLocaleDateString('ru')}`,

          setTgChatRequisites: (_, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} изменены реквизиты TG-чата: ${sch.tgChatReqs}`,

          setTgInformTime: (_, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} TG-напоминания будут ` +
            `${sch.tgInformTime ? `за ${sch.tgInformTime} минут` : 'только в начале события'} `,

          toggleIsTgInform: (_, sch) =>
            `В расписании ${scheduleTitleInBrackets(sch)} TG-напоминания ${
              sch.tgInform === 0 ? 'отключены' : 'включены'
            }`,

          setIsTgInformMe:
            ({ type: isNotInform }, sch) =>
            ({ auth }) =>
              `В расписании ${scheduleTitleInBrackets(sch)} участник ${auth?.fio ?? '?'} (${auth?.nick ?? '?'}) ` +
              `${isNotInform ? 'отключил' : 'включил'} TG-напоминания`,
        },
      });
    }
  })();

export const scheduleTitleInBrackets = (schScalar: IScheduleWidget | IScheduleWidgetWid) => {
  if (smylib.isNum(schScalar)) {
    const sch = schedulesFileStore.getValue().find(sch => sch.w === schScalar);
    if (sch === undefined) throw new Error('schedule not found');
    return `"${sch.title}"`;
  }
  return `"${schScalar.title}"`;
};

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

import { sokiServer } from 'back/complect/soki/SokiServer';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
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
import { SchGeneralTsjrpcModel } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { smylib } from 'shared/utils';
import { schedulesFileStore } from '../file-stores';
import { schLiveTsjrpcServer } from '../live.tsjrpc';
import { modifySchedule } from '../schedule-modificators';
import { onScheduleUserTgInformSetEvent } from '../specific-modify-events';
import { schAttachmentTypesTsjrpcBaseServer } from './attachment-types.tsjrpc.base';
import { schDayEventsTsjrpcBaseServer } from './day-events.tsjrpc.base';
import { schDaysTsjrpcBaseServer } from './days.tsjrpc.base';
import { schEventTypesTsjrpcBaseServer } from './event-types.tsjrpc.base';
import { schGamesTsjrpcBaseServer } from './games.tsjrpc.base';
import { schListsTsjrpcBaseServer } from './lists.tsjrpc.base';
import { schPhotosTsjrpcBaseServer } from './photos.tsjrpc.base';
import { schRolesTsjrpcBaseServer } from './roles.tsjrpc.base';
import { schUsersTsjrpcBaseServer } from './users.tsjrpc.base';

onScheduleUserTgInformSetEvent.listen(async ({ isNotInform, schProps, userLogin }) => {
  let description = '';
  const client = userLogin && sokiServer.clientsByLogin.get(userLogin)?.values().next().value;
  const auth = client && sokiServer.auths.get(client);

  const { value: sch } = await modifySchedule(false, sch => {
    if (userLogin == null) throw new Error('Не авторизован');

    const user = sch.ctrl.users.find(user => user.login === userLogin);
    if (user == null) throw new Error('user not found');
    user.tgInform = isNotInform;

    description =
      `В расписании ${scheduleTitleInBrackets(sch)} участник ${auth?.fio ?? '?'} (${auth?.nick ?? '?'}) ` +
      `${isNotInform ? 'отключил' : 'включил'} TG-напоминания`;

    return description;
  })({ props: schProps }, { auth: undefined, client: null, visitInfo: undefined });

  return {
    value: sch,
    description,
  };
});

export const schGeneralTsjrpcBaseServer = new (class SchGeneral extends TsjrpcBaseServer<SchGeneralTsjrpcModel> {
  constructor() {
    const updateScheduleValue = <
      Props extends { props: ScheduleScopeProps; value: IScheduleWidget[Key] },
      Key extends keyof IScheduleWidget,
    >(
      key: Key,
      text: (sch: IScheduleWidget, props: Props) => string | null,
      isNeedRefreshTgInformTime?: boolean,
    ) =>
      modifySchedule<Props>(isNeedRefreshTgInformTime || false, (sch, props) => {
        sch[key] = props.value;

        return text(sch, props);
      });

    super({
      scope: 'SchGeneral',
      methods: {
        create: async ({ title }, { auth }) => {
          if (auth == null) throw new Error('no auth');

          const sch: IScheduleWidget = smylib.clone({
            w: IScheduleWidgetWid.def,
            m: IScheduleWidgetUserCati.def,
            title: '',
            app: 'index',
            dsc: '',
            topic: '',
            days: [],
            tatts: [],
            types: [],
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
          });

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

          return {
            value: sch,
            description: `Создано новое расписание ${scheduleTitleInBrackets(sch)}`,
          };
        },

        rename: updateScheduleValue('title', sch => `Расписание ${scheduleTitleInBrackets(sch)} переименовано`),
        setTopic: updateScheduleValue(
          'topic',
          sch => `В расписании ${scheduleTitleInBrackets(sch)} изменена тема: ${sch.topic}`,
        ),
        setDescription: updateScheduleValue(
          'dsc',
          sch => `В расписании ${scheduleTitleInBrackets(sch)} изменено описание: ${sch.dsc}`,
        ),
        setFirstDayAsTech: updateScheduleValue(
          'withTech',
          sch =>
            `В расписании ${scheduleTitleInBrackets(sch)} первый день сделан ${sch.withTech ? 'техническим' : 'обычным'}`,
          true,
        ),
        setTgChatRequisites: updateScheduleValue(
          'tgChatReqs',
          sch => `В расписании ${scheduleTitleInBrackets(sch)} изменены реквизиты TG-чата: ${sch.tgChatReqs}`,
          true,
        ),
        setTgInformTime: updateScheduleValue(
          'tgInformTime',
          sch =>
            `В расписании ${scheduleTitleInBrackets(sch)} TG-напоминания будут ` +
            `${sch.tgInformTime ? `за ${sch.tgInformTime} минут` : 'только в начале события'} `,
          true,
        ),

        setStartTime: modifySchedule(true, (sch, { value }) => {
          sch.prevStart = sch.start;
          sch.start = value;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} установлена дата начала - ` +
            `${new Date(sch.start).toLocaleDateString('ru')}`
          );
        }),

        setIsTgInformMe: ({ props: schProps, type: isNotInform }, { auth }) =>
          onScheduleUserTgInformSetEvent.invoke({ schProps, isNotInform, userLogin: auth?.login }),

        toggleIsTgInform: modifySchedule(true, sch => {
          sch.tgInform = sch.tgInform === 0 ? undefined : 0;

          return `В расписании ${scheduleTitleInBrackets(sch)} TG-напоминания ${
            sch.tgInform === 0 ? 'отключены' : 'включены'
          }`;
        }),

        remove: modifySchedule(true, sch => {
          sch.isRemoved = 1;

          return `Расписание ${scheduleTitleInBrackets(sch)} удалено`;
        }),

        copySchedule: modifySchedule(false, (sch, { schedule }) => {
          Object.assign(sch, schedule, { title: sch.title });

          return `Расписание ${scheduleTitleInBrackets(sch)} скопировано в ${scheduleTitleInBrackets} `;
        }),

        setScheduleRegisterType: modifySchedule(false, (sch, { type }) => {
          sch.ctrl.type = type;

          if (!smylib.isNum(type)) return `В расписании <b>${scheduleTitleInBrackets(sch)}</b> изменение типа`;

          const isSwPublic = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(type, ScheduleWidgetRegType.Public);

          const isSwBeforeRegistration = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
            type,
            ScheduleWidgetRegType.BeforeRegistration,
          );

          const isSwHideContent = scheduleWidgetRegTypeRights.checkIsHasIndividualRights(
            type,
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
              `В расписании <b>${scheduleTitleInBrackets(sch)}</b> изменение типа:` +
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
            return `В расписании <b>${scheduleTitleInBrackets(sch)}</b> изменение типа`;
          }
        }),
        setDefaultUserRights: modifySchedule(false, (sch, { R }) => {
          sch.ctrl.defu = R;

          return (
            `В расписании ${scheduleTitleInBrackets(sch)} для новых участников установлены права по умолчанию: ` +
            (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(R)].role?.[0] ?? 'Неизвестный')
          );
        }),
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

schDaysTsjrpcBaseServer.$$register();
schDayEventsTsjrpcBaseServer.$$register();
schGamesTsjrpcBaseServer.$$register();
schListsTsjrpcBaseServer.$$register();
schRolesTsjrpcBaseServer.$$register();
schUsersTsjrpcBaseServer.$$register();
schPhotosTsjrpcBaseServer.$$register();
schEventTypesTsjrpcBaseServer.$$register();
schAttachmentTypesTsjrpcBaseServer.$$register();

schLiveTsjrpcServer.$$register();

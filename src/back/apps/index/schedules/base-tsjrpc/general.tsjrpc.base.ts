import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import {
  IScheduleWidget,
  IScheduleWidgetComsRights,
  ScheduleScopeProps,
  ScheduleWidgetCleans,
  ScheduleWidgetDayEventMi,
  ScheduleWidgetDayi,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetRegTypeTitles,
  ScheduleWidgetUserCati,
  ScheduleWidgetUserMi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  ScheduleWidgetWid,
  ScheduleWidgetWidDef,
  UserId,
} from 'shared/api';
import { SchGeneralTsjrpcModel } from 'shared/api/tsjrpc/schedules/tsjrpc.model';
import { Bool } from 'shared/enums';
import { checkIsArray, checkIsNumber, checkIsObject } from 'shared/utils/checkIs';
import { checkIsEq } from 'shared/utils/checkIsEq';
import { deepClone } from 'shared/utils/clone';
import { makeDateLabel } from 'shared/utils/makeDateLabel';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { schLiveTsjrpcServer } from '../live.tsjrpc';
import { modifySchedule, throwIfNoScheduleTotalRedact } from '../schedule-modificators';
import { schServerTsjrpcShareMethods } from '../tsjrpc.shares';
import { takeScheduleWidgetTiny } from '../schedule.tiny';
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
import { takeUserLoginsByIds, takeUserTiny } from '../../tinies/userTiny';

const parseComsRightsUserIds = (users: unknown): UserId[] => {
  if (!checkIsArray(users)) throw new Error('Права на списки композиций: участники должны быть массивом');

  const userIds = new Set<number>();

  for (const userId of users) {
    if (!checkIsNumber(userId) || userId <= 0)
      throw new Error('Права на списки композиций: участники должны быть положительными идентификаторами');

    userIds.add(userId);
  }

  return [...userIds] as UserId[];
};

const parseComsRightsIdsRecord = <Key extends number, Value>(
  record: unknown,
  parseValue: (value: unknown) => Value,
): Record<Key, Value> => {
  if (!checkIsObject(record)) throw new Error('Права на списки композиций: ожидался объект');

  const result = {} as Record<Key, Value>;

  forEachObjectEntries(record, (key, value) => {
    const numericKey = +key;
    if (isNaN(numericKey) || numericKey < 0)
      throw new Error(`Права на списки композиций: ключ "${key}" не является числом`);

    result[numericKey as Key] = parseValue(value);
  });

  return result;
};

const parseComsRights = (value: unknown): IScheduleWidgetComsRights | nil => {
  if (value == null) return null;
  if (!checkIsObject(value)) throw new Error('Права на списки композиций: ожидался объект');

  const comsRights: IScheduleWidgetComsRights = {};

  if (value.users != null) comsRights.users = parseComsRightsUserIds(value.users);
  if (value.days != null)
    comsRights.days = parseComsRightsIdsRecord<ScheduleWidgetDayi, UserId[]>(
      value.days,
      parseComsRightsUserIds,
    );
  if (value.events != null)
    comsRights.events = parseComsRightsIdsRecord<ScheduleWidgetDayi, Record<ScheduleWidgetDayEventMi, UserId[]>>(
      value.events,
      dayEvents => parseComsRightsIdsRecord<ScheduleWidgetDayEventMi, UserId[]>(dayEvents, parseComsRightsUserIds),
    );

  return comsRights;
};

const takeComsRightsUserIds = (comsRights: IScheduleWidgetComsRights | nil) => {
  const userIds = new Set(comsRights?.users);

  if (comsRights?.days)
    Object.values(comsRights.days).forEach(dayUserIds => dayUserIds.forEach(id => userIds.add(id)));

  if (comsRights?.events)
    Object.values(comsRights.events).forEach(dayEvents =>
      Object.values(dayEvents).forEach(eventUserIds => eventUserIds.forEach(id => userIds.add(id))),
    );

  return [...userIds];
};

onScheduleUserTgInformSetEvent.listen(async ({ isNotInform, schProps, userId }) => {
  let description = '';

  const { value: sch } = await modifySchedule(false, async sch => {
    const user = sch.ctrl.users.find(user => user.id === userId);
    if (user == null) throw new Error('user not found');
    user.tgInform = isNotInform;

    const userTiny = await takeUserTiny({ id: userId }, false);
    const userAuth = userTiny?.uauth;

    description =
      `В расписании ${await scheduleTitleInBrackets(sch)} участник ${userAuth?.fio ?? '?'} (${userAuth?.nick ?? '?'}) ` +
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
      text: (sch: IScheduleWidget, props: Props) => PromiseOr<string | null>,
      isNeedRefreshTgInformTime?: boolean,
    ) =>
      modifySchedule<Props>(isNeedRefreshTgInformTime || false, async (sch, props) => {
        sch[key] = props.value;

        return await text(sch, props);
      });

    super({
      scope: 'SchGeneral',
      methods: {
        create: async ({ title }, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);
          const authUser = await takeUserTiny({ l: auth.login });

          const sch: IScheduleWidget = deepClone({
            w: ScheduleWidgetWidDef,
            m: ScheduleWidgetUserCati.def,
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
                  userMi: ScheduleWidgetUserMi.def,
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
                  cati: ScheduleWidgetUserCati.def,
                  mi: 1,
                  title: 'Группа 1',
                  dsc: '',
                },
              ],
            },
          });

          const date = new Date();
          sch.m = sch.w = date.getTime() as ScheduleWidgetWid;
          sch.title = title;

          date.setMonth(date.getMonth() + 1);
          date.setHours(0, 0, 0, 0);
          sch.start = date.getTime();

          sch.ctrl.users = [
            {
              mi: ScheduleWidgetUserMi.def,
              id: authUser.id,
              tgId: auth.tgId,
              R: scheduleWidgetUserRights.getAllRights(),
            },
          ];

          await db.insert(scheduleDB).values({ ...sch, isRemoved: Bool.False, withTech: Bool.False, tgChatReqs: '' });

          return {
            value: sch,
            description: `Создано новое расписание ${await scheduleTitleInBrackets(sch)}`,
          };
        },

        rename: updateScheduleValue(
          'title',
          async sch => `Расписание ${await scheduleTitleInBrackets(sch)} переименовано`,
        ),
        setTopic: updateScheduleValue(
          'topic',
          async sch => `В расписании ${await scheduleTitleInBrackets(sch)} изменена тема: ${sch.topic}`,
        ),
        setDescription: updateScheduleValue(
          'dsc',
          async sch => `В расписании ${await scheduleTitleInBrackets(sch)} изменено описание: ${sch.dsc}`,
        ),
        setFirstDayAsTech: updateScheduleValue(
          'withTech',
          async sch =>
            `В расписании ${await scheduleTitleInBrackets(sch)} первый день сделан ${sch.withTech ? 'техническим' : 'обычным'}`,
          true,
        ),
        setTgChatRequisites: updateScheduleValue(
          'tgChatReqs',
          async sch =>
            `В расписании ${await scheduleTitleInBrackets(sch)} изменены реквизиты TG-чата: ${sch.tgChatReqs}`,
          true,
        ),
        setTgInformTime: updateScheduleValue(
          'tgInformTime',
          async sch =>
            `В расписании ${await scheduleTitleInBrackets(sch)} TG-напоминания будут ` +
            `${sch.tgInformTime ? `за ${sch.tgInformTime} минут` : 'только в начале события'} `,
          true,
        ),

        setStartTime: modifySchedule(true, async (sch, { value }) => {
          sch.prevStart = sch.start;
          sch.start = value;

          return (
            `В расписании ${await scheduleTitleInBrackets(sch)} установлена дата начала - ` +
            `${makeDateLabel(sch.start)}`
          );
        }),

        setIsTgInformMe: async ({ props: schProps, type: isNotInform }, tool) => {
          const auth = takeLogginedAuthOrThrow(tool.auth);
          const authUser = await takeUserTiny({ l: auth.login });

          return onScheduleUserTgInformSetEvent.invoke({
            schProps,
            isNotInform,
            userId: authUser.id,
          });
        },

        toggleIsTgInform: modifySchedule(true, async sch => {
          sch.tgInform = sch.tgInform === 0 ? undefined : 0;

          return `В расписании ${await scheduleTitleInBrackets(sch)} TG-напоминания ${
            sch.tgInform === 0 ? 'отключены' : 'включены'
          }`;
        }),

        remove: modifySchedule(true, async sch => {
          sch.isRemoved = 1;

          return `Расписание ${await scheduleTitleInBrackets(sch)} удалено`;
        }),

        copySchedule: modifySchedule(false, async (sch, { schedule }) => {
          const from = await scheduleTitleInBrackets(schedule);
          const to = await scheduleTitleInBrackets(sch);
          Object.assign(sch, schedule, { title: sch.title });

          return `Расписание ${from} скопировано в ${to} `;
        }),

        setScheduleRegisterType: modifySchedule(false, async (sch, { type }) => {
          sch.ctrl.type = type;

          if (!checkIsNumber(type)) return `В расписании <b>${await scheduleTitleInBrackets(sch)}</b> изменение типа`;

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
              `В расписании <b>${await scheduleTitleInBrackets(sch)}</b> изменение типа:` +
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
            return `В расписании <b>${await scheduleTitleInBrackets(sch)}</b> изменение типа`;
          }
        }),
        setDefaultUserRights: modifySchedule(false, async (sch, { R }) => {
          sch.ctrl.defu = R;

          return (
            `В расписании ${await scheduleTitleInBrackets(sch)} для новых участников установлены права по умолчанию: ` +
            (scheduleWidgetUserRights.texts[scheduleWidgetUserRights.rightsBalance(R)].role?.[0] ?? 'Неизвестный')
          );
        }),
        setComsRights: async (props, tool) => {
          let affectedUserIds: UserId[] = [];
          let isComsRightsChanged = false;

          const result = await modifySchedule<{ props: ScheduleScopeProps; value: IScheduleWidgetComsRights | nil }>(
            false,
            async (sch, { value }, tool) => {
              const auth = takeLogginedAuthOrThrow(tool.auth);
              const prevComsRights = sch.ctrl.comsRights ?? null;
              const comsRights = parseComsRights(value);

              try {
                await throwIfNoUserScopeAccessRight(auth, 'cm', 'EVENT', 'U');
              } catch (_error) {
                await throwIfNoScheduleTotalRedact(sch, auth);
              }

              if (comsRights == null) delete sch.ctrl.comsRights;
              else sch.ctrl.comsRights = comsRights;

              affectedUserIds = [
                ...new Set([...takeComsRightsUserIds(prevComsRights), ...takeComsRightsUserIds(comsRights)]),
              ];
              isComsRightsChanged = !checkIsEq(prevComsRights, comsRights);

              return `В расписании ${await scheduleTitleInBrackets(sch)} обновлены права на списки композиций`;
            },
          )(props, tool);

          if (isComsRightsChanged && affectedUserIds.length)
            schServerTsjrpcShareMethods.editedSchedule(
              { sch: result.value },
              { logins: await takeUserLoginsByIds(affectedUserIds) },
            );

          return result;
        },
      },
    });
  }
})();

export const scheduleTitleInBrackets = async (schScalar: IScheduleWidget | ScheduleWidgetWid) => {
  if (checkIsNumber(schScalar)) {
    const sch = await takeScheduleWidgetTiny({ w: schScalar }, false);
    if (!sch) throw new Error('schedule not found');
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

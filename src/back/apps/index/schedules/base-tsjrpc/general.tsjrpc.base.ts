import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { TsjrpcBaseServer } from 'back/tsjrpc.base.server';
import { takeLogginedAuthOrThrow } from 'back/utils';
import { throwIfNoUserScopeAccessRight } from 'back/complect/throwIfNoUserScopeAccessRight';
import {
  IScheduleWidget,
  IScheduleWidgetComsRights,
  IScheduleWidgetPeriod,
  SchedulePeriodKind,
  SchedulePeriodWeekday,
  SchedulePeriodWeeki,
  ScheduleScopeProps,
  checkIsScheduleAppInform,
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
import { schAttachmentTypesTsjrpcBaseServer } from './attachment-types.tsjrpc.base';
import { schDayEventsTsjrpcBaseServer } from './day-events.tsjrpc.base';
import { schDaysTsjrpcBaseServer } from './days.tsjrpc.base';
import { schEventCommentsTsjrpcBaseServer } from './event-comments.tsjrpc.base';
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

const schedulePeriodWeekis = [1, 2, 3, 4, 5] as const;
const schedulePeriodWeekdays = [0, 1, 2, 3, 4, 5, 6] as const;

const checkIsSchedulePeriodWeeki = (value: unknown): value is SchedulePeriodWeeki =>
  schedulePeriodWeekis.some(weeki => weeki === value);

const checkIsSchedulePeriodWeekday = (value: unknown): value is SchedulePeriodWeekday =>
  schedulePeriodWeekdays.some(weekday => weekday === value);

const parseSchedulePeriod = (value: unknown): IScheduleWidgetPeriod | nil => {
  if (value == null) return null;
  if (!checkIsObject(value)) throw new Error('Периодичность расписания: ожидался объект');

  const kind = value.kind;

  if (kind === SchedulePeriodKind.Once) return { kind: SchedulePeriodKind.Once };
  if (kind === SchedulePeriodKind.Weekly) return { kind: SchedulePeriodKind.Weekly };

  if (kind === SchedulePeriodKind.MonthDay) {
    const dayi = value.dayi;
    if (!checkIsNumber(dayi) || dayi < 1 || dayi > 31)
      throw new Error('Периодичность расписания: день месяца должен быть от 1 до 31');

    return { kind, dayi };
  }

  if (kind === SchedulePeriodKind.WeekdayOfMonth) {
    const weeki = value.weeki;
    const dayi = value.dayi;
    if (!checkIsSchedulePeriodWeeki(weeki))
      throw new Error('Периодичность расписания: неделя месяца должна быть от 1 до 5');
    if (!checkIsSchedulePeriodWeekday(dayi))
      throw new Error('Периодичность расписания: день недели должен быть от 0 до 6');

    return { kind, weeki, dayi };
  }

  throw new Error(`Периодичность расписания: недопустимый тип ${kind}`);
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

export const schGeneralTsjrpcBaseServer = new (class SchGeneral extends TsjrpcBaseServer<SchGeneralTsjrpcModel> {
  constructor() {
    const updateScheduleValue = <
      Props extends { props: ScheduleScopeProps; value: IScheduleWidget[Key] },
      Key extends keyof IScheduleWidget,
    >(
      key: Key,
      text: (sch: IScheduleWidget, props: Props) => PromiseOr<string | null>,
      isNeedRefreshInformTime?: boolean,
    ) =>
      modifySchedule<Props>(isNeedRefreshInformTime || false, async (sch, props) => {
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
              R: scheduleWidgetUserRights.getAllRights(),
            },
          ];

          await db.insert(scheduleDB).values({ ...sch, isRemoved: Bool.False, withTech: Bool.False, isPaused: Bool.False });

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
        setPaused: updateScheduleValue(
          'isPaused',
          async sch => `В расписании ${await scheduleTitleInBrackets(sch)} ${sch.isPaused ? 'отключено' : 'включено'}`,
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

        setSchedulePeriod: modifySchedule(true, async (sch, { period }) => {
          sch.period = parseSchedulePeriod(period);

          return `В расписании ${await scheduleTitleInBrackets(sch)} изменена периодичность`;
        }),

        setAppInform: modifySchedule(true, async (sch, { value }) => {
          if (!checkIsScheduleAppInform(value)) throw new Error(`Недопустимый интервал напоминания: ${value}`);

          sch.appInform = value;

          return (
            `В расписании ${await scheduleTitleInBrackets(sch)} уведомления в приложении ` +
            (value === 0
              ? 'отключены'
              : value === 1
                ? 'включены (только в начале)'
                : `включены (за ${value} мин. и в начале)`)
          );
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
schEventCommentsTsjrpcBaseServer.$$register();
schGamesTsjrpcBaseServer.$$register();
schListsTsjrpcBaseServer.$$register();
schRolesTsjrpcBaseServer.$$register();
schUsersTsjrpcBaseServer.$$register();
schPhotosTsjrpcBaseServer.$$register();
schEventTypesTsjrpcBaseServer.$$register();
schAttachmentTypesTsjrpcBaseServer.$$register();

schLiveTsjrpcServer.$$register();

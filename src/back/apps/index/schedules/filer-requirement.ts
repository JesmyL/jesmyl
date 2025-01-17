import {
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  IScheduleWidgetUser,
  ScheduleWidgetRegType,
  scheduleWidgetRegTypeRights,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { itNNull, smylib } from 'shared/utils';
import { ExecutionArgs, ExecutionDict, ExecutionReal } from '../../../../shared/api/complect/executer/model';
import { FilerAppRequirement } from '../../../complect/filer/Filer.model';
import { indexSchedulesConfigOnInit } from './filer-req-on-init';

interface SchedulesBag {
  users: IScheduleWidgetUser[];
  schw: number;
  schedule: IScheduleWidget;
}

const emptyArray: [] = [];
const emptyLists = { cats: [], units: [] };

const mapCantReadTitlesDayEvent = (event: IScheduleWidgetDayEvent) => ({
  ...event,
  topic: undefined,
  dsc: undefined,
  atts: undefined,
  rate: undefined,
});

const mapCantReadTitlesDay = (day: IScheduleWidgetDay) => ({
  ...day,
  topic: undefined,
  dsc: undefined,
  list: day.list.map(mapCantReadTitlesDayEvent),
});

const mapCantReadSpecialsDayEvent = (event: IScheduleWidgetDayEvent) => {
  return event.secret === 1
    ? {
        ...event,
        topic: undefined,
        dsc: undefined,
        atts: undefined,
        rate: undefined,
      }
    : event;
};

const mapCantReadSpecialsDay = (day: IScheduleWidgetDay): IScheduleWidgetDay => ({
  ...day,
  list: day.list.map(mapCantReadSpecialsDayEvent),
});

const mapCantReadSpecialsDayWithoutTech = (day: IScheduleWidgetDay, dayi: number): IScheduleWidgetDay =>
  dayi === 0
    ? {
        list: emptyArray,
        mi: 0,
        wup: 0,
      }
    : {
        ...day,
        list: day.list.map(mapCantReadSpecialsDayEvent),
      };

export type ScheduleWidgetOnCantReadExec = ExecutionDict<
  unknown,
  ExecutionArgs<
    unknown,
    {
      schw: number;
      tattMi?: number;
      attKey?: string;
      dayi?: number;
    },
    { $$event?: IScheduleWidgetDayEvent }
  >
>;

type ScheduleWidgetOnCantReadRule = ExecutionReal<unknown, ExecutionArgs<unknown, { schw: number }, {}>>;

export const indexSchedulesConfig: FilerAppRequirement<IScheduleWidget[]> = {
  ...indexSchedulesConfigOnInit,
  onCantRead: (
    isShareData,
    exec: ScheduleWidgetOnCantReadExec,
    rule: ScheduleWidgetOnCantReadRule,
    auth,
    bag: SchedulesBag,
    schedules,
    whenRejButTs,
  ): string | null | typeof whenRejButTs => {
    if (rule.RRej === true) return isShareData ? 'block' : null;
    if (rule.RRej === false) return null;

    if (bag.schedule === undefined || bag.schw !== exec.args?.schw) {
      bag.schw = exec.args?.schw!;
      if (bag.schw === undefined) return 'no_schw';

      bag.schedule = schedules?.find(sch => sch.w === bag.schw)!;
      if (bag.schedule === undefined) return 'no_sch';
      bag.users = bag.schedule.ctrl.users!;
    }

    if (auth == null) return 'unauth';
    if (bag.users === undefined) return 'no_users';

    const user = bag.users.find(user => auth.login === user.login);
    if (user === undefined) {
      if (rule.action === 'joinUserByLink') return isShareData ? whenRejButTs : null;
      if (rule.args?.$$vars?.accessActionWithoutUser === true) return null;
      if (scheduleWidgetRegTypeRights.checkIsHasRights(bag.schedule.ctrl.type, ScheduleWidgetRegType.Public))
        return null;
      return whenRejButTs;
    }

    const userR = user.R ?? bag.schedule.ctrl.defu;

    if (smylib.isFunc(rule.RRej)) {
      const ret = rule.RRej(bag.schedule, user, exec, rule, auth);

      return ret === true ? (isShareData ? 'block' : null) : ret === false ? null : ret;
    }

    if (!scheduleWidgetUserRights.checkIsHasRights(userR, ScheduleWidgetUserRoleRight.ReadSpecials)) {
      if (
        exec.args !== undefined &&
        ((bag.schedule.withTech === 1 && exec.args.dayi === 0) || exec.args.$$vars?.$$event?.secret === 1)
      )
        return whenRejButTs;
    }

    if (rule.RRej == null) return null;

    return scheduleWidgetUserRights.checkIsHasRights(userR, rule.RRej) ? null : whenRejButTs;
  },
  prepareContent: (schedules: IScheduleWidget[], auth): IScheduleWidget[] => {
    if (!auth) {
      const list = schedules
        .map((schedule): IScheduleWidget | null => {
          if (
            scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.Public) &&
            !scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.BeforeRegistration)
          )
            return {
              ...schedule,
              days: schedule.days.map(
                schedule.withTech === 1 ? mapCantReadSpecialsDayWithoutTech : mapCantReadSpecialsDay,
              ),
              ctrl: {
                cats: emptyArray,
                roles: emptyArray,
                users: emptyArray,
                type: schedule.ctrl.type,
                defu: schedule.ctrl.defu,
              },
            };

          return null;
        })
        .filter(itNNull);

      return list;
    }

    const authLogin = auth.login;
    const list = schedules.map((schedule): IScheduleWidget => {
      const user = schedule.ctrl.users.find(user => user.login === authLogin);

      if (user === undefined) {
        if (scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.Public)) {
          if (
            !scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.BeforeRegistration)
          ) {
            return {
              ...schedule,
              days: schedule.days.map(
                schedule.withTech === 1 ? mapCantReadSpecialsDayWithoutTech : mapCantReadSpecialsDay,
              ),
              ctrl: {
                cats: emptyArray,
                roles: emptyArray,
                users: schedule.ctrl.users,
                type: schedule.ctrl.type,
                defu: schedule.ctrl.defu,
              },
            };
          }

          return {
            ...schedule,
            days: schedule.days[0]
              ? schedule.days[1]
                ? [
                    { wup: schedule.days[0].wup, mi: 0, list: emptyArray },
                    { wup: schedule.days[1].wup, mi: 1, list: emptyArray },
                  ]
                : [{ wup: schedule.days[0].wup, mi: 0, list: emptyArray }]
              : emptyArray,
            dsc: '',
            tatts: emptyArray,
            types: emptyArray,
            ctrl: {
              cats: emptyArray,
              roles: emptyArray,
              users: emptyArray,
              type: schedule.ctrl.type,
              defu: schedule.ctrl.defu,
            },
          };
        }

        return {
          m: schedule.m,
          title: '',
          app: schedule.app,
          w: schedule.w,
          lists: emptyLists,
          start: 0,
          days: emptyArray,
          tatts: emptyArray,
          types: emptyArray,
          dsc: '',
          topic: '',
          tgInformTime: 0,
          ctrl: {
            cats: emptyArray,
            roles: emptyArray,
            users: emptyArray,
            type: schedule.ctrl.type,
            defu: schedule.ctrl.defu,
          },
        };
      }

      const userR = user.R ?? schedule.ctrl.defu;

      if (
        (userR === undefined || userR === 0) &&
        scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.Public) &&
        (!scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.BeforeRegistration) ||
          !scheduleWidgetRegTypeRights.checkIsHasRights(schedule.ctrl.type, ScheduleWidgetRegType.HideContent))
      ) {
        return {
          ...schedule,
          days: schedule.days.map(schedule.withTech === 1 ? mapCantReadSpecialsDayWithoutTech : mapCantReadSpecialsDay),
          ctrl: {
            cats: emptyArray,
            roles: emptyArray,
            users: user === undefined ? emptyArray : [user],
            type: schedule.ctrl.type,
            defu: schedule.ctrl.defu,
          },
        };
      }

      if (!scheduleWidgetUserRights.checkIsHasRights(userR, ScheduleWidgetUserRoleRight.Read)) {
        return {
          ...schedule,
          days: emptyArray,
          topic: '',
          tatts: emptyArray,
          dsc: '',
          types: emptyArray,
          lists: emptyLists,
          ctrl: {
            cats: emptyArray,
            roles: emptyArray,
            users: user === undefined ? emptyArray : [user],
            type: schedule.ctrl.type,
            defu: schedule.ctrl.defu,
          },
        };
      }

      if (!scheduleWidgetUserRights.checkIsHasRights(userR, ScheduleWidgetUserRoleRight.ReadTitles)) {
        return {
          ...schedule,
          days: schedule.days.map(mapCantReadTitlesDay),
          topic: '',
          tatts: emptyArray,
          dsc: '',
          ctrl: {
            cats: emptyArray,
            roles: emptyArray,
            users: schedule.ctrl.users,
            type: schedule.ctrl.type,
            defu: schedule.ctrl.defu,
          },
        };
      }

      if (!scheduleWidgetUserRights.checkIsHasRights(userR, ScheduleWidgetUserRoleRight.ReadSpecials)) {
        return {
          ...schedule,
          days: schedule.days.map(schedule.withTech === 1 ? mapCantReadSpecialsDayWithoutTech : mapCantReadSpecialsDay),
          ctrl: {
            cats: emptyArray,
            roles: emptyArray,
            users: schedule.ctrl.users,
            type: schedule.ctrl.type,
            defu: schedule.ctrl.defu,
          },
        };
      }

      return schedule;
    });

    return {
      ...schedules,
      ...list,
    };
  },
};

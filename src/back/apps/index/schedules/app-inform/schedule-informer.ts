import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import nodeSchedule from 'node-schedule';
import {
  indexScheduleCheckIsDayIsPast,
  indexScheduleGetDayEventTimes,
  indexScheduleGetDayStartMs,
  IScheduleWidget,
  SchedulePeriodKind,
  ScheduleWidgetCleans,
  ScheduleWidgetDayi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  ScheduleWidgetWid,
  takeSchedulePeriodNextStart,
} from 'shared/api';
import { howMillisecondsInMin } from 'shared/const/ms';
import { checkIsNumber } from 'shared/utils/checkIs';
import { forEachObjectEntries } from 'shared/utils/object.utils';
import { takeScheduleWidgetTiny } from '../schedule.tiny';
import { sendSchedulePush } from './web-push';

const pushComsActionTitle = 'Список песен';
const pushGoToComsTitle = 'Перейти к списку песен';

const jobs: Record<string, nodeSchedule.Job> = {};

const takeSchedule = async (scheduleScalar: ScheduleWidgetWid | IScheduleWidget) =>
  checkIsNumber(scheduleScalar) ? await takeScheduleWidgetTiny({ w: scheduleScalar }, false) : scheduleScalar;

class SchedulePushInformer {
  constructor() {
    nodeSchedule.scheduleJob('1 0 * * *', () => void initSchedulePushInform());
  }

  inform = async (scheduleScalar: ScheduleWidgetWid | IScheduleWidget) => {
    const schedule = await takeSchedule(scheduleScalar);
    if (schedule == null) return;

    this.cancelJobs(schedule.w);

    if (schedule.isPaused) return;

    const now = Date.now();
    const appInform = schedule.appInform ?? 0;
    const period = schedule.period;
    const isPeriodic = period != null && period.kind !== SchedulePeriodKind.Once;
    const periodicDelta = isPeriodic ? this.takePeriodicDelta(schedule, now) : null;

    for (let i = 0; i < schedule.days.length; i++) {
      const dayi = i as ScheduleWidgetDayi;
      const day = schedule.days[dayi];

      if (!day.list.length || (!isPeriodic && indexScheduleCheckIsDayIsPast(schedule, dayi))) continue;

      const times = indexScheduleGetDayEventTimes(schedule, day);
      const wakeupMs = ScheduleWidgetCleans.computeDayWakeUpTime(day.wup, 'number');
      const dayStartMs = indexScheduleGetDayStartMs(schedule, dayi);

      for (let eventi = 0; eventi < day.list.length; eventi++) {
        const event = day.list[eventi];
        if (event.noAppInform === 1) continue;

        const eventTimeMs = ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]) * howMillisecondsInMin;
        const eventStartMs = dayStartMs + wakeupMs + times[eventi] * howMillisecondsInMin - eventTimeMs;

        this.informEvent(schedule, dayi, eventi, eventStartMs, now, appInform, false);

        if (periodicDelta) this.informEvent(schedule, dayi, eventi, eventStartMs + periodicDelta, now, appInform, true);
      }
    }
  };

  private takePeriodicDelta(schedule: IScheduleWidget, now: number) {
    const nextStart = takeSchedulePeriodNextStart(schedule, now);
    if (nextStart == null) return null;

    return new Date(nextStart).setHours(0, 0, 0, 0) - new Date(schedule.start).setHours(0, 0, 0, 0);
  }

  private informEvent(
    schedule: IScheduleWidget,
    dayi: ScheduleWidgetDayi,
    eventi: number,
    startMs: number,
    now: number,
    appInform: number,
    isPeriodic: boolean,
  ) {
    if (startMs <= now) return;

    this.setJob(schedule.w, dayi, eventi, startMs, false, isPeriodic);

    const leadStartMs = startMs - appInform * howMillisecondsInMin;

    if (appInform >= 5 && leadStartMs > now) this.setJob(schedule.w, dayi, eventi, leadStartMs, true, isPeriodic);
  }

  private cancelJobs(schw: ScheduleWidgetWid) {
    const prefix = `${schw}-`;

    forEachObjectEntries(jobs, (key, job) => {
      if (!key.startsWith(prefix)) return;

      job.cancel();
      delete jobs[key];
    });
  }

  private setJob(
    schw: ScheduleWidgetWid,
    dayi: ScheduleWidgetDayi,
    eventi: number,
    startMs: number,
    isLead: boolean,
    isPeriodic = false,
  ) {
    const key = `${schw}-${dayi}-${eventi}${isLead ? 'l' : ''}${isPeriodic ? 'p' : ''}`;

    jobs[key]?.cancel();
    jobs[key] = nodeSchedule.scheduleJob(new Date(startMs), () => void this.send(schw, dayi, eventi, isLead));
  }

  private send = async (schw: ScheduleWidgetWid, dayi: ScheduleWidgetDayi, eventi: number, isLead: boolean) => {
    const schedule = await takeSchedule(schw);
    const event = schedule?.days[dayi]?.list[eventi];
    if (schedule == null || schedule.isPaused || event == null) return;

    const appInform = schedule.appInform ?? 0;

    if (appInform !== 0 && (!isLead || appInform >= 5)) {
      const userIds = schedule.ctrl.users
        .filter(user => {
          const rights = user.R ?? schedule.ctrl.defu;

          return (
            scheduleWidgetUserRights.checkIsHasRights(rights, ScheduleWidgetUserRoleRight.Read) &&
            (!event.secret ||
              scheduleWidgetUserRights.checkIsHasRights(rights, ScheduleWidgetUserRoleRight.ReadSpecials))
          );
        })
        .map(user => user.id);

      if (userIds.length) {
        const eventTypeTitle = schedule.types[event.type]?.title ?? '';
        const comsUrl = event.atts?.['[cm]:coms']
          ? `/cm/li/events?schw=${schedule.w}&dayi=${dayi}&eventMi=${event.mi}`
          : null;
        const eventTitle = eventTypeTitle + (event.topic ? `: ${event.topic}` : '');
        const body = [comsUrl ? `${eventTitle} ● ${pushGoToComsTitle}` : eventTitle, event.dsc]
          .filter(Boolean)
          .join('\n');

        await sendSchedulePush(userIds, {
          title: schedule.title || eventTypeTitle,
          body: isLead ? `Напоминание за ${appInform} мин. — ${body}` : body,
          url: comsUrl ?? `/!other/cm/schs?schw=${schedule.w}`,
          tag: `sch-${schedule.w}-${dayi}-${event.mi}`,
          actions: comsUrl ? [{ action: 'coms', title: pushComsActionTitle, url: comsUrl }] : undefined,
        }).catch(error => console.error('Web push schedule inform error', error));
      }
    }

    await this.inform(schedule.w);
  };
}

export const schedulePushInformer = new SchedulePushInformer();

export const initSchedulePushInform = async () => {
  (await db.select({ w: scheduleDB.w }).from(scheduleDB)).forEach(sch => void schedulePushInformer.inform(sch.w));
};

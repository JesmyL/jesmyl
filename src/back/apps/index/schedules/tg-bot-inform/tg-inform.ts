import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { jesmylTgBot } from 'back/sides/telegram-bot/bot';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import nodeSchedule from 'node-schedule';
import { SendMessageOptions } from 'node-telegram-bot-api';
import {
  attInformStorage,
  indexScheduleCheckIsDayIsPast,
  indexScheduleGetDayEventTimes,
  indexScheduleGetDayStartMs,
  indexScheduleGetEventFinishMs,
  IScheduleWidget,
  IScheduleWidgetDay,
  IScheduleWidgetDayEvent,
  ScheduleWidgetCleans,
  ScheduleWidgetDayi,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
  ScheduleWidgetWid,
} from 'shared/api';
import { howMillisecondsInMin } from 'shared/const/ms';
import { checkIsNil, checkIsNotString, checkIsNumber } from 'shared/utils/checkIs';
import { objectEntries } from 'shared/utils/object.utils';
import { convertMd2HTMLMaker } from 'shared/utils/tg-replaces';
import { takeScheduleWidgetTiny } from '../schedule.tiny';
import { onScheduleDayEventIsNeedTgInformSetEvent, onScheduleUserTgInformSetEvent } from '../specific-modify-events';
import { makeScheduleWidgetJoinTitle } from './message-catchers';
import { sendSchedulePush } from './web-push';

const getSchedule = async (scheduleScalar: ScheduleWidgetWid | IScheduleWidget) =>
  checkIsNumber(scheduleScalar) ? await takeScheduleWidgetTiny({ w: scheduleScalar }, false) : scheduleScalar;

const jobs: Record<number, nodeSchedule.Job> = {};
const unsubscribeQueryDataNamePrefix = 'sch-wdgt-unsub:';
const subscribeQueryDataNamePrefix = 'sch-wdgt-sub:';

const unsubOptions = {} as Record<ScheduleWidgetWid, SendMessageOptions>;

const convertMd2HTML = convertMd2HTMLMaker(true);
const plainTgTag: typeof ScheduleWidgetCleans.putInTgTag = (_tag, text) => text;

const openDayScheduleKey: SendMessageOptions = {
  parse_mode: 'HTML',
  reply_markup: {
    inline_keyboard: [[{ text: 'Расписание дня', url: 'https://t.me/jesmylbot/jesmylapp' }]],
  },
};

const newPointLineMarker = '● ';
const doubleNl = '\n\n';

class TgInformer {
  constructor() {
    this.listenUserPersonalTgQueries();

    nodeSchedule.scheduleJob('1 0 * * *', () => initTgScheduleInform());
  }

  inform = async (scheduleScalar: ScheduleWidgetWid | IScheduleWidget, invokeDayi?: ScheduleWidgetDayi) => {
    const schedule = await getSchedule(scheduleScalar);

    if (!schedule?.days) return;

    if (checkIsNil(invokeDayi) || !indexScheduleCheckIsDayIsPast(schedule, invokeDayi)) jobs[schedule.w]?.cancel();

    if (
      schedule.days.length === 0 ||
      indexScheduleCheckIsDayIsPast(schedule, (schedule.days.length - 1) as ScheduleWidgetDayi) ||
      (invokeDayi !== undefined && indexScheduleCheckIsDayIsPast(schedule, invokeDayi))
    )
      return;

    const now = Date.now();
    const daysLen = schedule.days.length;
    const informBeforeTime = schedule.tgInformTime;
    const tgChatId = !schedule.tgChatReqs
      ? null
      : isNaN(parseInt(schedule.tgChatReqs, 10))
        ? null
        : parseInt(schedule.tgChatReqs, 10);

    dayLoop: for (let i = 0; i < daysLen; i++) {
      const dayi = i as ScheduleWidgetDayi;
      const day = schedule.days[dayi];

      if (day.list.length === 0 || indexScheduleCheckIsDayIsPast(schedule, dayi)) continue;
      const times = indexScheduleGetDayEventTimes(schedule, day);
      const wakeupMs = ScheduleWidgetCleans.computeDayWakeUpTime(day.wup, 'number');
      const dayStartMs = indexScheduleGetDayStartMs(schedule, dayi);

      for (let eventi = 0; eventi < day.list.length; eventi++) {
        const event = day.list[eventi];
        const eventTimeMin = ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]);
        const eventTimeMs = eventTimeMin * howMillisecondsInMin;

        if (now > indexScheduleGetEventFinishMs(schedule, wakeupMs, dayi, times[eventi]) - eventTimeMs) continue;

        const eventStartMs = dayStartMs + wakeupMs + times[eventi] * howMillisecondsInMin - eventTimeMs;

        const minutesRemaning = (eventStartMs - now) / howMillisecondsInMin;

        let time =
          event.tgInform !== 0 && informBeforeTime > 0
            ? minutesRemaning > informBeforeTime
              ? now + (minutesRemaning - informBeforeTime) * howMillisecondsInMin + 100
              : minutesRemaning > 0.3
                ? null
                : eventStartMs
            : eventStartMs;

        if (time === null) {
          const prevEvent = day.list[eventi - 1] as IScheduleWidgetDayEvent | und;
          const prevEventTimeMin =
            prevEvent && ScheduleWidgetCleans.takeEventTm(prevEvent, schedule.types[prevEvent.type]);

          time =
            now +
            100 +
            (prevEventTimeMin !== undefined && prevEventTimeMin <= informBeforeTime && prevEventTimeMin > 4
              ? howMillisecondsInMin
              : 0);
        }

        this.setJob(
          schedule.w,
          dayi,
          day,
          eventi,
          eventStartMs,
          time,
          informBeforeTime,
          dayStartMs,
          wakeupMs,
          times,
          tgChatId,
        );

        break dayLoop;
      }
    }
  };

  private setJob(
    schw: ScheduleWidgetWid,
    dayi: ScheduleWidgetDayi,
    day: IScheduleWidgetDay,
    eventi: number,
    eventStartMs: number,
    time: number,
    informBeforeTime: number,
    dayStartMs: number,
    wakeupMs: number,
    times: number[],
    tgChatId: number | null,
  ) {
    jobs[schw]?.cancel();
    jobs[schw] = nodeSchedule.scheduleJob(time, async () => {
      const schedule = await getSchedule(schw);
      if (!schedule?.days[dayi]?.list[eventi]) return;

      const event = schedule.days[dayi].list[eventi];
      const timeToEvent = Math.ceil((eventStartMs - Date.now()) / howMillisecondsInMin);
      const isWithDelay = event.tgInform !== 0 && timeToEvent > 0;
      const leadTimeTitle = isWithDelay ? 'Через ' + timeToEvent + 'м.' : '';
      const isTgInformEnabled = schedule.tgInform !== 0;
      const isAppInformEnabled = schedule.appInform !== 0;
      const isTgSendAvailable = isTgInformEnabled && jesmylTgBot.isStarted;

      const secrets: string[] = [];

      const makeTextParts = (
        collectSecrets: false | string[],
        tag: typeof ScheduleWidgetCleans.putInTgTag = ScheduleWidgetCleans.putInTgTag,
        convertDsc: typeof convertMd2HTML = convertMd2HTML,
      ) => {
        let nextEventTitle = '';
        let attsText = '';
        let delayTitlePrefix = '';
        const joinedTitle = makeScheduleWidgetJoinTitle(schedule, day, eventi, collectSecrets, tag);

        if (isWithDelay) {
          delayTitlePrefix = leadTimeTitle + ' ';
        } else {
          let timedEventi = eventi;
          let nextTimedEventi = -1;
          let eventTimeMin = ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]);
          let isFoundTimedEventi = eventTimeMin !== 0;
          let isSetAttTitle = false;

          for (let dayEventi = eventi; dayEventi < day.list.length; dayEventi++) {
            const dayEvent = day.list[dayEventi];
            const dayEventTimeMin = ScheduleWidgetCleans.takeEventTm(dayEvent, schedule.types[dayEvent.type]);

            if (dayEventTimeMin > 0)
              if (isFoundTimedEventi) nextTimedEventi = dayEventi;
              else {
                isFoundTimedEventi = true;
                timedEventi = dayEventi;
              }

            if (nextTimedEventi > -1) break;
          }

          for (let attEventi = eventi; attEventi < day.list.length; attEventi++) {
            const event = day.list[attEventi];
            const eventTm = ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]);

            if (!event.atts) break;

            const attEntries = objectEntries(event.atts);

            if (!eventTm) isSetAttTitle = true;
            if (!isSetAttTitle && (event.atts == null || !attEntries.length)) break;
            const eventTitle = isSetAttTitle ? ` (${schedule.types[event.type].title})` : '';

            const attText = attEntries
              .map(([key, value]) => {
                return (
                  attInformStorage[key]?.(value, eventTitle, schedule, dayi, event, key.split(':')[2] || '-') ?? ''
                );
              })
              .join('');

            if (attText) attsText += newPointLineMarker + attText;
            if (eventTm) break;
          }

          if (eventTimeMin === 0) {
            const timedEvent = day.list[timedEventi];
            eventTimeMin = ScheduleWidgetCleans.takeEventTm(timedEvent, schedule.types[timedEvent.type]);
          }

          if (eventTimeMin > informBeforeTime) {
            let labelTimeTo = `через ${eventTimeMin}м.`;

            if (eventTimeMin > 45) {
              const date = new Date(dayStartMs + wakeupMs + times[timedEventi] * howMillisecondsInMin);
              labelTimeTo = `в ${('' + date.getHours()).padStart(2, '0')}:` + ('' + date.getMinutes()).padStart(2, '0');
            }

            const nextEventJoinedTitle = makeScheduleWidgetJoinTitle(
              schedule,
              day,
              timedEventi + 1,
              collectSecrets,
              tag,
            );

            nextEventTitle =
              nextEventJoinedTitle &&
              newPointLineMarker + tag('i', `${nextEventJoinedTitle} - ${labelTimeTo}`) + doubleNl;
          }
        }

        if (!joinedTitle) return null;

        return {
          joinedTitle,
          heading: delayTitlePrefix + joinedTitle,
          dscText:
            event.tgInform === 0 && event.dsc
              ? newPointLineMarker + tag(event.secret ? 'i' : 'code', convertDsc(event.dsc)) + doubleNl
              : '',
          attsText,
          nextEventTitle,
          scheduleTitle: newPointLineMarker + tag('u', tag('i', schedule.title)),
        };
      };

      const makeText = (collectSecrets: false | string[]) => {
        const parts = makeTextParts(collectSecrets);

        return (
          parts &&
          parts.heading + doubleNl + parts.dscText + parts.attsText + parts.nextEventTitle + parts.scheduleTitle
        );
      };

      const text = makeText(secrets);

      const options: SendMessageOptions = (unsubOptions[schedule.w] ??= {
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: 'Отписаться от ' + schedule.title,
                callback_data: unsubscribeQueryDataNamePrefix + schedule.w,
              },
            ],
          ],
        },
      });

      if (isTgSendAvailable && tgChatId !== null && secrets.length) {
        const text = makeText(false);

        if (text)
          try {
            const admins = await jesmylTgBot.bot.getChatAdministrators(tgChatId);
            await Promise.allSettled(
              admins
                .filter(admin => !admin.user.is_bot)
                .map(admin => jesmylTgBot.sendMessage(admin.user.id, text, tglogger)),
            );
          } catch (_error) {
            //
          }
      }

      let sendUserMessage = async (tgId: number) => {
        if (!isTgSendAvailable || text === null) return;

        try {
          if (tgChatId !== null) {
            await jesmylTgBot.bot.getChatMember(tgChatId, tgId);
            return;
          }
        } catch (_error) {
          //
        }

        jesmylTgBot.sendMessage(tgId, text, tglogger, options);
      };

      try {
        if (isTgSendAvailable && text)
          if (tgChatId !== null) {
            const message = await jesmylTgBot.sendMessage(tgChatId, text, tglogger, openDayScheduleKey);

            if (checkIsNotString(message.value)) {
              if (await jesmylTgBot.bot.pinChatMessage(tgChatId, message.value.message_id))
                jesmylTgBot.bot.deleteMessage(tgChatId, message.value.message_id + 1);
            }
          } else
            sendUserMessage = async (tgId: number) => {
              jesmylTgBot.sendMessage(tgId, text, tglogger, options);
            };
      } catch (_error) {
        //
      }

      for (const user of schedule.ctrl.users) {
        if (
          user.tgId === undefined ||
          user.tgInform === 0 ||
          !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.Read) ||
          (event.secret && !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.ReadSpecials))
        )
          continue;

        if (text) sendUserMessage(user.tgId);
      }

      const pushUserIds = schedule.ctrl.users
        .filter(
          user =>
            scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.Read) &&
            !(
              event.secret &&
              !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.ReadSpecials)
            ),
        )
        .map(user => user.id);

      if (isAppInformEnabled && pushUserIds.length) {
        const eventTypeTitle = schedule.types[event.type]?.title ?? '';
        const pushParts = makeTextParts([], plainTgTag, dsc => dsc);
        const pushTitle = schedule.title || eventTypeTitle;
        const pushBody = pushParts ? (pushParts.heading + doubleNl + pushParts.dscText).trim() : '';

        void sendSchedulePush(pushUserIds, {
          title: pushTitle,
          body: pushBody,
          url: `/!other/cm/schs?schw=${schedule.w}`,
          tag: `sch-${schedule.w}-${dayi}-${event.mi}`,
        }).catch(error => console.error('Web push schedule inform error', error));
      }

      setTimeout(() => this.inform(schedule.w));

      if (event.tgInform !== 0) {
        onScheduleDayEventIsNeedTgInformSetEvent.invoke({
          dayEventProps: { dayi, eventMi: event.mi, schw: schedule.w },
          value: 0,
          isNeedRefreshTgInformTime: false,
        });
      }
    });
  }

  private listenUserPersonalTgQueries() {
    jesmylTgBot.listenPersonalQueries(async event => {
      if (
        event.value.data !== undefined &&
        (event.value.data.startsWith(unsubscribeQueryDataNamePrefix) ||
          event.value.data.startsWith(subscribeQueryDataNamePrefix))
      ) {
        const schw = +event.value.data.split(':')[1] as ScheduleWidgetWid;

        const schedule = await getSchedule(schw);
        if (schedule == null) return;

        const userTgId = event.value.from.id;
        const user = schedule.ctrl.users.find(user => user.tgId === userTgId);

        if (
          user === undefined ||
          user.tgId === undefined ||
          !scheduleWidgetUserRights.checkIsHasRights(user.R, ScheduleWidgetUserRoleRight.Read)
        )
          return;

        const isSubscribe = event.value.data.startsWith(subscribeQueryDataNamePrefix);

        const text =
          (isSubscribe ? 'Вы подписались на TG-информирование' : 'Вы отписались от TG-информирования') +
          ' о событиях мероприятия "' +
          schedule.title +
          '"';

        await onScheduleUserTgInformSetEvent.invoke({
          isNotInform: isSubscribe ? 1 : 0,
          schProps: { schw },
          userId: user.id,
        });

        jesmylTgBot.sendMessage(userTgId, text, tglogger, {
          reply_markup: {
            inline_keyboard: [
              [
                isSubscribe
                  ? {
                      text: 'Отписаться',
                      callback_data: unsubscribeQueryDataNamePrefix + schedule.w,
                    }
                  : {
                      text: 'Подписаться',
                      callback_data: subscribeQueryDataNamePrefix + schedule.w,
                    },
              ],
            ],
          },
        });

        event.stopPropagation({ text });
        return;
      }
    });
  }
}

export const scheduleTgInformer = new TgInformer();

export const initTgScheduleInform = async () => {
  (await db.select({ w: scheduleDB.w }).from(scheduleDB)).forEach(sch => scheduleTgInformer.inform(sch.w));
};

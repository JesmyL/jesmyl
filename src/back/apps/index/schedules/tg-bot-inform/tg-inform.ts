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
  IScheduleWidgetWid,
  ScheduleWidgetCleans,
  scheduleWidgetUserRights,
  ScheduleWidgetUserRoleRight,
} from 'shared/api';
import { convertMd2HTMLMaker, SMyLib, smylib } from 'shared/utils';
import { schedulesFileStore } from '../file-stores';
import { onScheduleDayEventIsNeedTgInformSetEvent, onScheduleUserTgInformSetEvent } from '../specific-modify-events';
import { makeScheduleWidgetJoinTitle } from './message-catchers';

const getSchedule = (scheduleScalar: number | IScheduleWidget) =>
  smylib.isNum(scheduleScalar) ? schedulesFileStore.getValue().find(sch => sch.w === scheduleScalar) : scheduleScalar;

const jobs: Record<number, nodeSchedule.Job> = {};
const unsubscribeQueryDataNamePrefix = 'sch-wdgt-unsub:';
const subscribeQueryDataNamePrefix = 'sch-wdgt-sub:';

const unsubOptions = {} as Record<IScheduleWidgetWid, SendMessageOptions>;

const convertMd2HTML = convertMd2HTMLMaker(true);

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
  }

  inform = (scheduleScalar: number | IScheduleWidget, invokeDayi?: number) => {
    const schedule = getSchedule(scheduleScalar);

    if (schedule === undefined) return;

    if (invokeDayi === undefined || !indexScheduleCheckIsDayIsPast(schedule, invokeDayi)) jobs[schedule.w]?.cancel();

    if (
      schedule.tgInform === 0 ||
      schedule.days.length === 0 ||
      indexScheduleCheckIsDayIsPast(schedule, schedule.days.length - 1) ||
      (invokeDayi !== undefined && indexScheduleCheckIsDayIsPast(schedule, invokeDayi))
    )
      return;

    const now = Date.now();
    const daysLen = schedule.days.length;
    const informBeforeTime = schedule.tgInformTime;
    const tgChatId =
      schedule.tgChatReqs === undefined
        ? null
        : isNaN(parseInt(schedule.tgChatReqs, 10))
          ? null
          : parseInt(schedule.tgChatReqs, 10);

    dayLoop: for (let dayi = 0; dayi < daysLen; dayi++) {
      const day = schedule.days[dayi];

      if (day.list.length === 0 || indexScheduleCheckIsDayIsPast(schedule, dayi)) continue;
      const times = indexScheduleGetDayEventTimes(schedule, day);
      const wakeupMs = ScheduleWidgetCleans.computeDayWakeUpTime(day.wup, 'number');
      const dayStartMs = indexScheduleGetDayStartMs(schedule, dayi);

      for (let eventi = 0; eventi < day.list.length; eventi++) {
        const event = day.list[eventi];
        const eventTimeMin = ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]);
        const eventTimeMs = eventTimeMin * smylib.howMs.inMin;

        if (now > indexScheduleGetEventFinishMs(schedule, wakeupMs, dayi, times[eventi]) - eventTimeMs) continue;

        const eventStartMs = dayStartMs + wakeupMs + times[eventi] * smylib.howMs.inMin - eventTimeMs;

        const minutesRemaning = (eventStartMs - now) / smylib.howMs.inMin;

        let time =
          event.tgInform !== 0 && informBeforeTime > 0
            ? minutesRemaning > informBeforeTime
              ? now + (minutesRemaning - informBeforeTime) * smylib.howMs.inMin + 100
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
              ? smylib.howMs.inMin
              : 0);
        }

        this.setJob(
          schedule.w,
          invokeDayi,
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
    schw: IScheduleWidgetWid,
    invokeDayi: number | und,
    dayi: number,
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
    jobs[schw] = nodeSchedule.scheduleJob(time, async () => {
      const schedule = getSchedule(schw);
      if (!schedule) return;

      const event = day.list[eventi];
      const timeToEvent = Math.ceil((eventStartMs - Date.now()) / smylib.howMs.inMin);
      const isWithDelay = event.tgInform !== 0 && timeToEvent > 0;

      const secrets: string[] = [];

      const makeText = (isJustCollectSecrets: boolean) => {
        let nextEventTitle = '';
        let attsText = '';
        let delayTitlePrefix = '';
        const eventTitle = makeScheduleWidgetJoinTitle(schedule, day, eventi, isJustCollectSecrets && secrets);

        if (isWithDelay) {
          delayTitlePrefix = 'Через ' + timeToEvent + 'м. ';
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

            const attEntries = SMyLib.entries(event.atts);

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
              const date = new Date(dayStartMs + wakeupMs + times[timedEventi] * smylib.howMs.inMin);
              labelTimeTo = `в ${('' + date.getHours()).padStart(2, '0')}:` + ('' + date.getMinutes()).padStart(2, '0');
            }

            const nextEventJoinedTitle = makeScheduleWidgetJoinTitle(
              schedule,
              day,
              timedEventi + 1,
              isJustCollectSecrets && secrets,
            );

            nextEventTitle =
              nextEventJoinedTitle &&
              newPointLineMarker +
                ScheduleWidgetCleans.putInTgTag('i', `${nextEventJoinedTitle} - ${labelTimeTo}`) +
                doubleNl;
          }
        }

        return eventTitle
          ? delayTitlePrefix +
              eventTitle +
              doubleNl +
              (event.tgInform === 0 && event.dsc
                ? newPointLineMarker +
                  ScheduleWidgetCleans.putInTgTag(event.secret ? 'i' : 'code', convertMd2HTML(event.dsc)) +
                  doubleNl
                : '') +
              attsText +
              nextEventTitle +
              newPointLineMarker +
              ScheduleWidgetCleans.putInTgTag('u', ScheduleWidgetCleans.putInTgTag('i', schedule.title))
          : null;
      };

      const text = makeText(true);

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

      if (tgChatId !== null && secrets.length) {
        const text = makeText(false);

        if (text)
          try {
            const admins = await jesmylTgBot.bot.getChatAdministrators(tgChatId);
            admins.forEach(admin => {
              if (admin.user.is_bot) return;

              jesmylTgBot.bot.sendMessage(admin.user.id, text, { parse_mode: 'HTML' });
            });
          } catch (_error) {
            //
          }
      }

      let sendUserMessage = async (tgId: number) => {
        if (text === null) return;

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
        if (text)
          if (tgChatId !== null) {
            const message = await jesmylTgBot.sendMessage(tgChatId, text, tglogger, openDayScheduleKey);

            if (!smylib.isStr(message.value)) {
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

      setTimeout(() => this.inform(schedule.w, invokeDayi));

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
        const schw = +event.value.data.split(':')[1];

        const schedule = getSchedule(schw);
        if (schedule === undefined) return;

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
          userLogin: user.login,
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

export const initTgScheduleInform = () => {
  schedulesFileStore.getValue().forEach(scheduleTgInformer.inform);
};

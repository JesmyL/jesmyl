/* eslint-disable no-constant-condition */
import { scheduleDB } from 'back/drizzle.schema';
import { db } from 'back/drizzle/drizzle.db';
import { jesmylTgBot } from 'back/sides/telegram-bot/bot';
import { like } from 'drizzle-orm';
import { makeRegExp } from 'regexpert';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleWidgetCleans, ScheduleWidgetDayi } from 'shared/api';
import { itNNull } from 'shared/utils';
import {
  onScheduleDayBeginTimeSetEvent,
  onScheduleDayEventListSetEvent,
  onScheduleEventTypesAddManyEvent,
} from '../specific-modify-events';

export const makeScheduleWidgetJoinTitle = (
  schedule: IScheduleWidget,
  day: IScheduleWidgetDay,
  eventi: number,
  collectSecrets: false | string[],
): string => {
  const titles: string[] = [];

  const check = (eventi: number) => {
    const event = day.list[eventi];

    if (event == null) return;

    const eventTimeMin = ScheduleWidgetCleans.takeEventTm(event, schedule.types[event.type]);
    const titleInner = schedule.types[event.type].title + (event.topic ? ': ' + event.topic : '');
    const title = ScheduleWidgetCleans.putInTgTag('b', titleInner);

    if (eventTimeMin === 0) check(eventi + 1);

    if (event.secret) {
      if (collectSecrets) collectSecrets.push(title);
      else titles.unshift(ScheduleWidgetCleans.putInTgTag('tg-spoiler', title));

      return;
    }

    titles.unshift(title);
  };

  check(eventi);

  return titles.join(' / ');
};

const getScheduleByRequisit = async (requisit: `${number}/%` | `%/${string}`) =>
  (await db.select().from(scheduleDB).where(like(scheduleDB.tgChatReqs, requisit)).limit(1)).at(0);

const getScheduleAndTodayiByRequisit = async (requisit: `${number}/%` | `%/${string}`) => {
  const schedule = await getScheduleByRequisit(requisit);

  if (!schedule) throw 'Мероприятие не найдено';

  const dayi = ScheduleWidgetCleans.getCurrentDayi(schedule);

  if (dayi < 0) throw 'Мероприятие не началось';
  if (dayi > schedule.days.length - 1) throw 'Мероприятие прошло';

  return [schedule, dayi] as const;
};

export const scheduleWidgetEventRaitingTgButtonQueryPrefix = 'schWgtEventDayUserRating';

const parseCbData_ = 'parseScheduleWidgetDayText';
const deleteButtonsCbData_ = 'deleteButtons';
const markup = {
  inline_keyboard: [
    [{ text: 'Преобразовать на сегодня', callback_data: parseCbData_ }],
    [{ text: 'Удалить эти кнопки', callback_data: deleteButtonsCbData_ }],
  ],
};

export const scheduleWidgetMessageCatcher = jesmylTgBot.catchMessages(async (message, bot) => {
  if (
    !message.from ||
    !message.text ||
    message.text.search(makeRegExp('/расписание/i')) < 0 ||
    !(await getScheduleByRequisit(`${message.chat.id}/%`))
  )
    return;

  if (!(await bot.getChatAdministrators(message.chat.id)).some(member => member.user.id === message.from!.id)) return;

  try {
    const { head, text } = ScheduleWidgetCleans.text2PreparedText(message.text);

    try {
      await bot.sendMessage(message.chat.id, `<code>${head}\n\n${text}</code>`, {
        parse_mode: 'HTML',
        reply_markup: markup,
        disable_notification: true,
      });

      await bot.deleteMessage(message.chat.id, message.message_id);
    } catch (error) {
      console.error(error);
    }
  } catch (errorText) {
    await bot.sendMessage(message.chat.id, '' + errorText, { parse_mode: 'HTML' });
  }
});

jesmylTgBot.catchCallbackQuery(async (query, bot, answer) => {
  const ret = (text: string) => answer({ text });

  if (query.message === undefined || query.message.text === undefined) return ret('');

  try {
    if (!(await bot.getChatAdministrators(query.message.chat.id)).some(member => member.user.id === query.from.id))
      return ret('Такие действия только для админов этой группы');
  } catch (_error) {
    return ret('Ошибка');
  }

  if (query.data === deleteButtonsCbData_) {
    if (query.message?.text !== undefined)
      bot.editMessageText(`<code>${query.message.text}</code>`, {
        chat_id: query.message.chat.id,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
      });

    return answer('');
  }

  if (query.data !== parseCbData_) return ret('');

  let schedule: IScheduleWidget;
  let dayi = -1 as ScheduleWidgetDayi;

  try {
    [schedule, dayi] = await getScheduleAndTodayiByRequisit(`%/${query.chat_instance}`);
  } catch (error) {
    return ret('' + error);
  }

  if (schedule.days[dayi]?.list.length) return ret('Для обновления расписания список событий должен быть пустым');

  const { dayWup, list, newTypes } = ScheduleWidgetCleans.preparedText2DayList(query.message.text, schedule);

  if (+!+'find sch') {
    const schedule = await getScheduleByRequisit(`%/${query.chat_instance}`);

    if (!schedule) return ret('Расписание не найдено');

    const dayProps = { dayi, schw: schedule.w };

    onScheduleEventTypesAddManyEvent.invoke({ schProps: dayProps, typeList: newTypes });
    onScheduleDayBeginTimeSetEvent.invoke({ dayProps, strWup: '' + dayWup });
    onScheduleDayEventListSetEvent.invoke({ dayProps, list: list.filter(itNNull) });
  }

  return ret('Расписание дня обновлено');
});

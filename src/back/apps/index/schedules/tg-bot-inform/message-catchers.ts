/* eslint-disable no-throw-literal */
import TelegramBot from 'node-telegram-bot-api';
import { IScheduleWidget, IScheduleWidgetDay, ScheduleStorage, ScheduleWidgetCleans } from 'shared/api';
import { itNNull, makeRegExp } from 'shared/utils';
import { jesmylTgBot } from '../../../../sides/telegram-bot/bot';
import { schedulesFileStore } from '../base-invocators/file-stores';

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

const findAdminThis = {} as { from: TelegramBot.User };

function findAdmin(this: typeof findAdminThis, member: TelegramBot.ChatMember) {
  return member.user.id === this.from.id;
}

const getSchedules = (): ScheduleStorage => ({
  list: schedulesFileStore.getValue(),
});
const getScheduleByRequisit = (requisit: `${number}/` | `/${string}`) =>
  getSchedules().list.find(sch => sch.tgChatReqs?.includes(requisit));

const getScheduleAndTodayiByRequisit = (requisit: `${number}/` | `/${string}`) => {
  const schedule = getScheduleByRequisit(requisit);

  if (schedule == null) throw 'Мероприятие не найдено';

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
    message.from === undefined ||
    message.text === undefined ||
    message.text.search(makeRegExp('/расписание/i')) < 0 ||
    getScheduleByRequisit(`${message.chat.id}/`) === undefined
  )
    return;

  findAdminThis.from = message.from;
  if (!(await bot.getChatAdministrators(message.chat.id)).some(findAdmin, findAdminThis)) return;

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
  if (query.data === deleteButtonsCbData_) {
    if (query.message?.text !== undefined)
      bot.editMessageText(`<code>${query.message.text}</code>`, {
        chat_id: query.message.chat.id,
        message_id: query.message.message_id,
        parse_mode: 'HTML',
      });

    return answer('');
  }

  const ret = (text: string) => answer({ text });

  if (query.message === undefined || query.message.text === undefined || query.data !== parseCbData_) return ret('');

  try {
    findAdminThis.from = query.from;
    if (!(await bot.getChatAdministrators(query.message.chat.id)).some(findAdmin, findAdminThis))
      return ret('Обновлять расписание могут только админы этой группы');
  } catch (error) {
    return ret('Ошибка');
  }

  let schedule,
    dayi = -1;

  try {
    [schedule, dayi] = getScheduleAndTodayiByRequisit(`/${query.chat_instance}`);
  } catch (errorMessage) {
    return ret('' + errorMessage);
  }

  if (!schedule.days[dayi]?.list.length) return ret('Для обновления расписания список событий должен быть пустым');

  const { dayWup, list, newTypes } = ScheduleWidgetCleans.preparedText2DayList(query.message.text, schedule);

  // const auth = await SokiAuther.getTgAuth(query.from.id);

  // if (addAttTypesExecs[0]?.args.value.length) {
  //   try {
  //     const { errorMessage } = await sokiServer.execExecs('index', addAttTypesExecs, auth, auth);
  //     if (errorMessage) return ret(errorMessage);
  //   } catch (error) {
  //     return ret('' + error);
  //   }
  // }

  if (true) {
    const schedule = getScheduleByRequisit(`/${query.chat_instance}`);

    if (schedule === undefined) return ret('Расписание не найдено');

    const addEventsExecs = [
      {
        action: 'putDayEventList',
        args: {
          schw: schedule.w,
          dayi,
          value: list.filter(itNNull),
        },
      },
      {
        action: 'setDayWup',
        args: {
          schw: schedule.w,
          dayi,
          value: dayWup,
        },
      },
    ];

    // try {
    //   const { errorMessage } = await sokiServer.execExecs('index', addEventsExecs, auth, auth);
    //   if (errorMessage) return ret(errorMessage);
    // } catch (error) {
    //   return ret('' + error);
    // }
  }

  if (query.message?.text !== undefined)
    await bot.editMessageText(`<code>${query.message.text}</code>`, {
      chat_id: query.message.chat.id,
      message_id: query.message.message_id,
      parse_mode: 'HTML',
    });

  return ret('Расписание дня обновлено');
});

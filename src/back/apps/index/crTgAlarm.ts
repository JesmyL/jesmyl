import { filer } from 'back/complect/filer/Filer';
import { jesmylTgBot } from 'back/sides/telegram-bot/bot';
import { tglogger } from 'back/sides/telegram-bot/log/log-bot';
import { JesmylTelegramBot } from 'back/sides/telegram-bot/tg-bot';
import nodeSchedule from 'node-schedule';
import { itIt, itNNaN, smylib } from 'shared/utils';

type CrAlarm = {
  hours: number;
  minutes: number;
  days: number[];
  dates: string[];
};

const crTelegramBot = new JesmylTelegramBot({
  bot: jesmylTgBot,
  chatId: -1002426462260,
  logger: tglogger,
  uniqPrefix: '>',
});

export const startCrTgAlarm = () => {
  const timeFormatter = new Intl.RelativeTimeFormat('ru', { style: 'long', numeric: 'auto' });
  let prevJob: nodeSchedule.Job;
  let nextPaymentInTimeDate: Date;
  let nextAlarmDate: Date;

  const queryPrefix = {
    changeHours: 'changeAlarmHours',
    changeMinutes: 'changeAlarmMinutes',
    changeDays: 'changeAlarmDays',
    showInfo: 'showAlarmInfo',
  };

  const daysFixMessageReplyIndicator = '&cr_day_line_edit_reply;';

  crTelegramBot.onChatMessages((bot, message) => {
    if (!message.text) return;

    if (message.text.startsWith('/do')) {
      bot.postMessage('Доступные действия', {
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Изменить время (часы) напоминания', callback_data: queryPrefix.changeHours }],
            [{ text: 'Изменить время (минуты) напоминания', callback_data: queryPrefix.changeMinutes }],
            [{ text: 'Изменить дни напоминания', callback_data: queryPrefix.changeDays }],
            [{ text: 'Информация', callback_data: queryPrefix.showInfo }],
          ],
        },
      });
    }

    if (message.reply_to_message?.text?.includes(daysFixMessageReplyIndicator)) {
      const strNumbers = message.text.split(/\D+/);

      const numbers = Array.from(new Set(strNumbers))
        .filter(itIt)
        .map(Number)
        .filter(itNNaN)
        .sort((a, b) => b - a);

      modifyCrDataAndSetAlarm(crData => {
        crData.days = numbers;
      });

      bot.deleteMessage(message.reply_to_message.message_id);
    }
  });

  crTelegramBot.onChatQueries(async (bot, query, answer) => {
    if (query.data === undefined || query.message === undefined) {
      answer('Не найдено');
      return;
    }

    if (query.data === queryPrefix.changeHours) {
      await bot.editMessageText(query.message.message_id, 'Выберите новое время (часы) для напоминания', {
        reply_markup: {
          inline_keyboard: [
            [4, 5, 6, 7, 8],
            [9, 10, 11, 12, 13],
            [14, 15, 16, 17, 18],
            [19, 20, 21, 22, 23],
          ].map(line => {
            return line.map(hourNum => {
              return {
                text: `${hourNum.toString().padStart(2, '0')}:..`,
                callback_data: `${queryPrefix.changeHours}:${hourNum}`,
              };
            });
          }),
        },
      });

      answer('Выберите значение');

      return;
    }

    if (query.data === queryPrefix.showInfo) {
      const crData = getCrData();
      if (crData == null) {
        answer('Ошибка');
        return;
      }

      const todayDate = new Date();

      todayDate.setHours(0, 0, 0, 0);

      await bot.editMessageText(
        query.message.message_id,
        `Следующий платёж ${nextPaymentInTimeDate.toLocaleDateString('ru')} (${timeFormatter.format(
          Math.floor((nextPaymentInTimeDate.getTime() - todayDate.getTime()) / smylib.howMs.inDay),
          'days',
        )})` +
          `\n\nНапоминание будет: ` +
          crData.days
            .map(daysNum =>
              daysNum ? `\n  за ${daysNum} ${smylib.declension(daysNum, 'день', 'дня', 'дней')}` : '\n  в день платежа',
            )
            .join(', ') +
          `\n\nВремя напоминания: ` +
          `${crData.hours.toString().padStart(2, '0')}:${crData.minutes.toString().padStart(2, '0')}` +
          `\nСледующее напоминание ${nextAlarmDate.toLocaleString('ru').slice(0, -3)} (${timeFormatter.format(
            Math.floor((nextAlarmDate.getTime() - todayDate.getTime()) / smylib.howMs.inDay),
            'days',
          )})`,
      );

      return;
    }

    if (query.data === queryPrefix.changeMinutes) {
      await bot.editMessageText(query.message.message_id, 'Выберите новое время (минуты) для напоминания', {
        reply_markup: {
          inline_keyboard: [
            [0, 1, 2, 3],
            [4, 5, 6, 7],
            [8, 9, 10, 11],
          ].map(line => {
            return line.map(minutesIndex => {
              const minutesNum = minutesIndex * 5;

              return {
                text: `..:${minutesNum.toString().padStart(2, '0')}`,
                callback_data: `${queryPrefix.changeMinutes}:${minutesNum}`,
              };
            });
          }),
        },
      });

      answer('Выберите значение');

      return;
    }

    if (query.data === queryPrefix.changeDays) {
      await bot.editMessageText(
        query.message.message_id,
        `Для определения дней напоминания, сделайте ответ на это сообщение,` +
          ` в котором пропишите через пробел или запятую цифры` +
          ` "дней напоминания до нужной даты"\n\nСистемная информация: ${daysFixMessageReplyIndicator}`,
      );

      answer('Отправьте новое значение сообщение');

      return;
    }

    if (query.data.startsWith(queryPrefix.changeMinutes)) {
      const minutesStr = query.data.split(':')[1];

      if (!minutesStr) {
        answer('Ошибка 189274994');
        return;
      }

      modifyCrDataAndSetAlarm(crData => {
        crData.minutes = +minutesStr;
      });

      bot.deleteMessage(query.message.message_id);

      return;
    }

    if (query.data.startsWith(queryPrefix.changeHours)) {
      const hoursStr = query.data.split(':')[1];

      if (!hoursStr) {
        answer('Ошибка 189274994');
        return;
      }

      modifyCrDataAndSetAlarm(crData => {
        crData.hours = +hoursStr;
      });

      bot.deleteMessage(query.message.message_id);

      return;
    }
  });

  const getCrData = () => {
    const crData = filer.contents.index?.crAlarm?.data as CrAlarm | nil;
    return crData;
  };

  const modifyCrDataAndSetAlarm = (cb: (crData: CrAlarm) => void | false) => {
    const crData = getCrData();

    if (crData == null || cb(crData) === false) return;

    filer.saveChanges(['crAlarm'], 'index');

    prevJob?.cancel();
    const nextAlarmDate = setAlarm();

    if (nextAlarmDate == null) {
      crTelegramBot.postMessage('Не удалось установить новое напоминание');
      return;
    }

    const nextAlarmTime = `${nextAlarmDate.toLocaleString('ru').slice(0, -3)}`;

    crTelegramBot.postMessage(`Время следующего напоминания ${nextAlarmTime}`);
  };

  const setAlarm = () => {
    const crData = getCrData();

    if (!smylib.isArr(crData?.dates)) return;

    const today = new Date().toISOString();
    const nearDateStr = crData.dates.find(date => date > today);

    if (nearDateStr === undefined) return;

    nextPaymentInTimeDate = new Date(nearDateStr);
    nextPaymentInTimeDate.setHours(crData.hours, crData.minutes, 0, 0);

    const nextPaymentInTimeTs = nextPaymentInTimeDate.getTime();
    const todayInTimeDate = new Date();
    todayInTimeDate.setHours(crData.hours, crData.minutes, 0, 0);

    const todayInTimeTs = todayInTimeDate.getTime();

    const nowDate = new Date();

    const alarmInTimeTs = crData.days
      .map(daysTo => nextPaymentInTimeTs - daysTo * smylib.howMs.inDay)
      .find(
        nowDate.getHours() >= crData.hours && nowDate.getMinutes() >= crData.minutes
          ? timeTo => timeTo > todayInTimeTs
          : timeTo => timeTo >= todayInTimeTs,
      );

    if (alarmInTimeTs === undefined) return;

    nextAlarmDate = new Date(alarmInTimeTs);
    nextAlarmDate.setHours(crData.hours, crData.minutes, 0, 0);

    prevJob = nodeSchedule.scheduleJob(nextAlarmDate, () => {
      const nextAlarmDate = setAlarm();
      let nextAlarmInfo = 'Больше напоминаний не будет';

      if (nextAlarmDate) {
        const todayInTimeDate = new Date();
        todayInTimeDate.setHours(crData.hours, crData.minutes, 0, 0);

        nextAlarmInfo = `Следующее напоминание ${timeFormatter.format(
          Math.floor((nextAlarmDate.getTime() - todayInTimeDate.getTime()) / smylib.howMs.inDay),
          'day',
        )}`;
      }

      crTelegramBot.postMessage(
        'Оплата кредита ' +
          timeFormatter.format((nextPaymentInTimeTs - alarmInTimeTs) / smylib.howMs.inDay, 'day') +
          `\n\n${nextAlarmInfo}`,
      );
    });

    return nextAlarmDate;
  };

  setTimeout(setAlarm, 1000);
};

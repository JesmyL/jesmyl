/* eslint-disable no-throw-literal */
import { IScheduleWidget, IScheduleWidgetDayEvent, ScheduleWidgetDayListItemTypeBox } from 'shared/api';
import { CustomAttUseTaleId } from 'shared/api/complect/schedule-widget/complect/rights';
import { makeRegExp, SMyLib, smylib } from 'shared/utils';

const singleTitleSymbols = '- ().,/';
const incorrectsTitleReg = makeRegExp(`/[^${singleTitleSymbols}\\dа-яё]/gi`);
const singlesTitleReg = makeRegExp(`/([${singleTitleSymbols}])(\\1+)/g`);
const titleLettersNormalizer = (_: string, __: string, letters: string) => letters[0];

const timeRegStr = ' *\\d{1,2}:\\d{1,2}';
const timeSchLineReg = makeRegExp(`/(${timeRegStr}) (.+)(\\n(?!${timeRegStr}).+)*/g`);

const repEInText = (text: string) => text.replace(makeRegExp('/ё/gi'), 'е');
const extractTitle = ({ title }: { title: string }) => repEInText(title);

type TgTag = '' | 'b' | 'i' | 'u' | 's' | 'tg-spoiler' | 'code' | 'pre';

const likeLetters: Record<string, string> = {
  e: 'е',
  y: 'у',
  u: 'и',
  o: 'о',
  p: 'р',
  a: 'а',
  h: 'н',
  k: 'к',
  x: 'х',
  c: 'с',
  b: 'ь',
  n: 'п',
  m: 'т',

  E: 'Е',
  Y: 'У',
  U: 'И',
  O: 'О',
  P: 'Р',
  A: 'А',
  H: 'Н',
  K: 'К',
  X: 'Х',
  C: 'С',
  B: 'В',
  M: 'М',
  T: 'Т',
};

const likeLettersReg = makeRegExp(`/[${SMyLib.keys(likeLetters).join('')}]/g`);
const repLikeLetters = (letter: string) => likeLetters[letter];

export class ScheduleWidgetCleans {
  static checkIsTaleIdUnit = (num: number, taleId: CustomAttUseTaleId) => Math.trunc(num) + taleId === num;

  static computeDayWakeUpTime = <ReturnAs extends 'number' | 'string'>(
    wup: number,
    returnAs: ReturnAs,
  ): ReturnAs extends 'number' ? number : string => {
    const [, beginHours, , beginMinutes] = ('' + wup).match(makeRegExp('/(\\d+)(\\.(\\d+))?/')) || [];
    const wakeUpMinutes = +(beginMinutes?.padEnd(2, '0') || 0);

    return (
      returnAs === 'number'
        ? +(beginHours || 0) * smylib.howMs.inHour + wakeUpMinutes * smylib.howMs.inMin
        : `${beginHours.padStart(2, '0')}:${('' + wakeUpMinutes).padStart(2, '0')}`
    ) as never;
  };

  static packDayWakeUpTime = (wupTime: string) => +wupTime.replace(makeRegExp('/\\D+/'), '.');

  static takeEventTm = (event?: IScheduleWidgetDayEvent, box?: ScheduleWidgetDayListItemTypeBox) => {
    return event?.tm ?? box?.tm ?? 0;
  };

  static daysToText = (days: number, isNeedCalculate?: boolean) => {
    const daysTo = isNeedCalculate ? Math.ceil(days / smylib.howMs.inDay) : days;
    return daysTo + ' ' + smylib.declension(daysTo, 'день', 'дня', 'дней');
  };
  static hoursToText = (hoursTo: number) => hoursTo + ' ' + smylib.declension(hoursTo, 'час', 'часа', 'часов');
  static minutesToText = (minutes: number, isNeedCalculate?: boolean) => {
    const minutesTo = isNeedCalculate ? Math.ceil(minutes / smylib.howMs.inMin) : minutes;
    return minutesTo + ' ' + smylib.declension(minutesTo, 'минуту', 'минуты', 'минут');
  };

  static minutesToTextTemplate = (minutes: number, text: string) => {
    const minutesTo = Math.ceil(minutes / smylib.howMs.inMin);

    return smylib.stringTemplater(text, {
      num: minutesTo,
      onNum: (one: string, more: string) => (minutesTo === 1 ? one : more),
      txt: smylib.declension(minutesTo, minutesTo % 10 === 1 ? 'минута' : 'минуту', 'минуты', 'минут'),
    });
  };

  static termsToText = (termsTo: number) => termsTo + ' ' + smylib.declension(termsTo, 'раз', 'раза', 'раз');

  static attachmentTypeTitleNormalize = (text: string, isWithTopic?: boolean) => {
    if (isWithTopic) {
      const notSymboli = text.search(makeRegExp(`/[^- .,\\wа-яё]/gi`));
      const topic = notSymboli < 0 ? '' : text.slice(notSymboli).trim();

      return (
        (notSymboli < 0 ? text : text.slice(0, notSymboli)).trim().replace(likeLettersReg, repLikeLetters) +
        (topic && `: ${topic.replace(makeRegExp('/^\\(([^)]+)\\)$/'), '$1').replace(makeRegExp(`/^: /`), '')}`)
      );
    }
    return text.replace(incorrectsTitleReg, '').replace(singlesTitleReg, titleLettersNormalizer).trim();
  };

  static getCurrentDayi(schedule: IScheduleWidget) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return (date.getTime() - schedule.start + (schedule.withTech ? smylib.howMs.inDay : 0)) / smylib.howMs.inDay;
  }

  static getCurrentEventInDay(schedule: IScheduleWidget, dayi: number) {
    const day = schedule.days[dayi];
    if (day == null) return undefined;

    const date = new Date();
    const dateStart = new Date();
    dateStart.setHours(0, 0, 0, 0);
    date.setSeconds(0, 0);

    const [hoursStr, minsStr = 0] = ('' + day.wup).split('.');

    let prevMins = +hoursStr * 60 + +minsStr;
    const nowMins = (date.getTime() - dateStart.getTime()) / smylib.howMs.inMin;

    for (let eventi = 0; eventi < day.list.length; eventi++) {
      const event = day.list[eventi];

      const tm = this.takeEventTm(event, schedule.types[event.type]);

      prevMins += tm;

      if (nowMins > prevMins && nowMins < prevMins + tm) {
        return event;
      }
    }
  }

  static getCurrentDayiAndEventi(schedule: IScheduleWidget): [number, IScheduleWidgetDayEvent | und] {
    const dayi = this.getCurrentDayi(schedule);

    return [dayi, this.getCurrentEventInDay(schedule, dayi)];
  }

  static text2PreparedText = (text: string) => {
    const lines = text.match(timeSchLineReg);

    if (lines == null || lines.length < 3) throw `Текст должен содержать минимум три строки расписания`;

    let lastTimeStr = '';
    let errors: string[] = [];

    const list = lines.map(line => {
      line = line.trim();

      const lineLines = line.split('\n');

      const [hoursStr, minsStr] = line.slice(0, line.search(makeRegExp('/[^\\d:]/'))).split(':');

      const timeStr = `${hoursStr.padStart(2, '0')}:${minsStr.padStart(2, '0')}`;
      const titleStr = lineLines[0].slice(line.search(makeRegExp('/[^\\d:]/')) + 1);

      if (timeStr < lastTimeStr) errors.push(`Ошибка по времени <b>(${lastTimeStr} > ${timeStr})</b> ${titleStr}`);
      lastTimeStr = timeStr;

      if (errors.length !== 0) return '';

      const description = lineLines.slice(1).join('\n');

      return (
        titleStr
          .split(makeRegExp('/\\s*\\/\\s*/'))
          .map(title => {
            return (
              timeStr +
              ` ${ScheduleWidgetCleans.attachmentTypeTitleNormalize(title[0].toUpperCase() + title.slice(1), true)}`
            );
          })
          .join('\n') + (description ? `\n${description}` : '')
      );
    });

    if (errors.length) {
      throw `В тексте расписания найдены ошибки:\n\n${errors.join('\n')}`;
    } else {
      return {
        head: text.slice(0, text.indexOf(lines[0])).trim(),
        text: list.flat().join('\n'),
      };
    }
  };

  static preparedText2DayList = (text: string, schedule: IScheduleWidget) => {
    const lines = text.match(timeSchLineReg);

    if (lines == null || lines.length < 3) throw 'Ожидается минимум три пункта';

    const titles = new Set(schedule.types.map(extractTitle));

    const tattTimes: Record<string, number> = {};
    const eventTitles: Record<string, string> = {};
    const eventTopics: Record<string, string> = {};
    const eventTimes: Record<string, number> = {};
    const eventDescription: Record<string, string> = {};

    lines.forEach((line, linei, linea) => {
      const lineLines = line.split('\n');
      const firstLine = lineLines[0];

      const [, itileHeap, topic] = firstLine.split(':');

      const nextLine = linea[linei + 1] as string | und;
      let timeMins = 0;

      if (nextLine !== undefined) {
        const [lineHoursStr, lineMinsStr] = firstLine.slice(0, 5).split(':');
        const [nextLineHoursStr, nextLineMinsStr] = nextLine.slice(0, 5).split(':');

        timeMins += (+nextLineHoursStr - +lineHoursStr) * 60 + (+nextLineMinsStr - +lineMinsStr);
      } else timeMins += 5;

      const title = itileHeap.slice(3).trim();
      const eTitle = repEInText(title);

      eventTimes[line] = timeMins;
      eventTitles[line] = title.trim();
      eventTopics[line] = topic?.trim();
      eventDescription[line] = lineLines.slice(1).join('\n');

      if (titles.has(eTitle) || tattTimes[title] !== undefined) return;

      tattTimes[title] = timeMins || 5;
    });

    return {
      newTypes: SMyLib.entries(tattTimes).map(([title, tm]) => ({ title, tm })),
      dayWup: ScheduleWidgetCleans.packDayWakeUpTime(lines[0].slice(0, 5)),
      list: lines.map(line => {
        const tattTitle = eventTitles[line];
        const type = schedule.types.findIndex(({ title }) => repEInText(title) === repEInText(tattTitle));

        if (type < 0) return null;

        const dayEvent = {
          mi: 0 as never,
          type,
          topic: eventTopics[line],
          tm: eventTimes[line] !== tattTimes[tattTitle] ? eventTimes[line] : undefined,
          dsc: eventDescription[line] || undefined,
        } satisfies IScheduleWidgetDayEvent;

        delete dayEvent.mi;

        return dayEvent;
      }),
    };
  };

  static putInTgTag = (tag: TgTag, text: string) => (tag === '' ? text : `<${tag}>${text}</${tag}>`);
}

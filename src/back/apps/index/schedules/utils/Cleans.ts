import smylib from '../../../../shared/SMyLib';
import { IScheduleWidgetDayEvent, ScheduleWidgetDayListItemTypeBox } from '../../models/ScheduleWidget.model';
import { CustomAttUseTaleId } from '../../rights';

export default class ScheduleWidgetCleans {
  static wupsReg = /(\d+)(\.(\d+))?/;

  static checkIsTaleIdUnit = (num: number, taleId: CustomAttUseTaleId) => Math.trunc(num) + taleId === num;

  static computeDayWakeUpTime = <ReturnAs extends 'number' | 'string'>(
    wup: number,
    returnAs: ReturnAs,
  ): ReturnAs extends 'number' ? number : string => {
    const [, beginHours, , beginMinutes] = ('' + wup).match(this.wupsReg) || [];
    const wakeUpMinutes = +(beginMinutes?.padEnd(2, '0') || 0);

    return (
      returnAs === 'number'
        ? +(beginHours || 0) * smylib.howMs.inHour + wakeUpMinutes * smylib.howMs.inMin
        : `${beginHours.padStart(2, '0')}:${('' + wakeUpMinutes).padStart(2, '0')}`
    ) as never;
  };

  static takeEventTm = (event: IScheduleWidgetDayEvent, box?: ScheduleWidgetDayListItemTypeBox) => {
    return event.tm ?? box?.tm ?? 0;
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
}

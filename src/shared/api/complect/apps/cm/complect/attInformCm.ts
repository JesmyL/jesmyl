import { AttTgInformStorage, hosts } from 'shared/api';

export const makeCmScheduleWidgetComListUrl = (
  schw: number | string,
  dayi: number | string,
  eventMi: number | string,
) => `${hosts.host}/!other/cm/schs?attKey=%5Bcm%5D%3A&schw=${schw}&dayi=${dayi}&eventMi=${eventMi}`;

export const cmTgAttInform: AttTgInformStorage = {
  '[cm]:coms': (_value: unknown, eventTitle, schedule, dayi, event) => {
    return `Список песен${eventTitle}:\n${makeCmScheduleWidgetComListUrl(schedule.w, dayi, event.mi)}\n\n`;
  },
};

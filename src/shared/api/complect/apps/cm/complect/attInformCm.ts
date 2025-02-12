import { AttTgInformStorage, CmComBindAttach, hosts } from 'shared/api';

export const makeCmScheduleWidgetComListUrl = (
  schw: number | string,
  dayi: number | string,
  eventMi: number | string,
  attMi: number | string,
) => `${hosts.host}/cm/!other/schs/${schw}/${dayi}/${eventMi}/${attMi}/com-list`;

export const cmTgAttInform: AttTgInformStorage = {
  '[cm]:coms': (_value: CmComBindAttach, eventTitle, schedule, dayi, event, attMi) => {
    return `Список песен${eventTitle}:\n${makeCmScheduleWidgetComListUrl(schedule.w, dayi, event.mi, attMi)}\n\n`;
  },
};

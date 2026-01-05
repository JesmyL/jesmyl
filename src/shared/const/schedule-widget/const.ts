import { IScheduleWidget, IScheduleWidgetWid, ScheduleWidgetRegType, ScheduleWidgetUserRoleRight } from 'shared/api';

export const takeDefaultScheduleWidget: () => IScheduleWidget = () => ({
  w: IScheduleWidgetWid.def,
  m: 0,
  start: 0,
  title: '',
  topic: '',
  dsc: '',
  days: [],
  tatts: [],
  types: [],
  app: 'index',
  tgInformTime: 5,
  ctrl: { cats: [], roles: [], type: ScheduleWidgetRegType.Private, users: [], defu: ScheduleWidgetUserRoleRight.Read },
  games: { criterias: [], list: [] },
  lists: { cats: [], units: [] },
});

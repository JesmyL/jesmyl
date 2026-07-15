import { IScheduleWidget, ScheduleWidgetRegType, ScheduleWidgetUserRoleRight, ScheduleWidgetWidDef } from 'shared/api';

export const takeDefaultScheduleWidget: () => IScheduleWidget = () => ({
  w: ScheduleWidgetWidDef,
  m: 0,
  start: 0,
  title: '',
  topic: '',
  dsc: '',
  days: [],
  tatts: [],
  types: [],
  tgInformTime: 5,
  ctrl: { cats: [], roles: [], type: ScheduleWidgetRegType.Private, users: [], defu: ScheduleWidgetUserRoleRight.Read },
  games: { criterias: [], list: [] },
  lists: { cats: [], units: [] },
});

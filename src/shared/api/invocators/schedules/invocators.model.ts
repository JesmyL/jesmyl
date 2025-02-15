import { AttTranslatorType } from 'back/apps/index/schedules/attTranslatorType';
import {
  IScheduleWidget,
  IScheduleWidgetDayEvent,
  IScheduleWidgetDayEventMi,
  IScheduleWidgetExportableTeam,
  IScheduleWidgetUserMi,
  IScheduleWidgetWid,
  ScheduleAttachmentTypeScopeProps,
  ScheduleDayEventAttachmentScopeProps,
  ScheduleDayEventScopeProps,
  ScheduleDayScopeProps,
  ScheduleEventTypeAttImagineScopeProps,
  ScheduleEventTypeScopeProps,
  ScheduleGameCriteriaScopeProps,
  ScheduleGameScopeProps,
  ScheduleListCategoryScopeProps,
  ScheduleRoleScopeProps,
  ScheduleScopeProps,
  ScheduleUnitScopeProps,
  ScheduleUserListMemberScopeProps,
  ScheduleUserScopeProps,
  ScheduleWidgetAttKey,
  ScheduleWidgetAttOwnValue,
  ScheduleWidgetAttRef,
  ScheduleWidgetPhotoKey,
} from 'shared/api/complect/schedule-widget';

type Callback<Value> = (props: ScheduleScopeProps, value: Value) => IScheduleWidget;

export type SchGeneralSokiInvocatorModel = {
  create: (title: string) => IScheduleWidget;
  remove: (props: ScheduleScopeProps) => IScheduleWidget;
  copySchedule: (props: ScheduleScopeProps, schedule: IScheduleWidget) => IScheduleWidget;
  setDefaultUserRights: (props: ScheduleScopeProps, R: number) => IScheduleWidget;
  setScheduleRegisterType: (props: ScheduleScopeProps, type: number) => IScheduleWidget;

  rename: Callback<string>;
  setTopic: Callback<string>;
  setDescription: Callback<string>;
  setStartTime: Callback<number>;
  setFirstDayAsTech: Callback<1 | und>;

  setTgChatRequisites: Callback<string>;
  toggleIsTgInform: Callback<void>;
  setTgInformTime: Callback<number>;

  setIsTgInformMe: (props: ScheduleScopeProps, type: num) => IScheduleWidget;
};

export type SchUsersSokiInvocatorMethods = {
  addUsersByExcel: (props: ScheduleScopeProps, users: { fio: string }[]) => IScheduleWidget;
  addMe: (props: ScheduleScopeProps, place: string) => IScheduleWidget;
  setUserFio: (props: ScheduleUserScopeProps, fio: string) => IScheduleWidget;
  setUserRights: (props: ScheduleUserScopeProps, R: number) => IScheduleWidget;
  addUserListUnitMembership: (props: ScheduleUserListMemberScopeProps, value: number) => IScheduleWidget;
  removeUserListUnitMembership: (props: ScheduleUserListMemberScopeProps) => IScheduleWidget;
};

export type SchPhotosSokiInvocatorMethods = {
  getSharedPhotos: (schw: IScheduleWidgetWid) => { key: ScheduleWidgetPhotoKey; src: string }[];
  putSharedPhotos: (
    schw: IScheduleWidgetWid,
    photoDict: Record<ScheduleWidgetPhotoKey, string>,
  ) => { addedCount: number; loadedCount: number };
};

export type SchListsSokiInvocatorMethods = {
  createCategory: (props: ScheduleScopeProps) => IScheduleWidget;
  createUnit: (props: ScheduleScopeProps, cati: number) => IScheduleWidget;
  setCategoryTitle: (props: ScheduleListCategoryScopeProps, value: string) => IScheduleWidget;
  setCategoryIcon: (props: ScheduleListCategoryScopeProps, value: TheIconKnownName) => IScheduleWidget;
  setCategoryMembersTitle: (props: ScheduleListCategoryScopeProps, value: string) => IScheduleWidget;
  setCategoryMentorsTitle: (props: ScheduleListCategoryScopeProps, value: string) => IScheduleWidget;

  setUnitTitle: (props: ScheduleUnitScopeProps, value: string, cati: number) => IScheduleWidget;
  setUnitDescription: (props: ScheduleUnitScopeProps, value: string, cati: number) => IScheduleWidget;
};

export type SchRolesSokiInvocatorMethods = {
  createRole: (props: ScheduleScopeProps) => IScheduleWidget;
  setRoleIcon: (props: ScheduleRoleScopeProps, icon: TheIconKnownName, roleTitle: string) => IScheduleWidget;
  setRoleTitle: (props: ScheduleRoleScopeProps, title: string, prevTitle: string) => IScheduleWidget;
  addRoleCategory: (props: ScheduleScopeProps) => IScheduleWidget;
  setRoleCategoryTitle: (props: ScheduleScopeProps, cati: number, title: string, prevTitle: string) => IScheduleWidget;

  setCategoryForRole: (
    props: ScheduleRoleScopeProps,
    cati: number,
    roleTitle: string,
    catTitle: string,
  ) => IScheduleWidget;

  setRoleUser: (
    props: ScheduleRoleScopeProps,
    userMi: IScheduleWidgetUserMi,
    roleTitle: string,
    userName: string,
  ) => IScheduleWidget;
  makeFreeRole: (props: ScheduleRoleScopeProps, roleTitle: string) => IScheduleWidget;
};

export type SchGamesSokiInvocatorMethods = {
  addGame: (props: ScheduleScopeProps) => IScheduleWidget;
  setTeams: (props: ScheduleGameScopeProps, teams: IScheduleWidgetExportableTeam[]) => IScheduleWidget;
  setTitle: (props: ScheduleGameScopeProps, value: string, prevTitle: string) => IScheduleWidget;
  toggleStrikedUser: (props: ScheduleScopeProps, userMi: IScheduleWidgetUserMi, userName: string) => IScheduleWidget;
  addCriteria: (props: ScheduleScopeProps) => IScheduleWidget;
  setCriteriaTitle: (props: ScheduleGameCriteriaScopeProps, value: string, prevTitle: string) => IScheduleWidget;
  setSortedDict: (
    props: ScheduleGameCriteriaScopeProps,
    dict: Record<IScheduleWidgetUserMi, number>,
    criteriaTitle: string,
  ) => IScheduleWidget;
};

export type SchDaysSokiInvocatorMethods = {
  addDay: (props: ScheduleScopeProps) => IScheduleWidget;
  setBeginTime: (props: ScheduleDayScopeProps, value: string) => IScheduleWidget;
  setEventList: (props: ScheduleDayScopeProps, list: OmitOwn<IScheduleWidgetDayEvent, 'mi'>[]) => IScheduleWidget;
  setTopic: (props: ScheduleDayScopeProps, value: string) => IScheduleWidget;
  setDescription: (props: ScheduleDayScopeProps, value: string) => IScheduleWidget;
  addEvent: (props: ScheduleDayScopeProps, typei: number) => IScheduleWidget;
  removeEvent: (
    props: ScheduleDayScopeProps,
    eventMi: IScheduleWidgetDayEventMi,
    eventTypeTitle: string,
  ) => IScheduleWidget;
  moveEvent: (props: ScheduleDayScopeProps, eventMi: IScheduleWidgetDayEventMi, beforei: number) => IScheduleWidget;
};

export type SchDayEventsSokiInvocatorMethods = {
  setTopic: (props: ScheduleDayEventScopeProps, value: string) => IScheduleWidget;
  setDescription: (props: ScheduleDayEventScopeProps, value: string) => IScheduleWidget;
  setIsNeedTgInform: (props: ScheduleDayEventScopeProps, value: num) => IScheduleWidget;
  setTm: (props: ScheduleDayEventScopeProps, value: number) => IScheduleWidget;
  toggleIsSecret: (props: ScheduleDayEventScopeProps, value: void) => IScheduleWidget;

  // attachments
  addAttachment: (
    props: ScheduleDayEventScopeProps,
    attKey: ScheduleWidgetAttKey,
    defaultValue: ScheduleWidgetAttOwnValue,
  ) => IScheduleWidget;

  addAttachmentRef: (
    props: ScheduleDayEventScopeProps,
    attKey: ScheduleWidgetAttKey,
    attRef: ScheduleWidgetAttRef,
  ) => IScheduleWidget;

  removeAttachment: (props: ScheduleDayEventScopeProps, attKey: ScheduleWidgetAttKey) => IScheduleWidget;

  updateCheckListAttachmentValue: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number | null,
    key: num | null,
    value: string | null,
  ) => IScheduleWidget;

  putKeyValueAttachment: (
    props: ScheduleDayEventAttachmentScopeProps,
    key: number | string | boolean,
    value: string | number | [] | null,
  ) => IScheduleWidget;

  setKeyValueAttachmentKey: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    value: string | number | boolean,
  ) => IScheduleWidget;

  changeKeyValueAttachmentKey: (
    props: ScheduleDayEventAttachmentScopeProps,
    key: string | number | boolean,
    value: string | number | boolean,
  ) => IScheduleWidget;

  setKeyValueAttachmentValue: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    value: string | number | [] | null,
  ) => IScheduleWidget;

  addKeyValueAttachmentListItem: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    value: string | number,
  ) => IScheduleWidget;

  setKeyValueAttachmentListItemValue: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    valuei: number,
    value: string | number,
  ) => IScheduleWidget;

  removeKeyValueAttachmentListItemValue: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    value: string | number,
  ) => IScheduleWidget;

  moveKeyValueAttachment: (props: ScheduleDayEventAttachmentScopeProps, itemMi: number) => IScheduleWidget;

  moveKeyValueAttachmentListItem: (
    props: ScheduleDayEventAttachmentScopeProps,
    itemMi: number,
    value: string | number,
  ) => IScheduleWidget;

  // rating
  setRatePoint: (
    props: ScheduleDayEventScopeProps,
    userMi: IScheduleWidgetUserMi,
    ratePoint: number,
    userName: string,
  ) => IScheduleWidget;

  setRateComment: (
    props: ScheduleDayEventScopeProps,
    userMi: IScheduleWidgetUserMi,
    comment: string,
    userName: string,
  ) => IScheduleWidget;
};

export type SchEventTypesSokiInvocatorMethods = {
  create: (props: ScheduleScopeProps, title: string, tm: number) => IScheduleWidget;
  putMany: (props: ScheduleScopeProps, tatts: { title: string; tm: number }[]) => IScheduleWidget;
  setTitle: (props: ScheduleEventTypeScopeProps, value: string, prevTitle: string) => IScheduleWidget;
  setTm: (props: ScheduleEventTypeScopeProps, tm: number) => IScheduleWidget;
  bindAttImagine: (
    props: ScheduleEventTypeAttImagineScopeProps,
    attTranslatorType: AttTranslatorType,
  ) => IScheduleWidget;
  removeAttImagine: (props: ScheduleEventTypeAttImagineScopeProps) => IScheduleWidget;
  setAttImaginePeriod: (props: ScheduleEventTypeAttImagineScopeProps, value: AttTranslatorType) => IScheduleWidget;
};

export type SchAttachmentTypesSokiInvocatorMethods = {
  create: (props: ScheduleScopeProps) => IScheduleWidget;
  setTitle: (props: ScheduleAttachmentTypeScopeProps, value: string, prevTitle: string) => IScheduleWidget;
  setDescription: (props: ScheduleAttachmentTypeScopeProps, value: string, tattTitle: string) => IScheduleWidget;
  setIcon: (props: ScheduleAttachmentTypeScopeProps, value: TheIconKnownName, tattTitle: string) => IScheduleWidget;
  setUse: (props: ScheduleAttachmentTypeScopeProps, value: number, tattTitle: string) => IScheduleWidget;
  setRolesUses: (props: ScheduleAttachmentTypeScopeProps, value: number, tattTitle: string) => IScheduleWidget;
  setListsUses: (props: ScheduleAttachmentTypeScopeProps, value: number, tattTitle: string) => IScheduleWidget;

  createTitleValue: (
    props: ScheduleAttachmentTypeScopeProps,
    tattTitle: string,
    titlesCount: number,
  ) => IScheduleWidget;

  setTitleValue: (
    props: ScheduleAttachmentTypeScopeProps,
    titlei: number,
    value: string,
    tattTitle: string,
    prevTitle: string,
  ) => IScheduleWidget;

  setWhoCanLevel: (
    props: ScheduleAttachmentTypeScopeProps,
    rule: 'R' | 'U',
    value: number,
    tattTitle: string,
  ) => IScheduleWidget;

  toggleUserWhoCan: (
    props: ScheduleAttachmentTypeScopeProps,
    rule: 'Rs' | 'Us',
    userMi: IScheduleWidgetUserMi,
    tattTitle: string,
    userName: string,
  ) => IScheduleWidget;
};

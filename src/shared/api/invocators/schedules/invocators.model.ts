import {
  AttTranslatorType,
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
} from 'shared/api';
import { StameskaIconName } from 'stameska-icon';

type Callback<Value> = (args: { props: ScheduleScopeProps; value: Value }) => IScheduleWidget;

export type SchGeneralSokiInvocatorModel = {
  create: (args: { title: string }) => IScheduleWidget;
  remove: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  copySchedule: (args: { props: ScheduleScopeProps; schedule: IScheduleWidget }) => IScheduleWidget;
  setDefaultUserRights: (args: { props: ScheduleScopeProps; R: number }) => IScheduleWidget;
  setScheduleRegisterType: (args: { props: ScheduleScopeProps; type: number }) => IScheduleWidget;

  rename: Callback<string>;
  setTopic: Callback<string>;
  setDescription: Callback<string>;
  setStartTime: Callback<number>;
  setFirstDayAsTech: Callback<1 | und>;

  setTgChatRequisites: Callback<string>;
  toggleIsTgInform: Callback<void>;
  setTgInformTime: Callback<number>;

  setIsTgInformMe: (args: { props: ScheduleScopeProps; type: num }) => IScheduleWidget;
};

export type SchUsersSokiInvocatorMethods = {
  addUsersByExcel: (args: { props: ScheduleScopeProps; users: { fio: string }[] }) => IScheduleWidget;
  addMe: (args: { props: ScheduleScopeProps; place: string }) => IScheduleWidget;
  setUserFio: (args: { props: ScheduleUserScopeProps; fio: string }) => IScheduleWidget;
  setUserRights: (args: { props: ScheduleUserScopeProps; R: number }) => IScheduleWidget;
  addUserListUnitMembership: (args: { props: ScheduleUserListMemberScopeProps; value: number }) => IScheduleWidget;
  removeUserListUnitMembership: (args: { props: ScheduleUserListMemberScopeProps }) => IScheduleWidget;
};

export type SchPhotosSokiInvocatorMethods = {
  getSharedPhotos: (args: { schw: IScheduleWidgetWid }) => { key: ScheduleWidgetPhotoKey; src: string }[];
  putSharedPhotos: (args: { schw: IScheduleWidgetWid; photoDict: Record<ScheduleWidgetPhotoKey, string> }) => {
    addedCount: number;
    loadedCount: number;
  };
};

export type SchListsSokiInvocatorMethods = {
  createCategory: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  createUnit: (args: { props: ScheduleScopeProps; cati: number }) => IScheduleWidget;
  setCategoryTitle: (args: { props: ScheduleListCategoryScopeProps; value: string }) => IScheduleWidget;
  setCategoryIcon: (args: { props: ScheduleListCategoryScopeProps; value: StameskaIconName }) => IScheduleWidget;
  setCategoryMembersTitle: (args: { props: ScheduleListCategoryScopeProps; value: string }) => IScheduleWidget;
  setCategoryMentorsTitle: (args: { props: ScheduleListCategoryScopeProps; value: string }) => IScheduleWidget;

  setUnitTitle: (args: { props: ScheduleUnitScopeProps; value: string; cati: number }) => IScheduleWidget;
  setUnitDescription: (args: { props: ScheduleUnitScopeProps; value: string; cati: number }) => IScheduleWidget;
};

export type SchRolesSokiInvocatorMethods = {
  createRole: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  setRoleIcon: (args: { props: ScheduleRoleScopeProps; value: StameskaIconName; roleTitle: string }) => IScheduleWidget;
  setRoleTitle: (args: { props: ScheduleRoleScopeProps; value: string; prevTitle: string }) => IScheduleWidget;
  addRoleCategory: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  setRoleCategoryTitle: (args: {
    props: ScheduleScopeProps;
    cati: number;
    title: string;
    prevTitle: string;
  }) => IScheduleWidget;

  setCategoryForRole: (args: {
    props: ScheduleRoleScopeProps;
    value: number;
    roleTitle: string;
    catTitle: string;
  }) => IScheduleWidget;

  setRoleUser: (args: {
    props: ScheduleRoleScopeProps;
    value: IScheduleWidgetUserMi;
    roleTitle: string;
    userName: string;
  }) => IScheduleWidget;
  makeFreeRole: (args: { props: ScheduleRoleScopeProps; value: string }) => IScheduleWidget;
};

export type SchGamesSokiInvocatorMethods = {
  addGame: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  setTeams: (args: { props: ScheduleGameScopeProps; value: IScheduleWidgetExportableTeam[] }) => IScheduleWidget;
  setTitle: (args: { props: ScheduleGameScopeProps; value: string; prevTitle: string }) => IScheduleWidget;
  toggleStrikedUser: (args: {
    props: ScheduleScopeProps;
    userMi: IScheduleWidgetUserMi;
    userName: string;
  }) => IScheduleWidget;
  addCriteria: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  setCriteriaTitle: (args: {
    props: ScheduleGameCriteriaScopeProps;
    value: string;
    prevTitle: string;
  }) => IScheduleWidget;
  setSortedDict: (args: {
    props: ScheduleGameCriteriaScopeProps;
    value: Record<IScheduleWidgetUserMi, number>;
    criteriaTitle: string;
  }) => IScheduleWidget;
};

export type SchDaysSokiInvocatorMethods = {
  addDay: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  setBeginTime: (args: { props: ScheduleDayScopeProps; value: string }) => IScheduleWidget;
  setEventList: (args: {
    props: ScheduleDayScopeProps;
    list: OmitOwn<IScheduleWidgetDayEvent, 'mi'>[];
  }) => IScheduleWidget;
  setTopic: (args: { props: ScheduleDayScopeProps; value: string }) => IScheduleWidget;
  setDescription: (args: { props: ScheduleDayScopeProps; value: string }) => IScheduleWidget;
  addEvent: (args: { props: ScheduleDayScopeProps; value: number }) => IScheduleWidget;
  removeEvent: (args: {
    props: ScheduleDayScopeProps;
    value: { eventMi: IScheduleWidgetDayEventMi; eventTypeTitle: string };
  }) => IScheduleWidget;
  moveEvent: (args: {
    props: ScheduleDayScopeProps;
    value: { eventMi: IScheduleWidgetDayEventMi; beforei: number };
  }) => IScheduleWidget;
};

export type SchDayEventsSokiInvocatorMethods = {
  setTopic: (args: { props: ScheduleDayEventScopeProps; value: string }) => IScheduleWidget;
  setDescription: (args: { props: ScheduleDayEventScopeProps; value: string }) => IScheduleWidget;
  setIsNeedTgInform: (args: { props: ScheduleDayEventScopeProps; value: num }) => IScheduleWidget;
  setTm: (args: { props: ScheduleDayEventScopeProps; value: number }) => IScheduleWidget;
  toggleIsSecret: (args: { props: ScheduleDayEventScopeProps; value: void }) => IScheduleWidget;

  // attachments
  addAttachment: (args: {
    props: ScheduleDayEventScopeProps;
    attKey: ScheduleWidgetAttKey;
    defaultValue: ScheduleWidgetAttOwnValue;
  }) => IScheduleWidget;

  addAttachmentRef: (args: {
    props: ScheduleDayEventScopeProps;
    attKey: ScheduleWidgetAttKey;
    attRef: ScheduleWidgetAttRef;
  }) => IScheduleWidget;

  removeAttachment: (args: { props: ScheduleDayEventScopeProps; attKey: ScheduleWidgetAttKey }) => IScheduleWidget;

  updateCheckListAttachmentValue: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number | null;
    key: num | null;
    value: string | null;
  }) => IScheduleWidget;

  putKeyValueAttachment: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    key: number | string | boolean;
    value: string | number | [] | null;
  }) => IScheduleWidget;

  setKeyValueAttachmentKey: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number;
    value: string | number | boolean;
  }) => IScheduleWidget;
  changeKeyValueAttachmentKey: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    key: string | number | boolean;
    value: string | number | boolean;
  }) => IScheduleWidget;
  setKeyValueAttachmentValue: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number;
    value: string | number | [] | null;
  }) => IScheduleWidget;
  addKeyValueAttachmentListItem: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number;
    value: string | number;
  }) => IScheduleWidget;
  setKeyValueAttachmentListItemValue: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number;
    valuei: number;
    value: string | number;
  }) => IScheduleWidget;

  removeKeyValueAttachmentListItemValue: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number;
    value: string | number;
  }) => IScheduleWidget;

  moveKeyValueAttachment: (args: { props: ScheduleDayEventAttachmentScopeProps; itemMi: number }) => IScheduleWidget;

  moveKeyValueAttachmentListItem: (args: {
    props: ScheduleDayEventAttachmentScopeProps;
    itemMi: number;
    value: string | number;
  }) => IScheduleWidget;

  // rating
  setRatePoint: (args: {
    props: ScheduleDayEventScopeProps;
    userMi: IScheduleWidgetUserMi;
    ratePoint: number;
    userName: string;
  }) => IScheduleWidget;

  setRateComment: (args: {
    props: ScheduleDayEventScopeProps;
    userMi: IScheduleWidgetUserMi;
    comment: string;
    userName: string;
  }) => IScheduleWidget;
};

export type SchEventTypesSokiInvocatorMethods = {
  create: (args: { props: ScheduleScopeProps; title: string; tm: number }) => IScheduleWidget;
  putMany: (args: { props: ScheduleScopeProps; tatts: { title: string; tm: number }[] }) => IScheduleWidget;
  setTitle: (args: { props: ScheduleEventTypeScopeProps; value: string; prevTitle: string }) => IScheduleWidget;
  setTm: (args: { props: ScheduleEventTypeScopeProps; tm: number }) => IScheduleWidget;
  bindAttImagine: (args: {
    props: ScheduleEventTypeAttImagineScopeProps;
    attTranslatorType: AttTranslatorType;
  }) => IScheduleWidget;
  removeAttImagine: (args: { props: ScheduleEventTypeAttImagineScopeProps }) => IScheduleWidget;
  setAttImaginePeriod: (args: {
    props: ScheduleEventTypeAttImagineScopeProps;
    value: AttTranslatorType;
  }) => IScheduleWidget;
};

export type SchAttachmentTypesSokiInvocatorMethods = {
  create: (args: { props: ScheduleScopeProps }) => IScheduleWidget;
  setTitle: (args: { props: ScheduleAttachmentTypeScopeProps; value: string; prevTitle: string }) => IScheduleWidget;
  setDescription: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    value: string;
    tattTitle: string;
  }) => IScheduleWidget;
  setIcon: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    value: StameskaIconName;
    tattTitle: string;
  }) => IScheduleWidget;
  setUse: (args: { props: ScheduleAttachmentTypeScopeProps; value: number; tattTitle: string }) => IScheduleWidget;
  setRolesUses: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    value: number;
    tattTitle: string;
  }) => IScheduleWidget;
  setListsUses: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    value: number;
    tattTitle: string;
  }) => IScheduleWidget;

  createTitleValue: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    tattTitle: string;
    titlesCount: number;
  }) => IScheduleWidget;

  setTitleValue: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    titlei: number;
    value: string;
    tattTitle: string;
    prevTitle: string;
  }) => IScheduleWidget;

  setWhoCanLevel: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    rule: 'R' | 'U';
    value: number;
    tattTitle: string;
  }) => IScheduleWidget;

  toggleUserWhoCan: (args: {
    props: ScheduleAttachmentTypeScopeProps;
    rule: 'Rs' | 'Us';
    userMi: IScheduleWidgetUserMi;
    tattTitle: string;
    userName: string;
  }) => IScheduleWidget;
};

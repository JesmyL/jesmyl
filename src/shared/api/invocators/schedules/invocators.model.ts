import {
  IScheduleWidget,
  IScheduleWidgetExportableTeam,
  IScheduleWidgetUserMi,
  IScheduleWidgetWid,
  ScheduleGameCriteriaScopeProps,
  ScheduleGameScopeProps,
  ScheduleListCategoryScopeProps,
  ScheduleRoleScopeProps,
  ScheduleScopeProps,
  ScheduleUnitScopeProps,
  ScheduleUserListMemberScopeProps,
  ScheduleUserScopeProps,
  ScheduleWidgetPhotoKey,
} from 'shared/api/complect/schedule-widget';

type Callback<Value> = (props: ScheduleScopeProps, value: Value) => IScheduleWidget;

export type SchSokiInvocatorMethods = {
  oooooooooooooooooooooooooooooooooooooo: (...args: any[]) => void;

  // general
  create: (title: string) => IScheduleWidget;
  remove: (props: ScheduleScopeProps) => IScheduleWidget;

  rename: Callback<string>;
  setTopic: Callback<string>;
  setDescription: Callback<string>;
  setStartTime: Callback<number>;
  setFirstDayAsTech: Callback<1 | und>;

  setTgChatRequisites: Callback<string>;
  toggleIsTgInform: Callback<void>;
  setTgInformTime: Callback<number>;

  //days
  addDay: (props: ScheduleScopeProps) => IScheduleWidget;

  // users
  addUsersByExcel: (props: ScheduleScopeProps, users: { fio: string }[]) => IScheduleWidget;
  setUserFio: (props: ScheduleUserScopeProps, fio: string) => IScheduleWidget;
  setUserRights: (props: ScheduleUserScopeProps, R: number) => IScheduleWidget;

  // photos
  getSharedPhotos: (schw: IScheduleWidgetWid) => { key: ScheduleWidgetPhotoKey; src: string }[];
  putSharedPhotos: (
    schw: IScheduleWidgetWid,
    photoDict: Record<ScheduleWidgetPhotoKey, string>,
  ) => { addedCount: number; loadedCount: number };

  // lists
  createListCategory: (props: ScheduleScopeProps) => IScheduleWidget;
  createListCategoryUnit: (props: ScheduleScopeProps, cati: number) => IScheduleWidget;
  setListCategoryTitle: (props: ScheduleListCategoryScopeProps, value: string) => IScheduleWidget;
  setListCategoryIcon: (props: ScheduleListCategoryScopeProps, value: KnownIconName) => IScheduleWidget;
  setCategoryMembersTitle: (props: ScheduleListCategoryScopeProps, value: string) => IScheduleWidget;
  setCategoryMentorsTitle: (props: ScheduleListCategoryScopeProps, value: string) => IScheduleWidget;

  setListUnitTitle: (props: ScheduleUnitScopeProps, cati: number, value: string) => IScheduleWidget;
  setListUnitDescription: (props: ScheduleUnitScopeProps, cati: number, value: string) => IScheduleWidget;
  addUserListUnitMembership: (props: ScheduleUserListMemberScopeProps, value: number) => IScheduleWidget;
  removeUserListUnitMembership: (props: ScheduleUserListMemberScopeProps) => IScheduleWidget;

  // roles
  createRole: (props: ScheduleScopeProps) => IScheduleWidget;
  setRoleIcon: (props: ScheduleRoleScopeProps, icon: KnownIconName, roleTitle: string) => IScheduleWidget;
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

  // games + criterias
  addGame: (props: ScheduleScopeProps) => IScheduleWidget;
  setGameTeams: (props: ScheduleGameScopeProps, teams: IScheduleWidgetExportableTeam[]) => IScheduleWidget;
  setGameTitle: (props: ScheduleGameScopeProps, value: string, prevTitle: string) => IScheduleWidget;
  toggleGameStrikedUser: (
    props: ScheduleScopeProps,
    userMi: IScheduleWidgetUserMi,
    userName: string,
  ) => IScheduleWidget;
  addGameCriteria: (props: ScheduleScopeProps) => IScheduleWidget;
  setGameCriteriaTitle: (props: ScheduleGameCriteriaScopeProps, value: string, prevTitle: string) => IScheduleWidget;
  setGameSortedDict: (
    props: ScheduleGameCriteriaScopeProps,
    dict: Record<IScheduleWidgetUserMi, number>,
    criteriaTitle: string,
  ) => IScheduleWidget;

  // // days
  // setDayTopic: (props: ScheduleDayScopeProps, value: string) => IScheduleWidget;
  // setDaySescription: (props: ScheduleDayScopeProps, value: string) => IScheduleWidget;

  // // events
  // setEventTypeTitle: (props: ScheduleScopeProps, value: string) => IScheduleWidget;
  // setEventTypeTm: (props: ScheduleScopeProps, value: number) => IScheduleWidget;

  // // rating
  // setEventRatingComment: (props: ScheduleScopeProps, value: string) => IScheduleWidget;
};

import { SokiAppName, SokiAuthLogin } from '../../soki';
import { ScheduleWidgetRegType, ScheduleWidgetUserRoleRight } from './rights';

export enum IScheduleWidgetWid {
  def = 1,
}
export enum IScheduleWidgetUserMi {
  def = 0,
}
export enum IScheduleWidgetTeamMi {
  def = 1,
}
export enum IScheduleWidgetTeamGameMi {
  def = 1,
}
export enum IScheduleWidgetDayEventMi {
  def = 1,
}

export enum IScheduleWidgetUserCati {
  def = 0,
}
export enum IScheduleWidgetUserUnitMi {
  def = 1,
}

export enum IScheduleWidgetUserTgId {
  def = 1,
}

export type ScheduleWidgetPhotoKey =
  | `${IScheduleWidgetWid}/mi:${IScheduleWidgetUserMi}`
  | `tg.${IScheduleWidgetUserTgId}`
  | `login.${SokiAuthLogin}`;

export interface ScheduleStorage {
  list: IScheduleWidget[];
}

export interface IScheduleWidgetLists {
  cats: IScheduleWidgetListCat[];
  units: IScheduleWidgetListUnit[];
}

export interface IScheduleWidgetListUnit {
  mi: number;
  cati: IScheduleWidgetUserCati;
  title: string;
  dsc: string;
}

export interface IScheduleWidgetListCat {
  title: string;
  icon: KnownIconName;
  titles: [string, string];
}

export interface IScheduleWidget {
  w: IScheduleWidgetWid;
  m: number;
  isRemoved?: 1;
  start: number;
  title: string;
  topic: string;
  dsc: string;
  days: IScheduleWidgetDay[];
  withTech?: 1 | nil;
  types: ScheduleWidgetDayListItemTypeBox[];
  tatts: ScheduleWidgetAppAttCustomized[];
  app: SokiAppName;
  ctrl: IScheduleWidgetCtrl;
  games?: IScheduleWidgetTeamGames;
  lists: IScheduleWidgetLists;
  tgInform?: 0;
  tgChatReqs?: string;
  tgInformTime: number;
}

export interface IScheduleWidgetDay {
  mi: number;
  wup: number; // wakeup
  topic?: string;
  dsc?: string;
  list: IScheduleWidgetDayEvent[];
}

export interface ScheduleWidgetDayListItemTypeBox {
  title: string;
  tm?: number;
  atts?: ScheduleWidgetDayEventAttValues;
}

export interface ScheduleWidgetAppAttCustomized extends ScheduleWidgetAppAttCustomizable {
  mi: number;
  isCustomize: true;
}

export interface ScheduleWidgetAppAttCustomizable
  extends ScheduleWidgetAppAttBasic<ScheduleWidgetAppAttCustomizableValue> {
  use?: number;
  titles?: string[];
  roles?: number;
  list?: number;
}

export interface IScheduleWidgetCtrl {
  cats: string[];
  roles: IScheduleWidgetRole[];
  users: IScheduleWidgetUser[];
  type: ScheduleWidgetRegType;
  defu: ScheduleWidgetUserRoleRight;
}

export interface IScheduleWidgetDayEvent {
  mi: IScheduleWidgetDayEventMi;
  type: number;
  topic?: string;
  dsc?: string;
  tm?: number;
  atts?: ScheduleWidgetDayEventAttValues;
  secret?: 1 | 0;
  rate?: Record<number, [number, string]>;
  tgInform?: 1 | 0;
}

export type ScheduleWidgetDayEventAttValues = Record<ScheduleWidgetAttKey, ScheduleWidgetDayEventAttValue>;

export type ScheduleWidgetAppAttBasic<AttValue extends any = any> = Record<`[SCH]:${string}`, unknown> & {
  icon: KnownIconName;
  title: string;
  im?: `[SCH]:${string}` | nil;
  description: string;
  initVal: AttValue;
  isCustomize?: true;
  R: number;
  Rs?: IScheduleWidgetUserMi[] | nil;
  U: number;
  Us?: IScheduleWidgetUserMi[] | nil;
  routes?: 'React.ReactNode' | any;
};

export type ScheduleWidgetAppAttCustomizableValueItem = [
  string | number | boolean,
  null | string | number | (string | number)[],
  number,
];

export interface ScheduleWidgetAppAttCustomizableValue {
  values?: ScheduleWidgetAppAttCustomizableValueItem[];
}

export interface IScheduleWidgetTeamCriteria {
  title: string;
  sorts: Record<IScheduleWidgetUserMi, number>;
}

export interface IScheduleWidgetTeamMember {
  mi: IScheduleWidgetUserMi;
}

export interface IScheduleWidgetExportableTeam {
  users: IScheduleWidgetTeamMember[];
}

export interface IScheduleWidgetTeam extends IScheduleWidgetExportableTeam {
  title: string;
  mi: IScheduleWidgetTeamMi;
}

export enum IScheduleWidgetTeamGameStrikedMemberState {
  Removed = 1,
  Exists,
}

export interface IScheduleWidgetTeamGame {
  title: string;
  teams: IScheduleWidgetTeam[];
  mi: IScheduleWidgetTeamGameMi;
}

export interface IScheduleWidgetTeamGames {
  list: IScheduleWidgetTeamGame[];
  criterias: IScheduleWidgetTeamCriteria[];
  strikedUsers?: IScheduleWidgetUserMi[];
}

export interface IScheduleWidgetRole {
  mi: number;
  title: string;
  userMi?: IScheduleWidgetUserMi;
  icon?: KnownIconName;
  cati?: number;
}

export interface IScheduleWidgetUser {
  mi: IScheduleWidgetUserMi;
  login?: SokiAuthLogin;
  fio?: string;
  nick?: string;
  R?: number;
  li?: Record<number, IScheduleWidgetUserUnitMi>;
  tgId?: IScheduleWidgetUserTgId;
  tgInform?: num;
}

export type AttKey = SokiAppName | 'SCH';

export type ScheduleWidgetAttKey<AttAppName extends AttKey = AttKey> = `[${AttAppName}]:${string}`;

export type ScheduleWidgetDayEventAttValue = ScheduleWidgetAttOwnValue | ScheduleWidgetAttRef;

export type ScheduleWidgetAttRef = [number, number];
export type ScheduleWidgetAttOwnValue = Record<string, unknown>;

////////////////////////////////////// scopes

export type ScheduleScopeProps = {
  schw: IScheduleWidgetWid;
};

export type ScheduleListCategoryScopeProps = ScheduleScopeProps & {
  cati: number;
};

export type ScheduleGameScopeProps = ScheduleScopeProps & {
  gameMi: IScheduleWidgetTeamGameMi;
};

export type ScheduleGameCriteriaScopeProps = ScheduleScopeProps & {
  criteriai: number;
};

export type ScheduleUnitScopeProps = ScheduleScopeProps & {
  unitMi: number;
};

export type ScheduleRoleScopeProps = ScheduleScopeProps & {
  roleMi: number;
};

export type ScheduleUserScopeProps = ScheduleScopeProps & {
  userMi: IScheduleWidgetUserMi;
};

export type ScheduleUserListMemberScopeProps = ScheduleUserScopeProps & ScheduleListCategoryScopeProps;

export type ScheduleDayScopeProps = ScheduleScopeProps & {
  dayi: number;
};

export type ScheduleDayEventScopeProps = ScheduleDayScopeProps & {
  eventMi: IScheduleWidgetDayEventMi;
};

export type ScheduleDayEventAttImagineScopeProps = ScheduleDayEventScopeProps & {
  imAttKey?: `[SCH]:${string}`;
  attKey: `[${string}]:${string}`;
};

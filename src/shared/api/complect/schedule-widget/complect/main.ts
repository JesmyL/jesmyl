/* eslint-disable @typescript-eslint/no-explicit-any */
import { StameskaIconName } from 'stameska-icon';
import { SokiAppName, SokiAuthLogin } from '../../soki.model';
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
  def = 0,
}
export enum IScheduleWidgetDayEventMi {
  def = 1,
}
export enum IScheduleWidgetDayi {
  def = 0,
}
export enum IScheduleWidgetAttachmentTypeMi {
  def = 0,
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
  icon: StameskaIconName;
  titles: [string, string];
}

export interface IScheduleWidget {
  w: IScheduleWidgetWid;
  m: number;
  isRemoved?: 1;
  start: number;
  prevStart?: number;
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
  mi: IScheduleWidgetAttachmentTypeMi;
  isCustomize?: true;
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
  rate?: Record<IScheduleWidgetUserMi, [number, string]>;
  tgInform?: 1 | 0;
}

export type ScheduleWidgetDayEventAttValues = Record<ScheduleWidgetAttKey, ScheduleWidgetDayEventAttValue>;

export type ScheduleWidgetAppAttBasic<AttValue = any> = Record<`[SCH]:${string}`, unknown> & {
  icon: StameskaIconName;
  title: string;
  im?: `[SCH]:${string}` | nil;
  description: string;
  initVal: AttValue;
  isCustomize?: true;
  R: number;
  Rs?: IScheduleWidgetUserMi[] | nil;
  U: number;
  Us?: IScheduleWidgetUserMi[] | nil;
};

export type ScheduleWidgetAppAttCustomizableValueItem = [
  string | number | boolean,
  null | string | number | (string | number)[],
  number,
];

export type ScheduleWidgetAppAttCheckListValueItem = [num, string, number];

export interface ScheduleWidgetAppAttCustomizableValue {
  values?: ScheduleWidgetAppAttCustomizableValueItem[];
  list?: ScheduleWidgetAppAttCheckListValueItem[];
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
  icon?: StameskaIconName;
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

export type ScheduleWidgetAttRef = [dayi: number, eventMi: IScheduleWidgetDayEventMi];
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

export type ScheduleDayEventAttachmentScopeProps = ScheduleDayEventScopeProps & {
  attKey: ScheduleWidgetAttKey;
  attTitle?: string;
};

export type ScheduleAttachmentTypeScopeProps = ScheduleScopeProps & {
  tattMi: IScheduleWidgetAttachmentTypeMi;
};

export type ScheduleEventTypeScopeProps = ScheduleScopeProps & {
  typei: number;
};

export type ScheduleEventTypeAttImagineScopeProps = ScheduleEventTypeScopeProps & {
  imAttKey?: `[SCH]:${string}`;
  attKey: ScheduleWidgetAttKey;
};

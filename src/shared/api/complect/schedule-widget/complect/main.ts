/* eslint-disable @typescript-eslint/no-explicit-any */
import { SokiAppName, SokiAuthLogin } from '../../soki.model';
import { ScheduleWidgetRegType, ScheduleWidgetUserRoleRight } from './rights';

export type ScheduleWidgetWid = NumberBrand<'ScheduleWidgetWid'>;

export const ScheduleWidgetWidDef = 1 as ScheduleWidgetWid;
export const ScheduleWidgetWidNone = -10 as ScheduleWidgetWid;

export const enum ScheduleWidgetUserMi {
  def = 0,
}
export const enum ScheduleWidgetTeamMi {
  def = 1,
}
export const enum ScheduleWidgetTeamGameMi {
  def = 0,
}
export type ScheduleWidgetDayEventMi = NumberBrand<'ScheduleWidgetDayEventMi'>;
export const ScheduleWidgetDayEventMiDef = 1 as ScheduleWidgetDayEventMi;

export type ScheduleWidgetDayi = NumberBrand<'ScheduleWidgetDayi'>;

export enum ScheduleWidgetAttachmentTypeMi {
  def = 0,
}

export enum ScheduleWidgetUserCati {
  def = 0,
}
export const enum ScheduleWidgetUserUnitMi {
  def = 1,
}

export const enum ScheduleWidgetUserTgId {
  def = 1,
}

export type ScheduleWidgetPhotoKey =
  | `${ScheduleWidgetWid}/mi:${ScheduleWidgetUserMi}`
  | `tg.${ScheduleWidgetUserTgId}`
  | `login.${SokiAuthLogin}`;

export interface IScheduleWidgetLists {
  cats: IScheduleWidgetListCat[];
  units: IScheduleWidgetListUnit[];
}

export interface IScheduleWidgetListUnit {
  mi: number;
  cati: ScheduleWidgetUserCati;
  title: string;
  dsc: string;
}

export interface IScheduleWidgetListCat {
  title: string;
  icon: KnownStameskaIconName;
  titles: [string, string];
}

export type IScheduleWidget = NullifyOptionals<{
  w: ScheduleWidgetWid;
  m: number;
  start: number;
  prevStart?: number;
  title: string;
  topic: string;
  dsc: string;
  days: IScheduleWidgetDay[];
  withTech?: Bool;
  types: ScheduleWidgetDayListItemTypeBox[];
  tatts: ScheduleWidgetAppAttCustomized[];
  ctrl: IScheduleWidgetCtrl;
  games?: IScheduleWidgetTeamGames;
  lists: IScheduleWidgetLists;
  tgInform?: Bool;
  tgChatReqs?: string;
  tgInformTime: number;
  isRemoved?: Bool;
}>;

export interface IScheduleWidgetDay {
  i: ScheduleWidgetDayi;
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
  mi: ScheduleWidgetAttachmentTypeMi;
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
  mi: ScheduleWidgetDayEventMi;
  type: number;
  topic?: string;
  dsc?: string;
  tm?: number;
  atts?: ScheduleWidgetDayEventAttValues;
  secret?: 1 | 0;
  rate?: Record<ScheduleWidgetUserMi, [number, string]>;
  tgInform?: 1 | 0;
}

export type ScheduleWidgetDayEventAttValues = Record<ScheduleWidgetAttKey, ScheduleWidgetDayEventAttValue>;

export type ScheduleWidgetAppAttBasic<AttValue = any> = Record<`[SCH]:${string}`, unknown> & {
  icon: KnownStameskaIconName;
  title: string;
  im?: `[SCH]:${string}` | nil;
  description: string;
  initVal: AttValue;
  isCustomize?: true;
  R: number;
  Rs?: ScheduleWidgetUserMi[] | nil;
  U: number;
  Us?: ScheduleWidgetUserMi[] | nil;
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
  sorts: Record<ScheduleWidgetUserMi, number>;
}

export interface IScheduleWidgetTeamMember {
  mi: ScheduleWidgetUserMi;
}

export interface IScheduleWidgetExportableTeam {
  users: IScheduleWidgetTeamMember[];
}

export interface IScheduleWidgetTeam extends IScheduleWidgetExportableTeam {
  title: string;
  mi: ScheduleWidgetTeamMi;
}

export enum IScheduleWidgetTeamGameStrikedMemberState {
  Removed = 1,
  Exists,
}

export interface IScheduleWidgetTeamGame {
  title: string;
  teams: IScheduleWidgetTeam[];
  mi: ScheduleWidgetTeamGameMi;
}

export interface IScheduleWidgetTeamGames {
  list: IScheduleWidgetTeamGame[];
  criterias: IScheduleWidgetTeamCriteria[];
  strikedUsers?: ScheduleWidgetUserMi[];
}

export interface IScheduleWidgetRole {
  mi: number;
  title: string;
  userMi?: ScheduleWidgetUserMi;
  icon?: KnownStameskaIconName;
  cati?: number;
}

export interface IScheduleWidgetUser {
  mi: ScheduleWidgetUserMi;
  login?: SokiAuthLogin;
  fio?: string;
  nick?: string;
  R?: number;
  li?: Record<number, ScheduleWidgetUserUnitMi>;
  tgId?: ScheduleWidgetUserTgId;
  tgInform?: num;
}

export type AttKey = SokiAppName | 'SCH';

export type ScheduleWidgetAttKey<AttAppName extends AttKey = AttKey> = `[${AttAppName}]:${string}`;

export type ScheduleWidgetDayEventAttValue = ScheduleWidgetAttOwnValue | ScheduleWidgetAttRef;

export type ScheduleWidgetAttRef = [dayi: ScheduleWidgetDayi, eventMi: ScheduleWidgetDayEventMi];
export type ScheduleWidgetAttOwnValue = Record<string, unknown>;

////////////////////////////////////// scopes

export type ScheduleScopeProps = {
  schw: ScheduleWidgetWid;
};

export type ScheduleListCategoryScopeProps = ScheduleScopeProps & {
  cati: number;
};

export type ScheduleGameScopeProps = ScheduleScopeProps & {
  gameMi: ScheduleWidgetTeamGameMi;
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
  userMi: ScheduleWidgetUserMi;
};

export type ScheduleUserListMemberScopeProps = ScheduleUserScopeProps & ScheduleListCategoryScopeProps;

export type ScheduleDayScopeProps = ScheduleScopeProps & {
  dayi: ScheduleWidgetDayi;
};

export type ScheduleDayEventScopeProps = ScheduleDayScopeProps & {
  eventMi: ScheduleWidgetDayEventMi;
};

export type ScheduleDayEventAttachmentScopeProps = ScheduleDayEventScopeProps & {
  attKey: ScheduleWidgetAttKey;
  attTitle?: string;
};

export type ScheduleAttachmentTypeScopeProps = ScheduleScopeProps & {
  tattMi: ScheduleWidgetAttachmentTypeMi;
};

export type ScheduleEventTypeScopeProps = ScheduleScopeProps & {
  typei: number;
};

export type ScheduleEventTypeAttImagineScopeProps = ScheduleEventTypeScopeProps & {
  imAttKey?: `[SCH]:${string}`;
  attKey: ScheduleWidgetAttKey;
};

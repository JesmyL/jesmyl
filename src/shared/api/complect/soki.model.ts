import { JsonSecureString } from 'back/json-secure';
import { User } from 'node-telegram-bot-api';
import { IndexAccessScopeRules, UserAccessRole } from 'shared/model/index/access-rights';
import { DeviceId } from './enums';

export const sokiAppNames = ['index', 'cm', 'tuner', 'q', 'bible', 'storages', 'gamer'] as const;
export type SokiAppName = (typeof sokiAppNames)[number];

export const enum SokiError {
  InvalidToken = '#invalid_token',
}

export interface SokiVisit {
  deviceId: DeviceId;
  deviceEmoji: string;
  urls: string[];
  version: number;
  clientTm: number;
  agent: string;
}

export interface TelegramNativeAuthUserData extends OmitOwn<User, 'language_code' | 'is_bot'> {
  auth_date?: number;
  photo_url?: string | null;
  hash?: string;
}

export type UserLogin = StringBrand<'UserLogin'>;

export type SokiAuthLogin = UserLogin;

export type UserAuth = LocalSokiAuth;

/** @deprecated */
export interface LocalSokiAuth {
  login?: SokiAuthLogin;
  fio?: string;
  nick?: string;
  tgId?: number;
  tgAva?: string;
  email?: string;
}

export type UserInfoUnsecure = UserInfo & { uauth: UserAuth };

export type UserInfo = NullifyOptionals<{
  auth: JsonSecureString<UserAuth>;
  /** login */
  l: UserLogin;
  /** logins */
  ls?: UserLogin[];
  rights?: IndexAccessScopeRules;
  /** role */
  r?: UserAccessRole;
}>;

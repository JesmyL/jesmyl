import { User } from 'node-telegram-bot-api';
import { DeviceId } from './enums';

export const sokiAppNames = ['index', 'cm', 'tuner', 'q', 'bible', 'storages'] as const;
export type SokiAppName = (typeof sokiAppNames)[number];

export const enum SokiError {
  InvalidToken = '#invalid_token',
}

export interface SokiVisit {
  deviceId: DeviceId;
  urls: string[];
  version: number;
  clientTm: number;
  location: object | null;
}

export interface TelegramNativeAuthUserData extends OmitOwn<User, 'language_code' | 'is_bot'> {
  auth_date?: number;
  photo_url?: string | null;
  hash?: string;
}

export const enum SokiAuthLogin {
  def = '{SokiAuthLogin}',
  other = '{other SokiAuthLogin}',
}

export interface LocalSokiAuth {
  level: number;
  fio?: string;
  nick?: string;
  login?: SokiAuthLogin;
  tgId?: number;
  tgAva?: string;
}

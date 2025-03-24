import { User } from 'node-telegram-bot-api';
import { DeviceId } from './enums';
import { SokiInvokerData } from './invocator.master.model';

export const sokiAppNames = ['index', 'cm', 'tuner', 'admin', 'gamer', 'leader', 'bible', 'wed'] as const;
export const sokiAppNamesSet = new Set(sokiAppNames);
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

export type InvocatorBaseEvent = {
  requestId: string;
  invokedResult?: unknown;
  invoke?: SokiInvokerData;
  errorMessage?: string | SokiError;
  abort?: string;
};

export type InvocatorServerEvent = InvocatorBaseEvent & {
  pong?: 1;
};

export type InvocatorClientEvent = InvocatorBaseEvent & {
  token?: string | nil;
  visit?: SokiVisit;
  ping?: 1;
};

export type InvocatorClientTool = { aborter?: AbortController; timeout?: number };

export interface TelegramNativeAuthUserData extends OmitOwn<User, 'language_code' | 'is_bot'> {
  auth_date?: number;
  photo_url?: string | null;
  hash?: string;
}

export interface SokiVisitor {
  fio: string;
  nick: string;
  version: string | number;
  deviceId?: string;
  browser?: string;
  time?: string;
  tgId?: number;
  urls: string[];
}

export interface SokiStatistic {
  online: number;
  authed: number;
  usages: Partial<Record<SokiAppName, SokiVisitor[]>>;
  visits: SokiVisitor[];
  pastVisits: Record<string, number>;
}

export const enum SokiAuthLogin {
  def = '{SokiAuthLogin}',
}

export interface SokiAuth extends BaseSokiAuth {
  level: number;
  passw: string;
}

export interface BaseSokiAuth {
  fio: string;
  nick?: string;
  login: SokiAuthLogin;
  tgId: number;
  tgAva?: string;
}

export interface LocalSokiAuth extends Partial<BaseSokiAuth> {
  level: number;
}

export interface IndexValues {
  chatUrl?: string;
}

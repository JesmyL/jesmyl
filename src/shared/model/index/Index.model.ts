import { AppName } from '#basis/model/App.model';
import { BibleBroadcastScreenConfig } from '$bible/ext';
import { CmBroadcastSchWgtLiveDataValue } from '$cm/ext';
import { LocalSokiAuth } from 'shared/api';

export type IndexErrorScope = keyof ClientRegisterData;

export type IndexSchWBroadcastLiveDataValue = {
  fio: string;
  isHide?: boolean;
  cm?: CmBroadcastSchWgtLiveDataValue;
  bible?: { text: string; addressText: string; config: BibleBroadcastScreenConfig };
  markdown?: string;
};

export interface IndexStateError {
  message?: string | nil;
  scope?: IndexErrorScope;
}

export interface JesmylPassport {
  login: string;
  nick: string;
  fio: string;
  tgId?: number;
}

export interface UserMessage {
  at: string;
  fio: string;
  nick: string;
  login: string;
  message: string;
  read?: boolean;
  w: number;
}

export type Auth = LocalSokiAuth;

export interface ClientAuthorizationData {
  nick: string;
  passw: string;
}

export interface ClientRegisterData {
  login: string;
  passw: string;
  rpassw: string;
  fio: string;
  nick: string;
}

export interface AuthResponse extends Auth {
  ok: boolean;
  mode: AuthMode;
  errors: string[];
  errorId: IndexErrorScope;
}

export type AuthMode = 'check' | 'login' | 'register' | 'auth';

export type IndexPhase = 'main' | 'apps' | 'settings' | 'login' | 'register';
export type IndexSpecialPhase = AppName;
export type IndexAppName = AppName | null;

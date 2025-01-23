import {
  DeviceId,
  IScheduleWidgetWid,
  LocalSokiAuth,
  ServerAuthorizationData,
  ServerRegisterData,
  SokiClientSubData,
} from 'shared/api';
import { AppName } from '../../app/App.model';
import { BibleTranslationScreenConfig } from '../apps/bible/translations/model';
import { CmSchWTranslationLiveDataValue } from '../apps/cm/translation/complect/live/model';

export type IndexErrorScope = keyof ClientRegisterData;

export type IndexSchWTranslationLiveDataValue = {
  fio: string;
  cm?: CmSchWTranslationLiveDataValue;
  bible?: {
    text: string;
    addressText: string;
    config: BibleTranslationScreenConfig;
  };
  markdown?: string;
};

export type ScheduleWidgetTranslationLiveDataKey<
  DevId extends DeviceId | '' = DeviceId,
  Login extends string | und = string,
> = SokiClientSubData<'index', 'sch', IScheduleWidgetWid, DevId, Login>;

export type IndexStateSchLiveData = Record<ScheduleWidgetTranslationLiveDataKey, IndexSchWTranslationLiveDataValue>;

export interface IndexStateError {
  message?: string | nil;
  scope?: IndexErrorScope;
}

export interface JesmylPassport {
  login: string;
  nick: string;
  fio?: string;
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

export interface ServerAuthorizeInSystem {
  register: ServerRegisterData;
  login: ServerAuthorizationData;
}

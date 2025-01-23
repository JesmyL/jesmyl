import { User } from 'node-telegram-bot-api';
import WebSocket from 'ws';
import { DeviceId, IsInvitedGuestCome, SecretChat, ServerStoreContent, SimpleKeyValue } from '..';
import { ExecutionDict, ExecutionReal } from './executer/model';

export const sokiAppNames = ['index', 'cm', 'tuner', 'admin', 'gamer', 'leader', 'bible', 'wed'] as const;
export const sokiAppNamesSet = new Set(sokiAppNames);
export type SokiAppName = (typeof sokiAppNames)[number];

export interface SokiCapsule {
  auth: LocalSokiAuth | null;
  appName?: SokiAppName;
  deviceId: DeviceId;
  urls: string[];
  version: number;
  subscribeData?: SokiClientSubData;
  client: WebSocket;
}

export interface SokiServerEvent {
  appName: SokiAppName | 'external';
  requestId?: string;
  pong?: true;
  pull?: PullEventValue;
  execs?: {
    appName: SokiAppName;
    list: ExecutionReal[];
    lastUpdate: number | null;
  };
  errorMessage?: string | null;
  service?: {
    key: string;
    value?: any;
    errorMessage?: string;
  };
  download?: {
    key: string;
    value: string;
  };
  freshUserContents?: ServerStoreContent[];
  pullFreshUserContentsByTs?: number;
  chatsData?: ChatsData;
  invitedGuest?: { name: string; isCome: IsInvitedGuestCome };

  unregister?: true;
  authorized?: boolean;
  tgAuthorization?: { ok: false; value: string } | { ok: true; value: LocalSokiAuth };
  authorization?: { type: 'login' | 'register' } & ({ ok: false; value: string } | { ok: true; value: LocalSokiAuth });
  statistic?: SokiStatistic;
  liveData?: Record<SokiClientSubData, unknown>;

  invokedResult?: unknown;
  invoke?: SokiInvokerData;
}

export interface ChatsData {
  chats?: SecretChat.ChatMiniInfo[];
  messageLastReads?: SecretChat.ChatLastReadTimeStamp[];
  messages?: Partial<Record<SecretChat.ChatId, SecretChat.ImportableMessage[]>>;
  unreachedMessages?: Partial<Record<SecretChat.ChatId, SecretChat.ImportableMessage[]>>;
  alternativeMessages?: Partial<Record<SecretChat.ChatId, SecretChat.ImportableMessage[]>>;
  users?: SecretChat.ChatMemberUser[];
}

export type SokiClientUpdateCortage = [
  number | nil, // index last update
  string | nil, // index short rules JSON md5
  number | nil, // app last update
  string | nil, // app short rules JSON md5
];

export interface TelegramNativeAuthUserData extends OmitOwn<User, 'language_code' | 'is_bot'> {
  auth_date?: number;
  photo_url?: string | null;
  hash?: string;
}

export interface SokiClientEventBody {
  errorMessage?: string;
  connect?: true;
  tgAuthorization?: number;
  tgNativeAuthorization?: TelegramNativeAuthUserData;
  authorization?: { type: 'login'; value: ServerAuthorizationData } | { type: 'register'; value: ServerRegisterData };
  pullData?: SokiClientUpdateCortage;
  execs?: ExecutionDict[];
  service?: SimpleKeyValue;
  subscribe?: SokiSubscribtionName;
  subscribeData?: SokiClientSubData;
  unsubscribe?: SokiSubscribtionName;
  liveData?: null | Record<SokiClientSubData, unknown>;
  download?: string;
  serverUserContents?: ServerStoreContent[];
  pullFreshUserContentsByTs?: number;
  chatFetch?: {
    chatId: SecretChat.ChatId;
    pullMessages?:
      | true
      | {
          messageId: SecretChat.MessageId;
          isMessageStart: boolean;
          fetchCount?: number;
        };
    pullAlternativeMessagesNearId?: SecretChat.MessageId;
    message?: SecretChat.ExportableMessage;
    newMember?: { userLogin: string };
    removeMessages?: SecretChat.MessageId[];
  };
  chatsFetch?: {
    users?: true;
  };

  inviteGuestData?: {
    guestId: number;
    meetId: string;

    getData?: true;
    setIsCome?: IsInvitedGuestCome;
  };

  invoke?: SokiInvokerData;
  invokedResult?: unknown;
}

export type SokiInvokerEvent = { invokedResult?: unknown; errorMessage?: string };

export type SokiInvokerData = {
  name: string;
  method: string;
  params: unknown[];
};

export type SokiInvokerTranferDto<Tool = und> = {
  invoke: SokiInvokerData;
  send: (event: SokiInvokerEvent, tool: Tool) => void;
  tool: Tool;
};

export type SokiClientSubData<
  AppName extends SokiAppName = SokiAppName,
  Spec extends string = string,
  Id extends number | string = string,
  SubPerson extends number | string | und = und,
  Person extends number | string | und = und,
> = `${AppName}-${Spec}-${Id}${SubPerson extends und ? '' : `:${SubPerson}`}${Person extends und ? '' : `%${Person}`}`;

export type SokiSubscribtionName = 'statistic' | 'liveData';

export type SokiEventName = keyof SokiClientEventBody & keyof SokiServerEvent;

export interface SokiVisitor {
  fio?: string;
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

export interface SokiClientEvent {
  requestId?: string;
  body: SokiClientEventBody;
  ping?: true;
  auth?: LocalSokiAuth;
  appName: SokiAppName;
  deviceId: DeviceId;
  urls: string[];
  version: number;
  browser?: string;
  isUseLS?: boolean;
}

export interface SokiAuthUnitRights {}

export interface PullEventValue {
  appName: SokiAppName;
  updates: SokiClientUpdateCortage;
  contents: [
    SimpleKeyValue[], // index contents
    SimpleKeyValue[], // app contents
  ];
}

export enum SokiAuthLogin {
  def = '{SokiAuthLogin}',
}

export interface SokiAuth extends BaseSokiAuth {
  level: number;
  passw: string;
}

export interface BaseSokiAuth {
  fio: string;
  nick: string;
  login: SokiAuthLogin;
  tgId?: number;
  tgAva?: string;
}

export interface LocalSokiAuth extends Partial<BaseSokiAuth> {
  level: number;
  passw?: string;
}

export interface ServerAuthorizationData {
  login: SokiAuthLogin;
  passw: string;
}

export interface ServerRegisterData {
  login: SokiAuthLogin;
  passw: string;
  rpassw: string;
  fio: string;
  nick: string;
}

export type SokiServiceCallback = (
  key: string,
  value: any,
  getCapsule: () => SokiCapsule | undefined,
  props: SokiServerDoActionProps,
) => Promise<any>;
export type SokiServicePack = Partial<Record<SokiAppName, SokiServiceCallback>>;

export interface SokiServerDoActionProps {
  appName: SokiAppName;
  eventData: SokiClientEvent;
  eventBody: SokiClientEventBody;
  client: WebSocket;
  requestId: string | und;
}

export type SokiServerDoAction<Name extends string> = Record<
  `doOn${Name}`,
  (props: SokiServerDoActionProps) => Promise<boolean> // вернуть (boolean) отвечающий на вопрос "прервать ли дальнейшие операции?"
>;

export const sokiWhenRejButTs = [
  'return this array if need send empty exec list, but sent lastUpdate',
  'JSON STR DATA',
] as const;

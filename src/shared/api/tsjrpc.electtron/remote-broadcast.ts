import { Langi } from '../complect/enums';
import { LocaleBase } from '../../model/+locale/base';
import { BroadcastLiveApp } from 'shared/model/index/Index.model';

export type RemoteBroadcastApp = Exclude<BroadcastLiveApp, 'presentations'>;

export const enum RemoteBroadcastErrorKind {
  None = 0,
  PortBusy = 1,
  NoLanAddress = 2,
  Unknown = 3,
  Banned = 4,
  CertInvalid = 5,
  PendingApproval = 6,
  /** Неверный или уже использованный секретный код подключения */
  InvalidSecretCode = 7,
  /** Необходимо представиться перед подключением */
  NameRequired = 8,
}

export const enum RemoteBroadcastCommandKind {
  Hello = 0,
  CmSlide = 3,
}

export const enum RemoteBroadcastMessageKind {
  Hello = 0,
  Command = 1,
  State = 2,
  Locale = 3,
  Error = 4,
  Token = 5,
  Version = 6,
  /** Имя устройства, которое пульт передаёт после подключения */
  Name = 7,
  /** Список доступных пультов */
  Controls = 8,
}

export const enum RemoteBroadcastComListKind {
  All = 0,
  Fav = 1,
  Sel = 2,
  Cached = 3,
}

export type RemoteBroadcastComItem = { comw: number; name: string };

export type RemoteBroadcastCmLists = {
  all: RemoteBroadcastComItem[];
  fav: RemoteBroadcastComItem[];
  sel: RemoteBroadcastComItem[];
  cached: RemoteBroadcastComItem[];
};

export const emptyRemoteBroadcastCmLists: RemoteBroadcastCmLists = { all: [], fav: [], sel: [], cached: [] };

export type RemoteBroadcastCmSnapshot = {
  comw: number;
  comTitle: string;
  lists: RemoteBroadcastCmLists;
  slidei: number;
  slides: string[];
};

export type RemoteBroadcastCmSnapshotDelta = {
  comw?: number;
  comTitle?: string;
  lists?: RemoteBroadcastCmLists;
  slidei?: number;
  slides?: string[];
};

export type RemoteBroadcastBibleBook = {
  short: string;
  full: string;
  color: string;
  disabled: boolean;
};

export type RemoteBroadcastBibleSearchMatch = {
  booki: number;
  chapteri: number;
  versei: number;
  bookTitle: string;
  html: string;
};

export type RemoteBroadcastBibleTranslation = { name: string; title: string };

export type RemoteBroadcastBibleJoinAddress = PRecord<number, PRecord<number, number[]>>;

export type RemoteBroadcastBibleSnapshot = {
  booki: number;
  chapteri: number;
  versei: number;
  bookTitle: string;
  joinAddress: RemoteBroadcastBibleJoinAddress | nil;
  translationName: string;
  translations: RemoteBroadcastBibleTranslation[];
  books: RemoteBroadcastBibleBook[];
  verses: string[];
  searchMatches: RemoteBroadcastBibleSearchMatch[];
  searchTerm: string;
  chapterCount: number;
};

export type RemoteBroadcastBibleSnapshotDelta = {
  booki?: number;
  chapteri?: number;
  versei?: number;
  bookTitle?: string;
  joinAddress?: RemoteBroadcastBibleJoinAddress | nil;
  translationName?: string;
  translations?: RemoteBroadcastBibleTranslation[];
  books?: RemoteBroadcastBibleBook[];
  verses?: string[];
  searchMatches?: RemoteBroadcastBibleSearchMatch[];
  searchTerm?: string;
  chapterCount?: number;
};

export type RemoteBroadcastSnapshot = {
  app: BroadcastLiveApp;
  isHide: boolean;
  isInitialSlide: boolean;
  cm: RemoteBroadcastCmSnapshot | nil;
  bible: RemoteBroadcastBibleSnapshot | nil;
};

export type RemoteBroadcastSnapshotDelta = {
  app?: BroadcastLiveApp;
  isHide?: boolean;
  isInitialSlide?: boolean;
  cm?: RemoteBroadcastCmSnapshotDelta;
  bible?: RemoteBroadcastBibleSnapshotDelta;
};

export type RemoteBroadcastBibleCommandPatch = {
  booki?: number;
  chapteri?: number;
  versei?: number;
  finishVersei?: number | nil;
  verseis?: number[];
  joinAddress?: RemoteBroadcastBibleJoinAddress | nil;
  translationName?: string;
  searchTerm?: string;
};

export type RemoteBroadcastCmCommandPatch = {
  comw?: number;
  slidei?: number;
};

export type RemoteBroadcastCommandPatch = {
  app?: RemoteBroadcastApp;
  isHide?: boolean;
  isInitialSlide?: boolean;
  cm?: RemoteBroadcastCmCommandPatch;
  bible?: RemoteBroadcastBibleCommandPatch;
};

export type RemoteBroadcastCommand =
  | {
      kind: RemoteBroadcastCommandKind.Hello;
      version?: number;
    }
  | { kind: RemoteBroadcastCommandKind.CmSlide; dir: -1 | 1 }
  | RemoteBroadcastCommandPatch;

export type RemoteBroadcastClientMessage =
  | {
      k: RemoteBroadcastMessageKind.Hello;
      deviceId: string;
      token: string | nil;
      version?: number;
      jesmylToken?: string | nil;
      user?: RemoteBroadcastUserIdentity;
      viaQr?: boolean;
      secretCode?: string;
      name?: string;
      langi?: number;
    }
  | { k: RemoteBroadcastMessageKind.Command; c: RemoteBroadcastCommand }
  | { k: RemoteBroadcastMessageKind.Name; name: string }
  | { k: RemoteBroadcastMessageKind.Controls }
  | { k: RemoteBroadcastMessageKind.Locale; langi: Langi; baseMod: number; remoteMod: number };

export type RemoteBroadcastPublishedControl = {
  fio?: string;
  ip: string;
  port: number;
  secretCode?: string;
};

export type RemoteBroadcastServerMessage =
  | { k: RemoteBroadcastMessageKind.State; s: RemoteBroadcastSnapshotDelta }
  | { k: RemoteBroadcastMessageKind.Error; e: RemoteBroadcastErrorKind }
  | { k: RemoteBroadcastMessageKind.Token; t: string }
  | { k: RemoteBroadcastMessageKind.Version; v: number }
  | { k: RemoteBroadcastMessageKind.Controls; controls: RemoteBroadcastPublishedControl[] }
  | {
      k: RemoteBroadcastMessageKind.Locale;
      langi: Langi;
      base?: LocaleBase<Langi>;
      baseMod?: number;
      remote?: Record<number, string>;
      remoteMod?: number;
    };

export type RemoteLocalePayload = {
  langi: Langi;
  base?: LocaleBase<Langi>;
  baseMod?: number;
  remote?: Record<number, string>;
  remoteMod?: number;
};

export type RemoteBroadcastUserIdentity = {
  login?: string;
  fio?: string;
  nick?: string;
  email?: string;
};

export type RemoteBroadcastController = RemoteBroadcastUserIdentity & {
  deviceId: string;
  since: number;
  name?: string;
};

export type RemoteBroadcastPendingDevice = {
  deviceId: string;
  name?: string;
  fio?: string;
  nick?: string;
  email?: string;
  login?: string;
};

export type ElectronRemoteBroadcastInfo = {
  isOn: boolean;
  port: number;
  lanIp: string | nil;
  url: string | nil;
  isTls: boolean;
  certHost: string | nil;
  error: RemoteBroadcastErrorKind;
  secretCode?: string;
  clients: number;
  controllers: RemoteBroadcastController[];
  pending: RemoteBroadcastPendingDevice[];
  banned: RemoteBroadcastPendingDevice[];
};

export type ElectronRemoteBroadcastTsjrpcModel = {
  start: () => ElectronRemoteBroadcastInfo;
  stop: () => ElectronRemoteBroadcastInfo;
  setPort: (args: { port: number }) => ElectronRemoteBroadcastInfo;
  setCertHost: (args: { certHost: string | nil }) => ElectronRemoteBroadcastInfo;
  getInfo: () => ElectronRemoteBroadcastInfo;
  banRemoteControl: (args: { deviceId: string }) => ElectronRemoteBroadcastInfo;
  unbanRemoteControl: (args: { deviceId: string }) => ElectronRemoteBroadcastInfo;
  approveRemoteControl: (args: { deviceId: string }) => ElectronRemoteBroadcastInfo;
  sendSnapshot: (args: { snapshot: RemoteBroadcastSnapshotDelta }) => void;
  sendInstalledLocales: (args: RemoteLocalePayload) => void;
  sharePultLocales: (args: RemoteLocalePayload) => void;
  sharePublishedControls: (args: { controls: RemoteBroadcastPublishedControl[] }) => void;
};

export type ElectronRemoteBroadcastBaseTsjrpcModel = {
  command: (args: { command: RemoteBroadcastCommand }) => void;
  info: (args: { info: ElectronRemoteBroadcastInfo }) => void;
  requestLocales: (args: { langi: Langi; baseMod: number; remoteMod: number }) => void;
  requestPublishedControls: () => void;
};

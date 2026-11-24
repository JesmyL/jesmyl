import {
  RemoteBroadcastBibleJoinAddress,
  RemoteBroadcastBibleSnapshot,
  RemoteBroadcastCmSnapshot,
  RemoteBroadcastErrorKind,
  RemoteBroadcastMessageKind,
  RemoteBroadcastPublishedControl,
  RemoteBroadcastSnapshotDelta,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { Langi } from 'shared/api';
import { LocaleBase } from 'shared/model/+locale/base';
import { atom } from 'atomaric';

export const remoteBroadcastVersionMismatchToastId = 'remoteBroadcastVersionMismatch';

export const remoteDeviceNameAtom = atom('', 'remote:deviceName');

export const remoteGamutIndexAtom = atom<number | nil>(null);

export const remoteBibleSearchMinTermLength = 3;

export const enum RemoteBroadcastSearchKind {
  Text,
  Chapter,
  Link,
}

export const enum RemoteBroadcastBibleStep {
  Book,
  Chapter,
  Verse,
}

export const enum RemoteBroadcastSearchScope {
  Chapter,
  Bible,
}

export type RemoteBroadcastBibleSearchAddress = {
  booki: number;
  chapteri: number;
  versei: number;
  finishVersei: number | nil;
};

export type IncomingRemoteBroadcastMessage =
  | { k: RemoteBroadcastMessageKind.State; snapshot: RemoteBroadcastSnapshotDelta }
  | { k: RemoteBroadcastMessageKind.Error; error: RemoteBroadcastErrorKind }
  | { k: RemoteBroadcastMessageKind.Token; token: string }
  | { k: RemoteBroadcastMessageKind.Version; version: number }
  | { k: RemoteBroadcastMessageKind.Scheme; gamuti: number }
  | { k: RemoteBroadcastMessageKind.Controls; controls: RemoteBroadcastPublishedControl[] }
  | {
      k: RemoteBroadcastMessageKind.Locale;
      langi: Langi;
      base?: LocaleBase<Langi>;
      baseMod?: number;
      remote?: Record<number, string>;
      remoteMod?: number;
    };

export type CmRemoteBroadcastProvider = {
  snapshot: () => RemoteBroadcastCmSnapshot;
  toSlide: (dir: -1 | 1) => void;
  setSlidei: (slidei: number) => void;
  selectCom: (comw: number) => void;
};

export type BibleRemoteBroadcastProvider = {
  snapshot: () => RemoteBroadcastBibleSnapshot;
  applyAddress: (patch: {
    booki?: number;
    chapteri?: number;
    versei?: number;
    finishVersei?: number | nil;
    verseis?: number[];
    joinAddress?: RemoteBroadcastBibleJoinAddress | nil;
  }) => void;
  applyTranslation: (tName: string) => void;
  search: (term: string) => void;
};

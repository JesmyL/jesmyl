import {
  RemoteBroadcastBibleCommandPatch,
  RemoteBroadcastBibleJoinAddress,
  RemoteBroadcastClientMessage,
  RemoteBroadcastCmCommandPatch,
  RemoteBroadcastCommand,
  RemoteBroadcastCommandKind,
  RemoteBroadcastCommandPatch,
  RemoteBroadcastMessageKind,
  RemoteBroadcastUserIdentity,
} from '../../../shared/api/tsjrpc.electtron/remote-broadcast';
import { bibleTranslateNames } from '../../../shared/const/bible/tbcv';
import {
  remoteBroadcastDeviceIdMaxLength,
  remoteBroadcastJesmylTokenMaxLength,
  remoteBroadcastSearchTermMaxLength,
  remoteBroadcastSecretCodeLength,
  remoteBroadcastUserIdentityFieldMaxLength,
} from '../../../shared/const/electron';
import { BibleTranslateName } from '../../../shared/model/bible';
import { Langi } from '../../../shared/api/complect/enums';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const parseIndex = (value: unknown): number | nil =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null;

const parseBibleTranslateName = (value: unknown): BibleTranslateName | nil => {
  if (typeof value !== 'string') return null;

  for (const name of bibleTranslateNames) if (name === value) return name;

  return null;
};

const parseVerseis = (value: unknown): number[] | nil => {
  if (!Array.isArray(value)) return null;

  const verseis: number[] = [];

  for (const item of value) {
    const versei = parseIndex(item);
    if (versei == null) return null;

    verseis.push(versei);
  }

  return verseis;
};

const parseJoinAddress = (value: unknown): RemoteBroadcastBibleJoinAddress | nil => {
  if (!isRecord(value)) return null;

  const joinAddress: RemoteBroadcastBibleJoinAddress = {};

  for (const [bookKey, chaptersValue] of Object.entries(value)) {
    const booki = parseIndex(Number(bookKey));
    if (booki == null || !isRecord(chaptersValue)) return null;

    const chapters: Record<number, number[]> = {};

    for (const [chapterKey, verseisValue] of Object.entries(chaptersValue)) {
      const chapteri = parseIndex(Number(chapterKey));
      const verseis = parseVerseis(verseisValue);
      if (chapteri == null || verseis == null) return null;

      chapters[chapteri] = verseis;
    }

    joinAddress[booki] = chapters;
  }

  return joinAddress;
};

const parseRemoteBroadcastApp = (value: unknown) => (value === 'cm' || value === 'bible' ? value : null);

const parseSearchTerm = (value: unknown): string | nil => {
  if (typeof value !== 'string') return null;

  const term = value.trim();
  if (!term || term.length > remoteBroadcastSearchTermMaxLength) return null;

  return term;
};

const parseCmCommandPatch = (value: unknown): RemoteBroadcastCmCommandPatch | nil => {
  if (!isRecord(value)) return null;

  const patch: RemoteBroadcastCmCommandPatch = {};

  if (Object.hasOwn(value, 'comw')) {
    const comw = parseIndex(value.comw);
    if (comw == null) return null;
    patch.comw = comw;
  }
  if (Object.hasOwn(value, 'slidei')) {
    const slidei = parseIndex(value.slidei);
    if (slidei == null) return null;
    patch.slidei = slidei;
  }

  return Object.keys(patch).length ? patch : null;
};

const parseBibleCommandPatch = (value: unknown): RemoteBroadcastBibleCommandPatch | nil => {
  if (!isRecord(value)) return null;

  const patch: RemoteBroadcastBibleCommandPatch = {};

  if (Object.hasOwn(value, 'booki')) {
    const booki = parseIndex(value.booki);
    if (booki == null) return null;
    patch.booki = booki;
  }
  if (Object.hasOwn(value, 'chapteri')) {
    const chapteri = parseIndex(value.chapteri);
    if (chapteri == null) return null;
    patch.chapteri = chapteri;
  }
  if (Object.hasOwn(value, 'versei')) {
    const versei = parseIndex(value.versei);
    if (versei == null) return null;
    patch.versei = versei;
  }
  if (Object.hasOwn(value, 'finishVersei')) {
    if (value.finishVersei == null) patch.finishVersei = null;
    else {
      const finishVersei = parseIndex(value.finishVersei);
      if (finishVersei == null) return null;
      patch.finishVersei = finishVersei;
    }
  }
  if (Object.hasOwn(value, 'verseis')) {
    const verseis = parseVerseis(value.verseis);
    if (verseis == null) return null;
    patch.verseis = verseis;
  }
  if (Object.hasOwn(value, 'joinAddress')) {
    if (value.joinAddress == null) patch.joinAddress = null;
    else {
      const joinAddress = parseJoinAddress(value.joinAddress);
      if (joinAddress == null) return null;
      patch.joinAddress = joinAddress;
    }
  }
  if (Object.hasOwn(value, 'translationName')) {
    const translationName = parseBibleTranslateName(value.translationName);
    if (translationName == null) return null;
    patch.translationName = translationName;
  }
  if (Object.hasOwn(value, 'searchTerm')) {
    const searchTerm = parseSearchTerm(value.searchTerm);
    if (searchTerm == null) return null;
    patch.searchTerm = searchTerm;
  }

  return Object.keys(patch).length ? patch : null;
};

const parseCommandPatch = (value: Record<string, unknown>): RemoteBroadcastCommandPatch | nil => {
  const patch: RemoteBroadcastCommandPatch = {};

  if (Object.hasOwn(value, 'app')) {
    const app = parseRemoteBroadcastApp(value.app);
    if (app == null) return null;
    patch.app = app;
  }
  if (Object.hasOwn(value, 'isHide')) {
    if (typeof value.isHide !== 'boolean') return null;
    patch.isHide = value.isHide;
  }
  if (Object.hasOwn(value, 'isInitialSlide')) {
    if (typeof value.isInitialSlide !== 'boolean') return null;
    patch.isInitialSlide = value.isInitialSlide;
  }
  if (Object.hasOwn(value, 'cm')) {
    const cm = parseCmCommandPatch(value.cm);
    if (cm == null) return null;
    patch.cm = cm;
  }
  if (Object.hasOwn(value, 'bible')) {
    const bible = parseBibleCommandPatch(value.bible);
    if (bible == null) return null;
    patch.bible = bible;
  }

  return Object.keys(patch).length ? patch : null;
};

const legacyCommandKind = {
  SetApp: 1,
  SetHide: 2,
  CmSlideSelect: 4,
  CmCom: 5,
  BibleBook: 6,
  BibleChapter: 7,
  BibleVerse: 8,
  BibleAddress: 9,
  BibleTranslation: 10,
  BibleSearch: 11,
} as const;

const wrapBibleCommandPatch = (patch: RemoteBroadcastBibleCommandPatch | nil): RemoteBroadcastCommand | nil =>
  patch == null ? null : { bible: patch };

const parseLegacyCommand = (value: Record<string, unknown>): RemoteBroadcastCommand | nil => {
  switch (value.kind) {
    case legacyCommandKind.SetApp: {
      const app = parseRemoteBroadcastApp(value.app);
      return app == null ? null : { app };
    }

    case legacyCommandKind.SetHide:
      return typeof value.isHide === 'boolean' ? { isHide: value.isHide } : null;

    case legacyCommandKind.CmSlideSelect: {
      const slidei = parseIndex(value.slidei);
      return slidei == null ? null : { cm: { slidei } };
    }

    case legacyCommandKind.CmCom: {
      const comw = parseIndex(value.comw);
      return comw == null ? null : { cm: { comw } };
    }

    case legacyCommandKind.BibleBook:
      return wrapBibleCommandPatch(parseBibleCommandPatch({ booki: value.booki }));

    case legacyCommandKind.BibleChapter:
      return wrapBibleCommandPatch(parseBibleCommandPatch({ chapteri: value.chapteri }));

    case legacyCommandKind.BibleVerse:
      return wrapBibleCommandPatch(parseBibleCommandPatch({ versei: value.versei }));

    case legacyCommandKind.BibleAddress:
      return wrapBibleCommandPatch(parseBibleCommandPatch(value));

    case legacyCommandKind.BibleTranslation:
      return wrapBibleCommandPatch(parseBibleCommandPatch({ translationName: value.tName }));

    case legacyCommandKind.BibleSearch:
      return wrapBibleCommandPatch(parseBibleCommandPatch({ searchTerm: value.term }));

    default:
      return null;
  }
};

const parseCommand = (value: unknown): RemoteBroadcastCommand | nil => {
  if (!isRecord(value)) return null;

  switch (value.kind) {
    case RemoteBroadcastCommandKind.Hello:
      return { kind: RemoteBroadcastCommandKind.Hello };

    case RemoteBroadcastCommandKind.CmSlide:
      return value.dir === -1 || value.dir === 1
        ? { kind: RemoteBroadcastCommandKind.CmSlide, dir: value.dir }
        : null;
  }

  if (Object.hasOwn(value, 'kind')) return typeof value.kind === 'number' ? parseLegacyCommand(value) : null;

  return parseCommandPatch(value);
};

const parseDeviceId = (value: unknown): string | nil =>
  typeof value === 'string' && value.length > 0 && value.length <= remoteBroadcastDeviceIdMaxLength ? value : null;

const parseToken = (value: unknown): string | nil => (typeof value === 'string' ? value : null);

const parseSecretCode = (value: unknown): string | nil =>
  typeof value === 'string' && value.length > 0 && value.length <= remoteBroadcastSecretCodeLength ? value : null;

const parseDeviceName = (value: unknown): string | nil => {
  if (typeof value !== 'string') return null;

  const name = value.trim();
  return name.length > 0 && name.length <= remoteBroadcastUserIdentityFieldMaxLength ? name : null;
};

const parseJesmylToken = (value: unknown): string | nil =>
  typeof value === 'string' && value.length > 0 && value.length <= remoteBroadcastJesmylTokenMaxLength
    ? value
    : null;

const remoteBroadcastUserIdentityKeys = ['login', 'fio', 'nick', 'email'] as const;

const parseUserIdentity = (value: unknown): RemoteBroadcastUserIdentity | nil => {
  if (!isRecord(value)) return null;

  const identity: RemoteBroadcastUserIdentity = {};

  for (const key of remoteBroadcastUserIdentityKeys) {
    const field = value[key];
    if (typeof field !== 'string') continue;

    const trimmed = field.trim();
    if (!trimmed || trimmed.length > remoteBroadcastUserIdentityFieldMaxLength) continue;

    identity[key] = trimmed;
  }

  return Object.keys(identity).length === 0 ? null : identity;
};

const parseVersion = (value: unknown): number | nil =>
  typeof value === 'number' && Number.isInteger(value) && value >= 0 ? value : null;

const langis = [Langi.Ru, Langi.Ua, Langi.Kz, Langi.En] as const;

const parseLangi = (value: unknown): Langi | nil => langis.find(langi => langi === value) ?? null;

const parseViaQr = (value: unknown): true | nil => (value === true ? true : null);

export const parseRemoteBroadcastClientMessage = (value: unknown): RemoteBroadcastClientMessage | nil => {
  if (!isRecord(value)) return null;

  if (value.k === RemoteBroadcastMessageKind.Hello) {
    const deviceId = parseDeviceId(value.deviceId);
    if (deviceId == null) return null;

    const version = parseVersion(value.version);

    const jesmylToken = parseJesmylToken(value.jesmylToken);
    const viaQr = parseViaQr(value.viaQr);
    const user = parseUserIdentity(value.user);
    const secretCode = parseSecretCode(value.secretCode);
    const name = value.name == null ? null : parseDeviceName(value.name);
    if (value.name != null && name == null) return null;

    const langi = value.langi == null ? null : parseLangi(value.langi);

    return {
      k: RemoteBroadcastMessageKind.Hello,
      deviceId,
      token: parseToken(value.token),
      ...(jesmylToken == null ? {} : { jesmylToken }),
      ...(user == null ? {} : { user }),
      ...(viaQr == null ? {} : { viaQr }),
      ...(secretCode == null ? {} : { secretCode }),
      ...(name == null ? {} : { name }),
      ...(version == null ? {} : { version }),
      ...(langi == null ? {} : { langi }),
    };
  }

  if (value.k === RemoteBroadcastMessageKind.Name) {
    const name = parseDeviceName(value.name);
    return name == null ? null : { k: RemoteBroadcastMessageKind.Name, name };
  }

  if (value.k === RemoteBroadcastMessageKind.Controls) return { k: RemoteBroadcastMessageKind.Controls };

  if (value.k === RemoteBroadcastMessageKind.Locale) {
    const langi = parseLangi(value.langi);
    const baseMod = parseVersion(value.baseMod);
    const remoteMod = parseVersion(value.remoteMod);

    if (langi == null || baseMod == null || remoteMod == null) return null;

    return { k: RemoteBroadcastMessageKind.Locale, langi, baseMod, remoteMod };
  }

  if (value.k !== RemoteBroadcastMessageKind.Command) return null;

  const command = parseCommand(value.c);
  return command == null ? null : { k: RemoteBroadcastMessageKind.Command, c: command };
};

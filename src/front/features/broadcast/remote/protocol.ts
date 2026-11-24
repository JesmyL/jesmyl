import { BroadcastLiveApp } from 'shared/model/index/Index.model';
import { Langi } from 'shared/api';
import {
  parseRemoteControlTarget,
  remoteBroadcastSecretCodeLength,
  remoteBroadcastUserIdentityFieldMaxLength,
} from 'shared/const/electron';
import { LocaleBase } from 'shared/model/+locale/base';
import {
  RemoteBroadcastBibleBook,
  RemoteBroadcastBibleJoinAddress,
  RemoteBroadcastBibleSearchMatch,
  RemoteBroadcastBibleSnapshotDelta,
  RemoteBroadcastBibleTranslation,
  RemoteBroadcastCmLists,
  RemoteBroadcastCmSnapshotDelta,
  RemoteBroadcastComItem,
  RemoteBroadcastErrorKind,
  RemoteBroadcastMessageKind,
  RemoteBroadcastPublishedControl,
  RemoteBroadcastSnapshotDelta,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { IncomingRemoteBroadcastMessage } from './model';

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

const isIndex = (value: unknown): value is number => typeof value === 'number' && Number.isInteger(value) && value >= 0;

const langis = [Langi.Ru, Langi.Ua, Langi.Kz, Langi.En] as const;

const parseLangi = (value: unknown): Langi | nil => langis.find(langi => langi === value) ?? null;

const parsePublishedControl = (value: unknown): RemoteBroadcastPublishedControl | nil => {
  if (!isRecord(value)) return null;

  const ip = value.ip;
  const port = value.port;

  if (typeof ip !== 'string' || ip.length === 0 || ip.length > remoteBroadcastUserIdentityFieldMaxLength) return null;
  if (typeof port !== 'number' || !Number.isInteger(port) || port < 1 || port > 65535) return null;
  if (parseRemoteControlTarget(`${ip}:${port}`) == null) return null;

  const fio =
    typeof value.fio === 'string' && value.fio.length <= remoteBroadcastUserIdentityFieldMaxLength ? value.fio : null;
  const secretCode =
    typeof value.secretCode === 'string' &&
    value.secretCode.length > 0 &&
    value.secretCode.length <= remoteBroadcastSecretCodeLength
      ? value.secretCode
      : null;

  return {
    ip,
    port,
    ...(fio == null ? {} : { fio }),
    ...(typeof value.isConnectable === 'boolean' ? { isConnectable: value.isConnectable } : {}),
    ...(secretCode == null ? {} : { secretCode }),
  };
};

const parseLocaleDict = (value: unknown): Record<number, string> | nil => {
  if (!isRecord(value)) return null;

  const dict: Record<number, string> = {};

  for (const [key, text] of Object.entries(value)) {
    const keyNumber = Number(key);
    if (!isIndex(keyNumber) || typeof text !== 'string') return null;

    dict[keyNumber] = text;
  }

  return dict;
};

const parseBaseLocale = (value: unknown): LocaleBase<Langi> | nil => {
  if (!isRecord(value)) return null;

  for (const [key, item] of Object.entries(value)) {
    if (!isIndex(Number(key))) return null;
    if (typeof item !== 'string' && typeof item !== 'number' && !isRecord(item)) return null;
  }

  return value as LocaleBase<Langi>;
};

const parseOptionalIndex = (value: unknown): number | nil | undefined => {
  if (value == null) return undefined;

  return isIndex(value) ? value : null;
};

const parseComItems = (value: unknown): RemoteBroadcastComItem[] | nil => {
  if (!Array.isArray(value)) return null;

  const items: RemoteBroadcastComItem[] = [];

  for (const item of value) {
    if (!isRecord(item) || !isIndex(item.comw) || typeof item.name !== 'string') return null;
    items.push({ comw: item.comw, name: item.name });
  }

  return items;
};

const parseOptionalComItems = (value: unknown): RemoteBroadcastComItem[] | nil => {
  if (value == null) return [];

  return parseComItems(value);
};

const parseCmLists = (value: unknown): RemoteBroadcastCmLists | nil => {
  if (!isRecord(value)) return null;

  const all = parseOptionalComItems(value.all);
  const fav = parseOptionalComItems(value.fav);
  const sel = parseOptionalComItems(value.sel);
  const cached = parseOptionalComItems(value.cached);
  if (!all || !fav || !sel || !cached) return null;

  return { all, fav, sel, cached };
};

const parseCmSnapshot = (value: unknown): RemoteBroadcastCmSnapshotDelta | nil => {
  if (!isRecord(value)) return null;

  const cm: RemoteBroadcastCmSnapshotDelta = {};

  if (Object.hasOwn(value, 'comw')) {
    if (!isIndex(value.comw)) return null;
    cm.comw = value.comw;
  }
  if (Object.hasOwn(value, 'comTitle')) {
    if (typeof value.comTitle !== 'string') return null;
    cm.comTitle = value.comTitle;
  }
  if (Object.hasOwn(value, 'slidei')) {
    if (!isIndex(value.slidei)) return null;
    cm.slidei = value.slidei;
  }
  if (Object.hasOwn(value, 'slides')) {
    if (!Array.isArray(value.slides) || !value.slides.every(slide => typeof slide === 'string')) return null;
    cm.slides = value.slides;
  }
  if (value.lists != null) {
    const lists = parseCmLists(value.lists);
    if (lists == null) return null;
    cm.lists = lists;
  }

  return cm;
};

const parseBibleBooks = (value: unknown): RemoteBroadcastBibleBook[] | nil => {
  if (!Array.isArray(value)) return null;

  const books: RemoteBroadcastBibleBook[] = [];

  for (const book of value) {
    if (!isRecord(book) || typeof book.short !== 'string' || typeof book.full !== 'string') return null;

    books.push({
      short: book.short,
      full: book.full,
      color: typeof book.color === 'string' ? book.color : '',
      disabled: typeof book.disabled === 'boolean' ? book.disabled : false,
    });
  }

  return books;
};

const parseBibleVerses = (value: unknown): string[] | nil => {
  if (!Array.isArray(value)) return null;

  const verses: string[] = [];

  for (const verse of value) {
    if (typeof verse === 'string') {
      verses.push(verse);
      continue;
    }

    if (!isRecord(verse) || !isIndex(verse.versei) || typeof verse.html !== 'string') return null;
    verses[verse.versei] = verse.html;
  }

  return Array.from(verses, html => html ?? '');
};

const parseBibleSearchMatches = (value: unknown): RemoteBroadcastBibleSearchMatch[] | nil => {
  if (!Array.isArray(value)) return null;

  const matches: RemoteBroadcastBibleSearchMatch[] = [];

  for (const match of value) {
    if (
      !isRecord(match) ||
      !isIndex(match.booki) ||
      !isIndex(match.chapteri) ||
      !isIndex(match.versei) ||
      typeof match.bookTitle !== 'string' ||
      typeof match.html !== 'string'
    )
      return null;

    matches.push({
      booki: match.booki,
      chapteri: match.chapteri,
      versei: match.versei,
      bookTitle: match.bookTitle,
      html: match.html,
    });
  }

  return matches;
};

const parseBibleTranslations = (value: unknown): RemoteBroadcastBibleTranslation[] | nil => {
  if (!Array.isArray(value)) return null;

  const translations: RemoteBroadcastBibleTranslation[] = [];

  for (const translation of value) {
    if (!isRecord(translation) || typeof translation.name !== 'string' || typeof translation.title !== 'string') return null;
    translations.push({ name: translation.name, title: translation.title });
  }

  return translations;
};

const parseBibleVerseis = (value: unknown): number[] | nil => {
  if (!Array.isArray(value)) return null;

  const verseis: number[] = [];

  for (const versei of value) {
    if (!isIndex(versei)) return null;
    verseis.push(versei);
  }

  return verseis;
};

const parseJoinAddress = (value: unknown): RemoteBroadcastBibleJoinAddress | nil => {
  if (!isRecord(value)) return null;

  const joinAddress: RemoteBroadcastBibleJoinAddress = {};

  for (const [bookKey, chaptersValue] of Object.entries(value)) {
    const booki = Number(bookKey);
    if (!isIndex(booki) || !isRecord(chaptersValue)) return null;

    const chapters: Record<number, number[]> = {};

    for (const [chapterKey, verseisValue] of Object.entries(chaptersValue)) {
      const chapteri = Number(chapterKey);
      const verseis = parseBibleVerseis(verseisValue);
      if (!isIndex(chapteri) || verseis == null) return null;

      chapters[chapteri] = verseis;
    }

    joinAddress[booki] = chapters;
  }

  return joinAddress;
};

const parseBibleSnapshot = (value: unknown): RemoteBroadcastBibleSnapshotDelta | nil => {
  if (!isRecord(value)) return null;

  const bible: RemoteBroadcastBibleSnapshotDelta = {};

  if (Object.hasOwn(value, 'booki')) {
    if (!isIndex(value.booki)) return null;
    bible.booki = value.booki;
  }
  if (Object.hasOwn(value, 'chapteri')) {
    if (!isIndex(value.chapteri)) return null;
    bible.chapteri = value.chapteri;
  }
  if (Object.hasOwn(value, 'versei')) {
    if (!isIndex(value.versei)) return null;
    bible.versei = value.versei;
  }
  if (Object.hasOwn(value, 'chapterCount')) {
    if (!isIndex(value.chapterCount)) return null;
    bible.chapterCount = value.chapterCount;
  }
  if (Object.hasOwn(value, 'bookTitle')) {
    if (typeof value.bookTitle !== 'string') return null;
    bible.bookTitle = value.bookTitle;
  }
  if (Object.hasOwn(value, 'translationName')) {
    if (typeof value.translationName !== 'string') return null;
    bible.translationName = value.translationName;
  }
  if (Object.hasOwn(value, 'searchTerm')) {
    if (typeof value.searchTerm !== 'string') return null;
    bible.searchTerm = value.searchTerm;
  }
  if (value.translations != null) {
    const translations = parseBibleTranslations(value.translations);
    if (translations == null) return null;
    bible.translations = translations;
  }
  if (Object.hasOwn(value, 'joinAddress')) {
    if (value.joinAddress == null) bible.joinAddress = null;
    else {
      const joinAddress = parseJoinAddress(value.joinAddress);
      if (joinAddress == null) return null;
      bible.joinAddress = joinAddress;
    }
  }

  if (value.books != null) {
    const books = parseBibleBooks(value.books);
    if (books == null) return null;
    bible.books = books;
  }
  if (value.verses != null) {
    const verses = parseBibleVerses(value.verses);
    if (verses == null) return null;
    bible.verses = verses;
  }
  if (value.searchMatches != null) {
    const searchMatches = parseBibleSearchMatches(value.searchMatches);
    if (searchMatches == null) return null;
    bible.searchMatches = searchMatches;
  }

  return bible;
};

const parseApp = (value: unknown): BroadcastLiveApp | nil =>
  value === 'cm' || value === 'bible' || value === 'presentations' ? value : null;

const parseSnapshot = (value: unknown): RemoteBroadcastSnapshotDelta | nil => {
  if (!isRecord(value)) return null;

  const app = value.app == null ? null : parseApp(value.app);
  if (value.app != null && app == null) return null;

  const cm = parseCmSnapshot(value.cm);
  const bible = parseBibleSnapshot(value.bible);

  return {
    ...(app == null ? {} : { app }),
    ...(typeof value.isHide === 'boolean' ? { isHide: value.isHide } : {}),
    ...(typeof value.isInitialSlide === 'boolean' ? { isInitialSlide: value.isInitialSlide } : {}),
    ...(cm == null ? {} : { cm }),
    ...(bible == null ? {} : { bible }),
  };
};

export const parseRemoteBroadcastServerMessage = (value: unknown): IncomingRemoteBroadcastMessage | nil => {
  if (!isRecord(value)) return null;

  if (value.k === RemoteBroadcastMessageKind.State) {
    const snapshot = parseSnapshot(value.s);
    return snapshot ? { k: RemoteBroadcastMessageKind.State, snapshot } : null;
  }

  if (value.k === RemoteBroadcastMessageKind.Token && typeof value.t === 'string')
    return { k: RemoteBroadcastMessageKind.Token, token: value.t };

  if (
    value.k === RemoteBroadcastMessageKind.Version &&
    typeof value.v === 'number' &&
    Number.isInteger(value.v) &&
    value.v >= 0
  )
    return { k: RemoteBroadcastMessageKind.Version, version: value.v };

  if (
    value.k === RemoteBroadcastMessageKind.Scheme &&
    typeof value.g === 'number' &&
    Number.isFinite(value.g)
  )
    return { k: RemoteBroadcastMessageKind.Scheme, gamuti: value.g };

  if (value.k === RemoteBroadcastMessageKind.Controls) {
    if (!Array.isArray(value.controls)) return null;

    const controls: RemoteBroadcastPublishedControl[] = [];

    for (const item of value.controls) {
      const parsed = parsePublishedControl(item);
      if (parsed != null) controls.push(parsed);
    }

    return { k: RemoteBroadcastMessageKind.Controls, controls };
  }

  if (value.k === RemoteBroadcastMessageKind.Error && typeof value.e === 'number') {
    const error = value.e;
    if (
      error === RemoteBroadcastErrorKind.None ||
      error === RemoteBroadcastErrorKind.PortBusy ||
      error === RemoteBroadcastErrorKind.NoLanAddress ||
      error === RemoteBroadcastErrorKind.Unknown ||
      error === RemoteBroadcastErrorKind.Banned ||
      error === RemoteBroadcastErrorKind.CertInvalid ||
      error === RemoteBroadcastErrorKind.PendingApproval ||
      error === RemoteBroadcastErrorKind.InvalidSecretCode ||
      error === RemoteBroadcastErrorKind.NameRequired
    )
      return { k: RemoteBroadcastMessageKind.Error, error };
  }

  if (value.k === RemoteBroadcastMessageKind.Locale) {
    const langi = parseLangi(value.langi);
    if (langi == null) return null;

    const base = value.base == null ? undefined : parseBaseLocale(value.base);
    if (value.base != null && base == null) return null;

    const baseMod = parseOptionalIndex(value.baseMod);
    if (baseMod === null) return null;

    const remote = value.remote == null ? undefined : parseLocaleDict(value.remote);
    if (value.remote != null && remote == null) return null;

    const remoteMod = parseOptionalIndex(value.remoteMod);
    if (remoteMod === null) return null;

    return {
      k: RemoteBroadcastMessageKind.Locale,
      langi,
      ...(base == null ? {} : { base }),
      ...(baseMod === undefined ? {} : { baseMod }),
      ...(remote == null ? {} : { remote }),
      ...(remoteMod === undefined ? {} : { remoteMod }),
    };
  }

  return null;
};

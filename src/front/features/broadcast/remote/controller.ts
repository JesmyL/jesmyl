import { electronRemoteBroadcastTsjrpcClientMethods } from '#basis/tsjrpc.electron/remote-broadcast.cli.methods';
import { broadcastCurrentTextAppAtom } from '#features/broadcast/atoms';
import { isShowBroadcastInitialSlideAtom, isShowBroadcastTextAtom } from '#features/broadcast/initial-slide-context';
import { getScreenBroadcastWindows } from '#features/broadcast/hooks/windows';
import { watchScreenBroadcast } from '#features/broadcast/hooks/watch-broadcast';
import { switchBroadcastApp } from '#features/broadcast/lib/broadcast-live-data';
import { translateBase } from '#basis/locale';
import { isElectronApp } from '#shared/tsjrpc.electron/tsjrpc.electron.client';
import { soki, takeSokiVisitDeviceInfo } from '#shared/soki';
import { reloadSW } from '#shared/sw-register';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { schLiveTsjrpcClient } from '$index/shared/tsjrpc';
import { atom } from 'atomaric';
import {
  ElectronRemoteBroadcastInfo,
  RemoteBroadcastBibleBook,
  RemoteBroadcastBibleCommandPatch,
  RemoteBroadcastBibleJoinAddress,
  RemoteBroadcastBibleSearchMatch,
  RemoteBroadcastBibleSnapshot,
  RemoteBroadcastBibleSnapshotDelta,
  RemoteBroadcastBibleTranslation,
  RemoteBroadcastCmLists,
  RemoteBroadcastCmSnapshot,
  RemoteBroadcastComItem,
  RemoteBroadcastCmSnapshotDelta,
  RemoteBroadcastCommand,
  RemoteBroadcastCommandKind,
  RemoteBroadcastCommandPatch,
  RemoteBroadcastErrorKind,
  RemoteBroadcastSnapshotDelta,
} from 'shared/api/tsjrpc.electtron/remote-broadcast';
import { BroadcastLiveApp } from 'shared/model/index/Index.model';
import { remoteBroadcastDefaultPort } from 'shared/const/electron';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { RemoteLocaleKey } from 'shared/model/+locale/_RemoteLocaleKey';
import { emptyFunc } from 'shared/utils';
import { jversion } from 'shared/values';
import { toast } from 'sonner';
import { makeRemoteControlLink } from './control-link';
import { takeRemoteBroadcastOs } from './device';
import {
  BibleRemoteBroadcastProvider,
  CmRemoteBroadcastProvider,
  remoteBroadcastVersionMismatchToastId,
} from './model';
import { translateRemote } from './remote-locale';

const mainWindowTool = { toWinNum: 0, winNum: 0 };

let cmProvider: CmRemoteBroadcastProvider | nil = null;
let bibleProvider: BibleRemoteBroadcastProvider | nil = null;
let sentCmLists: RemoteBroadcastCmLists | nil = null;
let sentBibleBooks: RemoteBroadcastBibleBook[] | nil = null;
let sentBibleVerses: string[] | nil = null;
let sentBibleSearchMatches: RemoteBroadcastBibleSearchMatch[] | nil = null;
let sentApp: BroadcastLiveApp | nil = null;
let sentIsHide: boolean | nil = null;
let sentIsInitialSlide: boolean | nil = null;
let sentCmSnapshot: RemoteBroadcastCmSnapshot | nil = null;
let sentBibleSnapshot: RemoteBroadcastBibleSnapshot | nil = null;
let lastCmSnapshot: RemoteBroadcastCmSnapshot | nil = null;
let lastBibleSnapshot: RemoteBroadcastBibleSnapshot | nil = null;

const resetRemoteBroadcastSnapshotMarkers = () => {
  sentCmLists = null;
  sentBibleBooks = null;
  sentBibleVerses = null;
  sentBibleSearchMatches = null;
  sentApp = null;
  sentIsHide = null;
  sentIsInitialSlide = null;
  sentCmSnapshot = null;
  sentBibleSnapshot = null;
};
let isPushScheduled = false;
let publishedRemoteControl: { ip: string; port: number; secretCode?: string } | nil = null;
let remoteControlPublishQueue: Promise<void> = Promise.resolve();
let remoteControlPublishRetryTimeout: ReturnType<typeof setTimeout> | nil = null;
let remoteControlPublishAttempt = 0;

const remoteControlPublishMaxAttempts = 5;

const makeRemoteControlRequestTool = () => ({ timeout: 10_000 });

export const remoteBibleSearchTermAtom = atom('');
export const remoteBibleSearchMatchesAtom = atom<RemoteBroadcastBibleSearchMatch[]>([]);

export const remoteBibleVersesAtom = atom<
  | {
      booki: number;
      chapteri: number;
      translationName: string;
      verses: string[];
    }
  | nil
>(null);

export const remoteBroadcastInfoAtom = atom<ElectronRemoteBroadcastInfo>({
  isOn: false,
  port: remoteBroadcastDefaultPort,
  lanIp: null,
  url: null,
  isTls: false,
  certHost: null,
  error: RemoteBroadcastErrorKind.None,
  clients: 0,
  controllers: [],
  pending: [],
  banned: [],
});

const syncRemoteControlPublication = async () => {
  const info = remoteBroadcastInfoAtom.get();
  const controlUrl = info.url == null ? null : makeRemoteControlLink(info.url);
  const desired =
    info.isOn && info.lanIp != null
      ? {
          ip: info.lanIp,
          port: info.port,
          ...(info.secretCode == null ? {} : { secretCode: info.secretCode }),
          ...(controlUrl == null ? {} : { url: controlUrl }),
        }
      : null;

  if (publishedRemoteControl != null) {
    if (
      desired != null &&
      desired.ip === publishedRemoteControl.ip &&
      desired.port === publishedRemoteControl.port &&
      desired.secretCode === publishedRemoteControl.secretCode
    )
      return;

    const previous = publishedRemoteControl;
    publishedRemoteControl = null;
    const isUnpublished = await schLiveTsjrpcClient
      .unpublishRemoteControl_1(undefined, makeRemoteControlRequestTool())
      .then(() => true)
      .catch(error => {
        console.error('Remote control unpublish failed', previous, error);
        return false;
      });

    if (!isUnpublished) {
      publishedRemoteControl = previous;
      scheduleRemoteControlPublishRetry();
      return;
    }
  }

  if (desired == null) {
    remoteControlPublishAttempt = 0;
    return;
  }

  await schLiveTsjrpcClient
    .publishRemoteControl_1(
      { ...desired, ...takeSokiVisitDeviceInfo(), os: takeRemoteBroadcastOs() },
      makeRemoteControlRequestTool(),
    )
    .then(() => {
      publishedRemoteControl = desired;
      remoteControlPublishAttempt = 0;
    })
    .catch(error => {
      console.error('Remote control publish failed', desired, error);
      scheduleRemoteControlPublishRetry();
    });
};

const scheduleRemoteControlPublishRetry = () => {
  if (remoteControlPublishRetryTimeout !== null || remoteControlPublishAttempt >= remoteControlPublishMaxAttempts)
    return;

  remoteControlPublishAttempt++;
  remoteControlPublishRetryTimeout = setTimeout(() => {
    remoteControlPublishRetryTimeout = null;
    queueRemoteControlPublicationSync();
  }, 2_000 * remoteControlPublishAttempt);
};

const queueRemoteControlPublicationSync = () => {
  remoteControlPublishQueue = remoteControlPublishQueue.then(syncRemoteControlPublication).catch(emptyFunc);
};

const isSameRemoteBroadcastArray = <T>(
  next: T[] | nil,
  previous: T[] | nil,
  isSameItem: (nextItem: T, previousItem: T) => boolean,
) => {
  if (next === previous) return true;
  if (next == null || previous == null) return false;
  if (next.length !== previous.length) return false;

  return next.every((item, itemi) => isSameItem(item, previous[itemi]));
};

const isSameRemoteBroadcastComItem = (next: RemoteBroadcastComItem, previous: RemoteBroadcastComItem) =>
  next.comw === previous.comw && next.name === previous.name;

const isSameRemoteBroadcastCmLists = (next: RemoteBroadcastCmLists | nil, previous: RemoteBroadcastCmLists | nil) => {
  if (next === previous) return true;
  if (next == null || previous == null) return false;

  return (
    isSameRemoteBroadcastArray(next.all, previous.all, isSameRemoteBroadcastComItem) &&
    isSameRemoteBroadcastArray(next.fav, previous.fav, isSameRemoteBroadcastComItem) &&
    isSameRemoteBroadcastArray(next.sel, previous.sel, isSameRemoteBroadcastComItem) &&
    isSameRemoteBroadcastArray(next.cached, previous.cached, isSameRemoteBroadcastComItem)
  );
};

const isRemoteBroadcastCmListsLoading = (next: RemoteBroadcastCmLists, previous: RemoteBroadcastCmLists) =>
  (next.all.length === 0 && previous.all.length > 0) ||
  (next.fav.length === 0 && previous.fav.length > 0) ||
  (next.sel.length === 0 && previous.sel.length > 0) ||
  (next.cached.length === 0 && previous.cached.length > 0);

const isSameRemoteBroadcastBibleBook = (next: RemoteBroadcastBibleBook, previous: RemoteBroadcastBibleBook) =>
  next.short === previous.short &&
  next.full === previous.full &&
  next.color === previous.color &&
  next.disabled === previous.disabled;

const isSameRemoteBroadcastSearchMatch = (
  next: RemoteBroadcastBibleSearchMatch,
  previous: RemoteBroadcastBibleSearchMatch,
) =>
  next.booki === previous.booki &&
  next.chapteri === previous.chapteri &&
  next.versei === previous.versei &&
  next.bookTitle === previous.bookTitle &&
  next.html === previous.html;

const isSameRemoteBroadcastTranslation = (
  next: RemoteBroadcastBibleTranslation,
  previous: RemoteBroadcastBibleTranslation,
) => next.name === previous.name && next.title === previous.title;

const isSameRemoteBroadcastJoinAddress = (
  next: RemoteBroadcastBibleJoinAddress | nil,
  previous: RemoteBroadcastBibleJoinAddress | nil,
) => {
  if (next === previous) return true;
  if (next == null || previous == null) return next == null && previous == null;

  const nextBooks = Object.keys(next);
  const previousBooks = Object.keys(previous);
  if (nextBooks.length !== previousBooks.length) return false;

  for (const bookKey of nextBooks) {
    const booki = Number(bookKey);
    const nextChapters = next[booki];
    const previousChapters = previous[booki];
    if (nextChapters == null || previousChapters == null) return false;

    const nextChapteris = Object.keys(nextChapters);
    const previousChapteris = Object.keys(previousChapters);
    if (nextChapteris.length !== previousChapteris.length) return false;

    for (const chapterKey of nextChapteris) {
      const chapteri = Number(chapterKey);
      if (
        !isSameRemoteBroadcastArray(
          nextChapters[chapteri],
          previousChapters[chapteri],
          (nextVersei, previousVersei) => nextVersei === previousVersei,
        )
      )
        return false;
    }
  }

  return true;
};

const takeRemoteBroadcastSnapshot = (isFullPush = false): RemoteBroadcastSnapshotDelta => {
  const app = broadcastCurrentTextAppAtom.get();
  const isHide = !isShowBroadcastTextAtom.get();
  const isInitialSlide = isShowBroadcastInitialSlideAtom.get();
  const liveCm = cmProvider?.snapshot() ?? null;
  const previousCmSnapshot = lastCmSnapshot;
  const isCmListsLoading =
    liveCm != null &&
    previousCmSnapshot != null &&
    isRemoteBroadcastCmListsLoading(liveCm.lists, previousCmSnapshot.lists);
  let cm: RemoteBroadcastCmSnapshot | nil = liveCm;
  if (liveCm != null && isCmListsLoading && previousCmSnapshot != null)
    cm = { ...liveCm, lists: previousCmSnapshot.lists };
  else if (liveCm == null) cm = previousCmSnapshot;
  const bible = bibleProvider?.snapshot() ?? lastBibleSnapshot;
  if (cmProvider != null && cm != null) lastCmSnapshot = cm;
  if (bibleProvider != null && bible != null) lastBibleSnapshot = bible;
  const snapshotDelta: RemoteBroadcastSnapshotDelta = {};

  if (app !== sentApp) {
    snapshotDelta.app = app;
    sentApp = app;
  }
  if (isHide !== sentIsHide) {
    snapshotDelta.isHide = isHide;
    sentIsHide = isHide;
  }
  if (isInitialSlide !== sentIsInitialSlide) {
    snapshotDelta.isInitialSlide = isInitialSlide;
    sentIsInitialSlide = isInitialSlide;
  }

  if (cm != null) {
    const cmLists = cm.lists;
    const previousCm = sentCmSnapshot;
    const isListsChanged = !isSameRemoteBroadcastCmLists(cmLists, sentCmLists);
    const isSlidesChanged =
      previousCm != null &&
      cm.slides !== previousCm.slides &&
      !isSameRemoteBroadcastArray(
        cm.slides,
        previousCm.slides,
        (nextSlide, previousSlide) => nextSlide === previousSlide,
      );
    const isCmChanged =
      isFullPush ||
      previousCm == null ||
      cm.comw !== previousCm.comw ||
      cm.comTitle !== previousCm.comTitle ||
      cm.slidei !== previousCm.slidei ||
      isSlidesChanged ||
      isListsChanged;

    if (isCmChanged) {
      if (isFullPush || previousCm == null) snapshotDelta.cm = { ...cm };
      else {
        const cmDelta: RemoteBroadcastCmSnapshotDelta = {};
        if (isListsChanged) cmDelta.lists = cmLists;
        if (cm.comw !== previousCm.comw) cmDelta.comw = cm.comw;
        if (cm.comTitle !== previousCm.comTitle) cmDelta.comTitle = cm.comTitle;
        if (cm.slidei !== previousCm.slidei) cmDelta.slidei = cm.slidei;
        if (isSlidesChanged) cmDelta.slides = cm.slides;
        if (Object.keys(cmDelta).length) snapshotDelta.cm = cmDelta;
      }
    }

    sentCmSnapshot = cm;
    sentCmLists = cmLists;
  }

  if (bible != null) {
    const bibleBooks = bible.books;
    const bibleVerses = bible.verses;
    const bibleSearchMatches = bible.searchMatches;
    const previousBible = sentBibleSnapshot;
    const isBibleBooksChanged =
      bibleBooks !== sentBibleBooks &&
      !isSameRemoteBroadcastArray(bibleBooks, sentBibleBooks, isSameRemoteBroadcastBibleBook);
    const isBibleVersesChanged =
      bibleVerses !== sentBibleVerses &&
      !isSameRemoteBroadcastArray(
        bibleVerses,
        sentBibleVerses,
        (nextVerse, previousVerse) => nextVerse === previousVerse,
      );
    const isBibleSearchMatchesChanged =
      bibleSearchMatches !== sentBibleSearchMatches &&
      !isSameRemoteBroadcastArray(bibleSearchMatches, sentBibleSearchMatches, isSameRemoteBroadcastSearchMatch);
    const isBibleTranslationsChanged =
      previousBible != null &&
      bible.translations !== previousBible.translations &&
      !isSameRemoteBroadcastArray(bible.translations, previousBible.translations, isSameRemoteBroadcastTranslation);
    const isBibleJoinAddressChanged =
      previousBible != null && !isSameRemoteBroadcastJoinAddress(bible.joinAddress, previousBible.joinAddress);
    const isBibleChanged =
      isFullPush ||
      previousBible == null ||
      bible.booki !== previousBible.booki ||
      bible.chapteri !== previousBible.chapteri ||
      bible.versei !== previousBible.versei ||
      bible.bookTitle !== previousBible.bookTitle ||
      bible.translationName !== previousBible.translationName ||
      isBibleTranslationsChanged ||
      isBibleJoinAddressChanged ||
      bible.chapterCount !== previousBible.chapterCount ||
      bible.searchTerm !== previousBible.searchTerm ||
      isBibleBooksChanged ||
      isBibleVersesChanged ||
      isBibleSearchMatchesChanged;

    if (isBibleChanged) {
      if (isFullPush || previousBible == null)
        snapshotDelta.bible = { ...bible, joinAddress: bible.joinAddress ?? null };
      else {
        const bibleDelta: RemoteBroadcastBibleSnapshotDelta = {};
        if (isBibleBooksChanged) bibleDelta.books = bibleBooks;
        if (isBibleVersesChanged) bibleDelta.verses = bibleVerses;
        if (isBibleSearchMatchesChanged) bibleDelta.searchMatches = bibleSearchMatches;
        if (bible.booki !== previousBible.booki) bibleDelta.booki = bible.booki;
        if (bible.chapteri !== previousBible.chapteri) bibleDelta.chapteri = bible.chapteri;
        if (bible.versei !== previousBible.versei) bibleDelta.versei = bible.versei;
        if (bible.bookTitle !== previousBible.bookTitle) bibleDelta.bookTitle = bible.bookTitle;
        if (bible.chapterCount !== previousBible.chapterCount) bibleDelta.chapterCount = bible.chapterCount;
        if (bible.translationName !== previousBible.translationName) bibleDelta.translationName = bible.translationName;
        if (isBibleTranslationsChanged) bibleDelta.translations = bible.translations;
        if (isBibleJoinAddressChanged) bibleDelta.joinAddress = bible.joinAddress ?? null;
        if (bible.searchTerm !== previousBible.searchTerm) bibleDelta.searchTerm = bible.searchTerm;
        if (Object.keys(bibleDelta).length) snapshotDelta.bible = bibleDelta;
      }
    }

    sentBibleSnapshot = bible;
    sentBibleBooks = bibleBooks;
    sentBibleVerses = bibleVerses;
    sentBibleSearchMatches = bibleSearchMatches;
  }

  return snapshotDelta;
};

export const pushRemoteBroadcastSnapshot = (isFullPush = false) => {
  const info = remoteBroadcastInfoAtom.get();
  if (!isFullPush && !info.isOn) return;

  const snapshot = takeRemoteBroadcastSnapshot(isFullPush);
  if (!Object.keys(snapshot).length) return;

  void electronRemoteBroadcastTsjrpcClientMethods
    .sendSnapshot({ snapshot }, mainWindowTool)
    .catch(() => resetRemoteBroadcastSnapshotMarkers());
};

export const scheduleRemoteBroadcastSnapshot = () => {
  if (isPushScheduled) return;

  isPushScheduled = true;
  queueMicrotask(() => {
    isPushScheduled = false;
    pushRemoteBroadcastSnapshot();
  });
};

const applyRemoteBroadcastHide = async (isHide: boolean) => {
  isShowBroadcastTextAtom.set(!isHide);

  let presentationWindow = getScreenBroadcastWindows().at(0);

  if (!isHide && presentationWindow == null) {
    await watchScreenBroadcast().catch(emptyFunc);
    presentationWindow = getScreenBroadcastWindows().at(0);
  }

  if (isHide) presentationWindow?.blur();
  else presentationWindow?.focus();
};

const applyRemoteBroadcastBiblePatch = (patch: RemoteBroadcastBibleCommandPatch) => {
  if (patch.translationName != null) bibleProvider?.applyTranslation(patch.translationName);

  if (patch.searchTerm != null) bibleProvider?.search(patch.searchTerm);

  const addressPatch: Parameters<BibleRemoteBroadcastProvider['applyAddress']>[0] = {};
  if (Object.hasOwn(patch, 'booki')) addressPatch.booki = patch.booki;
  if (Object.hasOwn(patch, 'chapteri')) addressPatch.chapteri = patch.chapteri;
  if (Object.hasOwn(patch, 'versei')) addressPatch.versei = patch.versei;
  if (Object.hasOwn(patch, 'finishVersei')) addressPatch.finishVersei = patch.finishVersei;
  if (Object.hasOwn(patch, 'verseis')) addressPatch.verseis = patch.verseis;
  if (Object.hasOwn(patch, 'joinAddress')) addressPatch.joinAddress = patch.joinAddress;

  if (Object.keys(addressPatch).length) bibleProvider?.applyAddress(addressPatch);
};

const applyRemoteBroadcastPatch = (patch: RemoteBroadcastCommandPatch) => {
  if (patch.app != null) switchBroadcastApp(patch.app);
  if (patch.isHide != null) void applyRemoteBroadcastHide(patch.isHide);
  if (patch.isInitialSlide != null) isShowBroadcastInitialSlideAtom.set(patch.isInitialSlide);

  if (patch.cm != null) {
    if (patch.cm.comw != null) cmProvider?.selectCom(patch.cm.comw);
    if (patch.cm.slidei != null) cmProvider?.setSlidei(patch.cm.slidei);
  }

  if (patch.bible != null) applyRemoteBroadcastBiblePatch(patch.bible);
};

export const applyRemoteBroadcastCommand = (command: RemoteBroadcastCommand) => {
  if (!('kind' in command)) {
    applyRemoteBroadcastPatch(command);
    scheduleRemoteBroadcastSnapshot();
    return;
  }

  switch (command.kind) {
    case RemoteBroadcastCommandKind.Hello:
      if (command.version != null && command.version > jversion.num)
        toast(translateRemote(RemoteLocaleKey.VersionsNotEqual, { a: jversion.num, b: command.version }), {
          ...makeToastKOMoodConfig(),
          id: remoteBroadcastVersionMismatchToastId,
          duration: Infinity,
          action: { label: translateBase(BaseLocaleKey.Update), onClick: reloadSW },
        });

      resetRemoteBroadcastSnapshotMarkers();
      pushRemoteBroadcastSnapshot(true);
      return;

    case RemoteBroadcastCommandKind.CmSlide:
      cmProvider?.toSlide(command.dir);
      break;
  }

  scheduleRemoteBroadcastSnapshot();
};

export const registerCmRemoteBroadcastProvider = (provider: CmRemoteBroadcastProvider) => {
  cmProvider = provider;

  return () => {
    if (cmProvider !== provider) return;

    lastCmSnapshot = provider.snapshot();
    cmProvider = null;
  };
};

export const registerBibleRemoteBroadcastProvider = (provider: BibleRemoteBroadcastProvider) => {
  bibleProvider = provider;

  return () => {
    if (bibleProvider !== provider) return;

    lastBibleSnapshot = provider.snapshot();
    bibleProvider = null;
  };
};

const applyRemoteBroadcastInfoRequest = async (request: Promise<ElectronRemoteBroadcastInfo>) => {
  try {
    const info = await request;
    remoteBroadcastInfoAtom.set({ ...remoteBroadcastInfoAtom.get(), ...info });
    return info;
  } catch (error) {
    console.error('[remoteBroadcast.info]', error);
    remoteBroadcastInfoAtom.set({ ...remoteBroadcastInfoAtom.get(), error: RemoteBroadcastErrorKind.Unknown });
    return null;
  }
};

export const loadRemoteBroadcastInfo = async () => {
  await applyRemoteBroadcastInfoRequest(electronRemoteBroadcastTsjrpcClientMethods.getInfo(undefined, mainWindowTool));
};

export const startRemoteBroadcastServer = async () => {
  const info = await applyRemoteBroadcastInfoRequest(
    electronRemoteBroadcastTsjrpcClientMethods.start(undefined, mainWindowTool),
  );

  if (info?.isOn) {
    resetRemoteBroadcastSnapshotMarkers();
    if (info.clients > 0) pushRemoteBroadcastSnapshot(true);
  }
};

export const stopRemoteBroadcastServer = async () => {
  await applyRemoteBroadcastInfoRequest(electronRemoteBroadcastTsjrpcClientMethods.stop(undefined, mainWindowTool));
};

export const setRemoteBroadcastServerPort = async (port: number) => {
  await applyRemoteBroadcastInfoRequest(electronRemoteBroadcastTsjrpcClientMethods.setPort({ port }, mainWindowTool));
};

export const setRemoteBroadcastCertHost = async (certHost: string | nil) => {
  await applyRemoteBroadcastInfoRequest(
    electronRemoteBroadcastTsjrpcClientMethods.setCertHost({ certHost }, mainWindowTool),
  );
};

export const banRemoteControlDevice = async (deviceId: string) => {
  await applyRemoteBroadcastInfoRequest(
    electronRemoteBroadcastTsjrpcClientMethods.banRemoteControl({ deviceId }, mainWindowTool),
  );
};

export const unbanRemoteControlDevice = async (deviceId: string) => {
  await applyRemoteBroadcastInfoRequest(
    electronRemoteBroadcastTsjrpcClientMethods.unbanRemoteControl({ deviceId }, mainWindowTool),
  );
};

export const approveRemoteControlDevice = async (deviceId: string) => {
  await applyRemoteBroadcastInfoRequest(
    electronRemoteBroadcastTsjrpcClientMethods.approveRemoteControl({ deviceId }, mainWindowTool),
  );
};

if (isElectronApp) {
  void loadRemoteBroadcastInfo();

  broadcastCurrentTextAppAtom.subscribe(scheduleRemoteBroadcastSnapshot);
  isShowBroadcastTextAtom.subscribe(scheduleRemoteBroadcastSnapshot);
  isShowBroadcastInitialSlideAtom.subscribe(scheduleRemoteBroadcastSnapshot);
  remoteBroadcastInfoAtom.subscribe(queueRemoteControlPublicationSync);

  soki.listenOnConnectionOpenEvent(() => {
    publishedRemoteControl = null;
    remoteControlPublishAttempt = 0;

    if (remoteControlPublishRetryTimeout !== null) clearTimeout(remoteControlPublishRetryTimeout);
    remoteControlPublishRetryTimeout = null;

    queueRemoteControlPublicationSync();
  });
}

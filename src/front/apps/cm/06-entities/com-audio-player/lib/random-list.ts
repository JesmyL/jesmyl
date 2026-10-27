import { cmComLastOpenComwAtom, cmComPlayerIsShuffleAtom } from '../../com/state/atoms';
import { cmIDB } from '$cm/shared/state';
import type { CmRandomListItem, CmRandomListRow, CmRandomListRowInsert } from '$cm/shared/model/random-list';
import { atom } from 'atomaric';
import { CmAudioTail, CmComWid, IExportableCom, parseCmAudioTail } from 'shared/api';
import { retNull } from 'shared/utils';
import { checkIsNotNil, checkIsObject, checkIsRealNumber, checkIsString } from 'shared/utils/checkIs';
import {
  cmComAudioPlayerComsWithErrorAtom,
  cmComAudioPlayerFilteredComsAtom,
  isCmComAudioPlayerManualPick,
  takeCmComAudioPlayerTracklistComs,
} from './adjacent-coms';
import { cmComAudioPlayerAddEventListenerPipe, cmComAudioPlayerPlaySrcAtom } from '../state/current-play-com';
import { cmComAudioPlayerCurrentComwAtom } from '../state/atoms';
import { cmComAudioPlayerCacheSrc } from './audioCache';

/**
 * Prev-list of the shuffle walk: the coms that were actually played, oldest first. It is not
 * pre-built — it grows on every switch into a com and holds at most {@link maxRandomListItems}
 * entries, one per com. The pointer is the currently playing entry's position.
 */
export const cmComAudioPlayerRandomListAtom = atom<CmRandomListItem[] | null>(null);

/** Index of the currently playing entry inside {@link cmComAudioPlayerRandomListAtom}; `null` when shuffle is off or the current com is not in the list. */
export const cmComAudioPlayerRandomComwiAtom = atom<number | null>(null);

/** Prepared next entry together with the pointer it was prepared for; a moved pointer invalidates it. */
export const cmComAudioPlayerNextRandomItemAtom = atom<{ item: CmRandomListItem; pointer: number | null } | null>(null);

/** Upper bound of the prev-list; appending past it evicts the oldest entries from the front. */
const maxRandomListItems = 200;

/** A manual pick enters the prev-list only once its playback actually starts — an errored one never does. */
let pendingManualPick: CmRandomListItem | null = null;

/** Fresh random pick the walk appended but playback has not confirmed; an errored one leaves the prev-list again. */
let unconfirmedRandomPickComw: CmComWid | null = null;

const takeRandomListTable = () =>
  cmIDB.db.table<CmRandomListRow, number, CmRandomListRowInsert>('randomList');

/** Parses one persisted row at the IDB boundary; an invalid row is dropped. */
const parseRandomListRow = (row: unknown): CmRandomListRow | null => {
  if (!checkIsObject(row) || !checkIsRealNumber(row.i) || !checkIsRealNumber(row.comw)) return null;

  const l = checkIsString(row.l) ? parseCmAudioTail(row.l) : null;

  return l ? { i: row.i, l, comw: row.comw as CmComWid } : null;
};

/** Reads the rows in key order — that order is the history order. */
const loadPersistedRandomList = async (): Promise<CmRandomListItem[]> => {
  const rows = (await takeRandomListTable().orderBy('i').toArray()).map(parseRandomListRow).filter(checkIsNotNil);

  return rows.map(({ l, comw }) => ({ l, comw }));
};

/** Keeps the last occurrence of every com, so a legacy store with duplicates still parses into a valid prev-list. */
const takeUniqueRandomListItems = (items: CmRandomListItem[]) => {
  const lastComwiByComw = new Map(items.map((item, comwi) => [item.comw, comwi]));

  return items.filter((item, comwi) => lastComwiByComw.get(item.comw) === comwi);
};

/**
 * Mirrors the prev-list to IDB as ordered rows: a full rewrite keeps the key order equal to the
 * history order, and the write never exceeds the cap. Calls within one task are coalesced.
 */
let isPersistRandomListScheduled = false;

const persistRandomList = () => {
  if (isPersistRandomListScheduled) return;

  isPersistRandomListScheduled = true;

  queueMicrotask(() => {
    isPersistRandomListScheduled = false;

    const rows = (cmComAudioPlayerRandomListAtom.get() ?? []).slice(-maxRandomListItems);
    const randomList = takeRandomListTable();

    void cmIDB.db
      .transaction('rw', randomList, async () => {
        await randomList.clear();
        if (rows.length) await randomList.bulkAdd(rows);
      })
      .catch(retNull);
  });
};

const findRandomListComwi = (items: CmRandomListItem[], comw: CmComWid | nil) =>
  comw == null ? -1 : items.findIndex(item => item.comw === comw);

/** The com the player was on before a reload: the last opened one, or the page atom persisted by atomaric. */
const takeFallbackComw = () => cmComLastOpenComwAtom.get() ?? cmComAudioPlayerCurrentComwAtom.get();

/**
 * Resolves the current history position: the playing link first, then the last opened com, then the
 * atom persisted by the player page.
 */
const resolveRandomListComwi = (items: CmRandomListItem[]) => {
  const playTail = parseCmAudioTail(cmComAudioPlayerPlaySrcAtom.get());
  const playComwi = playTail ? items.findIndex(item => item.l === playTail) : -1;
  if (playComwi >= 0) return playComwi;

  const lastOpenComwi = findRandomListComwi(items, cmComLastOpenComwAtom.get());
  if (lastOpenComwi >= 0) return lastOpenComwi;

  return findRandomListComwi(items, cmComAudioPlayerCurrentComwAtom.get());
};

/**
 * Publishes a history change: the list, the pointer and persistence always move together, so no
 * reader can observe a pointer that does not belong to the list. Re-preparing the next pick is the
 * caller's concern, which keeps a track switch down to exactly one prefetch.
 */
const commitRandomList = (items: CmRandomListItem[], pointer: number | null) => {
  cmComAudioPlayerRandomListAtom.set(items);
  cmComAudioPlayerRandomComwiAtom.set(pointer);
  cmComAudioPlayerNextRandomItemAtom.set(null);
  persistRandomList();
};

/**
 * Appends a com as the newest entry. An existing entry is removed first, so the history holds one
 * entry per com and a replay moves that com to the end. Past the cap the oldest entries are evicted.
 * The pointer lands on the appended entry — the com that is being switched to.
 */
const appendRandomListItem = (item: CmRandomListItem) => {
  const items = cmComAudioPlayerRandomListAtom.get() ?? [];
  const withoutCom = items.filter(entry => entry.comw !== item.comw);
  const evictedCount = Math.max(withoutCom.length + 1 - maxRandomListItems, 0);
  const nextItems = [...withoutCom.slice(evictedCount), item];

  commitRandomList(nextItems, nextItems.length - 1);
};

/** Remembers the concrete link picked for an entry without changing its position. */
const updateRandomListLink = (comwi: number, l: CmAudioTail) => {
  const items = cmComAudioPlayerRandomListAtom.get();
  const item = items?.[comwi];

  if (!items || !item || item.l === l) return;

  const nextItems = [...items];
  nextItems[comwi] = { l, comw: item.comw };
  cmComAudioPlayerRandomListAtom.set(nextItems);
  persistRandomList();
};

/**
 * A manual pick abandons the forward branch of the walk: the redo tail after the pointer is dropped,
 * so the played com becomes the newest history entry before the picked one is appended. The list is
 * returned unchanged when the pointer is already on the newest entry.
 */
const dropRandomListTail = (items: CmRandomListItem[], pointer: number | nil) => {
  if (pointer == null || pointer >= items.length - 1) return items;

  const keptItems = items.slice(0, pointer + 1);
  commitRandomList(keptItems, pointer);

  return keptItems;
};

/**
 * Defers a manual pick until playback starts: setting a src proves nothing about the track being
 * playable, so an errored pick must never reach the prev-list. The tail walked back from is dropped
 * at once — the pick abandons that branch. A replay of the current entry only refreshes its link.
 */
const deferManualPick = (comw: CmComWid, l: CmAudioTail) => {
  if (!cmComPlayerIsShuffleAtom.get()) return;

  const items = cmComAudioPlayerRandomListAtom.get();
  if (items == null) return;

  const pointer = cmComAudioPlayerRandomComwiAtom.get();
  const hadTail = pointer != null && pointer < items.length - 1;
  const comwi = dropRandomListTail(items, pointer).findIndex(item => item.comw === comw);

  if (comwi >= 0 && comwi === pointer) {
    updateRandomListLink(comwi, l);
    if (hadTail) void cmComAudioPlayerPrepareNextRandomCom().catch(retNull);
    return;
  }

  pendingManualPick = { comw, l };
};

/** Appends the deferred manual pick — called only from the `playing` event, i.e. when playback really started. */
const commitPendingManualPick = () => {
  const pick = pendingManualPick;
  pendingManualPick = null;

  if (!pick || !cmComPlayerIsShuffleAtom.get()) return;
  if (cmComAudioPlayerCurrentComwAtom.get() !== pick.comw) return;

  unconfirmedRandomPickComw = null;
  appendRandomListItem(pick);
  void cmComAudioPlayerPrepareNextRandomCom().catch(retNull);
};

/** An errored manual pick never becomes a history entry: the deferred append is dropped. */
export const cmComAudioPlayerCancelManualRandomPick = () => {
  pendingManualPick = null;
};

/**
 * Removes an errored com from the prev-list: a com whose playback failed is not a playable history
 * entry, no matter whether it was a fresh candidate or an auto-advanced history position. The
 * pointer steps back to the previous entry, so the walk resumes at the entry that followed the
 * removed one; an empty list drops the pointer entirely.
 */
export const cmComAudioPlayerDropRandomListCom = (comw: CmComWid) => {
  if (unconfirmedRandomPickComw === comw) unconfirmedRandomPickComw = null;

  const items = cmComAudioPlayerRandomListAtom.get();
  if (!items) return;

  const comwi = findRandomListComwi(items, comw);
  if (comwi < 0) return;

  const nextItems = [...items.slice(0, comwi), ...items.slice(comwi + 1)];
  const pointer = cmComAudioPlayerRandomComwiAtom.get();
  const nextPointer =
    pointer == null || !nextItems.length
      ? null
      : comwi <= pointer
        ? Math.max(pointer - 1, 0)
        : Math.min(pointer, nextItems.length - 1);

  commitRandomList(nextItems, nextPointer);
};

/**
 * Records a direct switch into a com (a reload restore) as the newest history entry. Walking the
 * list already places the pointer on the target, so only the played link is refreshed there; any
 * other switch appends the com and reports `true`.
 */
export const cmComAudioPlayerSyncRandomPointer = (comw: CmComWid, l: CmAudioTail) => {
  if (!cmComPlayerIsShuffleAtom.get()) return false;

  const items = cmComAudioPlayerRandomListAtom.get();
  if (items == null) return false;

  const comwi = items.findIndex(item => item.comw === comw);

  if (comwi === cmComAudioPlayerRandomComwiAtom.get()) {
    if (comwi >= 0) updateRandomListLink(comwi, l);
    return false;
  }

  unconfirmedRandomPickComw = null;
  appendRandomListItem({ comw, l });

  return true;
};

/**
 * Restores the persisted history and places the pointer on the current com. A current com that is
 * not in the history is appended as soon as its playing link is known (the src subscription) — a
 * reload keeps walking from the position where playback stopped.
 */
const restoreRandomList = async () => {
  const persistedItems = (await loadPersistedRandomList().catch(retNull)) ?? [];

  if (!cmComPlayerIsShuffleAtom.get()) return;

  const items = takeUniqueRandomListItems(persistedItems).slice(-maxRandomListItems);
  const comwi = resolveRandomListComwi(items);

  cmComAudioPlayerRandomListAtom.set(items);
  cmComAudioPlayerRandomComwiAtom.set(comwi < 0 ? null : comwi);
  cmComAudioPlayerNextRandomItemAtom.set(null);

  if (items.length !== persistedItems.length) persistRandomList();

  const playTail = parseCmAudioTail(cmComAudioPlayerPlaySrcAtom.get());
  const fallbackComw = takeFallbackComw();

  if (comwi < 0 && playTail && fallbackComw != null) cmComAudioPlayerSyncRandomPointer(fallbackComw, playTail);

  void cmComAudioPlayerPrepareNextRandomCom().catch(retNull);
};

let randomListBuildPromise: Promise<void> | nil = null;

/** Restores the history on enable and clears the store on disable; repeated calls are safe. */
export const cmComAudioPlayerRandomListTurn = async (isOn: boolean): Promise<void> => {
  if (!isOn) {
    pendingManualPick = null;
    unconfirmedRandomPickComw = null;
    cmComAudioPlayerRandomListAtom.set(null);
    cmComAudioPlayerRandomComwiAtom.set(null);
    cmComAudioPlayerNextRandomItemAtom.set(null);
    persistRandomList();
    return;
  }

  if (cmComAudioPlayerRandomListAtom.get() != null) return;

  if (!randomListBuildPromise) {
    randomListBuildPromise = restoreRandomList().finally(() => (randomListBuildPromise = null));
  }

  await randomListBuildPromise;

  /** A toggle that happened while the restore read IDB may have skipped the build entirely. */
  if (cmComPlayerIsShuffleAtom.get() && cmComAudioPlayerRandomListAtom.get() == null) {
    return cmComAudioPlayerRandomListTurn(true);
  }
};

type RandomListComsLookup = {
  comsWithError: Set<CmComWid>;
  comByW: Map<CmComWid, IExportableCom>;
};

const takeRandomListComsLookup = (coms: IExportableCom[]): RandomListComsLookup => ({
  comsWithError: cmComAudioPlayerComsWithErrorAtom.get(),
  comByW: new Map(coms.map(com => [com.w, com])),
});

/** Resolves an entry against the current scope: the com must be present, not errored and have a playable link. */
const resolveRandomListItem = (
  item: CmRandomListItem,
  { comsWithError, comByW }: RandomListComsLookup,
): CmRandomListItem | nil => {
  const com = comByW.get(item.comw);
  if (!com || comsWithError.has(item.comw)) return null;

  const l = com.al?.find(src => src === item.l) ?? com.al?.[0];

  return l ? { comw: item.comw, l } : null;
};

/**
 * The first usable entry after the pointer. Entries that left the current scope, errored or lost
 * their audio are skipped; `null` means the walk has no history left and the next pick must be new.
 */
const takeForwardRandomItem = (items: CmRandomListItem[], pointer: number | nil, lookup: RandomListComsLookup) => {
  if (pointer == null) return null;

  for (let comwi = pointer + 1; comwi < items.length; comwi++) {
    const item = resolveRandomListItem(items[comwi], lookup);
    if (item) return { comwi, item };
  }

  return null;
};

/** A com from the current scope that is not in the prev-list yet, not errored and has a playable link. */
const pickRandomListItem = (items: CmRandomListItem[], lookup: RandomListComsLookup): CmRandomListItem | nil => {
  const usedComws = new Set(items.map(item => item.comw));
  const currentComw = cmComAudioPlayerCurrentComwAtom.get();
  const candidates = [...lookup.comByW.values()].flatMap(com => {
    const l = com.al?.[0];

    return l && !usedComws.has(com.w) && com.w !== currentComw && !lookup.comsWithError.has(com.w)
      ? [{ comw: com.w, l }]
      : [];
  });

  if (!candidates.length) return null;

  return candidates[Math.floor(Math.random() * candidates.length)];
};

/**
 * Re-validates the pre-picked entry against the current pointer/scope. A forward entry moves the
 * pointer onto its position; a fresh candidate is appended as the newest history entry.
 */
const consumePreparedRandomItem = (pointer: number | nil, lookup: RandomListComsLookup): CmRandomListItem | nil => {
  const prepared = cmComAudioPlayerNextRandomItemAtom.get();
  cmComAudioPlayerNextRandomItemAtom.set(null);

  if (!prepared || prepared.pointer !== pointer) return null;

  const item = resolveRandomListItem(prepared.item, lookup);
  if (!item) return null;

  const comwi = cmComAudioPlayerRandomListAtom.get()?.findIndex(entry => entry.comw === item.comw) ?? -1;

  if (comwi < 0) {
    unconfirmedRandomPickComw = item.comw;
    appendRandomListItem(item);
    return item;
  }

  /** Only a forward entry may be consumed; an entry at/before the pointer is the current one or stale. */
  if (pointer == null || comwi <= pointer) return null;

  unconfirmedRandomPickComw = null;
  cmComAudioPlayerRandomComwiAtom.set(comwi);
  updateRandomListLink(comwi, item.l);

  return item;
};

/** Backward walk that only lowers the pointer and never leaves the history; index 0 ends the walk. */
export const takeCmComAudioPlayerPrevRandomItem = async (
  coms: IExportableCom[],
): Promise<CmRandomListItem | nil> => {
  if (cmComAudioPlayerRandomListAtom.get() == null) await cmComAudioPlayerRandomListTurn(true).catch(retNull);

  const items = cmComAudioPlayerRandomListAtom.get();
  const pointer = cmComAudioPlayerRandomComwiAtom.get();
  if (!items?.length || pointer == null) return null;

  const lookup = takeRandomListComsLookup(coms);

  for (let comwi = pointer - 1; comwi >= 0; comwi--) {
    const item = resolveRandomListItem(items[comwi], lookup);
    if (!item) continue;

    unconfirmedRandomPickComw = null;
    cmComAudioPlayerRandomComwiAtom.set(comwi);
    cmComAudioPlayerNextRandomItemAtom.set(null);
    updateRandomListLink(comwi, item.l);

    return item;
  }

  return null;
};

/**
 * Picks and prefetches the upcoming com without touching the history: the forward entry while the
 * pointer has one, otherwise a fresh unique com. Repeated requests share one run and restart it
 * once the history/pointer moved while it was running.
 */
let prepareNextRandomComPromise: Promise<void> | nil = null;
let isPrepareNextRandomComRequestedAgain = false;

const prepareNextRandomCom = async () => {
  if (!cmComPlayerIsShuffleAtom.get() || cmComAudioPlayerRandomListAtom.get() == null) {
    cmComAudioPlayerNextRandomItemAtom.set(null);
    return;
  }

  const coms = await takeCmComAudioPlayerTracklistComs();
  if (!cmComPlayerIsShuffleAtom.get()) {
    cmComAudioPlayerNextRandomItemAtom.set(null);
    return;
  }

  const items = cmComAudioPlayerRandomListAtom.get();
  if (items == null) return;

  const pointer = cmComAudioPlayerRandomComwiAtom.get();
  const lookup = takeRandomListComsLookup(coms);
  const item = takeForwardRandomItem(items, pointer, lookup)?.item ?? pickRandomListItem(items, lookup);

  if (!item) {
    cmComAudioPlayerNextRandomItemAtom.set(null);
    return;
  }

  cmComAudioPlayerNextRandomItemAtom.set({ item, pointer });
  void cmComAudioPlayerCacheSrc(item.l).catch(retNull);
};

export const cmComAudioPlayerPrepareNextRandomCom = () => {
  if (prepareNextRandomComPromise) {
    isPrepareNextRandomComRequestedAgain = true;
    return prepareNextRandomComPromise;
  }

  prepareNextRandomComPromise = (async () => {
    try {
      do {
        isPrepareNextRandomComRequestedAgain = false;
        await prepareNextRandomCom();
      } while (isPrepareNextRandomComRequestedAgain && cmComPlayerIsShuffleAtom.get());
    } finally {
      prepareNextRandomComPromise = null;
    }
  })();

  return prepareNextRandomComPromise;
};

/**
 * Next in shuffle mode: forward along the history while a usable entry follows the pointer, and only
 * at its end a new unique random com is appended. The prepared pick is re-validated at consume time.
 */
export const takeCmComAudioPlayerNextRandomItem = async (
  coms: IExportableCom[],
): Promise<CmRandomListItem | nil> => {
  if (cmComAudioPlayerRandomListAtom.get() == null) await cmComAudioPlayerRandomListTurn(true).catch(retNull);

  const items = cmComAudioPlayerRandomListAtom.get();
  if (items == null) return null;

  const pointer = cmComAudioPlayerRandomComwiAtom.get();
  const lookup = takeRandomListComsLookup(coms);
  const preparedItem = consumePreparedRandomItem(pointer, lookup);
  if (preparedItem) return preparedItem;

  const forward = takeForwardRandomItem(items, pointer, lookup);

  if (forward) {
    unconfirmedRandomPickComw = null;
    cmComAudioPlayerRandomComwiAtom.set(forward.comwi);
    cmComAudioPlayerNextRandomItemAtom.set(null);
    updateRandomListLink(forward.comwi, forward.item.l);

    return forward.item;
  }

  const item = pickRandomListItem(items, lookup);
  if (!item) return null;

  unconfirmedRandomPickComw = item.comw;
  appendRandomListItem(item);

  return item;
};

cmComPlayerIsShuffleAtom.subscribe(isOn => void cmComAudioPlayerRandomListTurn(isOn).catch(retNull));

/**
 * Restoring the persisted history must wait until the whole module graph is evaluated: at import
 * time this module is pulled in through `$cm/shared/state`, so `cmIDB` is not constructed yet.
 * A microtask is not enough (a module runner may evaluate the graph across awaits), so the first
 * macrotask is used — it also runs before any user interaction can request `prev`.
 */
setTimeout(() => {
  if (cmComPlayerIsShuffleAtom.get()) void cmComAudioPlayerRandomListTurn(true).catch(retNull);
}, 0);

/**
 * A play src change is the single place a real switch into a com is observed. Walking the history
 * has already pointed at the target, so it only refreshes the link; a manual pick is recorded only
 * when playback actually starts, so an errored src never becomes the newest entry.
 */
cmComAudioPlayerPlaySrcAtom.subscribe(playSrc => {
  const comw = cmComAudioPlayerCurrentComwAtom.get();
  if (comw == null) return;

  /** Inline players on other pages must not grow the player page history. */
  const com = cmComAudioPlayerFilteredComsAtom.get()?.find(com => com.w === comw);
  if (!com) return;

  const playTail = parseCmAudioTail(playSrc);
  const l = playTail && com.al?.includes(playTail) ? playTail : com.al?.[0];
  if (!l) return;

  if (isCmComAudioPlayerManualPick()) {
    deferManualPick(comw, l);
    return;
  }

  pendingManualPick = null;

  if (cmComAudioPlayerSyncRandomPointer(comw, l)) {
    void cmComAudioPlayerPrepareNextRandomCom().catch(retNull);
  }
});

/** Playback actually starting is the only proof that a manually picked com is playable. */
cmComAudioPlayerAddEventListenerPipe('playing', commitPendingManualPick);

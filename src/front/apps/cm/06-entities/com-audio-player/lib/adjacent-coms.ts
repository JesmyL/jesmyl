import {
  cmComFavoriteComwsAtom,
  cmComLastOpenComwAtom,
  cmComPlayerIsShuffleAtom,
  cmComSelectedComwsAtom,
} from '$cm/entities/com';
import { cmIDB, cmOpenComListModeAtom } from '$cm/shared/state';
import { atom } from 'atomaric';
import { CmAudioSrc, CmComWid, IExportableCom } from 'shared/api';
import { retNull } from 'shared/utils';
import {
  cmComAudioPlayerAddEventListenerPipe,
  cmComAudioPlayerEndedTickAtom,
  cmComAudioPlayerErrorTickAtom,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetMediaTitle,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  takeCmComAudioPlayerCurrentTime,
} from '../state/current-play-com';
import { cmComAudioPlayerCurrentComwAtom } from '../state/atoms';
import { CmComAudioPlayerAdjacentDirection, CmComAudioPlayerPickKind } from '../model';
import { isCmComAudioPlayerComCached, takeCmComAudioPlayerCachedSrcs } from './audioCache';
import {
  cmComAudioPlayerCancelManualRandomPick,
  cmComAudioPlayerDropRandomListCom,
  cmComAudioPlayerPrepareNextRandomCom,
  takeCmComAudioPlayerNextRandomItem,
  takeCmComAudioPlayerPrevRandomItem,
} from './random-list';

/** Coms whose audio failed to load; they are skipped when picking the next/prev one. */
export const cmComAudioPlayerComsWithErrorAtom = atom<Set<CmComWid>>(new Set());
export const cmComAudioPlayerFilteredComsAtom = atom<IExportableCom[] | nil>(null);

/** The only way the player moves to another com: page atom and last-open memory. */
export const cmComAudioPlayerSetCurrentComw = (comw: CmComWid) => {
  cmComAudioPlayerCurrentComwAtom.set(comw);
  cmComLastOpenComwAtom.set(comw);
};

/**
 * How the current src got set. The src itself carries no intent, while an errored manual pick must
 * neither be auto-skipped nor recorded as played — unlike an advance pick, which the walk validates.
 */
let lastPickKind = CmComAudioPlayerPickKind.Advance;

/** A direct user pick (list click, URL entry): an error is shown in place instead of searching further. */
export const cmComAudioPlayerMarkManualPick = () => {
  lastPickKind = CmComAudioPlayerPickKind.Manual;
};

export const isCmComAudioPlayerManualPick = () => lastPickKind === CmComAudioPlayerPickKind.Manual;

const hasAudio = (com: IExportableCom) => !!com.al?.length;

/** Resolves the visible tracklist (searched / all / favorites / selected / cached) straight from atoms + IndexedDB. */
export const takeCmComAudioPlayerTracklistComs = async () => {
  const filteredComs = cmComAudioPlayerFilteredComsAtom.get();
  if (filteredComs) return filteredComs;

  const mode = cmOpenComListModeAtom.get();

  if (mode === 'all') return (await cmIDB.db.coms.toArray()).filter(hasAudio);

  if (mode === 'cached') {
    const [cachedSrcs, coms] = await Promise.all([takeCmComAudioPlayerCachedSrcs(), cmIDB.db.coms.toArray()]);

    return coms.filter(com => isCmComAudioPlayerComCached(com, cachedSrcs));
  }

  const comws = mode === 'fav' ? cmComFavoriteComwsAtom.get() : cmComSelectedComwsAtom.get();

  const indexDict = {} as Record<CmComWid, number>;
  comws.forEach((comw, comwi) => (indexDict[comw] = comwi));

  return (await cmIDB.db.coms.where('w').anyOf(comws).toArray())
    .filter(hasAudio)
    .sort((a, b) => indexDict[a.w] - indexDict[b.w]);
};

const takePlayedComw = (coms: IExportableCom[]) => {
  const playSrc = cmComAudioPlayerPlaySrcAtom.get();
  const playedCom = playSrc == null ? null : coms.find(com => com.al?.some(src => src === playSrc));

  return playedCom?.w ?? cmComLastOpenComwAtom.get();
};

/** The com heard right now, resolved exactly like an advance: the playing src within the tracklist, else the last opened com. */
export const takeCmComAudioPlayerPlayedComw = async () => takePlayedComw(await takeCmComAudioPlayerTracklistComs());

const playCom = (comw: CmComWid, name: string, src: CmAudioSrc, shouldPlay: boolean) => {
  lastPickKind = CmComAudioPlayerPickKind.Advance;
  cmComAudioPlayerSetCurrentComw(comw);
  cmComAudioPlayerSetSrc(src);
  cmComAudioPlayerSetMediaTitle(name);
  if (shouldPlay) cmComAudioPlayerSwitchIsPlay(true);
};

const findPrevCom = (currentComw: CmComWid | und, coms: IExportableCom[]) => {
  const comsWithError = cmComAudioPlayerComsWithErrorAtom.get();
  const currentComi = coms.findIndex(com => com.w === currentComw);

  if (currentComi < 0) return coms.find(com => !comsWithError.has(com.w));

  for (let i = currentComi - 1; i >= 0; i--) if (!comsWithError.has(coms[i].w)) return coms[i];
  for (let i = coms.length - 1; i > currentComi; i--) if (!comsWithError.has(coms[i].w)) return coms[i];
};

export const cmComAudioPlayerFindNextCom = (currentComw: CmComWid | und, coms: IExportableCom[]) => {
  const comsWithError = cmComAudioPlayerComsWithErrorAtom.get();
  const currentComi = coms.findIndex(com => com.w === currentComw);

  for (let i = currentComi + 1; i < coms.length; i++) if (!comsWithError.has(coms[i].w)) return coms[i];
  for (let i = 0; i < (currentComi < 0 ? coms.length : currentComi); i++)
    if (!comsWithError.has(coms[i].w)) return coms[i];
};

type AdvanceOptions = {
  isAuto?: boolean;
  isError?: boolean;
};

/** The audio element may already be paused, so `SwitchIsPlay(false)` alone would leave the UI showing "pause". */
const stopPlayer = () => {
  cmComAudioPlayerIsPlayAtom.set(false);
  cmComAudioPlayerSwitchIsPlay(false);
};

/** Lock-screen `nexttrack` racing a track-end tick must not double-bump the random pointer. */
let isAdvancing = false;

/**
 * Consecutive auto-advances without a single track that actually progressed: a broken source, an
 * empty decode or a zero-length track must not walk (and re-read) the whole library forever.
 * The chain is reset only by real playback progress, never by `playing` (which also fires for a
 * track that immediately ends again).
 */
const maxAutoAdvanceChain = 32;
const maxAutoErrorChain = 5;
let autoAdvanceChain = 0;
let autoErrorChain = 0;

cmComAudioPlayerAddEventListenerPipe('timeupdate', () => {
  if (takeCmComAudioPlayerCurrentTime() <= 0) return;

  autoAdvanceChain = 0;
  autoErrorChain = 0;
});

/**
 * Walks the resolved tracklist (or the shuffled random list) and plays its neighbour. Shared by manual
 * navigation and the ended/error ticks, independently of the Player page mount.
 */
const advance = async (
  direction: CmComAudioPlayerAdjacentDirection,
  { isAuto = false, isError = false }: AdvanceOptions = {},
) => {
  if (isAdvancing) return;
  if (isAuto && cmComAudioPlayerPlaySrcAtom.get() == null) return;

  /** A manual step is a fresh start; an endless run of auto-advances stops instead of allocating a walk over everything. */
  if (!isAuto) {
    autoAdvanceChain = 0;
    autoErrorChain = 0;
  } else if (++autoAdvanceChain > maxAutoAdvanceChain || (isError && ++autoErrorChain > maxAutoErrorChain)) {
    stopPlayer();
    return;
  }

  /** A track end means playback was active already; an error must not resume a paused player. */
  const shouldPlay = !isError || cmComAudioPlayerIsPlayAtom.get();

  isAdvancing = true;

  try {
    const coms = await takeCmComAudioPlayerTracklistComs();
    const currentComw = takePlayedComw(coms);

    if (isError && currentComw != null) {
      cmComAudioPlayerComsWithErrorAtom.set(new Set(cmComAudioPlayerComsWithErrorAtom.get()).add(currentComw));
      /** An errored com never becomes a playable history entry, whether the walk appended or advanced to it. */
      cmComAudioPlayerDropRandomListCom(currentComw);
    }

    if (cmComPlayerIsShuffleAtom.get()) {
      const isNext = direction === CmComAudioPlayerAdjacentDirection.Next;
      const item = isNext
        ? await takeCmComAudioPlayerNextRandomItem(coms)
        : await takeCmComAudioPlayerPrevRandomItem(coms);

      /** The walk only ever returns open-list coms; an item outside it must never be fetched and played. */
      const itemCom = item && coms.find(com => com.w === item.comw);
      if (!itemCom) {
        /** Nothing suitable is left: the error stays on screen instead of the UI claiming playback. */
        if (isError) stopPlayer();
        return;
      }
      /** Replaying the very com that just failed would spin forever without progress. */
      if (isError && itemCom.w === currentComw) {
        stopPlayer();
        return;
      }

      playCom(itemCom.w, itemCom.n, item.l, shouldPlay);
      void cmComAudioPlayerPrepareNextRandomCom().catch(retNull);

      return;
    }

    const targetCom =
      direction === CmComAudioPlayerAdjacentDirection.Next
        ? cmComAudioPlayerFindNextCom(currentComw, coms)
        : findPrevCom(currentComw, coms);
    const src = targetCom?.al?.[0];

    if (!targetCom || !src) {
      if (isError) stopPlayer();
      return;
    }
    if (isError && targetCom.w === currentComw) {
      stopPlayer();
      return;
    }

    playCom(targetCom.w, targetCom.n, src, shouldPlay);
  } finally {
    isAdvancing = false;
  }
};

/** Plays the neighbouring com in the resolved tracklist — usable from MediaSession, outside the page. */
export const cmComAudioPlayerGoToAdjacentCom = (direction: CmComAudioPlayerAdjacentDirection) => advance(direction);

cmComAudioPlayerEndedTickAtom.subscribe(
  isEnded => isEnded && void advance(CmComAudioPlayerAdjacentDirection.Next, { isAuto: true }).catch(retNull),
);
/**
 * Only an auto-picked com is swapped for the next one on error. A manual pick is the user's explicit
 * choice: the error is surfaced in place and the player stops — the com never enters the prev-list.
 */
cmComAudioPlayerErrorTickAtom.subscribe(isError => {
  if (!isError) return;

  if (isCmComAudioPlayerManualPick()) {
    const comw = cmComAudioPlayerCurrentComwAtom.get();
    const playSrc = cmComAudioPlayerPlaySrcAtom.get();
    const com = comw == null ? null : cmComAudioPlayerFilteredComsAtom.get()?.find(com => com.w === comw);

    /** A resolvable com whose own src failed is remembered so next/prev skip it; inline players are out of scope. */
    if (com && playSrc != null && com.al?.some(src => src === playSrc)) {
      cmComAudioPlayerComsWithErrorAtom.set(new Set(cmComAudioPlayerComsWithErrorAtom.get()).add(com.w));
      cmComAudioPlayerDropRandomListCom(com.w);
    }

    cmComAudioPlayerCancelManualRandomPick();
    stopPlayer();
    return;
  }

  void advance(CmComAudioPlayerAdjacentDirection.Next, { isAuto: true, isError: true }).catch(retNull);
});

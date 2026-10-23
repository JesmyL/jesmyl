import { cmComFavoriteComwsAtom, cmComLastOpenComwAtom, cmComPlayerIsShuffleAtom, cmComSelectedComwsAtom } from '$cm/entities/com';
import { cmIDB, cmOpenComListModeAtom } from '$cm/shared/state';
import { atom } from 'atomaric';
import { CmComWid, IExportableCom } from 'shared/api';
import { isCmComAudioPlayerComCached, takeCmComAudioPlayerCachedSrcs } from './audioCache';
import {
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetMediaTitle,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
} from '../state/current-play-com';

/** Coms whose audio failed to load; they are skipped when picking the next/prev one. */
export const cmComAudioPlayerComsWithErrorAtom = atom<Set<CmComWid>>(new Set());

let navigateToPlayerComw: ((comw: CmComWid) => void) | nil = null;
/** The player page registers its TanStack navigate here so lock-screen next/prev move the URL too. */
export const cmComAudioPlayerRegisterNavigation = (handler: typeof navigateToPlayerComw) => {
  navigateToPlayerComw = handler;
};

const hasAudio = (com: IExportableCom) => !!com.al?.length;

/** Resolves the visible tracklist (all / favorites / selected / cached) straight from atoms + IndexedDB. */
const takeTracklistComs = async () => {
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

/** Plays the neighbouring com in the resolved tracklist — usable from MediaSession, outside the page. */
export const cmComAudioPlayerGoToAdjacentCom = async (direction: 'prev' | 'next') => {
  const coms = await takeTracklistComs();
  const playSrc = cmComAudioPlayerPlaySrcAtom.get();
  const currentComw =
    coms.find(com => playSrc != null && com.al?.some(audioSrc => audioSrc === playSrc))?.w ?? cmComLastOpenComwAtom.get();
  const targetCom =
    direction === 'next'
      ? cmComAudioPlayerFindAdvanceCom(currentComw, coms, cmComPlayerIsShuffleAtom.get())
      : findPrevCom(currentComw, coms);
  const src = targetCom?.al?.[0];

  if (!src) return;

  cmComLastOpenComwAtom.set(targetCom.w);
  cmComAudioPlayerSetSrc(src);
  cmComAudioPlayerSetMediaTitle(targetCom.n);
  cmComAudioPlayerSwitchIsPlay(true);
  navigateToPlayerComw?.(targetCom.w);
};

export const cmComAudioPlayerFindAdvanceCom = (currentComw: CmComWid | und, coms: IExportableCom[], isShuffle: boolean) =>
  isShuffle ? findRandomCom(currentComw, coms) : cmComAudioPlayerFindNextCom(currentComw, coms);

/** Random track that has not errored; falls back to the current one in single-track lists. */
const findRandomCom = (currentComw: CmComWid | und, coms: IExportableCom[]) => {
  const comsWithError = cmComAudioPlayerComsWithErrorAtom.get();
  const candidates = coms.filter(com => com.w !== currentComw && !comsWithError.has(com.w));

  return candidates.length
    ? candidates[Math.floor(Math.random() * candidates.length)]
    : coms.find(com => com.w === currentComw);
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
  for (let i = 0; i < (currentComi < 0 ? coms.length : currentComi); i++) if (!comsWithError.has(coms[i].w)) return coms[i];
};

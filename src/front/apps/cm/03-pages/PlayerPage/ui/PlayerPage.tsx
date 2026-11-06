import { translateBase } from '#basis/locale';
import { Slider } from '#shared/components/ui/slider';
import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { makeToastKOMoodConfig } from '#shared/ui/modal';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import {
  cmComFavoriteComwsAtom,
  CmComNumber,
  cmComPlayerIsShuffleAtom,
  cmComPlayerIsTextSlidesAtom,
  cmComSelectedComwsAtom,
  CmComWithComListSearchFilterInput,
  useCmCom,
  useCmComAllIComList,
  useCmComIComList,
} from '$cm/entities/com';
import {
  CmComAudioPlayerAdjacentDirection,
  cmComAudioPlayerCachedSrcsLoadedAtom,
  cmComAudioPlayerCurrentComwAtom,
  cmComAudioPlayerFilteredComsAtom,
  cmComAudioPlayerFindNextCom,
  cmComAudioPlayerGoToAdjacentCom,
  cmComAudioPlayerIsFromPlayerPageAtom,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerMarkManualPick,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerRandomComwiAtom,
  cmComAudioPlayerSetCurrentComw,
  cmComAudioPlayerSetMediaTitle,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  cmComAudioPlayerUpdatePlaybackRate,
  isCmComAudioPlayerComCached,
  StyledCmComAudioPlayerPlayButton,
  useCmComAudioPlayerCachedSrcs,
  useCmComAudioPlayerCurrentTime,
  useCmComAudioPlayerDuration,
} from '$cm/entities/com-audio-player';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmComToolFavorite, CmComToolIsComToolIconItemsContext, CmComToolNameContext } from '$cm/entities/com-tool';
import { CmComListPackKindSelector, cmComListPackKindSelectorLocaleKeyDict } from '$cm/entities/ComListPackKindSelector';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { CmComAudioPlayerMarksMovers } from '$cm/ext';
import { CmPlayerTextSlides } from '$cm/features/PlayerTextSlides';
import { getCmComFreshAudioMarksPack } from '$cm/shared/lib/getFresh';
import {
  cmComIsFreshAudioMarksLoadingAtom,
  cmComTrackPreSwitchTimeAtom,
  cmIDB,
  cmOpenComListModeAtom,
} from '$cm/shared/state';
import { cmPlayerBroadcastAudioSrcAtom } from '$cm/shared/state/broadcast.atoms';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { atom, useAtomValue } from 'atomaric';
import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { CmComWid, IExportableCom, MenuComToolName, parseCmAudioSrc } from 'shared/api';
import { BaseLocaleKey } from 'shared/model/+locale/_BaseLocaleKey';
import { convertSecondsInStrTime, retNull } from 'shared/utils';
import { lazyInit } from 'shared/utils/lazyInit';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

const termAtom = lazyInit(() => atom(''));

const controlClass =
  'inline-flex items-center justify-center text-[var(--color--3)] bg-transparent border-0 align-middle [transition:transform_.16s_ease,opacity_.16s_ease,color_.16s_ease] active:scale-[0.88]';
const sideControlClass = `${controlClass} size-[2.6rem] opacity-62 [&_svg]:[--icon-size:1.7rem] hover:opacity-100 hover:text-[var(--color--7)]`;
const mainControlClass = `${controlClass} size-[4.4rem] p-[1.1rem] rounded-full text-[var(--color--5)] bg-[var(--color--7)] shadow-[0_14px_30px_-10px_var(--color--7)] hover:scale-105`;
const playerClass = `sticky top-0 z-1 relative isolate overflow-hidden mx-3 mt-3 mb-4 pt-[1.4rem] px-5 pb-4 rounded-3xl text-[var(--color--3)] bg-[var(--color--2)] shadow-[0_1px_0_0_color-mix(in_srgb,var(--color--3)_12%,transparent)_inset,0_26px_44px_-24px_var(--color--3)] before:absolute before:inset-[-55%_35%_45%_-25%] before:z-[-1] before:bg-[radial-gradient(circle_at_center,var(--color--7)_0%,transparent_68%)] before:opacity-55 before:content-['']`;
const tracklineClass = `flex items-center gap-[0.65rem] min-h-[1.7rem] mt-4 [&_[data-slot=slider-track]]:bg-[color-mix(in_srgb,var(--color--3)_22%,transparent)] [&_[data-slot=slider-range]]:bg-[var(--color--3)] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-[var(--color--2)] [&_[data-slot=slider-thumb]]:bg-[var(--color--3)]`;
const variantClass = `min-w-[1.9rem] h-[1.9rem] px-[0.35rem] text-[var(--color--3)] bg-[color-mix(in_srgb,var(--color--3)_22%,transparent)] border-0 rounded-[0.6rem] text-[0.8rem] [transition:transform_.16s_ease,background_.16s_ease,color_.16s_ease] hover:-translate-y-0.5 pointer`;
const variantActiveClass =
  'text-[var(--color--5)] bg-[var(--color--7)] scale-[1.08] shadow-[0_6px_14px_-6px_var(--color--7)]';

const playerEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const StyledPlayer = styled.div`
  animation: ${playerEnter} 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

/** Travel speed in px per second and the hold between the passes of the endless loop. */
const comNameMarqueeSpeed = 40;
const comNameMarqueePause = 1;
/** The loop turns off only when the name fits with this much slack, so iOS resize and font bursts cannot toggle it rapidly. */
const comNameMarqueeHysteresis = 8;

/** The endless cycle: the strip slides its whole shift, holds on the last frame, then jumps back to a seamless start. */
const comNameMarquee = keyframes`
  to {
    transform: translateX(var(--marquee-shift));
  }
`;

/** The pause is a flat tail of the cycle: linear progress up to the slide share, then held at its end for one second. */
const comNameMarqueeEasing = (shift: number) => {
  const slideShare = shift / (shift + comNameMarqueeSpeed * comNameMarqueePause);

  return `linear(0, 1 ${+(slideShare * 100).toFixed(2)}%, 1)`;
};

/**
 * The name keeps one line: an overflowing one loops its duplicate instead of wrapping the card taller.
 * The slide takes `shift / speed` seconds, so the cycle and the pause share both follow from the measured shift.
 * The first pass waits one beat before it starts, like every hold between the passes; the strip rests at
 * the 0% frame meanwhile, since the animation has no `from` block.
 * The strip lies absolutely over the line, out of the flow: it feeds no intrinsic width to the line or any
 * ancestor, so both branches measure the very same widths and the overflow decision cannot oscillate.
 */
const StyledComName = styled.div<{ $shift: number }>`
  position: absolute;
  inset-block: 0;
  left: 0;
  display: flex;
  width: max-content;
  --marquee-shift: -${props => props.$shift}px;
  animation: ${comNameMarquee} ${props => props.$shift / comNameMarqueeSpeed + comNameMarqueePause}s
    ${props => comNameMarqueeEasing(props.$shift)} infinite;
  animation-delay: ${comNameMarqueePause}s;

  ${props => props.$shift > 0 || 'animation-name: none;'}
`;

let userChangeTimeout: TimeOut;
let playbackRateTimeout: TimeOut;

/** Long-press (touch) temporarily speeds playback up to 2x, same as the inline player. */
const TimeLabel = ({ time }: { time: string }) => (
  <code
    className="h-[1.5rem]"
    onTouchStart={event => {
      event.preventDefault();
      clearTimeout(playbackRateTimeout);
      playbackRateTimeout = setTimeout(() => cmComAudioPlayerUpdatePlaybackRate(2), 100);
    }}
    onTouchEnd={() => {
      clearTimeout(playbackRateTimeout);
      cmComAudioPlayerUpdatePlaybackRate(1);
    }}
  >
    {time}
  </code>
);

const PlayerTrack = () => {
  const currentTime = useCmComAudioPlayerCurrentTime();
  const duration = useCmComAudioPlayerDuration();

  return (
    <>
      <TimeLabel time={convertSecondsInStrTime(currentTime)} />

      <Slider
        className="flex-1 min-w-0"
        value={[currentTime || 0]}
        min={0}
        step={1}
        max={duration}
        disabled={duration < 2}
        onValueChange={times => {
          cmComAudioPlayerSwitchIsPlay(false);
          clearTimeout(userChangeTimeout);
          userChangeTimeout = setTimeout(cmComAudioPlayerSwitchIsPlay, 300, true);

          cmComAudioPlayerUpdateCurrentTime(times[0]);
        }}
      />

      {duration <= 0 || !Number.isFinite(duration) || !Number.isFinite(currentTime) || (
        <TimeLabel time={`-${convertSecondsInStrTime(duration - currentTime)}`} />
      )}
    </>
  );
};

/**
 * The strip loops itself while the title does not fit: the slide brings the duplicate onto the first
 * character's position, a one-second hold follows, then the same pass runs again — forever, without triggers.
 */
const PlayerComName = ({ name }: { name: string }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const firstCopyRef = useRef<HTMLSpanElement>(null);
  const secondCopyRef = useRef<HTMLSpanElement>(null);
  /** A fitting name stays a single truncated copy: the duplicated strip is only rendered after a proving measurement. */
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [shift, setShift] = useState(0);

  /** Measured before paint: the first painted frame is already the marquee, never a flashing single copy. */
  useLayoutEffect(() => {
    let isCurrent = true;

    const measure = () => {
      if (!isCurrent) return;

      const line = lineRef.current;
      const firstCopy = firstCopyRef.current;
      if (!line || !firstCopy) return;

      /**
       * Fractional rect widths, never the rounded `offsetWidth`/`clientWidth` pair: a name that fits
       * within a fraction of a pixel of the line must not read as overflowing. A fitting name needs no
       * duplicate: keep the single copy and stop the loop. The slack applies only on the way back, in the
       * same fractional units, so a running loop stops when a later measure proves the name fits with room
       * to spare.
       */
      const isNameOverflowing =
        firstCopy.getBoundingClientRect().width >
        line.getBoundingClientRect().width - (isOverflowing ? comNameMarqueeHysteresis : 0);
      setIsOverflowing(isNameOverflowing);

      if (!isNameOverflowing) {
        setShift(0);
        return;
      }

      const secondCopy = secondCopyRef.current;
      if (!secondCopy) return;

      /** Exactly one line wide: at rest the second copy truncates the same way a plain title would. */
      secondCopy.style.width = `${line.clientWidth}px`;

      /**
       * The distance between the copies' start edges is exactly one cycle: measured, not summed from
       * width and margins, so wrapping, gaps and loaded-font metrics can never leave a residue.
       */
      setShift(secondCopy.offsetLeft - firstCopy.offsetLeft);
    };

    measure();
    /** Fonts settle after the first paint: a wider face must still travel its full cycle. */
    void document.fonts?.ready.then(measure);

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', measure))
      .effect(() => {
        isCurrent = false;
      });
  }, [isOverflowing]);

  return (
    <div
      ref={lineRef}
      className={`relative mt-[0.35rem] text-[1.7rem] font-extrabold leading-[1.08] tracking-[-0.01em] ${isOverflowing ? 'overflow-hidden whitespace-nowrap' : 'truncate'}`}
    >
      {/**
       * The sizer copy is the only in-flow content in both branches: the line's width and height never
       * depend on whether the strip is rendered, so a synchronous re-measure cannot flip the decision back.
       */}
      <span
        ref={firstCopyRef}
        className={isOverflowing ? 'invisible' : undefined}
      >
        {name}
      </span>
      {!isOverflowing || (
        <StyledComName $shift={shift}>
          <span className="mr-[3em]">{name}</span>
          <span
            ref={secondCopyRef}
            aria-hidden
            className="overflow-hidden whitespace-nowrap"
          >
            {name}
          </span>
        </StyledComName>
      )}
    </div>
  );
};

export const CmPlayerPage = () => {
  const favWids = useAtomValue(cmComFavoriteComwsAtom);
  const selWids = useAtomValue(cmComSelectedComwsAtom);
  const favComws = useCmComIComList(favWids);
  const selComws = useCmComIComList(selWids);
  const allIComs = useCmComAllIComList();
  const debouncedOpenComListMode = useDebounceValue(useAtomValue(cmOpenComListModeAtom));
  const cachedSrcs = useCmComAudioPlayerCachedSrcs();
  const cachedSrcsLoaded = useAtomValue(cmComAudioPlayerCachedSrcsLoadedAtom);

  const baseIComs = useMemo(
    () =>
      (debouncedOpenComListMode === 'fav'
        ? favComws
        : debouncedOpenComListMode === 'sel'
          ? selComws
          : debouncedOpenComListMode === 'cached'
            ? (allIComs ?? []).filter(com => isCmComAudioPlayerComCached(com, cachedSrcs))
            : (allIComs ?? [])
      ).filter(com => com.al?.length),
    [allIComs, favComws, cachedSrcs, debouncedOpenComListMode, selComws],
  );
  const baseComws = useMemo(() => baseIComs.map(com => com.w), [baseIComs]);

  /**
   * The mode's own source may still be loading: `useCmComIComList` hides a pending query as `[]`, so an
   * empty result for a requested non-empty wid list only proves that the query has not come back yet.
   */
  const isComListReady = useMemo(() => {
    switch (debouncedOpenComListMode) {
      case 'fav':
        return favWids.length === 0 || favComws.length > 0;
      case 'sel':
        return selWids.length === 0 || selComws.length > 0;
      case 'cached':
        return allIComs !== undefined && cachedSrcsLoaded;
      default:
        return allIComs !== undefined;
    }
  }, [allIComs, cachedSrcsLoaded, debouncedOpenComListMode, favComws, favWids, selComws, selWids]);

  return (
    <CmComWithComListSearchFilterInput
      comws={baseComws}
      termAtom={termAtom()}
    >
      {({ inputNode, searchedComs }) => (
        <CmPlayerPageContent
          baseIComs={baseIComs}
          baseComws={baseComws}
          listMode={debouncedOpenComListMode}
          searchedComs={searchedComs}
          inputNode={inputNode}
          isComListReady={isComListReady}
        />
      )}
    </CmComWithComListSearchFilterInput>
  );
};

const CmPlayerPageContent = ({
  baseIComs,
  baseComws,
  searchedComs,
  inputNode,
  listMode,
  isComListReady,
}: {
  baseIComs: IExportableCom[];
  baseComws: CmComWid[];
  searchedComs: CmComWid[];
  inputNode: ReactNode;
  listMode: keyof typeof cmComListPackKindSelectorLocaleKeyDict;
  isComListReady: boolean;
}) => {
  const openComListMode = useAtomValue(cmOpenComListModeAtom);
  const comAbsentInListToastText = translateBase(BaseLocaleKey.CmComNotInList, {
    l: translateBase(cmComListPackKindSelectorLocaleKeyDict[listMode]),
  });
  const search = useSearch({ from: '/cm/player/' });
  const incomingComw = search.comw;
  const incomingComl = search.coml;
  const currentComw = useAtomValue(cmComAudioPlayerCurrentComwAtom);
  const lastOpenComw = useAtomValue(cmComLastOpenComwAtom);
  const navigate = useNavigate();
  const broadcastSrc = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const isShuffle = useAtomValue(cmComPlayerIsShuffleAtom);
  const isTextSlides = useAtomValue(cmComPlayerIsTextSlidesAtom);
  const randomComwi = useAtomValue(cmComAudioPlayerRandomComwiAtom);
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isPlay = useAtomValue(cmComAudioPlayerIsPlayAtom);

  const icoms = useMemo(() => {
    const comwIComDict = new Map(baseIComs.map(com => [com.w, com]));

    return searchedComs.reduce<IExportableCom[]>((acc, comw) => {
      const icom = comwIComDict.get(comw);
      if (icom) acc.push(icom);
      return acc;
    }, []);
  }, [baseIComs, searchedComs]);
  const comws = useMemo(() => icoms.map(com => com.w), [icoms]);

  /** URL `coml` (md5-tail link) is preferred over the legacy `comw` hint and is resolved within the visible list. */
  const incomingEntryComw = useMemo(
    () =>
      incomingComl == null ? (incomingComw ?? null) : (icoms.find(com => com.al?.includes(incomingComl))?.w ?? null),
    [icoms, incomingComl, incomingComw],
  );
  const hasIncomingEntry = incomingComl != null || incomingComw != null;

  /**
   * Keeps manual next/prev (buttons and lock screen) inside the same searched list auto-advance walks.
   * The list is always published: falling back to an IDB read on every advance re-allocates the whole
   * com table (text included) per track change, which is exactly what turns a skip loop into an OOM.
   */
  useEffect(() => {
    cmComAudioPlayerFilteredComsAtom.set(icoms);

    return () => cmComAudioPlayerFilteredComsAtom.set(null);
  }, [icoms]);

  /** The com being played: the page atom first, then the reopen fallback — the list highlight reads the same value. */
  const activeComw = currentComw ?? lastOpenComw ?? icoms[0]?.w;
  const com = useCmCom(activeComw);
  const comw = com?.wid;
  const comAudio = com?.audio ?? [];
  const src = comAudio.at(0) ?? null;
  const displaySrc = playSrc && comAudio.some(audioSrc => audioSrc === playSrc) ? playSrc : src;
  const audioSrc = parseCmAudioSrc(displaySrc);
  const isPlayOtherSrc = playSrc && playSrc !== displaySrc;

  const playerRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePlayerHeight = () =>
      listWrapperRef.current?.style.setProperty('--cm-player-height', `${playerRef.current?.offsetHeight ?? 0}px`);

    updatePlayerHeight();

    return hookEffectPipe()
      .pipe(addEventListenerPipe(window, 'resize', updatePlayerHeight))
      .effect();
  }, [com, displaySrc]);

  const hasSeededIncomingEntryRef = useRef(false);
  /** Hinted com whose absence from the open list is only decidable once the live com list has settled. */
  const [hintedComwToCheck, setHintedComwToCheck] = useState<CmComWid | null>(null);

  /** A URL `coml`/`comw` is only an entry hint: it seeds the page atom once, then is removed so the URL never drives playback. */
  useEffect(() => {
    /** The hint is consumed once per mount: re-running would re-read the whole com store and re-navigate. */
    if (hasSeededIncomingEntryRef.current || !hasIncomingEntry) return;

    hasSeededIncomingEntryRef.current = true;

    /**
     * Strip the hint synchronously, before any await: the URL must never survive a cancelled/late
     * effect run (StrictMode cleanup), otherwise it keeps feeding the entry logic on every render.
     * The keys are deleted rather than set to `undefined`, which search validation would keep.
     */
    navigate({
      to: '/cm/player',
      search: prev => {
        const nextSearch = { ...prev };
        delete nextSearch.comw;
        delete nextSearch.coml;

        return nextSearch;
      },
      replace: true,
    });

    if (incomingEntryComw != null) {
      cmComAudioPlayerMarkManualPick();
      cmComAudioPlayerSetCurrentComw(incomingEntryComw);
      setHintedComwToCheck(incomingEntryComw);

      return;
    }

    if (incomingComl == null) return;

    /** The visible list may not contain the linked com yet, so IDB is the fallback source. */
    void cmIDB.db.coms
      .toArray()
      .catch(retNull)
      .then(coms => {
        const comw = coms?.find(com => com.al?.includes(incomingComl))?.w;

        if (comw == null) return;

        cmComAudioPlayerMarkManualPick();
        cmComAudioPlayerSetCurrentComw(comw);
        setHintedComwToCheck(comw);
      });
  }, [hasIncomingEntry, incomingEntryComw, incomingComl, navigate]);

  /**
   * A hint may arrive while the open mode's list is still loading: check its presence in the mode list
   * itself (pre-search), only once that list is genuinely settled.
   */
  useEffect(() => {
    if (hintedComwToCheck == null || !isComListReady) return;

    setHintedComwToCheck(null);

    if (!baseComws.includes(hintedComwToCheck)) toast(comAbsentInListToastText, makeToastKOMoodConfig());
  }, [baseComws, comAbsentInListToastText, hintedComwToCheck, isComListReady]);

  /** Fresh marks must follow the current com: the player keeps the slides toggle alive while auto-advancing tracks. */
  useEffect(() => {
    if (!isTextSlides || !comw) return;

    let isCurrentComw = true;
    cmComIsFreshAudioMarksLoadingAtom.set(true);

    getCmComFreshAudioMarksPack(comw).finally(() => {
      if (isCurrentComw) cmComIsFreshAudioMarksLoadingAtom.set(false);
    });

    return () => {
      isCurrentComw = false;
    };
  }, [isTextSlides, comw]);

  useEffect(() => {
    /** A pending URL hint has not seeded the atom yet: starting the previous com would blip the wrong track. */
    if (hasIncomingEntry && incomingEntryComw !== currentComw) return;
    if (!com) return;
    /**
     * `useLiveQuery` keeps the previous com for one render after `currentComw` changes, so acting on it
     * would write that stale com back and cancel the advance that just started the next track.
     */
    if (currentComw != null && com.wid !== currentComw) return;

    if (src) {
      const playingSrc = cmComAudioPlayerPlaySrcAtom.get();
      const srcToPlay = playingSrc && com.audio?.some(audioSrc => audioSrc === playingSrc) ? playingSrc : src;

      cmComAudioPlayerSetCurrentComw(com.wid);
      cmComAudioPlayerSetSrc(srcToPlay);
      cmComAudioPlayerSetMediaTitle(com.name);
      if (cmComAudioPlayerIsPlayAtom.get()) cmComAudioPlayerSwitchIsPlay(true);
      return;
    }

    /** Shuffle has no sequential fallback: the next com may only come from the random list. */
    if (isShuffle) {
      void cmComAudioPlayerGoToAdjacentCom(CmComAudioPlayerAdjacentDirection.Next, true);
      return;
    }

    const nextCom = cmComAudioPlayerFindNextCom(com.wid, icoms);
    if (nextCom && nextCom.w !== com.wid) cmComAudioPlayerSetCurrentComw(nextCom.w);
  }, [icoms, hasIncomingEntry, incomingEntryComw, isShuffle, src, com, currentComw]);

  const goToAdjacentCom = (direction: CmComAudioPlayerAdjacentDirection) =>
    void cmComAudioPlayerGoToAdjacentCom(direction, true);

  return (
    <PageContainerConfigurer
      className="com-player"
      withoutBackButton
      withoutBackSwipe
      headClass="flex-1 min-w-0"
      contentClass="p-0"
      head={
        <div className="flex items-center gap-2 w-full">
          <div className="flex-1 min-w-0">{inputNode}</div>
          <div className="shrink-0">
            <CmComListPackKindSelector />
          </div>
        </div>
      }
      content={
        <>
          {com && <DocTitle title={com.name} />}
          {com && displaySrc && (
            <StyledPlayer
              ref={playerRef}
              className={playerClass}
            >
              <div className="flex custom-align-items items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-[0.5rem] min-h-[1.9rem]">
                    <span className="opacity-62 text-[0.7rem] font-bold tracking-[0.34em] uppercase">
                      #<CmComNumber comw={com.wid} />
                    </span>
                    {comAudio.length > 1 && (
                      <div className="flex gap-[0.4rem]">
                        {comAudio.map((variant, varianti) => (
                          <button
                            key={variant}
                            className={twMerge(variantClass, variant === displaySrc && variantActiveClass)}
                            onClick={() => {
                              cmComAudioPlayerIsFromPlayerPageAtom.set(true);
                              cmComAudioPlayerSetSrc(variant);
                              cmComAudioPlayerSetMediaTitle(com.name);
                              if (cmComAudioPlayerIsPlayAtom.get()) cmComAudioPlayerSwitchIsPlay(true);
                            }}
                          >
                            {varianti + 1}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* A new name remounts the line: the overflow check starts over from the single-copy pass. */}
                  <PlayerComName
                    key={com.name}
                    name={com.name}
                  />
                </div>
                <div className="shrink-0">
                  <CmComToolIsComToolIconItemsContext value>
                    <CmComToolNameContext value={`${MenuComToolName.MarkCom} player`}>
                      <CmComToolFavorite />
                    </CmComToolNameContext>
                  </CmComToolIsComToolIconItemsContext>
                </div>
              </div>

              <div className="relative flex items-center justify-center gap-[1.35rem] mt-[1.15rem]">
                <button
                  className={`${sideControlClass} pointer disabled:opacity-30`}
                  aria-label={translateBase(BaseLocaleKey.CmPreviousCom)}
                  disabled={randomComwi === 0}
                  onClick={() => goToAdjacentCom(CmComAudioPlayerAdjacentDirection.Prev)}
                >
                  <LazyIcon icon="Previous" />
                </button>

                <StyledCmComAudioPlayerPlayButton
                  src={displaySrc}
                  $isPlaying={isPlay && !isPlayOtherSrc}
                  isFromPlayerPage
                  className={mainControlClass}
                />

                <button
                  className={`${sideControlClass} pointer`}
                  aria-label={translateBase(BaseLocaleKey.CmNextCom)}
                  onClick={() => goToAdjacentCom(CmComAudioPlayerAdjacentDirection.Next)}
                >
                  <LazyIcon icon="Next" />
                </button>

                <button
                  className={twMerge(
                    sideControlClass,
                    'absolute right-0 pointer',
                    isShuffle && 'opacity-100 text-[var(--color--7)]',
                  )}
                  aria-label={translateBase(BaseLocaleKey.CmShuffle)}
                  onClick={cmComPlayerIsShuffleAtom.do.toggle}
                >
                  <LazyIcon icon="Shuffle" />
                </button>

                <button
                  className={twMerge(
                    sideControlClass,
                    'absolute left-0 pointer',
                    isTextSlides && 'opacity-100 text-[var(--color--7)]',
                  )}
                  aria-label={translateBase(BaseLocaleKey.CmTextSlides)}
                  onClick={cmComPlayerIsTextSlidesAtom.do.toggle}
                >
                  <LazyIcon icon="TextSmallcaps" />
                </button>
              </div>

              <div className={tracklineClass}>
                <PlayerTrack />
              </div>
            </StyledPlayer>
          )}
          {com && broadcastSrc && (
            <div className="mb-10">
              <CmComAudioPlayerMarksMovers
                com={com}
                preSwitchTimeAtom={cmComTrackPreSwitchTimeAtom}
                src={broadcastSrc}
              />
            </div>
          )}

          <div
            ref={listWrapperRef}
            className="relative"
          >
            <CmComFaceList
              key={openComListMode}
              list={comws}
              currentComw={activeComw}
              withCacheMarks
              importantOnClick={({ com }) => {
                cmComAudioPlayerMarkManualPick();
                cmComAudioPlayerIsFromPlayerPageAtom.set(true);
                cmComAudioPlayerSetCurrentComw(com.w);
                cmComAudioPlayerSetSrc(com.al?.[0] ?? null);
                cmComAudioPlayerSetMediaTitle(com.n);
                cmComAudioPlayerSwitchIsPlay(true);
              }}
            />

            {!isTextSlides || !com || !audioSrc || (
              <CmPlayerTextSlides
                com={com}
                src={audioSrc}
              />
            )}
          </div>
        </>
      }
    />
  );
};

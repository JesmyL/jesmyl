import { translateBase } from '#basis/locale';
import { Slider } from '#shared/components/ui/slider';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { PageContainerConfigurer } from '#shared/ui/phase-container/PageContainerConfigurer';
import { DocTitle } from '#shared/ui/tags/DocTitle';
import {
  cmComFavoriteComwsAtom,
  CmComNumber,
  cmComPlayerIsShuffleAtom,
  cmComSelectedComwsAtom,
  useCmCom,
  useCmComAllIComList,
  useCmComIComList,
} from '$cm/entities/com';
import {
  cmComAudioPlayerEndedTickAtom,
  cmComAudioPlayerErrorTickAtom,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetMediaTitle,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  cmComAudioPlayerUpdatePlaybackRate,
  cmComAudioPlayerComsWithErrorAtom,
  cmComAudioPlayerFindAdvanceCom,
  cmComAudioPlayerFindNextCom,
  cmComAudioPlayerGoToAdjacentCom,
  cmComAudioPlayerRegisterNavigation,
  StyledCmComAudioPlayerPlayButton,
  useCmComAudioPlayerCurrentTime,
  useCmComAudioPlayerDuration,
} from '$cm/entities/com-audio-player';
import { CmComFaceList } from '$cm/entities/com-face';
import { CmComListPackKindSelector } from '$cm/entities/ComListPackKindSelector';
import { cmComLastOpenComwAtom } from '$cm/entities/index';
import { CmComAudioPlayerMarksMovers } from '$cm/ext';
import { cmComTrackPreSwitchTimeAtom, cmOpenComListModeAtom } from '$cm/shared/state';
import { cmPlayerBroadcastAudioSrcAtom } from '$cm/shared/state/broadcast.atoms';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { useAtomValue } from 'atomaric';
import { useEffect, useMemo } from 'react';
import { convertSecondsInStrTime } from 'shared/utils';
import { twMerge } from 'tailwind-merge';

let isCanPlay = false;

const controlClass =
  'inline-flex items-center justify-center text-[var(--color--3)] bg-transparent border-0 align-middle [transition:transform_.16s_ease,opacity_.16s_ease,color_.16s_ease] active:scale-[0.88]';
const sideControlClass = `${controlClass} size-[2.6rem] opacity-62 [&_svg]:[--icon-size:1.7rem] hover:opacity-100 hover:text-[var(--color--7)]`;
const mainControlClass = `${controlClass} size-[4.4rem] p-[1.1rem] rounded-full text-[var(--color--5)] bg-[var(--color--7)] shadow-[0_14px_30px_-10px_var(--color--7)] hover:scale-105`;
const playerClass = `sticky top-0 z-1 relative isolate overflow-hidden mx-3 mt-3 mb-4 pt-[1.4rem] px-5 pb-4 rounded-3xl text-[var(--color--3)] bg-[var(--color--2)] shadow-[0_1px_0_0_color-mix(in_srgb,var(--color--3)_12%,transparent)_inset,0_26px_44px_-24px_var(--color--3)] before:absolute before:inset-[-55%_35%_45%_-25%] before:z-[-1] before:bg-[radial-gradient(circle_at_center,var(--color--7)_0%,transparent_68%)] before:opacity-55 before:content-['']`;
const tracklineClass = `flex items-center gap-[0.65rem] min-h-[1.7rem] mt-4 [&_[data-slot=slider-track]]:bg-[color-mix(in_srgb,var(--color--3)_22%,transparent)] [&_[data-slot=slider-range]]:bg-[var(--color--3)] [&_[data-slot=slider-thumb]]:border-2 [&_[data-slot=slider-thumb]]:border-[var(--color--2)] [&_[data-slot=slider-thumb]]:bg-[var(--color--3)]`;
const variantClass = `min-w-[1.9rem] h-[1.9rem] px-[0.35rem] text-[var(--color--3)] bg-[color-mix(in_srgb,var(--color--3)_22%,transparent)] border-0 rounded-[0.6rem] text-[0.8rem] [transition:transform_.16s_ease,background_.16s_ease,color_.16s_ease] hover:-translate-y-0.5 pointer`;
const variantActiveClass = 'text-[var(--color--5)] bg-[var(--color--7)] scale-[1.08] shadow-[0_6px_14px_-6px_var(--color--7)]';

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

      {duration <= 0 || <TimeLabel time={`-${convertSecondsInStrTime(duration - currentTime)}`} />}
    </>
  );
};

const resetIsCanPlayEffect = () => {
  return () => {
    isCanPlay = false;
  };
};

export const CmPlayerPage = () => {
  const favComws = useCmComIComList(useAtomValue(cmComFavoriteComwsAtom));
  const selComws = useCmComIComList(useAtomValue(cmComSelectedComwsAtom));

  const allIComs = useCmComAllIComList();

  const openComListMode = useAtomValue(cmOpenComListModeAtom);
  const debouncedOpenComListMode = useDebounceValue(openComListMode);
  const search = useSearch({ from: '/cm/player/' });
  const lastOpenComw = useAtomValue(cmComLastOpenComwAtom);
  const navigate = useNavigate();
  const endedTick = useAtomValue(cmComAudioPlayerEndedTickAtom);
  const errorTick = useAtomValue(cmComAudioPlayerErrorTickAtom);
  const broadcastSrc = useAtomValue(cmPlayerBroadcastAudioSrcAtom);
  const isShuffle = useAtomValue(cmComPlayerIsShuffleAtom);
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isPlay = useAtomValue(cmComAudioPlayerIsPlayAtom);

  const icoms = useMemo(
    () =>
      (debouncedOpenComListMode === 'fav'
        ? favComws
        : debouncedOpenComListMode === 'sel'
          ? selComws
          : (allIComs ?? [])
      ).filter(com => com.al?.length),
    [allIComs, favComws, debouncedOpenComListMode, selComws],
  );
  const comws = useMemo(() => icoms.map(com => com.w), [icoms]);

  const com = useCmCom(search.comw ?? lastOpenComw ?? icoms[0]?.w);
  const comAudio = com?.audio;
  const [src] = comAudio ?? [''];
  const displaySrc = playSrc && comAudio?.includes(playSrc) ? playSrc : src;
  const isPlayOtherSrc = playSrc && playSrc !== displaySrc;

  useEffect(resetIsCanPlayEffect, []);

  useEffect(() => {
    cmComAudioPlayerRegisterNavigation(comw =>
      navigate({ to: '/cm/player', search: search => ({ ...(search as object), comw }) }),
    );

    return () => cmComAudioPlayerRegisterNavigation(null);
  }, [navigate]);

  useEffect(() => {
    if (!com) return;

    if (src) {
      cmComLastOpenComwAtom.set(com.wid);
      cmComAudioPlayerSetSrc(src);
      cmComAudioPlayerSetMediaTitle(com.name);
      if (isCanPlay) cmComAudioPlayerSwitchIsPlay(true);
      return;
    }

    navigate({
      to: '/cm/player',
      search: search => {
        if (search.comw == null) return search as never;

        const nextCom = cmComAudioPlayerFindNextCom(search.comw, icoms);
        if (nextCom == null) return search as never;

        return { ...(search as object), comw: nextCom.w };
      },
    });
  }, [icoms, navigate, src, com]);

  useEffect(() => {
    if (!endedTick && !errorTick) return;

    navigate({
      to: '/cm/player',
      search: search => {
        if (!search.comw) return search as never;

        if (errorTick) {
          const comsWithError = new Set(cmComAudioPlayerComsWithErrorAtom.get());
          comsWithError.add(search.comw);
          cmComAudioPlayerComsWithErrorAtom.set(comsWithError);
        }

        const nextCom = cmComAudioPlayerFindAdvanceCom(search.comw, icoms, isShuffle);
        if (!nextCom?.al) return search as never;

        cmComAudioPlayerSetSrc(nextCom.al[0]);

        return { ...(search as object), comw: nextCom.w };
      },
    });

    if (isCanPlay) return setTimeoutEffect(cmComAudioPlayerSwitchIsPlay, 1000, true);
  }, [icoms, navigate, endedTick, errorTick, isShuffle]);

  const goToAdjacentCom = (direction: 'prev' | 'next') => {
    isCanPlay = true;
    void cmComAudioPlayerGoToAdjacentCom(direction);
  };

  return (
    <PageContainerConfigurer
      className="com-player"
      withoutBackButton
      withoutBackSwipe
      headClass="mr-3"
      contentClass="p-0"
      head={<CmComListPackKindSelector />}
      content={
        <>
          {com && <DocTitle title={com.name} />}
          {com && displaySrc && (
            <StyledPlayer className={playerClass}>
              <span className="block opacity-62 text-[0.7rem] font-bold tracking-[0.34em] uppercase">
                #<CmComNumber comw={com.wid} />
              </span>
              <div className="mt-[0.35rem] text-[1.7rem] font-extrabold leading-[1.08] tracking-[-0.01em] text-balance">
                {com.name}
              </div>

              <div className="relative flex items-center justify-center gap-[1.35rem] mt-[1.15rem]">
                <button
                  className={`${sideControlClass} pointer`}
                  aria-label={translateBase(it => it.cm.prevCom)}
                  onClick={() => goToAdjacentCom('prev')}
                >
                  <LazyIcon icon="Previous" />
                </button>

                <StyledCmComAudioPlayerPlayButton
                  src={displaySrc}
                  $isPlaying={isPlay && !isPlayOtherSrc}
                  className={mainControlClass}
                />

                <button
                  className={`${sideControlClass} pointer`}
                  aria-label={translateBase(it => it.cm.nextCom)}
                  onClick={() => goToAdjacentCom('next')}
                >
                  <LazyIcon icon="Next" />
                </button>

                <button
                  className={twMerge(
                    sideControlClass,
                    'absolute right-0 pointer',
                    isShuffle && 'opacity-100 text-[var(--color--7)]',
                  )}
                  aria-label={translateBase(it => it.cm.shuffle)}
                  onClick={cmComPlayerIsShuffleAtom.do.toggle}
                >
                  <LazyIcon icon="Shuffle" />
                </button>
              </div>

              <div className={tracklineClass}>
                <PlayerTrack />
              </div>

              {comAudio && comAudio.length > 1 && (
                <div className="flex justify-center gap-[0.4rem] mt-[0.85rem]">
                  {comAudio.map((variant, varianti) => (
                    <button
                      key={variant}
                      className={twMerge(variantClass, variant === displaySrc && variantActiveClass)}
                      onClick={() => {
                        cmComAudioPlayerSetSrc(variant);
                        cmComAudioPlayerSetMediaTitle(com.name);
                        if (isPlay) cmComAudioPlayerSwitchIsPlay(true);
                      }}
                    >
                      {varianti + 1}
                    </button>
                  ))}
                </div>
              )}
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

          <CmComFaceList
            key={openComListMode}
            list={comws}
            importantOnClick={({ defaultClick }) => {
              isCanPlay = true;
              defaultClick();
              cmComAudioPlayerSwitchIsPlay();
            }}
          />
        </>
      }
    />
  );
};


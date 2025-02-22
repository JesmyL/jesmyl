import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useEffect, useMemo, useRef, useState } from 'react';
import { emptyFunc } from 'shared/utils';
import styled from 'styled-components';
import './ComPlayer.scss';
import { ComPlayerTrack } from './ComPlayerTrack';

let currentAudioNode: HTMLAudioElement | und;
const emptyArr: [] = [];
const movesMemoCallback = () => ({ prevX: 0, onEnd: emptyFunc });

export function ComPlayer({ src, split }: { src: string; split?: string | RegExp | boolean }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const player = audioRef.current;
  const [isError, setIsError] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isCanLoad, setIsCanLoad] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);
  const splitter = split === true ? /\n+/ : split || null;
  const variants = splitter ? src.split(splitter).map(src => src.trim()) : [src.trim()];
  const currentSrc = variants[currentVariant];
  const moves = useMemo(movesMemoCallback, emptyArr);

  useEffect(() => {
    setIsPlay(false);
    setIsShowLoader(false);
    const timeout = setTimeout(() => setIsShowLoader(true), 300);
    const player = audioRef.current;
    if (player) {
      player.pause();
      player.currentTime = 0;
    }

    const onVisibilityChange = () => {
      if (!document.hidden && audioRef.current) setIsPlay(!audioRef.current.paused);
    };

    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [src, player, moves]);

  return (
    <>
      {player && isCanLoad ? (
        <audio
          ref={audioRef}
          src={currentSrc}
          onError={() => setIsError(true)}
          onPause={() => setIsPlay(false)}
          onPlay={() => setIsPlay(true)}
          onTimeUpdate={() => {
            if (player.duration > -1 && player.currentTime >= player.duration) {
              setIsPlay(false);
              if (moves.prevX === 0) {
                player.currentTime = 0;
                moves.onEnd = emptyFunc;
              } else
                moves.onEnd = () => {
                  if (player.currentTime >= player.duration) player.currentTime = 0;
                };
            }
          }}
        />
      ) : (
        <audio ref={audioRef} />
      )}
      {
        <StyledPlayer
          className={'composition-player flex flex-gap' + (player ? '' : ' center')}
          onTouchEnd={event => {
            event.stopPropagation();
            moves.onEnd();
            moves.prevX = 0;
          }}
          onTouchMove={event => {
            event.stopPropagation();
            if (
              player &&
              moves.prevX !== 0 &&
              player.currentTime + event.touches[0].pageX - moves.prevX < player.duration
            ) {
              player.currentTime += event.touches[0].pageX - moves.prevX;
            }

            moves.prevX = event.touches[0].pageX;
          }}
        >
          {player ? (
            isError ? (
              <span className="error-message">Файл не найден</span>
            ) : (
              <>
                <LazyIcon
                  className="pointer"
                  icon={isPlay ? 'Pause' : 'Play'}
                  onClick={() => {
                    const toggle = () => {
                      if (isPlay) player.pause();
                      else {
                        currentAudioNode?.pause();
                        currentAudioNode = player;
                        player.play();
                      }
                      setIsPlay(!isPlay);
                    };

                    if (isCanLoad) toggle();
                    else {
                      setIsCanLoad(true);
                      setTimeout(() => toggle());
                    }
                  }}
                />

                <ComPlayerTrack player={player} />
                {variants.length > 1 && (
                  <div
                    className="current-variant-badge flex center pointer"
                    onClick={() => {
                      setCurrentVariant(currentVariant > variants.length - 2 ? 0 : currentVariant + 1);
                      setIsPlay(false);
                    }}
                  >
                    {currentVariant + 1}
                  </div>
                )}
              </>
            )
          ) : (
            isShowLoader && <JesmylLogo className="loading-logo rotate" />
          )}
        </StyledPlayer>
      }
    </>
  );
}

const StyledPlayer = styled.div`
  transition:
    opacity 0.2s,
    margin 0.2s;
  background: var(--color--2);
  padding: 0 5px;
  width: 100%;
  height: var(--com-player-height);
  overflow: hidden;
  font-size: 0.8em;
  white-space: nowrap;

  &.hidden-controls {
    justify-content: center;
    opacity: 0.5;
    background: rgba(0, 0, 0, 0);
    padding: 0;
    width: var(--com-player-size);
  }

  .current-variant-badge {
    --size: 1.8em;

    border-radius: 50%;
    background: var(--color--3);
    width: var(--size);
    min-width: var(--size);
    max-width: var(--size);
    height: var(--size);
    min-height: var(--size);
    max-height: var(--size);
    color: var(--color--2);
  }

  .loading-logo {
    animation: rotate-loading-logo 1s linear infinite;
  }

  .player-track {
    position: relative;
    border-radius: 5px;
    background: var(--color--1);
    width: calc(100% - 80px);
    height: 10px;
    overflow: hidden;

    &:after {
      position: absolute;
      top: 0;
      left: 0;
      background: var(--color--3);
      width: var(--track-progress-width);
      height: 100%;
      content: '';
    }
  }
`;

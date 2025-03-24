import { JesmylLogo } from '#basis/ui/jesmyl-logo/JesmylLogo';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { Button, Menu } from '@mui/material';
import { useEffect, useMemo, useRef, useState } from 'react';
import { emptyFunc } from 'shared/utils';
import styled, { css, keyframes } from 'styled-components';
import { ComPlayerMarksConfigurerEditMenuButton } from './ComPlayerMarksConfigurerEditMenuButton';
import { ComPlayerMarksMovers } from './ComPlayerMarksMovers';
import { ComPlayerTrack } from './ComPlayerTrack';

let currentAudioNode: HTMLAudioElement | und;
const movesMemoCallback = () => ({ prevX: 0, onEnd: emptyFunc });

interface Props {
  src: string;
  split?: string | RegExp | boolean;
  timeRender?: (timeNode: React.ReactNode, currentSrc: string) => React.ReactNode;
  audioRef?: React.RefObject<HTMLAudioElement | null>;
  isWithEditButton?: boolean;
}

export const ComPlayer = ({ src, split, timeRender, audioRef: topAudioRef, isWithEditButton }: Props) => {
  let audioRef = useRef<HTMLAudioElement>(null);
  if (topAudioRef) audioRef = topAudioRef;

  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const player = audioRef.current;
  const userChangeRef = useActualRef(false);
  const [isError, setIsError] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [isCanLoad, setIsCanLoad] = useState(false);
  const [isShowLoader, setIsShowLoader] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(0);
  const splitter = split === true ? /\n+/ : split || null;
  const variants = splitter ? src.split(splitter).map(src => src.trim()) : [src.trim()];
  const currentSrc = variants[currentVariant];
  const moves = useMemo(movesMemoCallback, []);

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
  }, [src]);

  return (
    <>
      {player && isCanLoad ? (
        <audio
          ref={audioRef}
          src={currentSrc}
          onError={() => setIsError(true)}
          onPause={() => {
            if (userChangeRef.current) return;
            setIsPlay(false);
          }}
          onPlay={() => {
            if (userChangeRef.current) return;
            setIsPlay(true);
          }}
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

      <StyledPlayer className={'composition-player flex gap-2 px-2 ' + (player ? '' : 'center')}>
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

              <ComPlayerTrack
                player={player}
                userChangeRef={userChangeRef}
                src={currentSrc}
                timeRender={
                  timeRender
                    ? timeNode => timeRender(timeNode, currentSrc)
                    : timeNode => (
                        <Button
                          ref={buttonRef}
                          className="text-x3! bg-x1! h-6! pointer rounded-2xl!"
                          color="x3"
                          size="small"
                          variant="outlined"
                          onClick={() => {
                            setIsOpenMenu(true);
                          }}
                        >
                          {timeNode}
                        </Button>
                      )
                }
              />

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

      <Menu
        open={isOpenMenu}
        anchorEl={buttonRef.current}
        onClose={() => setIsOpenMenu(false)}
        classes={{ list: 'bg-x2 text-x4 flex flex-col gap-3', paper: 'bg-x7', root: 'mt-1' }}
      >
        <ComPlayerMarksMovers
          audioRef={audioRef}
          src={currentSrc}
        />

        {isWithEditButton && (
          <ComPlayerMarksConfigurerEditMenuButton
            src={currentSrc}
            onClick={() => setIsOpenMenu(false)}
          />
        )}
      </Menu>
    </>
  );
};

const loadAudioAnimation = keyframes`${css`
  from {
    transform: scale(0.2) rotate(0);
  }

  to {
    transform: scale(0.2) rotate(360deg);
  }
`}`;

const StyledPlayer = styled.div`
  --com-player-size: 30px;
  --com-player-height: var(--com-player-size);

  transition:
    opacity 0.2s,
    margin 0.2s;
  background: var(--color--2);
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
    animation: ${loadAudioAnimation} 1s linear infinite;
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

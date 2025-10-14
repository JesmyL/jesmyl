import { useState } from 'react';
import { HttpLink } from 'shared/api';
import styled, { css, keyframes } from 'styled-components';
import { twMerge } from 'tailwind-merge';
import { ComPlayerPlayButton } from './ComPlayerPlayButton';
import { ComPlayerTrack } from './ComPlayerTrack';

interface Props {
  audioLinks: HttpLink[];
  timeRender?: (timeNode: React.ReactNode, currentSrc: HttpLink) => React.ReactNode;
  addRender?: (currentSrc: HttpLink) => React.ReactNode;
  className?: string;
}

export const ComPlayer = ({ audioLinks, timeRender, addRender, className }: Props) => {
  const [currentVariant, setCurrentVariant] = useState(0);
  const src = audioLinks[currentVariant];

  return (
    <div className={twMerge(className, 'w-full')}>
      <StyledPlayer className="composition-player flex gap-2 px-2 w-full">
        <ComPlayerPlayButton src={src} />
        <ComPlayerTrack
          src={src}
          timeRender={timeRender}
        />

        {audioLinks.length > 1 && (
          <div
            className="current-variant-badge flex center pointer"
            onClick={() => {
              setCurrentVariant(currentVariant > audioLinks.length - 2 ? 0 : currentVariant + 1);
            }}
          >
            {currentVariant + 1}
          </div>
        )}
      </StyledPlayer>
      {addRender && <div className="relative top-2 flex gap-3 max-w-[100vw]">{addRender(src)}</div>}
    </div>
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

export const StyledPlayer = styled.div`
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

import { cmTsjrpcClient } from '$cm/shared/tsjrpc';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { HttpNumLeadLink } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { CmComAudioPlayerPlayButton } from './ComPlayerPlayButton';
import { CmComAudioPlayerTrack } from './ComPlayerTrack';

interface Props {
  audioLinks: HttpNumLeadLink[];
  timeRender?: (timeNode: React.ReactNode, currentSrc: HttpNumLeadLink) => React.ReactNode;
  addRender?: (currentSrc: HttpNumLeadLink) => React.ReactNode;
  className?: string;
}

export const CmComAudioPlayer = ({ audioLinks, timeRender, addRender, className }: Props) => {
  const [currentVariant, setCurrentVariant] = useState(0);
  const src = audioLinks[currentVariant];
  const linkLeadNum = parseInt(src, 10);

  const linkHostQuery = useQuery({
    queryKey: ['cmTsjrpcClient.getLinkLeadNumHost', linkLeadNum],
    queryFn: () => cmTsjrpcClient.getLinkLeadNumHost({ num: linkLeadNum }),
  });

  return (
    <div className={twMerge(className, 'w-full')}>
      <StyledCmComAudioPlayer className="composition-player flex gap-2 px-2 w-full">
        <CmComAudioPlayerPlayButton src={src} />
        <CmComAudioPlayerTrack
          src={src}
          timeRender={timeRender}
        />
        <div className="absolute pointers-none text-center w-full text-[.5rem] top-[2.2em]">
          {linkHostQuery.data?.host}
        </div>

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
      </StyledCmComAudioPlayer>
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

export const StyledCmComAudioPlayer = styled.div`
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

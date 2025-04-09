import { Button, Menu } from '@mui/material';
import { useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { ComPlayer } from './ComPlayer';
import { ComPlayerMarksConfigurerEditMenuButton } from './ComPlayerMarksConfigurerEditMenuButton';
import { ComPlayerMarksMovers } from './ComPlayerMarksMovers';

interface Props {
  audioSrcs: string;
}

export const ComPlayerWithPoints = ({ audioSrcs }: Props) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <ComPlayer
      audioSrcs={audioSrcs}
      timeRender={(timeNode, currentSrc) => (
        <>
          <Button
            ref={buttonRef}
            className="text-x3! bg-x1! h-6! pointer rounded-2xl!"
            color="x3"
            size="small"
            variant="outlined"
            onClick={() => setIsOpenMenu(true)}
          >
            {timeNode}
          </Button>

          <Menu
            open={isOpenMenu}
            anchorEl={buttonRef.current}
            onClose={() => setIsOpenMenu(false)}
            classes={{ list: 'bg-x2 text-x4 flex flex-col gap-3', paper: 'bg-x7', root: 'mt-1' }}
          >
            <ComPlayerMarksMovers src={currentSrc} />

            <ComPlayerMarksConfigurerEditMenuButton
              src={currentSrc}
              onClick={() => setIsOpenMenu(false)}
            />
          </Menu>
        </>
      )}
    />
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

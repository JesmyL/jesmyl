import { Badge } from '#shared/components/ui/badge';
import { atom, useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import styled, { css, keyframes } from 'styled-components';
import { Com } from '../Com';
import { isCmComOpenAudioMoversAtom } from '../complect/state/atoms';
import { ComPlayer } from './ComPlayer';
import { ComPlayerMarksMovers } from './ComPlayerMarksMovers';

interface Props {
  audioLinks: HttpLink[];
  com: Com;
}
const preSwitchTimeAtom = atom(2, 'cm:comAudioPreSwitchTime');

export const ComPlayerWithPoints = ({ audioLinks, com }: Props) => {
  const isOpenButtons = useAtomValue(isCmComOpenAudioMoversAtom);

  return (
    <ComPlayer
      className="fixed top-[var(--header-height)] w-full z-20"
      audioLinks={audioLinks}
      addRender={src =>
        isOpenButtons && (
          <ComPlayerMarksMovers
            src={src}
            com={com}
            preSwitchTimeAtom={preSwitchTimeAtom}
          />
        )
      }
      timeRender={timeNode => (
        <Badge
          variant={isOpenButtons ? 'destructive' : 'secondary'}
          onClick={isCmComOpenAudioMoversAtom.do.toggle}
        >
          {timeNode}
        </Badge>
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

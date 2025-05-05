import { useAtom } from 'atomaric';
import { memo } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { metronomeUserAccentsAtom, metronomeUserMeterSizeAtom } from '../lib/atoms';

export const MetronomeMeterDots = memo(function MetronomeMeterDots() {
  const [userMeterSize, setUserMeterSize] = useAtom(metronomeUserMeterSizeAtom);
  const [accents, setAccents] = useAtom(metronomeUserAccentsAtom);

  return (
    <StyledContainer className="flex flex-gap column">
      <StyledMeterDots
        id="metronome-dotts"
        className="flex"
      >
        {Array(userMeterSize)
          .fill(1)
          .map((_, doti) => {
            return (
              <i
                key={doti}
                className={`strong-size${accents[doti] === '1' ? ' accent' : ''}`}
                onClick={() =>
                  setAccents(
                    accents
                      .split('')
                      .map((num, numi) => (numi === doti ? (num === '1' ? '0' : '1') : num))
                      .join(''),
                  )
                }
              />
            );
          })}
      </StyledMeterDots>

      <div onClick={() => setUserMeterSize(userMeterSize === 3 ? 4 : 3)}>{userMeterSize}/4</div>
    </StyledContainer>
  );
});

const scalePulse1 = keyframes`${css`
  0% {
    scale: 1;
  }
  100% {
    scale: 2;
  }
`}`;

const scalePulse2 = keyframes`${css`
  from {
    scale: 1;
  }
  to {
    scale: 2;
  }
`}`;

const StyledMeterDots = styled.div`
  gap: 2cqmin;

  > * {
    --size: 5cqmin;

    background-color: var(--color--7);
    border-radius: var(--size);
    opacity: 0.7;
    animation: ${scalePulse1} 0.25s;

    &.current {
      animation: ${scalePulse2} 0.2s;
    }

    &.accent {
      opacity: 1;
    }
  }
`;

const StyledContainer = styled.div`
  width: 30cqmin;
  font-size: 1.3em;
  font-weight: bold;
`;

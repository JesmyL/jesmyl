import { useAtom } from 'atomaric';
import { memo } from 'react';
import { cmComMetricNumTitles, cmComNextMetricSize } from 'shared/const/cm/com-metric-nums';
import styled, { css, keyframes } from 'styled-components';
import { metronomeUserAccentsAtom, metronomeUserMeterSizeAtom } from '../lib/atoms';

export const MetronomeMeterDots = memo(function MetronomeMeterDots() {
  const [userMeterSize, setUserMeterSize] = useAtom(metronomeUserMeterSizeAtom);
  const [accents, setAccents] = useAtom(metronomeUserAccentsAtom);

  return (
    <StyledContainer className="flex gap-2 column">
      <StyledMeterDots
        id="metronome-dotts"
        className="flex flex-wrap"
        meter-size={userMeterSize}
      >
        {Array(userMeterSize)
          .fill(1)
          .map((_, doti) => {
            return (
              <i
                key={doti}
                className={`strong-size${accents[doti] === '1' ? ' accent' : ''}`}
                onClick={() => {
                  const news = accents
                    .padEnd(userMeterSize, '0')
                    .split('')
                    .map((num, numi) => (numi === doti ? (num === '0' ? '1' : '0') : num || '0'))
                    .join('');

                  setAccents(news);
                }}
              />
            );
          })}
      </StyledMeterDots>

      <div onClick={() => setUserMeterSize(cmComNextMetricSize[userMeterSize])}>
        {cmComMetricNumTitles[userMeterSize]}
      </div>
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
  --size: 5cqmin;
  gap: 2cqmin;

  &[meter-size='6'] {
    width: calc(3 * (var(--size) + 2cqmin));
  }

  &[meter-size='8'] {
    width: calc(4 * (var(--size) + 2cqmin));
  }

  > * {
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

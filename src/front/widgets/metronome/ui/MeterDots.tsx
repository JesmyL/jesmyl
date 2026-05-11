import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { useAtomValue } from 'atomaric';
import { memo } from 'react';
import { cmComMetricNumTitles, cmComNextMetricSize } from 'shared/const/cm/com-metric-nums';
import { metronomeCurrentMeterSizeAtom, metronomeUserMeterAccentsAtom } from '../lib/atoms';

export const MetronomeMeterDots = memo(function MetronomeMeterDots() {
  const userMeterSize = useAtomValue(metronomeCurrentMeterSizeAtom);
  const defaultAccents = '1' + '0'.repeat(userMeterSize - 1);
  const accents = useAtomValue(metronomeUserMeterAccentsAtom)[userMeterSize] ?? defaultAccents;

  return (
    <StyledContainer className="flex gap-2 column">
      <StyledMeterDots
        id="metronome-dotts"
        className="flex flex-wrap"
        data-meter-size={userMeterSize}
      >
        {Array(userMeterSize)
          .fill(1)
          .map((_, doti) => {
            return (
              <i
                key={doti}
                className="rounded-full!"
                data-dot={accents[doti]}
                onClick={() => {
                  const newAccents = accents
                    .padEnd(userMeterSize, '0')
                    .split('')
                    .map((num, numi) => (numi === doti ? (num === '0' ? '1' : '0') : num || '0'))
                    .join('');

                  metronomeUserMeterAccentsAtom.do.setPartial({
                    [userMeterSize]: newAccents === defaultAccents ? undefined : newAccents,
                  });
                }}
              />
            );
          })}
      </StyledMeterDots>

      <div onClick={() => metronomeCurrentMeterSizeAtom.set(cmComNextMetricSize[userMeterSize])}>
        {cmComMetricNumTitles[userMeterSize]}
      </div>
    </StyledContainer>
  );
});

const scalePulse1 = keyframes`
  0% {
    scale: 1;
  }
  100% {
    scale: 2;
  }
`;

const scalePulse2 = keyframes`
  from {
    scale: 1;
  }
  to {
    scale: 2;
  }
`;

const StyledMeterDots = styled.div`
  --size: 17px;
  --gap: 5px;
  gap: var(--gap);

  &[data-meter-size='6'] {
    width: calc(3 * (var(--size) + var(--gap)));
  }

  &[data-meter-size='8'] {
    width: calc(4 * (var(--size) + var(--gap)));
  }

  [data-dot] {
    width: var(--size);
    height: var(--size);
  }

  > * {
    background-color: var(--color--7);
    border-radius: var(--size);
    opacity: 0.7;
    animation: ${scalePulse1} 0.25s;

    &.current {
      animation: ${scalePulse2} 0.2s;
    }

    &[data-dot='1'] {
      opacity: 1;
    }
  }
`;

const StyledContainer = styled.div`
  width: 30%;
  font-size: 1.3em;
  font-weight: bold;
`;

import { isTouchDevice } from '#shared/lib/device-differences';
import { useActualRef } from '#shared/lib/hooks/useActualRef';
import { KeyboardInput } from '#shared/ui/keyboard/KeyboardInput';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '@cm/_db/cm-idb';
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';

interface Props {
  meterSize: 3 | 4 | und;
  bpm?: number;
}

const AudioContext = window.AudioContext || ('webkitAudioContext' in window && window.webkitAudioContext);
const context = new AudioContext();
let lastTs: number;

export const Metronome = ({ meterSize = 4, bpm = 120 }: Props) => {
  const [userBpm, setUserBpm] = useState(bpm);
  const [userMeterSize, setUserMeterSize] = useState(meterSize);
  const currentDotMemo = useMemo(() => ({ current: 0 }), []);
  const [metronomeValues, setMetronomeValues] = cmIDB.use.metronome();
  const accentesRef = useActualRef(metronomeValues);
  const actualUserMeterSize = useActualRef(userMeterSize);
  const actualUserBpm = useActualRef(userBpm);

  const [isPlay, setIsPlay] = useState(false);

  const playButtonRef = useRef<HTMLDivElement>(null);
  const meterDotsRef = useRef<HTMLDivElement>(null);
  const secondaryRangeRef = useRef<HTMLInputElement>(null);
  const accentRangeRef = useRef<HTMLInputElement>(null);

  useEffect(() => setUserMeterSize(meterSize), [meterSize]);
  useEffect(() => setUserBpm(bpm), [bpm]);

  const touchBpm = () => {
    const delta = Date.now() - (lastTs ?? Date.now());
    lastTs = Date.now();
    if (delta < 0 || delta > 12000) return;
    setUserBpm(Math.ceil(60_000 / delta));
  };

  useEffect(() => {
    if (
      playButtonRef.current === null ||
      meterDotsRef.current === null ||
      secondaryRangeRef.current === null ||
      accentRangeRef.current === null
    )
      return;
    const playButtonNode = playButtonRef.current;
    const meterDotsNode = meterDotsRef.current;
    const accentRangeNode = accentRangeRef.current;
    const secondaryRangeNode = secondaryRangeRef.current;

    const setIsCurrentDot = () => {
      meterDotsNode.children[currentDotMemo.current]?.classList.toggle('current');
      currentDotMemo.current = (currentDotMemo.current + 1) % actualUserMeterSize.current;
    };

    let timer: TimeOut;
    let curTime = context.currentTime;
    let accentPitch = +accentRangeNode.value;
    let secondaryPitch = +secondaryRangeNode.value;

    const schedule = () => {
      if (curTime < context.currentTime + 0.1) {
        const note = context.createOscillator();

        if (accentesRef.current.accentes[currentDotMemo.current] === '1') note.frequency.value = accentPitch;
        else note.frequency.value = secondaryPitch;

        note.connect(context.destination);

        note.start(curTime);
        note.stop(curTime + 0.05);

        curTime += 60 / actualUserBpm.current;

        setIsCurrentDot();
      }
      timer = setTimeout(schedule, 0.1);
    };

    if (isPlay) schedule();
    else currentDotMemo.current = 0;

    const onClick = () => setIsPlay(!isPlay);
    playButtonNode.addEventListener('click', onClick);

    const onSecondaryRangeChange = ((event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget) secondaryPitch = +event.currentTarget.value;
    }) as never;
    secondaryRangeNode.addEventListener('input', onSecondaryRangeChange);

    const onAccentRangeChange = ((event: ChangeEvent<HTMLInputElement>) => {
      if (event.currentTarget) accentPitch = +event.currentTarget.value;
    }) as never;
    accentRangeNode.addEventListener('input', onAccentRangeChange);

    return () => {
      clearTimeout(timer);
      playButtonNode.removeEventListener('click', onClick);
      accentRangeNode.removeEventListener('input', onSecondaryRangeChange);
      secondaryRangeNode.removeEventListener('input', onAccentRangeChange);
    };
  }, [accentesRef, actualUserBpm, actualUserMeterSize, currentDotMemo, isPlay]);

  return (
    <Main className="com-metronome flex around full-width">
      <div
        ref={playButtonRef}
        className="pointer"
      >
        {isPlay ? (
          <LazyIcon
            icon="Pause"
            kind="SolidRounded"
          />
        ) : (
          <LazyIcon
            icon="Play"
            kind="SolidRounded"
          />
        )}
      </div>
      <label className="flex column center flex-gap">
        <LazyIcon
          icon="MinusSignCircle"
          kind="BulkRounded"
          className="pointer"
          onClick={() => setUserBpm(prev => prev - 1)}
        />
        <StyledBpmInput
          type="number"
          withoutCloseButton
          value={'' + userBpm}
          onChange={value => setUserBpm(+value)}
        />
        <LazyIcon
          icon="PlusSignCircle"
          kind="BulkRounded"
          className="pointer"
          onClick={() => setUserBpm(prev => prev + 1)}
        />
      </label>
      <StyledTapButton
        className="strong-size"
        onMouseDown={isTouchDevice ? undefined : touchBpm}
        onTouchStart={isTouchDevice ? touchBpm : undefined}
      />
      <StyledMeterDots
        ref={meterDotsRef}
        className="flex flex-gap"
      >
        {Array(userMeterSize)
          .fill(1)
          .map((_und, doti) => {
            return (
              <i
                key={doti}
                className={`strong-size${accentesRef.current.accentes[doti] === '1' ? ' accent' : ''}`}
                onClick={() =>
                  setMetronomeValues(prev => ({
                    ...prev,
                    accentes: accentesRef.current.accentes
                      .split('')
                      .map((num, numi) => (numi === doti ? (num === '1' ? '0' : '1') : num))
                      .join(''),
                  }))
                }
              />
            );
          })}
      </StyledMeterDots>
      <div onClick={() => setUserMeterSize(userMeterSize === 3 ? 4 : 3)}>{userMeterSize}/4</div>

      <div className="flex column">
        <input
          ref={accentRangeRef}
          className="main"
          type="range"
          min="0"
          max="500"
          defaultValue={metronomeValues.mainSound}
          onChange={event => {
            const value = event.currentTarget.value;
            clearTimeout(changeMainSoundTimeout);
            changeMainSoundTimeout = setTimeout(
              () => setMetronomeValues(prev => ({ ...prev, mainSound: `${+value}` })),
              300,
            );
          }}
        />
        <input
          ref={secondaryRangeRef}
          className="secondary"
          type="range"
          min="0"
          max="500"
          defaultValue={metronomeValues.secondarySound}
          onChange={event => {
            const value = event.currentTarget.value;
            clearTimeout(changeSecondarySoundTimeout);
            changeSecondarySoundTimeout = setTimeout(
              () => setMetronomeValues(prev => ({ ...prev, secondarySound: `${+value}` })),
              300,
            );
          }}
        />
      </div>
    </Main>
  );
};

let changeMainSoundTimeout: TimeOut;
let changeSecondarySoundTimeout: TimeOut;

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
  > * {
    --size: 10px;

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

const StyledBpmInput = styled(KeyboardInput)`
  width: 3em;
  text-align: center;
`;

const StyledTapButton = styled.div`
  --size: 10vw;

  background-color: var(--color--7);
  border-radius: var(--size);
`;

const Main = styled.div`
  --dot-size: 10px;

  input[type='range'].secondary {
    opacity: 0.7;
  }

  /*********** Baseline, reset styles ***********/
  input[type='range'] {
    -webkit-appearance: none;
    appearance: none;
    background: transparent;
  }

  /* Removes default focus */
  input[type='range']:focus {
    outline: none;
  }

  /******** Chrome, Safari, Opera and Edge Chromium styles ********/
  /* slider track */
  input[type='range']::-webkit-slider-runnable-track {
    background-color: var(--color--7);
    border-radius: 4rem;
    height: var(--dot-size);
  }

  /* slider thumb */
  input[type='range']::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    margin-top: 2px; /* Centers thumb on the track */
    background-color: #808080;
    border-radius: var(--dot-size);
    height: var(--dot-size);
    width: var(--dot-size);
  }

  input[type='range']:focus::-webkit-slider-thumb {
    outline: 3px solid #808080;
    outline-offset: 0.125rem;
  }

  /*********** Firefox styles ***********/
  /* slider track */
  input[type='range']::-moz-range-track {
    background-color: var(--color--7);
    border-radius: var(--dot-size);
    height: var(--dot-size);
  }

  /* slider thumb */
  input[type='range']::-moz-range-thumb {
    background-color: #808080;
    border: none; /*Removes extra border that FF applies*/
    border-radius: var(--dot-size);
    height: var(--dot-size);
    width: var(--dot-size);
  }

  input[type='range']:focus::-moz-range-thumb {
    outline: 3px solid #808080;
    outline-offset: 0.125rem;
  }
`;

import { useAtomValue } from '#shared/lib/atom';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { useEffect } from 'react';
import { Loop, LoopOptions, Sampler, getTransport } from 'tone';
import {
  metronomeIsPlayAtom,
  metronomeUserAccentsAtom,
  metronomeUserBpmAtom,
  metronomeUserMeterSizeAtom,
} from './atoms';

export const useMetronomePlayStateController = () => {
  const userBpm = useDebounceValue(useAtomValue(metronomeUserBpmAtom), 500);
  const userMeterSize = useAtomValue(metronomeUserMeterSizeAtom);
  const accents = useAtomValue(metronomeUserAccentsAtom);
  const isPlay = useAtomValue(metronomeIsPlayAtom);

  useEffect(() => {
    if (!isPlay) return retOnPlayStop;

    for (let beati = 0; beati < userMeterSize; beati++) {
      const note = accents[beati] === '1' ? 'A1' : 'A2';
      const diff = 60 / userBpm;
      const loopDuration = diff * userMeterSize;
      const beatDiffTime = diff * beati;

      loops.push(
        new Loop(time => {
          sampler.triggerAttackRelease(note, '8n', time + beatDiffTime);
        }, loopDuration),
      );
    }

    loops.forEach(startEachLoop);
    Transport.start();

    return cleanupEffectHook;
  }, [accents, isPlay, userBpm, userMeterSize]);
};

//

const sampler = new Sampler({
  urls: {
    A1: 'metronome1.mp3',
    A2: 'metronome2.mp3',
  },
  release: 1,
  baseUrl: '/sounds/',
}).toDestination();

const loops: Loop[] = [];
const cleanupEffectHook = () => {
  loops.forEach(stopEachLoop);
  loops.length = 0;
};
const Transport = getTransport();

const retOnPlayStop = () => {
  Transport.stop();
  loops.forEach(stopEachLoop);
  return cleanupEffectHook;
};

const startEachLoop = (loop: Loop<LoopOptions>) => loop.start(0);
const stopEachLoop = (loop: Loop<LoopOptions>) => loop.stop();

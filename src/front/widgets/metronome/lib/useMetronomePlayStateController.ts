import { useAtom, useAtomValue } from '#shared/lib/atoms';
import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { useEffect } from 'react';
import { Loop, Sampler, getTransport } from 'tone';
import {
  metronomeIsPlayAtom,
  metronomeUserAccentsAtom,
  metronomeUserBpmAtom,
  metronomeUserMeterSizeAtom,
} from './atoms';

const sampler = new Sampler({
  urls: {
    A1: 'metronome1.mp3',
    A2: 'metronome2.mp3',
  },
  release: 1,
  baseUrl: '/sounds/',
}).toDestination();

const loops: Loop[] = [];

export const useMetronomePlayStateController = () => {
  const userBpm = useDebounceValue(useAtomValue(metronomeUserBpmAtom), 500);
  const userMeterSize = useAtomValue(metronomeUserMeterSizeAtom);
  const accents = useAtomValue(metronomeUserAccentsAtom);
  const [isPlay, setIsPlay] = useAtom(metronomeIsPlayAtom);

  useEffect(() => {
    const diff = 60 / userBpm;
    const hookEffects = () => {
      loops.forEach(loop => loop.stop());
      loops.length = 0;
    };

    if (!isPlay) {
      getTransport().stop();
      loops.forEach(loop => loop.stop());
      return hookEffects;
    }

    Array(userMeterSize)
      .fill(0)
      .forEach((_, i) => {
        const note = accents[i] === '1' ? 'A1' : 'A2';
        loops.push(
          new Loop(time => {
            sampler.triggerAttackRelease(note, '8n', time + diff * i);
          }, diff * userMeterSize),
        );
      });

    getTransport().start();
    loops.forEach(loop => loop.start(0));

    return hookEffects;
  }, [accents, isPlay, setIsPlay, userBpm, userMeterSize]);
};

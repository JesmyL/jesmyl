import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { Loop, Sampler, getTransport } from 'tone';
import {
  metronomeIsPlayAtom,
  metronomeUserBpmAtom,
  metronomeUserMeterAccentsAtom,
  metronomeUserMeterSizeAtom,
} from './atoms';

export const useMetronomePlayStateController = () => {
  const userBpm = useDebounceValue(useAtomValue(metronomeUserBpmAtom), 500);
  const userMeterSize = useAtomValue(metronomeUserMeterSizeAtom);
  const accents = useAtomValue(metronomeUserMeterAccentsAtom)[userMeterSize] ?? `1${'0'.repeat(userMeterSize - 1)}`;
  const isPlay = useAtomValue(metronomeIsPlayAtom);

  useEffect(() => {
    if (!isPlay) {
      stopAll();
      return;
    }

    for (let beati = 0; beati < userMeterSize; beati++) {
      const note = accents[beati] === '1' ? 'B1' : 'G1';
      const diff = 60 / userBpm;
      const loopDuration = diff * userMeterSize;
      const beatDiffTime = diff * beati;

      loops.push(
        new Loop(time => {
          sampler.triggerAttackRelease(note, '8n', time + beatDiffTime);
        }, loopDuration),
      );
    }

    loops.forEach(loop => loop.start(0));
    Transport.start();

    return stopAll;
  }, [accents, isPlay, userBpm, userMeterSize]);
};

//

const sampler = new Sampler({
  release: 1,
  baseUrl: '/sounds/',
  urls: {
    A1: 'metronome1.mp3',
    A2: 'metronome2.mp3',
  },
}).toDestination();

const loops: Loop[] = [];
const Transport = getTransport();

const stopAll = () => {
  Transport.pause();
  Transport.stop();
  loops.forEach(loop => loop.stop());

  loops.length = 0;
};

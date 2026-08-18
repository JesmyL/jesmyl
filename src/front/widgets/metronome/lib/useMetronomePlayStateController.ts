import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { iife } from 'shared/utils';
import { takeCorrectMetronomeBpm } from 'shared/utils/cm';
import { lazyInit } from 'shared/utils/lazyInit';
import { getContext, getTransport, Loop, Sampler } from 'tone';
import {
  metronomeCurrentBpmAtom,
  metronomeCurrentMeterSizeAtom,
  metronomeIsPlayAtom,
  metronomeUserMeterAccentsAtom,
} from './atoms';
import { lazyMetronomeSources } from './sounds';

export const useMetronomePlayStateController = () => {
  const userBpm = useDebounceValue(useAtomValue(metronomeCurrentBpmAtom), 500);
  const userMeterSize = useAtomValue(metronomeCurrentMeterSizeAtom);
  const accents = useAtomValue(metronomeUserMeterAccentsAtom)[userMeterSize] ?? `1${'0'.repeat(userMeterSize - 1)}`;
  const isPlay = useAtomValue(metronomeIsPlayAtom);

  useEffect(() => {
    if (!isPlay) {
      stopAll();
      return;
    }

    iife(async () => {
      const sampler = await lazySampler();

      for (let beati = 0; beati < userMeterSize; beati++) {
        const note = accents[beati] === '1' ? 'B1' : 'G1';
        const diff = 60 / takeCorrectMetronomeBpm(userBpm);
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
    });

    return stopAll;
  }, [accents, isPlay, userBpm, userMeterSize]);
};

//

const loops: Loop[] = [];
const Transport = getTransport();

const stopAll = () => {
  Transport.pause();
  Transport.stop();
  loops.forEach(loop => loop.stop());

  loops.length = 0;
};

const lazySampler = lazyInit(async () => {
  let A1;
  let A2;

  const [sound1, sound2] = lazyMetronomeSources();

  const base64ToArrayBuffer = (base64DataUrl: string) => {
    const base64 = base64DataUrl.split(',')[1];
    const binaryString = globalThis.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    return bytes.buffer;
  };

  try {
    const context = getContext();

    A1 = await context.decodeAudioData(base64ToArrayBuffer(sound1));
    A2 = await context.decodeAudioData(base64ToArrayBuffer(sound2));
  } catch {
    A1 = sound1;
    A2 = sound2;
  }

  return new Sampler({ urls: { A1, A2 }, release: 1 }).toDestination();
});

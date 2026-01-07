import { useDebounceValue } from '#shared/lib/hooks/useDebounceValue';
import { myTimeStampAtom } from '#shared/state/atoms';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';
import { Loop, Sampler, getTransport } from 'tone';
import {
  metronomeIsSyncWithGroupAtom,
  metronomeJoinedToLeaderAtom,
  metronomeLeaderTimeStampDictAtom,
} from '../state/atoms';
import {
  metronomeIsPlayAtom,
  metronomeUserBpmAtom,
  metronomeUserMeterAccentsAtom,
  metronomeUserMeterSizeAtom,
} from './atoms';

export const useMetronomePlayStateController = () => {
  const userBpm = useDebounceValue(useAtomValue(metronomeUserBpmAtom), 500);
  const userMeterSize = useAtomValue(metronomeUserMeterSizeAtom);
  const accents = useAtomValue(metronomeUserMeterAccentsAtom)[userMeterSize] ?? '1' + '0'.repeat(userMeterSize - 1);
  const isPlay = useAtomValue(metronomeIsPlayAtom);
  const joinedToLeader = useAtomValue(metronomeJoinedToLeaderAtom);
  const leaderTimeStamp = useAtomValue(metronomeLeaderTimeStampDictAtom)[joinedToLeader];

  useEffect(() => {
    if (!isPlay) {
      Transport.pause();
      Transport.stop();
      loops.forEach(loop => loop.stop());

      return cleanupEffectHook;
    }

    const deltaNow = Date.now() - (leaderTimeStamp || myTimeStampAtom.get());
    const betweenBeats = (60 / userBpm) * 1000;
    const loopDuration = betweenBeats * userMeterSize;

    const beatsWasPlayRest = deltaNow % betweenBeats;
    const loopsWasPlayRest = deltaNow % loopDuration;

    let currentAccentIndex = (loopsWasPlayRest - beatsWasPlayRest) / betweenBeats - 1;

    const startDelay = metronomeIsSyncWithGroupAtom.get()
      ? (betweenBeats - beatsWasPlayRest) / 1000 + (leaderTimeStamp ? 0.02 : 0)
      : 0;

    loops.push(
      new Loop(() => {
        if (++currentAccentIndex === accents.length) currentAccentIndex = 0;
        sampler.triggerAttackRelease(accents[currentAccentIndex] === '1' ? 'A3' : 'A1', '8n');
      }, 60 / userBpm),
    );

    loops.forEach(loop => loop.start(startDelay));
    Transport.start();

    return cleanupEffectHook;
  }, [accents, isPlay, leaderTimeStamp, userBpm, userMeterSize]);
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
  Transport.pause();
  Transport.stop();
  loops.forEach(loop => loop.stop());
  loops.length = 0;
};
const Transport = getTransport();

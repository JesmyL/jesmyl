import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { ActualRef } from '#shared/lib/hooks/useActualRef';
import { Slider } from '@mui/material';
import { useEffect, useState } from 'react';
import './ComPlayer.scss';

let userChangeTimeout: TimeOut;

export function ComPlayerTrack({
  player,
  userChangeRef,
}: {
  player: HTMLAudioElement;
  userChangeRef: ActualRef<boolean>;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [time, setTime] = useState('00:00');

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(player, 'timeupdate', () => {
          setTime(
            Math.floor(player.currentTime / 60)
              .toFixed(0)
              .padStart(2, '0') +
              ':' +
              Math.floor(player.currentTime % 60)
                .toFixed(0)
                .padStart(2, '0'),
          );

          if (userChangeRef.current) return;

          setCurrentTime(player.currentTime);
        }),
      )
      .effect();
  }, [player, userChangeRef]);

  return (
    <>
      <Slider
        size="small"
        value={currentTime || 0}
        min={0}
        step={1}
        max={player.duration || 10}
        color="x7"
        disabled={isNaN(player.duration)}
        onChange={(_, value) => {
          player.pause();
          userChangeRef.current = true;
          clearTimeout(userChangeTimeout);
          userChangeTimeout = setTimeout(() => {
            userChangeRef.current = false;
            player.play();
          }, 300);

          const time = value as number;
          setCurrentTime(time);

          player.currentTime = time;
        }}
      />
      {time}
    </>
  );
}

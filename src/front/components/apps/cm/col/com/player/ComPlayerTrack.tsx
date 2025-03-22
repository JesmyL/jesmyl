import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { ActualRef } from '#shared/lib/hooks/useActualRef';
import { mylib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Slider } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

let userChangeTimeout: TimeOut;

interface Props {
  src: string;
  player: HTMLAudioElement;
  userChangeRef: ActualRef<boolean>;
  timeRender?: (timeNode: React.ReactNode) => React.ReactNode;
}

export const ComPlayerTrack = ({ player, userChangeRef, timeRender, src }: Props) => {
  const trackMarks = cmIDB.useAudioTrackMarks(src);
  const [currentTime, setCurrentTime] = useState(0);
  const time = mylib.convertSecondsInStrTime(player.currentTime);
  const marks = useMemo(() => mylib.keys(trackMarks?.marks).map(value => ({ value })), [trackMarks?.marks]);

  useEffect(() => {
    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(player, 'timeupdate', () => {
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
        max={player.duration || 0.01}
        color="x7"
        disabled={isNaN(player.duration)}
        marks={marks}
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
      {timeRender?.(time) ?? time}
    </>
  );
};

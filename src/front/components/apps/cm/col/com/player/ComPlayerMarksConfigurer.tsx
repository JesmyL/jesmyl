import { addEventListenerPipe, hookEffectPipe } from '#shared/lib/hookEffectPipe';
import { mylib, MyLib } from '#shared/lib/my-lib';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '$cm/_db/cm-idb';
import { Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { retNull } from 'shared/utils';
import { ComPlayer } from './ComPlayer';
import { ComPlayerMarksConfigurerTimeMark } from './ComPlayerMarksConfigurerTimeMark';

export const ComPlayerMarksConfigurer = ({ src }: { src: string }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const trackMarks = cmIDB.useAudioTrackMarks(src);

  useEffect(() => {
    if (audioRef.current === null) return;
    const player = audioRef.current;

    return hookEffectPipe()
      .pipe(
        addEventListenerPipe(player, 'timeupdate', () => {
          setCurrentTime(player.currentTime);
        }),
      )
      .effect();
  }, [audioRef]);

  return (
    <>
      <div className="text-2xl mb-5">Настройка точек песни</div>
      <ComPlayer
        src={src}
        audioRef={audioRef}
        timeRender={retNull}
      />
      <Button
        startIcon={<LazyIcon icon="PlusSign" />}
        color="x1"
        variant="contained"
        className="mt-2!"
        disabled={currentTime === 0}
        onClick={() => cmIDB.addAudioTrackMark(src, currentTime, mylib.convertSecondsInStrTime(currentTime))}
      >
        {currentTime}
      </Button>

      {MyLib.entries(trackMarks?.marks ?? {}).map(([time, text]) => {
        return (
          <ComPlayerMarksConfigurerTimeMark
            key={time}
            text={text}
            time={+time}
            src={src}
          />
        );
      })}
    </>
  );
};

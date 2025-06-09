import { mylib, MyLib } from '#shared/lib/my-lib';
import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { useAtomValue } from 'atomaric';
import { ComPlayer } from './ComPlayer';
import { ComPlayerMarksConfigurerTimeMark } from './ComPlayerMarksConfigurerTimeMark';
import { comPlayerPlaySrcAtom, useComPlayerCurrentTime } from './controls';

export const ComPlayerMarksConfigurer = ({ src }: { src: string }) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);
  const currentTime = useComPlayerCurrentTime();
  const trackMarks = cmIDB.useAudioTrackMarks(playSrc ?? src);

  return (
    <>
      <div className="text-2xl mb-5">Настройка точек песни</div>
      <ComPlayer audioSrcs={src} />
      <button
        className="flex justify-center gap-2 px-2 py-1 min-w-35 border-x2! border-4! rounded-lg mt-2!"
        disabled={currentTime === 0}
        onClick={() => cmIDB.addAudioTrackMark(src, currentTime, mylib.convertSecondsInStrTime(currentTime))}
      >
        <LazyIcon icon="PlusSign" />
        {currentTime}
      </button>

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

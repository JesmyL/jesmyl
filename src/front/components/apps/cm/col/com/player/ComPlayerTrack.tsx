import { Slider } from '#shared/components/ui/slider';
import { mylib } from '#shared/lib/my-lib';
import { useAtomSet, useAtomValue } from 'atomaric';
import {
  comPlayerAudioElement,
  comPlayerIsPlayAtom,
  comPlayerPlaySrcAtom,
  isUserSlideTrackDTO,
  useComPlayerCurrentTime,
  useComPlayerDuration,
} from './controls';

let userChangeTimeout: TimeOut;

interface Props {
  src: string;
  timeRender?: (timeNode: React.ReactNode) => React.ReactNode;
  isPlayOwnOnly?: boolean;
}

export const ComPlayerTrack = ({ timeRender, src, isPlayOwnOnly }: Props) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);
  const isOtherPlaySrc = playSrc && playSrc !== src;
  let duration = useComPlayerDuration();
  let currentTime = useComPlayerCurrentTime();

  if (isPlayOwnOnly && isOtherPlaySrc) {
    duration = 0;
    currentTime = 0;
  }
  const time = mylib.convertSecondsInStrTime(currentTime);

  const setIsPlay = useAtomSet(comPlayerIsPlayAtom);

  return (
    <>
      <Slider
        value={[currentTime || 0]}
        min={0}
        step={1}
        max={duration}
        color={isOtherPlaySrc ? 'x5' : 'x7'}
        disabled={duration < 2}
        onValueChange={([value]) => {
          setIsPlay(false);
          isUserSlideTrackDTO.isSlide = true;
          clearTimeout(userChangeTimeout);
          userChangeTimeout = setTimeout(() => {
            isUserSlideTrackDTO.isSlide = false;
            setIsPlay(true);
          }, 300);

          const time = value as number;

          comPlayerAudioElement.currentTime = time;
        }}
      />
      {timeRender?.(time) ?? time}
    </>
  );
};

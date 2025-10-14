import { Slider } from '#shared/components/ui/slider';
import { mylib } from '#shared/lib/my-lib';
import {
  comPlayerAudioElement,
  comPlayerIsPlayAtom,
  comPlayerPlaySrcAtom,
  isUserSlideTrackDTO,
  useComPlayerCurrentTime,
  useComPlayerDuration,
} from '$cm/basis/lib/control/current-play-com';
import { useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';

let userChangeTimeout: TimeOut;

interface Props {
  src: HttpLink;
  timeRender?: (timeNode: React.ReactNode, src: HttpLink) => React.ReactNode;
}

export const ComPlayerTrack = (props: Props) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);

  if (playSrc && playSrc !== props.src) {
    const time = mylib.convertSecondsInStrTime(0);

    return (
      <Track
        currentTime={0}
        duration={0}
        time={props.timeRender?.(time, props.src) ?? time}
      />
    );
  }

  return <TrackWithCurrents {...props} />;
};

const TrackWithCurrents = (props: Props) => {
  const currentTime = useComPlayerCurrentTime();
  const time = mylib.convertSecondsInStrTime(currentTime);

  return (
    <Track
      currentTime={currentTime}
      duration={useComPlayerDuration()}
      time={props.timeRender?.(time, props.src) ?? time}
    />
  );
};

const Track = (props: { currentTime: number; duration: number; time: React.ReactNode }) => {
  return (
    <>
      <Slider
        value={[props.currentTime || 0]}
        min={0}
        step={1}
        max={props.duration}
        disabled={props.duration < 2}
        onValueChange={([value]) => {
          comPlayerIsPlayAtom.set(false);
          isUserSlideTrackDTO.isSlide = true;
          clearTimeout(userChangeTimeout);
          userChangeTimeout = setTimeout(() => {
            isUserSlideTrackDTO.isSlide = false;
            comPlayerIsPlayAtom.set(true);
          }, 300);

          const time = value as number;

          comPlayerAudioElement.currentTime = time;
        }}
      />
      {props.time}
    </>
  );
};

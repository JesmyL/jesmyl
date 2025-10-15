import { Slider } from '#shared/components/ui/slider';
import { mylib } from '#shared/lib/my-lib';
import { useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import {
  cmComAudioPlayerHTMLElement,
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerIsUserSlideTrackDTO,
  cmComAudioPlayerPlaySrcAtom,
  useCmComAudioPlayerCurrentTime,
  useCmComAudioPlayerDuration,
} from '../state/current-play-com';

let userChangeTimeout: TimeOut;

interface Props {
  src: HttpLink;
  timeRender?: (timeNode: React.ReactNode, src: HttpLink) => React.ReactNode;
}

export const CmComAudioPlayerTrack = (props: Props) => {
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);

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
  const currentTime = useCmComAudioPlayerCurrentTime();
  const time = mylib.convertSecondsInStrTime(currentTime);

  return (
    <Track
      currentTime={currentTime}
      duration={useCmComAudioPlayerDuration()}
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
          cmComAudioPlayerIsPlayAtom.set(false);
          cmComAudioPlayerIsUserSlideTrackDTO.isSlide = true;
          clearTimeout(userChangeTimeout);
          userChangeTimeout = setTimeout(() => {
            cmComAudioPlayerIsUserSlideTrackDTO.isSlide = false;
            cmComAudioPlayerIsPlayAtom.set(true);
          }, 300);

          const time = value as number;

          cmComAudioPlayerHTMLElement.currentTime = time;
        }}
      />
      {props.time}
    </>
  );
};

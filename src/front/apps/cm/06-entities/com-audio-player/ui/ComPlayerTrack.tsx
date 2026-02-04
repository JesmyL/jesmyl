import { Slider } from '#shared/components/ui/slider';
import { mylib } from '#shared/lib/my-lib';
import { useAtomValue } from 'atomaric';
import { HttpLink } from 'shared/api';
import {
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSwitchIsPlay,
  cmComAudioPlayerUpdateCurrentTime,
  cmComAudioPlayerUpdatePlaybackRate,
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

  if (!playSrc || playSrc === props.src) return <TrackWithCurrents {...props} />;

  const time = <TimeRender time={mylib.convertSecondsInStrTime(0)} />;

  return (
    <Track
      currentTime={0}
      duration={0}
      time={props.timeRender?.(time, props.src) ?? time}
    />
  );
};

let playbackRateTimeout: TimeOut;
const TimeRender = ({ time }: { time: React.ReactNode }) => {
  return (
    <code
      onTouchStart={event => {
        event.preventDefault();
        clearTimeout(playbackRateTimeout);
        playbackRateTimeout = setTimeout(() => cmComAudioPlayerUpdatePlaybackRate(2), 100);
      }}
      onTouchEnd={() => {
        clearTimeout(playbackRateTimeout);
        cmComAudioPlayerUpdatePlaybackRate(1);
      }}
    >
      {time}
    </code>
  );
};

const TrackWithCurrents = (props: Props) => {
  const currentTime = useCmComAudioPlayerCurrentTime();
  const time = <TimeRender time={mylib.convertSecondsInStrTime(currentTime)} />;

  return (
    <Track
      currentTime={currentTime}
      duration={useCmComAudioPlayerDuration()}
      time={props.timeRender?.(<TimeRender time={time} />, props.src) ?? time}
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
        onValueChange={times => {
          cmComAudioPlayerSwitchIsPlay(false);
          clearTimeout(userChangeTimeout);
          userChangeTimeout = setTimeout(cmComAudioPlayerSwitchIsPlay, 300, true);

          cmComAudioPlayerUpdateCurrentTime(times[0]);
        }}
      />
      {props.time}
    </>
  );
};

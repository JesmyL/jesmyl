import { useAtomSet, useAtomValue } from '#shared/lib/atom';
import { mylib } from '#shared/lib/my-lib';
import { cmIDB } from '$cm/basis/lib/cmIDB';
import { Slider } from '@mui/material';
import { useMemo } from 'react';
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
}

export const ComPlayerTrack = ({ timeRender, src }: Props) => {
  const playSrc = useAtomValue(comPlayerPlaySrcAtom);
  const trackMarks = cmIDB.useAudioTrackMarks(playSrc ?? src);
  const currentTime = useComPlayerCurrentTime();
  const time = mylib.convertSecondsInStrTime(currentTime);
  const duration = useComPlayerDuration();
  const setIsPlay = useAtomSet(comPlayerIsPlayAtom);
  const marks = useMemo(() => mylib.keys(trackMarks?.marks).map(value => ({ value })), [trackMarks?.marks]);
  const isOtherPlaySrc = playSrc && playSrc !== src;

  return (
    <>
      <Slider
        size="small"
        value={currentTime || 0}
        min={0}
        step={1}
        max={duration}
        color={isOtherPlaySrc ? 'x5' : 'x7'}
        disabled={duration < 2}
        marks={marks}
        onChange={(_, value) => {
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

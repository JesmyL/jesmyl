import { LazyIcon } from '#shared/ui/the-icon/LazyIcon';
import { useAtomValue } from 'atomaric';
import { CmAudioSrc } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import {
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
  cmComAudioPlayerSetSrc,
  cmComAudioPlayerSwitchIsPlay,
} from '../state/current-play-com';
import { cmComAudioPlayerIsFromPlayerPageAtom } from '../state/atoms';

interface Props {
  className?: string;
  src: CmAudioSrc;
  /** Only the player page keeps auto-advancing to the next com when the track ends. */
  isFromPlayerPage?: boolean;
}

export const CmComAudioPlayerPlayButton = ({ src, className, isFromPlayerPage = false }: Props) => {
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isOtherPlaySrc = playSrc && playSrc !== src;
  const isCurrentPlay = useAtomValue(cmComAudioPlayerIsPlayAtom);
  const isPlay = isOtherPlaySrc ? false : isCurrentPlay;

  return (
    <span
      className={twMerge('pointer', isOtherPlaySrc && 'text-x5', className)}
      onClick={() => {
        if (!isPlay) cmComAudioPlayerIsFromPlayerPageAtom.set(isFromPlayerPage);

        cmComAudioPlayerSetSrc(src);
        cmComAudioPlayerSwitchIsPlay();
      }}
    >
      <LazyIcon
        icon={isPlay ? 'Pause' : 'Play'}
        withoutAnimation
      />
    </span>
  );
};

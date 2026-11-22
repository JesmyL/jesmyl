import { TheIconLoading } from '#shared/ui/the-icon/IconLoading';
import { useAtomValue } from 'atomaric';
import { CmAudioSrc } from 'shared/api';
import { twMerge } from 'tailwind-merge';
import { cmComAudioPlayerIsErrorRecoveryAtom, cmComAudioPlayerMarkManualPick } from '../lib/adjacent-coms';
import {
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerIsSrcLoadingAtom,
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
  const isSrcLoading = useAtomValue(cmComAudioPlayerIsSrcLoadingAtom);
  const isErrorRecovery = useAtomValue(cmComAudioPlayerIsErrorRecoveryAtom);
  const isLoading = isFromPlayerPage && !isOtherPlaySrc && isSrcLoading && !isErrorRecovery;

  return (
    <span
      className={twMerge('pointer', isOtherPlaySrc && 'text-x5', className)}
      onClick={() => {
        cmComAudioPlayerMarkManualPick();

        if (!isPlay) cmComAudioPlayerIsFromPlayerPageAtom.set(isFromPlayerPage);

        cmComAudioPlayerSetSrc(src);
        cmComAudioPlayerSwitchIsPlay();
      }}
    >
      <TheIconLoading
        isLoading={isLoading}
        icon={isPlay ? 'Pause' : 'Play'}
        withoutAnimation
      />
    </span>
  );
};

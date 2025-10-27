import { hideAppFooterAtom } from '#basis/state/hideAppFooterAtom';
import {
  cmComAudioPlayerIsPlayAtom,
  cmComAudioPlayerPlaySrcAtom,
  CmComAudioPlayerWithMarks,
} from '$cm/entities/com-audio-player';
import { cmComIsAudioPlayerHiddenAtom } from '$cm/entities/index';
import { CmCom } from '$cm/ext';
import { useAtomValue } from 'atomaric';
import { useEffect } from 'react';

export const CmComAudioPlayerInCompositionPage = ({ ccom }: { ccom: CmCom }) => {
  const playSrc = useAtomValue(cmComAudioPlayerPlaySrcAtom);
  const isHiddenFooter = useAtomValue(hideAppFooterAtom);
  const isPlay = useAtomValue(cmComAudioPlayerIsPlayAtom);
  const isPlayerHidden = useAtomValue(cmComIsAudioPlayerHiddenAtom);

  const isPlayOtherAudio = !!playSrc && !ccom.audio.includes(playSrc);

  useEffect(() => {
    if (!isPlay && isPlayOtherAudio) cmComAudioPlayerPlaySrcAtom.set(ccom.audio[0]);
  }, [ccom.audio, isPlay, isPlayOtherAudio]);

  return (
    !isHiddenFooter &&
    (!isPlayerHidden || isPlay) && (
      <>
        {!!ccom.audio?.length && (
          <CmComAudioPlayerWithMarks
            audioLinks={ccom.audio}
            com={ccom}
            className={isPlayOtherAudio ? 'top-[calc(var(--header-height)+31px)]' : undefined}
          />
        )}
        {isPlayOtherAudio && isPlay && (
          <CmComAudioPlayerWithMarks
            audioLinks={[playSrc]}
            com={ccom}
            hideMarksForce
          />
        )}
      </>
    )
  );
};

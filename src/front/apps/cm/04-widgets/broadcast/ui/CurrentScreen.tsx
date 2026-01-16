import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCmBroadcastMinimalConfigSlides } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { useCmBroadcastScreenConfig } from '../hooks/configs';
import { useCmBroadcastScreenWinResizeListen } from '../lib/win-resize-lesten';
import { CmBroadcastScreen } from './Screen';

export const CmBroadcastCurrentScreen = (props: BroadcastScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useCmBroadcastScreenConfig(props.screeni ?? currentConfigi);
  const forceUpdates = useCmBroadcastScreenWinResizeListen(props.win);
  const isVisible = useAtomValue(isBroadcastTextVisibleAtom);

  const { selfSlides, currentSlidei, isFragments } = useCmBroadcastMinimalConfigSlides(props.screeni ?? currentConfigi);
  const isRealText = selfSlides[currentSlidei]?.ord.isRealText();
  const text =
    (isFragments && isRealText ? selfSlides[currentSlidei]?.lines : selfSlides[currentSlidei]?.lines.join('\n')) ?? '';

  return (
    <CmBroadcastScreen
      {...props}
      cmConfig={currentConfig}
      text={text}
      nextText={selfSlides[currentSlidei + 1]?.lines.join(isFragments ? ' ' : '\n') ?? ''}
      isChorded={!isRealText}
      isNextChorded={!selfSlides[currentSlidei + 1]?.ord.isRealText()}
      isVisible={isVisible}
      subUpdates={`${currentConfigi}${forceUpdates}${getCurrentConfig(currentConfigi)?.proportion}`}
      freshSlideKey={`${text}//${currentSlidei}`}
    />
  );
};

import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { CmCom } from '$cm/ext';
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

  const { selfSlides, currentSlidei, isFragments, nextSlidei } = useCmBroadcastMinimalConfigSlides(
    props.screeni ?? currentConfigi,
  );
  const isRealText = selfSlides[currentSlidei]?.ord.isRealText();

  const text =
    isFragments && isRealText
      ? selfSlides[currentSlidei]?.lines
      : CmCom.makeEachLineFirstLetterUpperCase(selfSlides[currentSlidei]?.lines).join('\n');
  const switchDirection = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);

  return (
    <CmBroadcastScreen
      {...props}
      cmConfig={currentConfig}
      text={text}
      nextText={CmCom.makeEachLineFirstLetterUpperCase(selfSlides[nextSlidei]?.lines, !isFragments).join(
        isFragments ? ' ' : '\n',
      )}
      isChorded={!isRealText}
      isNextChorded={!selfSlides[nextSlidei]?.ord.isRealText()}
      isVisible={isVisible}
      subUpdates={`${currentConfigi}${forceUpdates}${getCurrentConfig(currentConfigi)?.proportion}`}
      freshSlideKey={`${text}//${currentSlidei}`}
      slideSwitchDir={switchDirection}
    />
  );
};

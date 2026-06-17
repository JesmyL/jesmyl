import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { cmBroadcastSwitchBlockDirectionAtom } from '$cm/entities/broadcast';
import { useCmBroadcastSlidesContext } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { useCmBroadcastScreenConfig } from '../hooks/configs';
import { useCmBroadcastScreenWinResizeListen } from '../lib/win-resize-lesten';
import { CmBroadcastScreen } from './Screen';

export const CmBroadcastCurrentScreen = (props: BroadcastScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useCmBroadcastScreenConfig(props.configi ?? currentConfigi);
  const forceUpdates = useCmBroadcastScreenWinResizeListen(props.win);
  const isVisible = useAtomValue(isBroadcastTextVisibleAtom);

  const { html, nextHtml, slides, slidei, nextSlidei, hash } = useCmBroadcastSlidesContext();

  const switchDirection = useAtomValue(cmBroadcastSwitchBlockDirectionAtom);

  return (
    <CmBroadcastScreen
      {...props}
      cmConfig={currentConfig}
      html={html}
      nextText={nextHtml}
      isChorded={!!slides[slidei]?.ord.isChBlock()}
      isNextChorded={!!slides[nextSlidei]?.ord.isChBlock()}
      isVisible={isVisible}
      subUpdates={`${currentConfigi}${forceUpdates}${getCurrentConfig(currentConfigi)?.proportion}`}
      freshSlideKey={hash || html}
      slideSwitchDir={switchDirection}
    />
  );
};

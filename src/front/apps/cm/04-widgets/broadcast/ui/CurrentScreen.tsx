import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCmBroadcastMinimalConfigLines } from '$cm/features/broadcast';
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

  const { selfLines, blocki } = useCmBroadcastMinimalConfigLines(props.screeni ?? currentConfigi);

  return (
    <CmBroadcastScreen
      {...props}
      cmConfig={currentConfig}
      text={selfLines[blocki]?.lines.join('\n') ?? ''}
      nextText={selfLines[blocki + 1]?.lines.join('\n') ?? ''}
      isChorded={!selfLines[blocki]?.ord.isRealText()}
      isNextChorded={!selfLines[blocki + 1]?.ord.isRealText()}
      isVisible={isVisible}
      subUpdates={`${currentConfigi}${forceUpdates}${getCurrentConfig(currentConfigi)?.proportion}`}
    />
  );
};

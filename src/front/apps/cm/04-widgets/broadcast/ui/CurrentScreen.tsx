import { useIsScreenBroadcastTextVisible } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig, useScreenBroadcastCurrentConfigi } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { cmBroadcastBlockAtom } from '$cm/entities/broadcast';
import { useCmBroadcastCurrentComTexts } from '$cm/features/broadcast';
import { useAtomValue } from 'atomaric';
import { useCmBroadcastScreenConfig } from '../hooks/configs';
import { useCmBroadcastScreenWinResizeListen } from '../lib/win-resize-lesten';
import { CmBroadcastScreen } from './Screen';

export const CmBroadcastCurrentScreen = (props: BroadcastScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const currentConfigi = useScreenBroadcastCurrentConfigi();
  const currentConfig = useCmBroadcastScreenConfig(props.screeni ?? currentConfigi);
  const texts = useCmBroadcastCurrentComTexts(currentConfig?.pushKind);
  const currTexti = useAtomValue(cmBroadcastBlockAtom);
  const forceUpdates = useCmBroadcastScreenWinResizeListen(props.win);
  const isVisible = useIsScreenBroadcastTextVisible();

  return (
    <CmBroadcastScreen
      {...props}
      cmConfig={currentConfig}
      text={texts ? texts[currTexti] : ''}
      nextText={texts ? texts[currTexti + 1] || '' : ''}
      isVisible={isVisible}
      subUpdates={'' + currentConfigi + forceUpdates + getCurrentConfig(currentConfigi)?.proportion}
    />
  );
};

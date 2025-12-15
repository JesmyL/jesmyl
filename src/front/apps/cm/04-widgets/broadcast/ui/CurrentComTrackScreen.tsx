import { useIsScreenBroadcastTextVisible } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useGetScreenBroadcastConfig, useScreenBroadcastCurrentConfigi } from '#features/broadcast/hooks/configs';
import { FontSizeContainProps } from '#shared/ui/font-size-contain/FontSizeContain.model';
import { useCmCom } from '$cm/entities/com';
import { useCmComCurrentMarkValues } from '$cm/shared/lib/useCmComCurrentMarkValues';
import { cmPlayerBroadcastComwAtom } from '$cm/shared/state/broadcast.atoms';
import { useAtomValue } from 'atomaric';
import { useCmBroadcastScreenConfig } from '../hooks/configs';
import { useCmBroadcastScreenWinResizeListen } from '../lib/win-resize-lesten';
import { CmBroadcastScreen } from './Screen';

export const CmBroadcastCurrentComTrackScreen = (props: BroadcastScreenProps & Partial<FontSizeContainProps>) => {
  const getCurrentConfig = useGetScreenBroadcastConfig();
  const currentConfigi = useScreenBroadcastCurrentConfigi();
  const currentConfig = useCmBroadcastScreenConfig(props.screeni ?? currentConfigi);
  const forceUpdates = useCmBroadcastScreenWinResizeListen(props.win);
  const isVisible = useIsScreenBroadcastTextVisible();

  const comw = useAtomValue(cmPlayerBroadcastComwAtom);
  const com = useCmCom(comw);
  const { html, nextHtml, isChordedBlock, isNextChordedBlock } = useCmComCurrentMarkValues(com);

  return (
    <CmBroadcastScreen
      {...props}
      cmConfig={currentConfig}
      text={html ?? ''}
      nextText={nextHtml ?? ''}
      isVisible={isVisible}
      subUpdates={'' + currentConfigi + forceUpdates + getCurrentConfig(currentConfigi)?.proportion}
      isChordedBlockText={isChordedBlock}
      isChordedBlockNextText={isNextChordedBlock}
    />
  );
};

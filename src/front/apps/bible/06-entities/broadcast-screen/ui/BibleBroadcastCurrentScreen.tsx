import { useIsScreenBroadcastTextVisible } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useScreenBroadcastCurrentConfig, useScreenBroadcastCurrentConfigi } from '#features/broadcast/hooks/configs';
import { useBibleBroadcastScreenConfig } from '../../broadcast/config/configs';
import { BibleBroadcastScreenScreen } from './BibleBroadcastScreen';

export function BibleBroadcastScreenCurrentScreen(props: BroadcastScreenProps) {
  const currentConfigi = useScreenBroadcastCurrentConfigi();
  const currentConfig = useBibleBroadcastScreenConfig(props.screeni ?? currentConfigi);

  const isActualVisible = useIsScreenBroadcastTextVisible();

  const config = useScreenBroadcastCurrentConfig();

  return (
    <BibleBroadcastScreenScreen
      {...props}
      bibleConfig={currentConfig}
      windowResizeUpdatesNum={config?.proportion}
      isVisible={props.isPreview ? true : isActualVisible}
    />
  );
}

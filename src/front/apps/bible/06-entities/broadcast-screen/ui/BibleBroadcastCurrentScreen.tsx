import { currentBroadcastConfigiAtom, isBroadcastTextVisibleAtom } from '#features/broadcast/atoms';
import { BroadcastScreenProps } from '#features/broadcast/Broadcast.model';
import { useScreenBroadcastCurrentConfig } from '#features/broadcast/hooks/configs';
import { useAtomValue } from 'atomaric';
import { useBibleBroadcastScreenConfig } from '../../broadcast/config/configs';
import { BibleBroadcastScreenScreen } from './BibleBroadcastScreen';

export function BibleBroadcastScreenCurrentScreen(props: BroadcastScreenProps) {
  const currentConfigi = useAtomValue(currentBroadcastConfigiAtom);
  const currentConfig = useBibleBroadcastScreenConfig(props.screeni ?? currentConfigi);

  const isActualVisible = useAtomValue(isBroadcastTextVisibleAtom);

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
